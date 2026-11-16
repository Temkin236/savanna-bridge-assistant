"""Language-aware provider routing for Addis AI and Google services."""

from __future__ import annotations

from adapters.base import ContentChunk
from savanna_bridge.ai.addis import AddisAiProvider
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.cloud import CloudProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language


class MultilingualProvider(AIProvider):
    """Route Ethiopian languages to Addis AI and Arabic to Google."""

    def __init__(self) -> None:
        self.addis = AddisAiProvider()
        self.google = CloudProvider()
        self.offline = OfflineFaqProvider()
        self._active: AIProvider = self.offline

    @property
    def name(self) -> str:
        return f"auto/{self._active.name}"

    @property
    def is_mocked(self) -> bool:
        return self._active.is_mocked if self._active is not self.offline else True

    def _for_language(self, language: Language) -> AIProvider:
        if language in (Language.AM, Language.OM, Language.TI):
            return self.addis
        if language == Language.AR:
            return self.google
        # English retrieval is deterministic and grounded locally. Cloud calls are
        # reserved for the languages that need them, avoiding latency and cost.
        return self.offline

    def detect_language(self, text: str) -> Language:
        return self.offline.detect_language(text)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        if "ar" in (source_lang, target_lang):
            self._active = self.google
        elif {source_lang, target_lang} & {"am", "om", "ti"}:
            self._active = self.addis
        else:
            self._active = self._for_language(Language(target_lang))
        return self._active.translate(text, source_lang, target_lang)

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        self._active = self._for_language(language)
        return self._active.generate_answer(question, context_chunks, language, simple_mode)

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        self._active = self._for_language(language)
        return self._active.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        self._active = self._for_language(language)
        return self._active.synthesize(text, language, speed)
