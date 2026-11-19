"""Audio processing and text normalization utilities for Gemini TTS."""

from __future__ import annotations

import io
import re
import struct
import wave

AMHARIC_UNITS = {
    0: "ዜሮ",
    1: "አንድ",
    2: "ሁለት",
    3: "ሦስት",
    4: "አራት",
    5: "አምስት",
    6: "ስድስት",
    7: "ሰባት",
    8: "ስምንት",
    9: "ዘጠኝ",
}

AMHARIC_TEENS = {
    10: "አስር",
    11: "አስራ አንድ",
    12: "አስራ ሁለት",
    13: "አስራ ሦስት",
    14: "አስራ አራት",
    15: "አስራ አምስት",
    16: "አስራ ስድስት",
    17: "አስራ ሰባት",
    18: "አስራ ስምንት",
    19: "አስራ ዘጠኝ",
}

AMHARIC_TENS = {
    20: "ሃያ",
    30: "ሠላሳ",
    40: "አርባ",
    50: "ኃምሳ",
    60: "ስድሳ",
    70: "ሰባ",
    80: "ሰማንያ",
    90: "ዘጠና",
}

ETHIOPIC_DIGIT_MAP = {
    "፩": 1, "፪": 2, "፫": 3, "፬": 4, "፭": 5,
    "፮": 6, "፯": 7, "፰": 8, "፱": 9, "፲": 10,
    "፳": 20, "፴": 30, "፵": 40, "፶": 50,
    "፷": 60, "፸": 70, "፹": 80, "፺": 90,
    "፻": 100, "፼": 10000,
}


def number_to_amharic(n: int) -> str:
    """Spell out integer into Amharic words (0 - 999,999)."""
    if n < 0:
        return "አሉታዊ " + number_to_amharic(-n)
    if n in AMHARIC_UNITS:
        return AMHARIC_UNITS[n]
    if n in AMHARIC_TEENS:
        return AMHARIC_TEENS[n]
    if n < 100:
        tens = (n // 10) * 10
        rem = n % 10
        tens_word = AMHARIC_TENS.get(tens, "")
        if rem == 0:
            return tens_word
        return f"{tens_word} {AMHARIC_UNITS[rem]}"
    if n < 1000:
        hundreds = n // 100
        rem = n % 100
        h_prefix = "መቶ" if hundreds == 1 else f"{AMHARIC_UNITS[hundreds]} መቶ"
        if rem == 0:
            return h_prefix
        return f"{h_prefix} {number_to_amharic(rem)}"
    if n < 1000000:
        thousands = n // 1000
        rem = n % 1000
        t_prefix = "አንድ ሺህ" if thousands == 1 else f"{number_to_amharic(thousands)} ሺህ"
        if rem == 0:
            return t_prefix
        return f"{t_prefix} {number_to_amharic(rem)}"
    return str(n)


def clean_text_for_speech(text: str, language: str = "am") -> str:
    """Send clean Ethiopic/localized text only: strip markdown, emoji, URLs, citations.
    
    Spells out numbers in Amharic and removes style instructions.
    """
    if not text:
        return ""

    # Strip style/speed instruction prefixes if present
    cleaned = re.sub(r"^Read this at [\d\.]+x speed[^\:]*:\s*", "", text, flags=re.IGNORECASE)
    cleaned = re.sub(r"^Speak in [^:]+:\s*", "", cleaned, flags=re.IGNORECASE)

    # Strip markdown headers, bold, italics, strikethrough, inline code
    cleaned = re.sub(r"```[\s\S]*?```", "", cleaned)  # code blocks
    cleaned = re.sub(r"`([^`]+)`", r"\1", cleaned)    # inline code
    cleaned = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", cleaned)  # markdown links [text](url) -> text
    cleaned = re.sub(r"https?://\S+", "", cleaned)    # raw URLs
    cleaned = re.sub(r"\[\d+\]", "", cleaned)         # citations [1], [2]
    cleaned = re.sub(r"\[citation[^\]]*\]", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"[\*\_~#>]", "", cleaned)       # markdown symbols (*, _, ~, #, >)

    # Strip emoji & pictographs
    cleaned = re.sub(
        r"[\U00010000-\U0010ffff\u2600-\u26ff\u2700-\u27bf\ufe00-\ufe0f]",
        "",
        cleaned,
    )

    # If Amharic, spell out ASCII digits and Ethiopic numerals
    lang_str = str(language).lower()
    if "am" in lang_str:
        # Replace multi-digit and single-digit numbers with Amharic words
        def _replace_num(match: re.Match[str]) -> str:
            val = int(match.group(0))
            return number_to_amharic(val)

        cleaned = re.sub(r"\b\d+\b", _replace_num, cleaned)

    # Normalize whitespace
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r"\n\s*\n+", "\n", cleaned)
    return cleaned.strip()


def pcm_to_wav(
    pcm_bytes: bytes,
    sample_rate: int = 24000,
    channels: int = 1,
    bit_depth: int = 16,
) -> bytes:
    """Wrap raw linear PCM bytes in an exact standard 44-byte RIFF/WAV header.
    
    If the bytes already have a RIFF/WAVE header, returns them untouched.
    """
    if not pcm_bytes:
        return b""

    # If already a WAV file, return unchanged
    if pcm_bytes.startswith(b"RIFF") and len(pcm_bytes) >= 12 and pcm_bytes[8:12] == b"WAVE":
        return pcm_bytes

    bytes_per_sample = bit_depth // 8
    byte_rate = sample_rate * channels * bytes_per_sample
    block_align = channels * bytes_per_sample
    subchunk2_size = len(pcm_bytes)
    chunk_size = 36 + subchunk2_size

    # Standard 44-byte RIFF/WAVE header
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",
        chunk_size,
        b"WAVE",
        b"fmt ",
        16,  # Subchunk1Size (16 for PCM)
        1,   # AudioFormat (1 = PCM linear)
        channels,
        sample_rate,
        byte_rate,
        block_align,
        bit_depth,
        b"data",
        subchunk2_size,
    )
    return header + pcm_bytes


def wav_to_pcm(audio_bytes: bytes) -> tuple[bytes, int, int, int]:
    """Extract raw PCM bytes and metadata (sample_rate, channels, bit_depth) from WAV bytes."""
    if not audio_bytes.startswith(b"RIFF"):
        return audio_bytes, 24000, 1, 16

    try:
        with wave.open(io.BytesIO(audio_bytes), "rb") as wf:
            channels = wf.getnchannels()
            sample_rate = wf.getframerate()
            sample_width = wf.getsampwidth()
            bit_depth = sample_width * 8
            pcm_data = wf.readframes(wf.getnframes())
            return pcm_data, sample_rate, channels, bit_depth
    except Exception:
        # If wave parsing fails, strip standard 44-byte header if data chunk is at byte 44
        if len(audio_bytes) > 44:
            return audio_bytes[44:], 24000, 1, 16
        return audio_bytes, 24000, 1, 16


def join_pcm_chunks(
    pcm_chunks: list[bytes],
    sample_rate: int = 24000,
    silence_ms: int = 100,
) -> bytes:
    """Join sentence chunks at the PCM level with optional silence between chunks.
    
    Automatically strips WAV headers from input chunks if present.
    """
    raw_parts: list[bytes] = []
    bytes_per_sample = 2  # 16-bit mono
    silence_samples = int(sample_rate * (silence_ms / 1000.0))
    silence_bytes = b"\x00" * (silence_samples * bytes_per_sample)

    for chunk in pcm_chunks:
        if not chunk:
            continue
        pcm, _, _, _ = wav_to_pcm(chunk)
        if pcm:
            raw_parts.append(pcm)

    if not raw_parts:
        return b""

    return silence_bytes.join(raw_parts)

