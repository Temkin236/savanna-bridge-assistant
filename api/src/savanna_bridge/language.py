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
    _OROMO_TOKENS = {"akkam", "maal", "eessa", "barnoota", "gaaffii", "deebii", "galatoomi", "ani"}
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
