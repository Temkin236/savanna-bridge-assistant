"""Ollama local model provider."""

from __future__ import annotations

import logging

import httpx

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.config import OLLAMA_HOST, OLLAMA_MODEL
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.ollama")


class OllamaProvider(AIProvider):
    """Local open-source model driver via Ollama."""

    def __init__(self, host: str | None = None, model: str | None = None) -> None:
        self.host = (host or OLLAMA_HOST).rstrip("/")
        self.model = model or OLLAMA_MODEL
        self._offline_fallback = OfflineFaqProvider()

    @property
    def name(self) -> str:
        return "ollama"

    @property
    def is_mocked(self) -> bool:
        return False

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        return self._offline_fallback.translate(text, source_lang, target_lang)

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
        prompt = (
            f"You are the Savanna Bridge Assistant. Answer the question using ONLY the provided course content.\n"
            f"If unsure, say you do not know. Target language: {language.value}.\n"
        )
        if simple_mode:
            prompt += "Use simple words and short sentences.\n"
        prompt += f"\nContext:\n{context_text}\n\nQuestion: {question}\n\nAnswer:"

        try:
            with httpx.Client(timeout=14.0) as client:
                res = client.post(
                    f"{self.host}/api/generate",
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "stream": False,
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    response_text = data.get("response", "").strip()
                    if response_text:
                        return response_text
        except Exception as e:
            logger.warning("Ollama call failed or timed out: %s. Using offline FAQ.", e)

        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return self._offline_fallback.synthesize(text, language, speed)
