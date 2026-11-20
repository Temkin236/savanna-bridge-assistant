"""Groq support provider with safe multi-key rotation and offline fallback."""

from __future__ import annotations

import base64
import logging
import os
import re
import threading
from collections.abc import Callable
from typing import Any, TypeVar

import httpx

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.config import (
    GROQ_API_KEY,
    GROQ_API_KEY_2,
    GROQ_API_KEYS,
    GROQ_CHAT_MODEL,
    GROQ_STT_MODEL,
    GROQ_TTS_MODEL_AR,
    GROQ_TTS_MODEL_EN,
)
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.groq")
T = TypeVar("T")


def _configured_keys() -> list[str]:
    """Return deduplicated keys without ever logging or exposing their values."""
    candidates: list[str] = []
    for raw in (GROQ_API_KEYS, os.getenv("GROQ_API_KEYS", "")):
        candidates.extend(re.split(r"[,;\r\n]+", raw or ""))
    candidates.extend(
        [
            os.getenv("GROQ_API_KEY", GROQ_API_KEY),
            os.getenv("GROQ_API_KEY_2", GROQ_API_KEY_2),
        ]
    )
    keys: list[str] = []
    for value in candidates:
        key = value.strip()
        if key and key not in keys:
            keys.append(key)
    return keys


class GroqKeyPool:
    """Thread-safe round-robin key pool used for retries and later requests."""

    def __init__(self, keys: list[str] | None = None) -> None:
        self._keys = list(keys if keys is not None else _configured_keys())
        self._index = 0
        self._lock = threading.Lock()

    @property
    def count(self) -> int:
        return len(self._keys)

    def ordered(self) -> list[tuple[int, str]]:
        with self._lock:
            if not self._keys:
                return []
            return [
                ((self._index + offset) % len(self._keys), self._keys[(self._index + offset) % len(self._keys)])
                for offset in range(len(self._keys))
            ]

    def prefer(self, index: int) -> None:
        with self._lock:
            if self._keys:
                self._index = index % len(self._keys)

    def advance_after(self, index: int) -> None:
        with self._lock:
            if self._keys:
                self._index = (index + 1) % len(self._keys)


class GroqProvider(AIProvider):
    """Low-latency supporting provider for chat, translation, STT, and EN/AR TTS."""

    base_url = "https://api.groq.com/openai/v1"

    def __init__(self, keys: list[str] | None = None) -> None:
        self.keys = GroqKeyPool(keys)
        self.chat_model = os.getenv("GROQ_CHAT_MODEL", GROQ_CHAT_MODEL)
        self.stt_model = os.getenv("GROQ_STT_MODEL", GROQ_STT_MODEL)
        self.tts_model_en = os.getenv("GROQ_TTS_MODEL_EN", GROQ_TTS_MODEL_EN)
        self.tts_model_ar = os.getenv("GROQ_TTS_MODEL_AR", GROQ_TTS_MODEL_AR)
        self._offline = OfflineFaqProvider()
        self._last_call_mocked = self.keys.count == 0

    @property
    def name(self) -> str:
        return "groq"

    @property
    def is_mocked(self) -> bool:
        return self._last_call_mocked

    def detect_language(self, text: str) -> Language:
        return self._offline.detect_language(text)

    def _with_rotation(self, call: Callable[[str], T]) -> T:
        attempts = self.keys.ordered()
        if not attempts:
            raise RuntimeError("Groq is not configured")
        last_error: Exception | None = None
        for index, key in attempts:
            try:
                result = call(key)
                self.keys.prefer(index)
                self._last_call_mocked = False
                return result
            except httpx.HTTPStatusError as exc:
                last_error = exc
                code = exc.response.status_code
                if code not in {401, 403, 408, 409, 429} and code < 500:
                    raise
                self.keys.advance_after(index)
                logger.warning("Groq request failed with status %s; trying configured fallback", code)
            except (httpx.TimeoutException, httpx.TransportError) as exc:
                last_error = exc
                self.keys.advance_after(index)
                logger.warning("Groq request unavailable; trying configured fallback")
        self._last_call_mocked = True
        raise RuntimeError("All configured Groq credentials are unavailable") from last_error

    def _post_json(self, path: str, payload: dict[str, Any]) -> dict[str, Any]:
        def request(key: str) -> dict[str, Any]:
            with httpx.Client(timeout=20.0) as client:
                response = client.post(
                    f"{self.base_url}{path}",
                    headers={"Authorization": f"Bearer {key}"},
                    json=payload,
                )
                response.raise_for_status()
                value = response.json()
                return value if isinstance(value, dict) else {}

        return self._with_rotation(request)

    def _chat(self, system: str, user: str) -> str:
        models = [self.chat_model]
        if "qwen/qwen3.8-27b" not in models:
            models.append("qwen/qwen3.8-27b")
        if "openai/gpt-oss-120b" not in models:
            models.append("openai/gpt-oss-120b")

        for model in models:
            try:
                response = self._post_json(
                    "/chat/completions",
                    {
                        "model": model,
                        "messages": [
                            {"role": "system", "content": system},
                            {"role": "user", "content": user},
                        ],
                        "temperature": 0.1,
                        "max_tokens": 800,
                    },
                )
                choices = response.get("choices", [])
                if isinstance(choices, list) and choices:
                    message = choices[0].get("message", {})
                    content = str(message.get("content", "")).strip()
                    if content:
                        self.chat_model = model
                        return content
            except Exception as exc:
                logger.warning("Groq model %s unavailable (%s); checking next model", model, type(exc).__name__)
                continue
        return ""

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        context = "\n\n".join(f"[{item.heading}]\n{item.text}" for item in context_chunks)
        language_name = {
            Language.AM: "Amharic",
            Language.OM: "Afaan Oromo",
            Language.TI: "Tigrinya",
            Language.AR: "Arabic",
            Language.EN: "English",
        }[language]
        try:
            answer = self._chat(
                (
                    "You are an accessibility assistant. Answer only from the supplied "
                    "platform content. Never invent facts or actions. If the content does "
                    "not support an answer, say so. Use short plain sentences."
                ),
                (
                    f"Reply in {language_name}. "
                    f"{'Use extra-simple wording. ' if simple_mode else ''}"
                    f"Platform content:\n{context}\n\nQuestion:\n{question}"
                ),
            )
            if answer:
                return answer
        except Exception as exc:
            logger.warning("Groq answer generation unavailable: %s", type(exc).__name__)
        self._last_call_mocked = True
        return self._offline.generate_answer(question, context_chunks, language, simple_mode)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        if source_lang == target_lang:
            self._last_call_mocked = False
            return text
        try:
            translated = self._chat(
                "Translate accurately. Preserve names and meaning. Return only the translation.",
                f"Translate from {source_lang} to {target_lang}:\n{text}",
            )
            if translated:
                return translated
        except Exception as exc:
            logger.warning("Groq translation unavailable: %s", type(exc).__name__)
        self._last_call_mocked = True
        return self._offline.translate(text, source_lang, target_lang)

    def transcribe(
        self,
        audio_bytes: bytes,
        media_type: str,
        language: Language,
        retain: bool = False,
    ) -> str:
        del retain
        if not audio_bytes:
            self._last_call_mocked = True
            return self._offline.transcribe(audio_bytes, media_type, language, False)

        extension = {
            "audio/ogg": "ogg",
            "audio/wav": "wav",
            "audio/mpeg": "mp3",
        }.get(media_type, "webm")

        def request(key: str) -> str:
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    f"{self.base_url}/audio/transcriptions",
                    headers={"Authorization": f"Bearer {key}"},
                    data={"model": self.stt_model, "response_format": "json"},
                    files={"file": (f"voice.{extension}", audio_bytes, media_type)},
                )
                response.raise_for_status()
                return str(response.json().get("text", "")).strip()

        try:
            transcript = self._with_rotation(request)
            if transcript:
                return transcript
        except Exception as exc:
            logger.warning("Groq transcription unavailable: %s", type(exc).__name__)
        self._last_call_mocked = True
        return self._offline.transcribe(audio_bytes, media_type, language, False)

    def synthesize(
        self, text: str, language: Language, speed: float = 1.0, style: str | None = None
    ) -> str:
        if language not in (Language.EN, Language.AR):
            self._last_call_mocked = True
            return self._offline.synthesize(text, language, speed, style)
        model = self.tts_model_ar if language == Language.AR else self.tts_model_en

        def request(key: str) -> bytes:
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    f"{self.base_url}/audio/speech",
                    headers={"Authorization": f"Bearer {key}"},
                    json={
                        "model": model,
                        "input": text,
                        "voice": "default",
                        "response_format": "wav",
                        "speed": speed,
                    },
                )
                response.raise_for_status()
                return response.content

        try:
            audio = self._with_rotation(request)
            if audio:
                encoded = base64.b64encode(audio).decode("ascii")
                return f"data:audio/wav;base64,{encoded}"
        except Exception as exc:
            logger.warning("Groq speech synthesis unavailable: %s", type(exc).__name__)
        self._last_call_mocked = True
        return self._offline.synthesize(text, language, speed, style)
