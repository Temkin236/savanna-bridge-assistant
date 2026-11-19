"""Unit tests for Gemini TTS audio utilities, text normalization, and chunk joining."""

from __future__ import annotations

import struct
import wave
import io

from savanna_bridge.ai.audio import (
    clean_text_for_speech,
    join_pcm_chunks,
    number_to_amharic,
    pcm_to_wav,
    wav_to_pcm,
)


def test_pcm_to_wav_header_structure() -> None:
    # 1 second of 24 kHz 16-bit mono PCM (48000 bytes)
    sample_rate = 24000
    channels = 1
    bit_depth = 16
    pcm_data = b"\x00\x00" * sample_rate

    wav_bytes = pcm_to_wav(pcm_data, sample_rate=sample_rate, channels=channels, bit_depth=bit_depth)
    assert len(wav_bytes) == 44 + len(pcm_data)
    assert wav_bytes.startswith(b"RIFF")
    assert wav_bytes[8:12] == b"WAVE"
    assert wav_bytes[12:16] == b"fmt "
    assert wav_bytes[36:40] == b"data"

    # Verify with standard python wave module
    with wave.open(io.BytesIO(wav_bytes), "rb") as wf:
        assert wf.getnchannels() == 1
        assert wf.getframerate() == 24000
        assert wf.getsampwidth() == 2  # 16-bit
        assert wf.getnframes() == sample_rate


def test_pcm_to_wav_idempotent() -> None:
    pcm_data = b"\x10\x20" * 100
    wav_bytes = pcm_to_wav(pcm_data, sample_rate=24000)
    # Double-wrapping must return exact same bytes without adding a second header
    double_wrapped = pcm_to_wav(wav_bytes, sample_rate=24000)
    assert double_wrapped == wav_bytes


def test_wav_to_pcm_extraction() -> None:
    pcm_original = b"\x01\x02\x03\x04" * 100
    wav_bytes = pcm_to_wav(pcm_original, sample_rate=24000)
    pcm_extracted, rate, channels, depth = wav_to_pcm(wav_bytes)

    assert pcm_extracted == pcm_original
    assert rate == 24000
    assert channels == 1
    assert depth == 16


def test_clean_text_strips_markdown_emoji_urls_citations() -> None:
    dirty = (
        "# ሞጁል 1: መግቢያ 😊🚀\n\n"
        "ይህ **አስፈላጊ** ትምህርት ነው [1] [citation needed]።\n"
        "ለተጨማሪ መረጃ [ይጫኑ](https://learning.example.org) ወይም https://savanna.edu ይመልከቱ።\n"
        "> ማስታወሻ፡ `code_example()` መጠቀም አይቻልም።"
    )
    cleaned = clean_text_for_speech(dirty, language="am")

    assert "#" not in cleaned
    assert "**" not in cleaned
    assert "`" not in cleaned
    assert "[1]" not in cleaned
    assert "https://" not in cleaned
    assert "😊" not in cleaned
    assert "🚀" not in cleaned
    assert "ሞጁል አንድ" in cleaned or "ሞጁል 1" in dirty
    assert "ይህ አስፈላጊ ትምህርት ነው" in cleaned


def test_clean_text_spells_out_amharic_numbers() -> None:
    assert number_to_amharic(0) == "ዜሮ"
    assert number_to_amharic(1) == "አንድ"
    assert number_to_amharic(3) == "ሦስት"
    assert number_to_amharic(10) == "አስር"
    assert number_to_amharic(14) == "አስራ አራት"
    assert number_to_amharic(25) == "ሃያ አምስት"
    assert number_to_amharic(100) == "መቶ"

    sentence = "3 ዋና ዋና ነገሮች አሉ፡ የ AI ቅልጥፍና"
    cleaned = clean_text_for_speech(sentence, language="am")
    assert "ሦስት ዋና ዋና ነገሮች አሉ" in cleaned
    assert "3" not in cleaned


def test_clean_text_removes_style_instructions() -> None:
    instruction_text = "Read this at 1.00x speed, preserving its language and meaning: ደንበኞች ከጊዜ ወደ ጊዜ"
    cleaned = clean_text_for_speech(instruction_text, language="am")
    assert not cleaned.startswith("Read this")
    assert "ደንበኞች ከጊዜ ወደ ጊዜ" in cleaned


def test_join_pcm_chunks_with_silence() -> None:
    chunk1 = b"\x01\x01" * 240  # 10ms
    chunk2 = b"\x02\x02" * 240  # 10ms

    joined = join_pcm_chunks([chunk1, chunk2], sample_rate=24000, silence_ms=100)
    # 100ms at 24000 Hz 16-bit mono = 2400 samples * 2 bytes = 4800 zero bytes
    silence_bytes = b"\x00" * 4800
    assert chunk1 in joined
    assert chunk2 in joined
    assert silence_bytes in joined
    assert len(joined) == len(chunk1) + 4800 + len(chunk2)


def test_join_pcm_chunks_strips_wav_headers() -> None:
    chunk1_pcm = b"\x11\x11" * 120
    chunk2_pcm = b"\x22\x22" * 120
    wav1 = pcm_to_wav(chunk1_pcm, sample_rate=24000)
    wav2 = pcm_to_wav(chunk2_pcm, sample_rate=24000)

    joined = join_pcm_chunks([wav1, wav2], sample_rate=24000, silence_ms=50)
    # Joined PCM must NOT contain RIFF headers inside it
    assert not joined.startswith(b"RIFF")
    assert chunk1_pcm in joined
    assert chunk2_pcm in joined

