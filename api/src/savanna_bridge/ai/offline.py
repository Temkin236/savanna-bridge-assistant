"""Offline FAQ and extractive answer provider. Zero internet required."""

from __future__ import annotations

import re

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.models import Language


class OfflineFaqProvider(AIProvider):
    """Local, offline, zero-network rule and extractive QA provider."""

    @property
    def name(self) -> str:
        return "offline"

    @property
    def is_mocked(self) -> bool:
        return False

    def detect_language(self, text: str) -> Language:
        clean = text.strip()
        # Ethiopic script check
        if re.search(r"[\u1200-\u137F]", clean):
            # Check for Tigrinya specific letters / vocabulary
            if any(w in clean for w in ["እንታይ", "ከመይ", "ትምህርቲ"]):
                return Language.TI
            return Language.AM

        # Latin script: check for Afaan Oromo words
        lower = clean.lower()
        oromo_words = ["maal", "akkam", "barumsa", "akkasumas", "waan", "eessatti"]
        if any(w in lower for w in oromo_words):
            return Language.OM

        return Language.EN

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        from savanna_bridge.language import LanguageGuard
        return LanguageGuard.translate(text, source_lang, target_lang)

    def _simplify_text(self, text: str, language: Language) -> str:
        """Simple mode: rewrite answer in short, plain sentences."""
        sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", text) if s.strip()]
        short_sentences = []
        for s in sentences:
            words = s.split()
            if len(words) > 12:
                short_sentences.append(" ".join(words[:12]) + ".")
            else:
                short_sentences.append(s)
        res = " ".join(short_sentences[:2]) if short_sentences else text
        return res

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        if not context_chunks:
            from savanna_bridge.language import LanguageGuard
            msg_en = "I cannot verify that from the course materials. A human mentor can help you directly."
            if language == Language.EN:
                return msg_en
            return LanguageGuard.translate(msg_en, "en", language.value)

        # Prefer chunk that matches question terms and requested language
        q_tokens = [w.lower() for w in re.findall(r"[\w\u1200-\u137F]+", question)]
        best_chunk = None
        best_count = -1
        for c in context_chunks:
            count = sum(1 for tok in q_tokens if tok in c.heading.lower() or tok in c.text.lower())
            if getattr(c, "language", "en") == language.value:
                count += 5
            if count > best_count:
                best_count = count
                best_chunk = c
        matched_chunk = best_chunk or context_chunks[0]

        # Extract answer text from actual platform content
        raw_text = matched_chunk.text
        sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", raw_text) if s.strip()]
        
        # Pick sentences matching question keywords
        q_words = [w.lower() for w in re.findall(r"\w+", question) if len(w) > 3]
        relevant_sentences = [
            s for s in sentences if any(qw in s.lower() for qw in q_words)
        ]
        if relevant_sentences:
            base_answer = " ".join(relevant_sentences[:3])
        else:
            base_answer = " ".join(sentences[:3]) if sentences else raw_text

        # Translate if content language does not match learner's requested language
        from savanna_bridge.language import LanguageGuard
        chunk_lang = getattr(matched_chunk, "language", "en")
        if chunk_lang != language.value:
            base_answer = LanguageGuard.translate(base_answer, chunk_lang, language.value)

        if simple_mode:
            return self._simplify_text(base_answer, language)

        return base_answer

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        # Offline demo transcription
        if language == Language.AM:
            return "እባክዎን ስለ ሞጁል 2 ያብራሩልኝ።"
        elif language == Language.OM:
            return "Mee waa'ee moojulii 2 naaf ibsaa."
        elif language == Language.TI:
            return "ብዛዕባ ሞጁል 2 ግለጹለይ።"
        return "Please explain Module 2."

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return "http://localhost:8000/media/tts/demo.ogg"
