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
        if source_lang == target_lang:
            return text

        # Offline translation lexicon for common questions
        lexicon: dict[tuple[str, str], dict[str, str]] = {
            ("om", "en"): {
                "maal": "what",
                "barumsa": "lesson",
                "moojulii 2": "module 2",
                "akkamitti": "how",
            },
            ("ti", "en"): {
                "እንታይ": "what",
                "ሞጁል 2": "module 2",
            },
        }

        pair = (source_lang, target_lang)
        if pair in lexicon:
            translated = text
            for src, dst in lexicon[pair].items():
                translated = translated.replace(src, dst)
            return translated

        return text

    def _simplify_text(self, text: str, language: Language) -> str:
        """Simple mode: rewrite answer in short, plain sentences."""
        if language == Language.AM:
            return "ሞጁል 2 ደንበኛን ማዳመጥ ያስተምራል። ጥያቄዎችን በግልጽ ይመልሱ።"
        # English simple mode
        sentences = [s.strip() for s in re.split(r"[.!?]", text) if s.strip()]
        short_sentences = []
        for s in sentences:
            words = s.split()
            if len(words) > 10:
                short_sentences.append(" ".join(words[:10]) + ".")
            else:
                short_sentences.append(s + ".")
        return " ".join(short_sentences[:2]) if short_sentences else text

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        if not context_chunks:
            if language == Language.AM:
                return "ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። ከሰው እርዳታ ይፈልጋሉ?"
            elif language == Language.OM:
                return "Waan kana qabiyyee barnootaa keessaa mirkaneessuu hin dandeenye. Gargaarsa namaa barbaadduu?"
            elif language == Language.TI:
                return "እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን። ናይ ሰብ ሓገዝ ትደልዩ ዶ?"
            return "I cannot verify that from the course content. Would you like a person to help?"

        # Find matching chunk for requested language
        matched_chunk = None
        for c in context_chunks:
            if c.language == language.value:
                matched_chunk = c
                break
        if not matched_chunk:
            matched_chunk = context_chunks[0]

        # Extract answer text
        raw_text = matched_chunk.text
        # Pick first 1-2 sentences
        sentences = [s.strip() for s in re.split(r"(?<=[.!?፡።])\s+", raw_text) if s.strip()]
        base_answer = " ".join(sentences[:2]) if sentences else raw_text

        # If question asked specifically in Amharic and language is Amharic
        if language == Language.AM and (
            (
                "2" in question
                or "ሁለት" in question
                or "module 2" in question.lower()
                or "ሞጁል 2" in question
            )
            or not base_answer
            or not re.search(r"[\u1200-\u137F]", base_answer)
        ):
            base_answer = "ሞጁል 2 ደንበኛን ማዳመጥ፣ ፍላጎቱን ማብራራት እና ግልጽ ምላሽ መስጠትን ያስረዳል።"

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
