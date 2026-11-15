"""Addis AI provider integration using addisai SDK with offline fallback."""

from __future__ import annotations

import logging
from typing import Any

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.config import ADDIS_API_KEY, ADDIS_BASE_URL
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.addis")


class AddisAiProvider(AIProvider):
    """Addis AI cloud provider for Amharic, Afaan Oromo, Tigrinya, and English."""

    def __init__(self, api_key: str | None = None, base_url: str | None = None) -> None:
        self.api_key = api_key or ADDIS_API_KEY
        self.base_url = base_url or ADDIS_BASE_URL
        self._offline_fallback = OfflineFaqProvider()
        self._client: Any = None

        if self.api_key:
            try:
                from addisai import AddisAI

                self._client = AddisAI(api_key=self.api_key)
            except Exception as e:
                logger.warning(
                    "Failed to initialize AddisAI client: %s. Using offline fallback.", e
                )
                self._client = None

    @property
    def name(self) -> str:
        return "addis"

    @property
    def is_mocked(self) -> bool:
        return self._client is None

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate_direct(self, text: str, source_lang: str, target_lang: str) -> str:
        """Call Addis AI translation directly for local Ethiopian languages."""
        if not text or not text.strip():
            return text
        src = (source_lang or "en").lower().split("-")[0].strip()
        tgt = (target_lang or "en").lower().split("-")[0].strip()
        if src == tgt:
            return text

        if self._client and src in ("am", "om", "ti", "en") and tgt in ("am", "om", "ti", "en"):
            try:
                res = self._client.translate.create(
                    text=text,
                    source=src,
                    target=tgt,
                )
                if isinstance(res, dict):
                    translated = res.get("text") or res.get("translation")
                    if translated and str(translated).strip():
                        return str(translated).strip()
                elif hasattr(res, "text") and res.text:
                    return str(res.text).strip()
            except Exception as e:
                logger.warning("AddisAI translate call failed: %s", e)
        return ""

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text using Addis AI for local languages, delegating English/Arabic to Gemini."""
        if not text or not text.strip():
            return text
        src = (source_lang or "en").lower().split("-")[0].strip()
        tgt = (target_lang or "en").lower().split("-")[0].strip()
        if src == tgt:
            return text

        # If English <-> Arabic, route to Gemini
        if src in ("en", "ar") and tgt in ("en", "ar"):
            from savanna_bridge.ai.cloud import CloudProvider

            return CloudProvider().translate(text, src, tgt)

        # For local languages, call Addis AI
        direct = self.translate_direct(text, src, tgt)
        if direct:
            return direct

        return text

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        if not context_chunks:
            return self._offline_fallback.generate_answer(
                question, context_chunks, language, simple_mode
            )

        context_text = "\n\n".join([f"[{c.heading}]: {c.text}" for c in context_chunks])
        system_prompt = (
            "You are a helpful and accurate learning assistant for Savanna Bridge. "
            "Answer the question using ONLY the provided course content. "
            "If the question cannot be answered from the content, say you do not know. "
            "Do not invent facts or cite outside knowledge. "
        )
        if simple_mode:
            system_prompt += "Write your answer in plain, short sentences using simple words."

        if self._client:
            try:
                chat_lang = language.value
                messages = [
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user",
                        "content": f"Course Context:\n{context_text}\n\nQuestion: {question}",
                    },
                ]
                res = self._client.chat.create(
                    messages=messages,
                    language=chat_lang,
                )
                answer_content = res.choices[0].message.content
                if answer_content:
                    return answer_content.strip()
            except Exception as e:
                logger.warning("AddisAI chat call failed: %s. Falling back to offline FAQ.", e)

        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        if self._client and audio_bytes:
            try:
                res = self._client.speech.transcribe(
                    audio=audio_bytes,
                    language=language.value,
                )
                if isinstance(res, dict):
                    transcript = res.get("transcript") or res.get("text") or ""
                else:
                    transcript = getattr(res, "transcript", "")
                if transcript:
                    return transcript.strip()
            except Exception as e:
                logger.warning("AddisAI transcription failed: %s", e)
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        if self._client:
            try:
                from addisai import DEFAULT_VOICES
                voice_id = DEFAULT_VOICES.get(language.value, DEFAULT_VOICES.get("am", "am-hamen"))
                clip = self._client.voice.generate(
                    voice_id=voice_id,
                    text=text[:1000],
                    language=language.value,
                )
                if clip and hasattr(clip, "content") and clip.content:
                    import uuid
                    from pathlib import Path
                    clip_id = f"addis_{uuid.uuid4().hex[:8]}.mp3"
                    tts_dir = Path("/data/tts")
                    tts_dir.mkdir(parents=True, exist_ok=True)
                    (tts_dir / clip_id).write_bytes(clip.content)
                    return f"/media/tts/{clip_id}"
            except Exception as e:
                logger.warning("AddisAI voice generation failed: %s", e)
        return self._offline_fallback.synthesize(text, language, speed)
