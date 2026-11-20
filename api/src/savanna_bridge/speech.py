"""Rule-based text cleaner and speech utilities for Savanna Bridge Assistant.

Transforms text into natural spoken form for TTS, loading all localized strings
from i18n JSON files.
"""

from __future__ import annotations

import json
import logging
import re
from pathlib import Path
from typing import Any

logger = logging.getLogger("savanna_bridge.speech")

I18N_DIR = Path(__file__).resolve().parent / "i18n"
_LOCALES: dict[str, dict[str, Any]] = {}


def load_locale(lang_code: str) -> dict[str, Any]:
    """Load locale dictionary from JSON files, falling back to English."""
    norm = (lang_code or "en").lower().split("-")[0].strip()
    if norm in _LOCALES:
        return _LOCALES[norm]

    locale_path = I18N_DIR / f"{norm}.json"
    if not locale_path.exists():
        norm = "en"
        locale_path = I18N_DIR / "en.json"

    try:
        data = json.loads(locale_path.read_text(encoding="utf-8"))
        _LOCALES[norm] = data
        return data
    except Exception as exc:
        logger.warning("Failed to load locale %s: %s", norm, exc)
        return {}


ETHIOPIC_DIGIT_MAP = {
    "፩": 1, "፪": 2, "፫": 3, "፬": 4, "፭": 5,
    "፮": 6, "፯": 7, "፰": 8, "፱": 9, "፲": 10,
    "፳": 20, "፴": 30, "፵": 40, "፶": 50,
    "፷": 60, "፸": 70, "፹": 80, "፺": 90,
    "፻": 100, "፼": 10000,
}


def number_to_words(n: int, lang_code: str = "en") -> str:
    """Spell out an integer using localized words from i18n JSON files."""
    locale = load_locale(lang_code)
    norm = (lang_code or "en").lower().split("-")[0].strip()

    units: dict[int, str] = {int(k): v for k, v in locale.get("units", {}).items()}
    teens: dict[int, str] = {int(k): v for k, v in locale.get("teens", {}).items()}
    tens: dict[int, str] = {int(k): v for k, v in locale.get("tens", {}).items()}
    hundred_word: str = locale.get("hundred", "hundred")
    thousand_word: str = locale.get("thousand", "thousand")
    negative_word: str = locale.get("negative", "negative")

    if n < 0:
        return f"{negative_word} {number_to_words(-n, lang_code)}"
    if n in units:
        return units[n]
    if n in teens:
        return teens[n]
    if n < 100:
        ten_part = (n // 10) * 10
        rem = n % 10
        ten_str = tens.get(ten_part, "")
        if rem == 0:
            return ten_str
        if norm == "en":
            return f"{ten_str}-{units.get(rem, '')}"
        return f"{ten_str} {units.get(rem, '')}"
    if n < 1000:
        hundreds = n // 100
        rem = n % 100
        if norm == "am" and hundreds == 1:
            h_str = hundred_word
        else:
            h_str = f"{units.get(hundreds, str(hundreds))} {hundred_word}"
        if rem == 0:
            return h_str
        return f"{h_str} {number_to_words(rem, lang_code)}"
    if n < 1000000:
        thousands = n // 1000
        rem = n % 1000
        if norm == "am" and thousands == 1:
            t_str = f"{units.get(1, 'አንድ')} {thousand_word}"
        else:
            t_str = f"{number_to_words(thousands, lang_code)} {thousand_word}"
        if rem == 0:
            return t_str
        return f"{t_str} {number_to_words(rem, lang_code)}"
    return str(n)


def spell_out_numbers(text: str, lang_code: str) -> str:
    """Spell out numbers and Ethiopic numerals into spoken words."""
    norm = (lang_code or "en").lower().split("-")[0].strip()

    # Convert Ethiopic numerals
    for eth_char, val in ETHIOPIC_DIGIT_MAP.items():
        if eth_char in text:
            word = number_to_words(val, norm)
            text = text.replace(eth_char, word)

    # Convert Arabic/ASCII digits
    def _replace_digit(match: re.Match[str]) -> str:
        try:
            val = int(match.group(0))
            return number_to_words(val, norm)
        except Exception:
            return match.group(0)

    return re.sub(r"\b\d+\b", _replace_digit, text)


def transform_lists_to_ordinals(text: str, lang_code: str) -> str:
    """Replace bullet points and numbered lists with conversational spoken ordinals."""
    locale = load_locale(lang_code)
    ordinals: list[str] = locale.get("ordinals", ["First,", "Second,", "Third,"])
    final_ordinal: str = locale.get("final_ordinal", "Finally,")

    lines = text.split("\n")
    processed_lines: list[str] = []
    current_list: list[str] = []

    def flush_list(items: list[str]) -> list[str]:
        if not items:
            return []
        if len(items) == 1:
            return [items[0]]
        res: list[str] = []
        n = len(items)
        for i, item in enumerate(items):
            if i == n - 1:
                ord_prefix = final_ordinal
            elif i < len(ordinals):
                ord_prefix = ordinals[i]
            else:
                ord_prefix = ordinals[-1]
            res.append(f"{ord_prefix} {item}")
        return res

    list_pattern = re.compile(r"^\s*(?:[•\-\*]|\d+[\.\)]|\([0-9ivxlcdm]+\))\s+(.*)$", re.IGNORECASE)

    for line in lines:
        m = list_pattern.match(line)
        if m:
            clean_item = m.group(1).strip()
            if clean_item:
                current_list.append(clean_item)
        else:
            if current_list:
                processed_lines.extend(flush_list(current_list))
                current_list = []
            processed_lines.append(line)

    if current_list:
        processed_lines.extend(flush_list(current_list))

    return "\n".join(processed_lines)


def process_tables(text: str) -> str:
    """Transform markdown tables into natural spoken sentences."""
    lines = text.split("\n")
    processed: list[str] = []

    for line in lines:
        stripped = line.strip()
        # Check table divider row: |---|---|
        if re.match(r"^\|?[\s\-:|]+\|?$", stripped) and "-" in stripped:
            continue

        # Check table row: | a | b |
        if stripped.startswith("|") and stripped.endswith("|") and stripped.count("|") >= 2:
            cols = [c.strip() for c in stripped.strip("|").split("|") if c.strip()]
            if cols:
                processed.append(", ".join(cols) + ".")
            continue

        processed.append(line)

    return "\n".join(processed)


def normalize_punctuation(text: str, lang_code: str) -> str:
    """Normalize punctuation, ensuring proper Ethiopic marks for Amharic/Tigrinya."""
    norm = (lang_code or "en").lower().split("-")[0].strip()

    if norm in ("am", "ti"):
        # Convert trailing period to Ethiopic full stop
        text = re.sub(r"\.\s*(?=[A-Z\u1200-\u137F]|$)", "። ", text)
        text = re.sub(r",\s*", "፣ ", text)
        # Deduplicate punctuation
        text = re.sub(r"።+", "።", text)
        text = re.sub(r"፣+", "፣", text)
        text = re.sub(r"፤+", "፤", text)
        # Ensure spacing
        text = re.sub(r"([።፣፤፡])(?=[^\s\d])", r"\1 ", text)
    else:
        text = re.sub(r"\.+", ".", text)
        text = re.sub(r",+", ",", text)
        text = re.sub(r"([.!?,])(?=[^\s\d])", r"\1 ", text)

    return text


def split_sentences(text: str, lang_code: str) -> list[str]:
    """Split text into individual sentences based on language punctuation."""
    norm = (lang_code or "en").lower().split("-")[0].strip()
    if norm in ("am", "ti"):
        parts = re.split(r"(?<=[።!?])\s+", text)
    elif norm == "ar":
        parts = re.split(r"(?<=[.!?؟])\s+", text)
    else:
        parts = re.split(r"(?<=[.!?])\s+", text)

    return [p.strip() for p in parts if p.strip()]


def make_spoken(text: str, language: Any = "en") -> str:
    """Clean and transform text into a natural spoken version for TTS.

    Rules applied:
    1. Remove emoji and pictographs (all Unicode emoji ranges, variation selectors, ZWJ).
    2. Remove markdown (#, *, _, backticks, table pipes).
    3. Remove URLs and markdown links (keep link text).
    4. Remove [n] citation markers and 'Source:' lines.
    5. Replace bullets and numbered lists with spoken ordinals ('first', 'second', 'finally').
    6. Transform markdown tables into readable spoken text.
    7. Spell out numbers into words in the target language.
    8. Normalize Ethiopic punctuation for Amharic/Tigrinya.
    9. Keep only the first 3 sentences if the text is long, appending the localized 'read more' offer.
    10. Collapse whitespace.
    """
    if not text:
        return ""

    lang_code = getattr(language, "value", str(language)).lower()
    locale = load_locale(lang_code)

    cleaned = text

    # 1. Strip style instruction prefixes if present
    cleaned = re.sub(r"^Read this at [\d\.]+x speed[^\:]*:\s*", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"^Speak in [^:]+:\s*", "", cleaned, flags=re.IGNORECASE)

    # 2. Strip emoji & pictographs (all ranges, ZWJ, variation selectors)
    cleaned = re.sub(
        r"[\U00010000-\U0010ffff\u2600-\u26ff\u2700-\u27bf\u2300-\u23ff\u2b50-\u2b55\u200c-\u200d\ufe00-\ufe0f\u203c\u2049\u2139\u2194-\u21aa\u2934\u2935\u3030\u303d\u3297\u3299]",
        "",
        cleaned,
    )

    # 3. Strip 'Source:' lines
    cleaned = re.sub(r"(?im)^\s*(?:sources?|ምንጭ|maddi|መበቆል|المصدر)\s*[:፡].*$", "", cleaned)

    # 4. Remove [n] citation markers
    cleaned = re.sub(r"\[\d+\]", "", cleaned)
    cleaned = re.sub(r"\[citation[^\]]*\]", "", cleaned, flags=re.IGNORECASE)

    # 5. URLs: [text](url) -> text, and strip raw URLs
    cleaned = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", cleaned)
    cleaned = re.sub(r"https?://\S+", "", cleaned)
    cleaned = re.sub(r"www\.\S+", "", cleaned)

    # 6. Tables to spoken sentences
    cleaned = process_tables(cleaned)

    # 7. Lists to conversational ordinals
    cleaned = transform_lists_to_ordinals(cleaned, lang_code)

    # 8. Markdown symbols: headers, code, bold, italics, blockquotes
    cleaned = re.sub(r"```[\s\S]*?```", "", cleaned)
    cleaned = re.sub(r"`([^`]+)`", r"\1", cleaned)
    cleaned = re.sub(r"(?m)^\s*#+\s*", "", cleaned)
    cleaned = re.sub(r"(?m)^\s*>\s*", "", cleaned)
    cleaned = re.sub(r"[*_~|]", "", cleaned)

    # 9. Spell out numbers into words
    cleaned = spell_out_numbers(cleaned, lang_code)

    # 10. Normalize punctuation
    cleaned = normalize_punctuation(cleaned, lang_code)

    # 11. Sentence limit: keep only first 3 sentences if long, add read more offer
    sentences = split_sentences(cleaned, lang_code)
    read_more_offer = locale.get("read_more_offer", "Would you like me to read the full answer?")

    if len(sentences) > 3:
        kept = sentences[:3]
        terminal_punc = "።" if lang_code in ("am", "ti") else ""
        first_part = " ".join(kept)
        if not first_part.endswith((".", "!", "?", "።")):
            first_part += terminal_punc or "."
        cleaned = f"{first_part} {read_more_offer}"
    elif sentences:
        cleaned = " ".join(sentences)

    # 12. Collapse whitespace
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r"\n\s*\n+", "\n", cleaned)
    return cleaned.strip()
