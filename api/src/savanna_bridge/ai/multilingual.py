"""Language-aware resilient routing across Addis AI, Google, Groq, and offline."""

from __future__ import annotations

from adapters.base import ContentChunk
from savanna_bridge.ai.addis import AddisAiProvider
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.cloud import CloudProvider
from savanna_bridge.ai.groq import GroqProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language


class MultilingualProvider(AIProvider):
    """Route Ethiopian languages to Addis AI and Arabic to Google."""

    def __init__(self) -> None:
        self.addis = AddisAiProvider()
        self.google = CloudProvider()
        self.groq = GroqProvider()
        self.offline = OfflineFaqProvider()
        self._active: AIProvider = self.offline

    @property
    def name(self) -> str:
        return f"auto/{self._active.name}"

    @property
    def is_mocked(self) -> bool:
        return self._active.is_mocked if self._active is not self.offline else True

    def _providers_for_language(self, language: Language, capability: str) -> list[AIProvider]:
        """Return ordered providers; every method still falls back deterministically."""
        if language in (Language.AM, Language.OM, Language.TI):
            # Groq STT is multilingual, but its documented TTS voices are EN/AR.
            if capability == "synthesize":
                return [self.addis, self.google]
            return [self.groq, self.addis, self.google]
        if language == Language.AR:
            return [self.groq, self.google]
        return [self.groq, self.google]

    def _run_chain(self, providers: list[AIProvider], operation: str, *args: object) -> str:
        """Use the first real result; retain the primary provider's labelled fallback."""
        first_result = ""
        primary = providers[0] if providers else self.offline
        for provider in providers:
            method = getattr(provider, operation)
            result = method(*args)
            if not first_result and result:
                first_result = result
            if result and not provider.is_mocked:
                self._active = provider
                return result
        self._active = primary
        if first_result:
            return first_result
        fallback = getattr(self.offline, operation)(*args)
        self._active = self.offline
        return fallback

    def detect_language(self, text: str) -> Language:
        return self.offline.detect_language(text)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        target = Language(target_lang) if target_lang in {item.value for item in Language} else Language.EN
        if {source_lang, target_lang} & {"am", "om", "ti"}:
            providers = [self.groq, self.addis, self.google]
        elif "ar" in (source_lang, target_lang):
            providers = [self.groq, self.google]
        else:
            providers = self._providers_for_language(target, "translate")
        return self._run_chain(providers, "translate", text, source_lang, target_lang)

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        return self._run_chain(
            self._providers_for_language(language, "generate_answer"),
            "generate_answer",
            question,
            context_chunks,
            language,
            simple_mode,
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        return self._run_chain(
            self._providers_for_language(language, "transcribe"),
            "transcribe",
            audio_bytes,
            media_type,
            language,
            retain,
        )

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return self._run_chain(
            self._providers_for_language(language, "synthesize"),
            "synthesize",
            text,
            language,
            speed,
        )
