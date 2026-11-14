"""Tests for audio conversion helper (Milestone C-M1)."""

from audio_helper import (
    is_ffmpeg_available,
    mp3_to_ogg_opus,
    ogg_opus_to_wav,
    wav_to_ogg_opus,
)


def test_empty_input_returns_empty_bytes() -> None:
    assert ogg_opus_to_wav(b"") == b""
    assert wav_to_ogg_opus(b"") == b""
    assert mp3_to_ogg_opus(b"") == b""


def test_audio_conversions_run_or_fallback_safely() -> None:
    dummy_wav = b"RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\x80>\x00\x00\x00}\x00\x00\x02\x00\x10\x00data\x00\x00\x00\x00"
    out_ogg = wav_to_ogg_opus(dummy_wav)
    assert isinstance(out_ogg, bytes)

    dummy_ogg = b"OggS\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00"
    out_wav = ogg_opus_to_wav(dummy_ogg)
    assert isinstance(out_wav, bytes)


def test_is_ffmpeg_available_returns_bool() -> None:
    available = is_ffmpeg_available()
    assert isinstance(available, bool)
