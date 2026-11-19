"""Audio conversion helper using FFmpeg with fallback.

Converts between Telegram voice notes (OGG/Opus) and speech APIs (WAV/MP3).
"""

from __future__ import annotations

import logging
import shutil
import subprocess
from typing import Final

logger = logging.getLogger("savanna_bridge.channels.audio")

FFMPEG_BIN: Final[str | None] = shutil.which("ffmpeg")


def is_ffmpeg_available() -> bool:
    return FFMPEG_BIN is not None


def convert_audio(
    input_bytes: bytes,
    input_format: str,
    output_format: str,
    extra_args: list[str] | None = None,
) -> bytes:
    """Convert audio from input_format to output_format using ffmpeg."""
    if not input_bytes:
        return b""

    if not is_ffmpeg_available():
        logger.warning(
            "ffmpeg is not installed on the host. Returning raw audio bytes as fallback."
        )
        return input_bytes

    cmd = [
        FFMPEG_BIN,  # type: ignore[list-item]
        "-y",
        "-f",
        input_format,
        "-i",
        "pipe:0",
        "-f",
        output_format,
    ]
    if extra_args:
        cmd.extend(extra_args)
    cmd.append("pipe:1")

    try:
        proc = subprocess.run(
            cmd,
            input=input_bytes,
            capture_output=True,
            check=True,
        )
        return proc.stdout
    except subprocess.CalledProcessError as e:
        logger.error("ffmpeg conversion failed: %s", e.stderr.decode(errors="replace"))
        return input_bytes
    except Exception as e:
        logger.error("Unexpected error during audio conversion: %s", e)
        return input_bytes


def ogg_opus_to_wav(ogg_bytes: bytes) -> bytes:
    """Convert Telegram OGG/Opus voice note to WAV for speech-to-text."""
    return convert_audio(
        input_bytes=ogg_bytes,
        input_format="ogg",
        output_format="wav",
        extra_args=["-ac", "1", "-ar", "16000"],
    )


def wav_to_ogg_opus(wav_bytes: bytes) -> bytes:
    """Convert WAV speech audio to OGG/Opus for Telegram voice note."""
    return convert_audio(
        input_bytes=wav_bytes,
        input_format="wav",
        output_format="ogg",
        extra_args=["-c:a", "libopus", "-ac", "1", "-b:a", "32k"],
    )


def mp3_to_ogg_opus(mp3_bytes: bytes) -> bytes:
    """Convert MP3 audio to OGG/Opus for Telegram voice note."""
    return convert_audio(
        input_bytes=mp3_bytes,
        input_format="mp3",
        output_format="ogg",
        extra_args=["-c:a", "libopus", "-ac", "1", "-b:a", "32k"],
    )
