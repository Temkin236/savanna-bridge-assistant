"""Centralized Language Registry and LanguageGuard for Savanna Bridge Assistant.

Provides language definitions, directionality, capability flags, language detection,
Ethiopian phone number normalization, and localized formatting.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Literal


@dataclass(frozen=True)
class LanguageMetadata:
    code: str
    display_name: str
    native_name: str
    direction: Literal["ltr", "rtl"]
    supports_stt: bool
    supports_tts: bool
    fallback_code: str
    ethiopic_script: bool = False


class LanguageRegistry:
    """Central registry of supported languages and their capabilities."""

    _LANGUAGES: dict[str, LanguageMetadata] = {
        "am": LanguageMetadata(
            code="am",
            display_name="Amharic",
            native_name="አማርኛ",
            direction="ltr",
            supports_stt=True,
            supports_tts=True,
            fallback_code="en",
            ethiopic_script=True,
        ),
        "en": LanguageMetadata(
            code="en",
            display_name="English",
            native_name="English",
            direction="ltr",
            supports_stt=True,
            supports_tts=True,
            fallback_code="en",
            ethiopic_script=False,
        ),
        "om": LanguageMetadata(
            code="om",
            display_name="Afaan Oromo",
            native_name="Afaan Oromoo",
            direction="ltr",
            supports_stt=True,
            supports_tts=True,
            fallback_code="en",
            ethiopic_script=False,
        ),
        "ti": LanguageMetadata(
            code="ti",
            display_name="Tigrinya",
            native_name="ትግርኛ",
            direction="ltr",
            supports_stt=False,
            supports_tts=False,
            fallback_code="am",
            ethiopic_script=True,
        ),
        "so": LanguageMetadata(
            code="so",
            display_name="Somali",
            native_name="Soomaali",
            direction="ltr",
            supports_stt=False,
            supports_tts=False,
            fallback_code="en",
            ethiopic_script=False,
        ),
        "ar": LanguageMetadata(
            code="ar",
            display_name="Arabic",
            native_name="العربية",
            direction="rtl",
            supports_stt=True,
            supports_tts=True,
            fallback_code="en",
            ethiopic_script=False,
        ),
    }

    @classmethod
    def get(cls, code: str) -> LanguageMetadata:
        """Get metadata for a language code, falling back to English if unknown."""
        normalized = (code or "en").lower().split("-")[0].strip()
        return cls._LANGUAGES.get(normalized, cls._LANGUAGES["en"])

    @classmethod
    def is_supported(cls, code: str) -> bool:
        normalized = (code or "").lower().split("-")[0].strip()
        return normalized in cls._LANGUAGES

    @classmethod
    def all_languages(cls) -> list[LanguageMetadata]:
        return list(cls._LANGUAGES.values())

    @classmethod
    def is_rtl(cls, code: str) -> bool:
        return cls.get(code).direction == "rtl"


class LanguageGuard:
    """Detection, sanitization, and Ethiopian format normalizers."""

    _ARABIC_RE = re.compile(r"[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]")
    _ETHIOPIC_RE = re.compile(r"[\u1200-\u137F]")

    # Common Afaan Oromo tokens
    _OROMO_TOKENS = {
        "akkam", "maal", "eessa", "barnoota", "gaaffii", "deebii", "galatoomi", "ani",
        "koorsiin", "kun", "waa'ee", "naaf", "ibsi", "dubbisi", "gabaabsi", "fuula",
        "barumsa", "akkasumas", "waan", "eessatti", "namoota", "tajaajila", "qabiyyee",
        "dandeettii", "qabxiilee", "kaayyolee", "ijoo", "salphaadhaan"
    }
    # Common Somali tokens
    _SOMALI_TOKENS = {"sidee", "maxay", "waxbarasho", "su'aal", "mahadsanid", "koorsada"}

    @classmethod
    def detect_language(cls, text: str, default: str = "en") -> str:
        """Heuristically identify the language of a text snippet."""
        if not text or not text.strip():
            return default

        # Arabic script check
        if cls._ARABIC_RE.search(text):
            return "ar"

        # Ethiopic script check (Amharic / Tigrinya)
        if cls._ETHIOPIC_RE.search(text):
            # Check for specific Tigrinya markers like 'እቲ', 'ናይ', 'እንታይ'
            tigrinya_markers = {"ናይ", "እንታይ", "እቲ", "እዚ", "ከመይ"}
            words = set(text.split())
            if words.intersection(tigrinya_markers):
                return "ti"
            return "am"

        # Latin-based African language tokens
        words_lower = set(re.findall(r"\w+", text.lower()))
        if words_lower.intersection(cls._OROMO_TOKENS):
            return "om"
        if words_lower.intersection(cls._SOMALI_TOKENS):
            return "so"

        return default

    @classmethod
    def detect_language_with_confidence(
        cls, text: str, default: str = "en"
    ) -> tuple[str, float]:
        """Detect a supported language and expose confidence for safe turn switching.

        Short commands such as "send" and "yes" intentionally keep the current
        language with low confidence. Script-specific sentences can switch with
        high confidence without making the learner repeat a preference.
        """
        clean = (text or "").strip()
        if not clean:
            return default, 0.0
        if cls._ARABIC_RE.search(clean):
            return "ar", 0.99
        if cls._ETHIOPIC_RE.search(clean):
            words = set(clean.split())
            tigrinya_markers = {
                "ናይ", "እንታይ", "እቲ", "እዚ", "ከመይ", "ኣሎ", "ትምህርቲ"
            }
            if words.intersection(tigrinya_markers):
                return "ti", 0.94
            return "am", 0.92

        words = re.findall(r"[A-Za-z']+", clean.lower())
        word_set = set(words)
        oromo_hits = len(word_set.intersection(cls._OROMO_TOKENS))
        if oromo_hits:
            confidence = min(0.98, 0.78 + (0.07 * oromo_hits))
            return "om", confidence
        if len(words) >= 3:
            return "en", 0.9
        if len(words) == 2:
            return default, 0.68
        return default, 0.45

    @classmethod
    def is_read_aloud_query(cls, text: str) -> bool:
        """Check if learner is requesting to read the page, lesson, or paragraph aloud."""
        q = (text or "").lower().strip()
        triggers = [
            "read this page", "read this lesson", "read this paragraph", "read aloud",
            "read for me", "read the page", "read out loud", "read page",
            "read the content", "read content", "read this", "read it",
            "tell me what content is", "tell me what the content is", "what content is",
            "read line by line", "line by line", "read out", "read to me",
            "read page content", "read aloud the page", "read aloud the content",
            "አንብብልኝ", "ገጹን አንብብልኝ", "ይህንን ገጽ አንብብልኝ", "ትምህርቱን አንብብልኝ", "ጮክ ብለህ አንብብ", "አንብብ",
            "ይዘቱን አንብብልኝ", "ይዘቱን አንብብ", "በመስመር አንብብልኝ", "ይዘቱ ምን እንደሆነ አንብብልኝ",
            "dubbisi", "naaf dubbisi", "fuula kana naaf dubbisi", "sagaleedhaan dubbisi",
            "qabiyyee naaf dubbisi", "sararaa sararaan naaf dubbisi", "fuula kana dubbisi",
            "اقرأ هذه الصفحة", "اقرأ لي هذا الدرس", "اقرأ لي", "اقرأ بصوت عال", "اقرأ هذه الفقرة", "اقرأ الصفحة",
            "اقرأ المحتوى", "اقرأ لي المحتوى", "اقرأ سطراً بسطر", "ما هو المحتوى على هذه الصفحة اقرأه لي",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_summary_query(cls, text: str) -> bool:
        """Check if learner is requesting a summary of the current page or topic."""
        q = (text or "").lower()
        triggers = [
            "summarize", "summary", "main points", "key takeaways", "overview of this page",
            "አጠቃልል", "ማጠቃለያ", "ዋና ዋና ነጥቦች", "ዋና ነጥቦች",
            "gabaabsi", "gabaabsii", "qabxiilee ijoo", "qabxiiwwan ijoo",
            "لخص", "تلخيص", "النقاط الرئيسية", "أهم النقاط", "ملخص",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_simplify_query(cls, text: str) -> bool:
        """Check if learner is requesting simple words or simplified explanation."""
        q = (text or "").lower()
        triggers = [
            "simple words", "simplify", "simpler", "in plain terms", "easy explanation",
            "በቀላል ቃላት", "ቀለል አድርገህ", "ቀላል ማብራሪያ", "ቀለል አድርግልኝ",
            "salphaadhaan", "jechoota salphaadhaan", "naaf salphisi", "ibsa salphaa",
            "بكلمات بسيطة", "بشكل مبسط", "بسيط", "اشرح ببساطة", "سهل",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_example_query(cls, text: str) -> bool:
        """Check if learner is asking for examples or practical application."""
        q = (text or "").lower()
        triggers = [
            "example", "examples", "practical example", "with examples", "give me examples",
            "explain with examples", "show an example", "concrete example",
            "በምሳሌ", "ምሳሌ", "ምሳሌዎች", "በምሳሌ አስረዳኝ", "ምሳሌ ስጠኝ", "ምሳሌዎችን አሳየኝ",
            "fakkeenya", "fakkeenyota", "fakkeenyaan", "fakkeenyotaan naaf ibsi", "fakkeenya naaf kenni",
            "مثال", "أمثلة", "اشرح بالأمثلة", "أعطني مثالا", "مع أمثلة", "مثال عملي",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_prerequisite_query(cls, text: str) -> bool:
        """Check if learner is asking what to understand before moving to the next lesson."""
        q = (text or "").lower()
        triggers = [
            "before moving to the next lesson", "before moving", "next lesson", "before the next lesson",
            "prerequisite", "prerequisites", "what should i understand before", "what do i need before",
            "ready for next lesson", "before advancing",
            "ወደ ቀጣዩ ትምህርት ከመሄዴ በፊት", "ቀጣዩ ትምህርት", "ቅድመ ሁኔታ", "ምን ማወቅ አለብኝ", "ከመቀጠሌ በፊት",
            "barnoota itti aanuuf", "barnoota itti aanutti darbuun dura", "maal beekuun qaba", "dura maal beekuu qaba",
            "قبل الانتقال للدرس التالي", "الدرس التالي", "المتطلبات", "ماذا يجب أن أفهم قبل", "قبل المتابعة",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_quiz_query(cls, text: str) -> bool:
        """Check if learner is asking to be quizzed or tested on the material."""
        q = (text or "").lower()
        triggers = [
            "quiz", "quiz me", "test me", "test my understanding", "check my knowledge",
            "ask me questions", "practice questions", "knowledge check",
            "ፈትነኝ", "ጥያቄ ጠይቀኝ", "ግንዛቤዬን ፈትነኝ", "ጥያቄዎች ጠይቀኝ", "ፈተና",
            "na qori", "hubannoo koo na qori", "gaaffii na gaafadhu", "qormaata",
            "اختبرني", "اختبر فهمي", "اسألني سؤالاً", "اطرح علي أسئلة", "اختبار قصير",
        ]
        return any(t in q for t in triggers)

    @classmethod
    def is_page_overview_query(cls, text: str) -> bool:
        """Check if learner is asking what the course, lesson, or page is about."""
        q = (text or "").lower().strip()
        if cls.is_example_query(text) or cls.is_prerequisite_query(text) or cls.is_quiz_query(text):
            return True
        triggers = [
            "what is this course about", "what is this page about", "what is this lesson about",
            "what is the course about", "what is the lesson about", "what is the page about",
            "what is this about", "what is this course", "what is this lesson", "what is this page",
            "what is the course", "tell me about the course", "tell me about this course",
            "tell me about course", "tell me about the lesson", "tell me about this lesson",
            "tell me about the page", "tell me about this page", "tell me about the content",
            "tell me about this content", "tell me about content",
            "explain this lesson", "explain the lesson", "explain lesson",
            "explain this course", "explain the course", "explain course",
            "explain to me the content", "explain the content", "explain content", "explain to me",
            "what am i supposed to learn here", "what am i supposed to learn",
            "what do we learn", "what do i learn", "what does this lesson teach", "what does this course teach",
            "what is this topic about", "explain this topic", "tell me about this topic",
            "what is this concept about", "tell me about this concept",
            "everyting", "everything", "tell me everything", "explain everything", "explain all",
            "all of it", "all content", "whole lesson", "walk me through this", "walk me through the lesson",
            "overview of this course", "overview of the course", "course overview", "lesson overview", "page overview",
            # Amharic triggers
            "ይህ ኮርስ ስለ ምንድን ነው", "ኮርሱ ስለ ምንድን ነው", "ስለ ምን ያስተምራል", "ስለ ኮርሱ ንገረኝ",
            "ስለ ኮርሱ አብራራልኝ", "ስለ ኮርሱ አስረዳኝ", "ይዘቱን አብራራልኝ", "ይዘቱን አስረዳኝ", "ይዘቱን ንገረኝ",
            "ስለ ይዘቱ አብራራልኝ", "ስለ ይዘቱ አስረዳኝ", "ስለ ይዘቱ ንገረኝ", "ስለዚህ ኮርስ ንገረኝ",
            "ይህን ትምህርት አስረዳኝ", "ይህንን ትምህርት አብራራልኝ", "ትምህርቱን አስረዳኝ", "ትምህርቱን አብራራልኝ",
            "ይህንን ርዕስ አብራራልኝ", "ምን እማራለሁ", "ስለዚህ ትምህርት ንገረኝ", "ስለዚህ ገጽ ንገረኝ",
            # Afaan Oromo triggers
            "koorsiin kun waa'ee maalii ti", "koorsii kana naaf ibsi", "waa'ee koorsii natti himi",
            "waa'ee koorsii naaf ibsi", "qabiyyee naaf ibsi", "waa'ee qabiyyee naaf ibsi",
            "naaf ibsi", "barnoota kana naaf ibsi", "barnoota kana natti himi", "maal baranna",
            "qabiyyeen barnootaa maali", "waa'ee barnoota kanaa natti himi",
            # Arabic triggers
            "ما موضوع هذه الدورة", "عن ماذا تتحدث هذه الدورة", "أخبرني عن الدورة", "حدثني عن الدورة",
            "اشرح لي هذه الدورة", "اشرح هذه الدورة", "اشرح لي المحتوى", "اشرح المحتوى",
            "ما هو المحتوى", "ما هي الدورة", "عن ماذا يتحدث المحتوى", "اشرح لي هذا الدرس",
            "ما الذي سأتعلمه هنا", "اشرح لي هذا الموضوع", "ما موضوع هذا الدرس", "عن ماذا يتحدث هذا الدرس",
        ]
        if any(t in q for t in triggers) or cls.is_summary_query(text) or cls.is_read_aloud_query(text):
            return True

        # Broad pattern: topic/course entity combined with explanatory request
        entities = ["course", "lesson", "page", "content", "topic", "module", "curriculum", "concept"]
        actions = ["tell", "explain", "about", "what is", "overview", "summary", "summarize", "teach", "learn", "understand"]
        has_entity = any(e in q for e in entities)
        has_action = any(a in q for a in actions)
        is_off_topic = any(off in q for off in ["football", "mars", "weather", "recipe", "pizza", "celebrity", "movie"])
        return has_entity and has_action and not is_off_topic

    @classmethod
    def normalize_ethiopian_phone(cls, phone: str) -> str:
        """Standardize Ethiopian mobile phone numbers (Ethio Telecom 09..., Safaricom 07...).

        Converts 09XXXXXXXX or 07XXXXXXXX to international +2519XXXXXXXX / +2517XXXXXXXX.
        """
        clean = re.sub(r"[\s\-\(\)\.]", "", phone.strip())
        if clean.startswith("09") and len(clean) == 10:
            return "+2519" + clean[2:]
        if clean.startswith("07") and len(clean) == 10:
            return "+2517" + clean[2:]
        if clean.startswith("251") and len(clean) == 12:
            return "+" + clean
        if clean.startswith("+251"):
            return clean
        return clean

    @classmethod
    def translate(cls, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text using Gemini for supported languages (om/ti translation labelled experimental)."""
        if not text or not text.strip():
            return text
        src = (source_lang or "en").lower().split("-")[0].strip()
        tgt = (target_lang or "en").lower().split("-")[0].strip()
        if src == tgt:
            return text

        try:
            from savanna_bridge.ai.cloud import CloudProvider

            cloud = CloudProvider()
            res = cloud.translate_direct(text, src, tgt)
            if res and res.strip() and res.strip() != text.strip():
                return res.strip()
        except Exception:
            pass

        # Return original text when translation is unchanged or provider is idle
        return text
