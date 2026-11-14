"""Generic cloud AI provider."""

from __future__ import annotations

import logging

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.cloud")


class CloudProvider(AIProvider):
    """Generic Cloud AI provider fallback."""

    def __init__(self) -> None:
        self._offline_fallback = OfflineFaqProvider()

    @property
    def name(self) -> str:
        return "cloud"

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
        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return self._offline_fallback.synthesize(text, language, speed)
