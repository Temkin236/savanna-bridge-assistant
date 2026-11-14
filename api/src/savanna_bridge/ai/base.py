"""Base class for AI providers."""

from __future__ import annotations

from abc import ABC, abstractmethod

from adapters.base import ContentChunk
from savanna_bridge.models import Language


class AIProvider(ABC):
    """Abstract interface for AI backend providers."""

    @property
    @abstractmethod
    def name(self) -> str: ...

    @property
    @abstractmethod
    def is_mocked(self) -> bool: ...

    @abstractmethod
    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        """Generate a grounded answer in the requested language."""
        ...

    @abstractmethod
    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text between languages."""
        ...

    @abstractmethod
    def detect_language(self, text: str) -> Language:
        """Detect language of user input."""
        ...

    @abstractmethod
    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        """Transcribe speech audio to text."""
        ...

    @abstractmethod
    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        """Synthesize text into speech; returns URL or path to audio."""
        ...
