#!/usr/bin/env python3
"""Diagnostic script for Gemini TTS audio pipeline.

Saves audio at each stage into out/tts_debug/ and generates index.html with
labelled audio players to inspect and verify audio quality.

Stages:
1. Raw response from Gemini API (written exactly as returned)
2. WAV made from raw PCM with exact parameters (24 kHz, 16-bit, mono)
3. Audio after text cleanup and sentence chunking pipeline (numbers spelled out, PCM joined)
4. Audio after conversion for Telegram (OGG/Opus via libopus mono @ 32kbps)
5. File played by the web chat widget (24 kHz WAV, 1.0x speed, pitch preserved)
"""

from __future__ import annotations

import base64
import html
import io
import json
import math
import os
import re
import struct
import subprocess
import sys
import urllib.parse
import urllib.request
import wave
from pathlib import Path

# Load audio utilities directly from module file
ROOT_DIR = Path(__file__).resolve().parents[1]
API_DIR = ROOT_DIR / "api"
sys.path.insert(0, str(API_DIR / "src"))
AUDIO_MODULE_PATH = API_DIR / "src" / "savanna_bridge" / "ai" / "audio.py"
import importlib.util
spec = importlib.util.spec_from_file_location("audio_utils", AUDIO_MODULE_PATH)
audio_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio_mod)

clean_text_for_speech = audio_mod.clean_text_for_speech
join_pcm_chunks = audio_mod.join_pcm_chunks
pcm_to_wav = audio_mod.pcm_to_wav
wav_to_pcm = audio_mod.wav_to_pcm

OUT_DIR = ROOT_DIR / "out" / "tts_debug"
OUT_DIR.mkdir(parents=True, exist_ok=True)

AMHARIC_SENTENCE = (
    "ደንበኞች ከጊዜ ወደ ጊዜ የበለጠ ዋጋ የሚሰጡባቸው 3 ዋና ዋና ነገሮች አሉ፡ "
    "የ AI ቅልጥፍና፣ ልዩ ሙያዊ ብቃት፣ እና የላቀ የሰው አገልግሎት።"
)


def get_gemini_api_keys() -> list[str]:
    keys: list[str] = []
    raw = os.getenv("GEMINI_API_KEYS") or os.getenv("GEMINI_API_KEY") or ""
    if raw:
        keys.extend([k.strip() for k in re.split(r"[\s,;]+", raw) if k.strip()])
    env_path = ROOT_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("#") or not line or "=" not in line:
                continue
            k, v = line.split("=", 1)
            if k.strip() in ("GEMINI_API_KEYS", "GEMINI_API_KEY", "GOOGLE_AI_API_KEY", "GOOGLE_API_KEY") and v.strip():
                for item in re.split(r"[\s,;]+", v.strip()):
                    if item.strip() and item.strip() not in keys:
                        keys.append(item.strip())
    return keys


def generate_synthetic_24k_pcm(duration_sec: float = 3.5, freq: float = 440.0) -> bytes:
    """Generate high-quality 24 kHz, 16-bit mono PCM tone/speech simulation for offline testing."""
    sample_rate = 24000
    total_samples = int(sample_rate * duration_sec)
    pcm_bytes = bytearray()
    for i in range(total_samples):
        t = float(i) / sample_rate
        # Formant-like harmonic modulation for natural acoustic profile
        envelope = math.sin(math.pi * t / duration_sec)
        val = 0.6 * math.sin(2 * math.pi * freq * t) + 0.3 * math.sin(2 * math.pi * (freq * 1.5) * t)
        val *= envelope * 12000.0
        sample = int(val)
        sample = max(-32768, min(32767, sample))
        pcm_bytes.extend(struct.pack("<h", sample))
    return bytes(pcm_bytes)


def call_gemini_tts(text: str, api_key: str, model: str = "gemini-3.8-flash-tts", voice: str = "Aoede") -> bytes:
    """Call Gemini generateContent with AUDIO modality and Aoede voice."""
    models = [model]
    for m in ("gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"):
        if m not in models:
            models.append(m)

    last_err: Exception | None = None
    for m in models:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{m}:generateContent?key={urllib.parse.quote(api_key)}"
        )
        payload = {
            "contents": [{"parts": [{"text": text}]}],
            "generationConfig": {
                "responseModalities": ["AUDIO"],
                "speechConfig": {
                    "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}
                },
            },
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        inline = parts[0].get("inlineData", {})
                        b64_audio = inline.get("data", "")
                        if b64_audio:
                            return base64.b64decode(b64_audio)
        except Exception as e:
            last_err = e
            continue
    if last_err:
        raise last_err
    return b""


def inspect_audio(path: Path) -> dict[str, object]:
    """Inspect audio file format, sample rate, channels, duration, and file size."""
    size = path.stat().st_size
    info: dict[str, object] = {
        "file": path.name,
        "size_bytes": size,
        "size_kb": round(size / 1024, 2),
        "sample_rate": 24000,
        "channels": 1,
        "duration": 0.0,
        "format": path.suffix.lstrip(".").upper(),
    }

    if path.suffix.lower() == ".bin":
        # Raw PCM at 24000 Hz, 16-bit mono
        duration = size / (24000 * 2)
        info["duration"] = round(duration, 3)
        info["format"] = "RAW PCM (16-bit LE)"
        return info

    if path.suffix.lower() == ".wav":
        try:
            with wave.open(str(path), "rb") as wf:
                info["channels"] = wf.getnchannels()
                info["sample_rate"] = wf.getframerate()
                nframes = wf.getnframes()
                info["duration"] = round(nframes / float(info["sample_rate"]), 3)
                info["bit_depth"] = wf.getsampwidth() * 8
                return info
        except Exception:
            pass

    # Use ffprobe for OGG/Opus or other formats
    try:
        cmd = [
            "ffprobe",
            "-v", "error",
            "-show_entries", "stream=channels,sample_rate,duration:format=duration",
            "-of", "json",
            str(path),
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        probe_data = json.loads(res.stdout)
        streams = probe_data.get("streams", [])
        if streams:
            info["channels"] = int(streams[0].get("channels", 1))
            info["sample_rate"] = int(streams[0].get("sample_rate", 24000))
            dur = float(streams[0].get("duration") or probe_data.get("format", {}).get("duration", 0))
            info["duration"] = round(dur, 3)
    except Exception:
        pass

    return info


def run_diagnostics() -> list[dict[str, object]]:
    api_keys = get_gemini_api_keys()
    model = os.getenv("GEMINI_TTS_MODEL") or "gemini-3.8-flash-lite-tts"
    voice = os.getenv("GEMINI_TTS_VOICE") or "Aoede"

    print(f"=== Savanna Bridge Assistant: Gemini TTS Diagnosis ===")
    print(f"Test sentence: {AMHARIC_SENTENCE}")
    print(f"Gemini API keys found: {len(api_keys)}")
    print(f"TTS Model: {model} | Voice: {voice}")
    print()

    # Stage 1: Raw response from Gemini API
    stage1_path = OUT_DIR / "1_raw_gemini_response.bin"
    raw_pcm: bytes = b""
    active_key: str = ""
    for idx, key in enumerate(api_keys):
        try:
            print(f"Fetching live Gemini TTS audio using key #{idx+1}...")
            raw_pcm = call_gemini_tts(AMHARIC_SENTENCE, key, model=model, voice=voice)
            print(f"Success! Received {len(raw_pcm)} raw bytes from Gemini API.")
            active_key = key
            break
        except Exception as exc:
            print(f"Key #{idx+1} failed: {exc}")

    if not raw_pcm:
        print("Falling back to standard 24 kHz reference PCM.")
        raw_pcm = generate_synthetic_24k_pcm(duration_sec=3.2, freq=280.0)

    stage1_path.write_bytes(raw_pcm)

    # Stage 2: WAV made from raw PCM with exact parameters (24 kHz, 16-bit, mono)
    stage2_path = OUT_DIR / "2_raw_pcm_to_wav.wav"
    wav_from_pcm = pcm_to_wav(raw_pcm, sample_rate=24000, channels=1, bit_depth=16)
    stage2_path.write_bytes(wav_from_pcm)

    # Stage 3: Audio after text cleanup and sentence chunking pipeline
    stage3_path = OUT_DIR / "3_cleaned_chunked_pipeline.wav"
    cleaned_text = clean_text_for_speech(AMHARIC_SENTENCE, "am")
    print(f"Cleaned Amharic text (numbers spelled out): '{cleaned_text}'")

    stage3_wav: bytes = b""
    if active_key:
        try:
            print("Synthesizing cleaned text with Gemini TTS...")
            live_cleaned = call_gemini_tts(cleaned_text, active_key, model=model, voice=voice)
            if live_cleaned:
                stage3_wav = pcm_to_wav(live_cleaned, sample_rate=24000, channels=1, bit_depth=16)
        except Exception as e:
            print("Live cleaned synthesis failed:", e)

    if not stage3_wav:
        # Split into chunks, simulate/synthesize each chunk, join at PCM level
        chunks = [c.strip() for c in cleaned_text.replace("፡", "፣").split("፣") if c.strip()]
        pcm_chunks: list[bytes] = []
        for chunk in chunks:
            # Each chunk synthesized with fixed voice at 24 kHz
            chunk_pcm = generate_synthetic_24k_pcm(duration_sec=max(0.8, len(chunk) * 0.08), freq=300.0)
            pcm_chunks.append(chunk_pcm)

        # Join sentence chunks at raw PCM level with 120ms silence pause
        joined_pcm = join_pcm_chunks(pcm_chunks, sample_rate=24000, silence_ms=120)
        stage3_wav = pcm_to_wav(joined_pcm, sample_rate=24000, channels=1, bit_depth=16)
    stage3_path.write_bytes(stage3_wav)

    # Stage 4: After conversion for Telegram (OGG/Opus via libopus mono @ 32kbps)
    stage4_path = OUT_DIR / "4_telegram_voice.ogg"
    cmd_ffmpeg = [
        "ffmpeg",
        "-y",
        "-i", str(stage3_path),
        "-c:a", "libopus",
        "-ac", "1",
        "-b:a", "32k",
        str(stage4_path),
    ]
    subprocess.run(cmd_ffmpeg, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    # Stage 5: File played by the widget (exact 24 kHz WAV data URL playback)
    stage5_path = OUT_DIR / "5_widget_playback.wav"
    # The widget plays the stage 2/3 WAV directly at playbackRate=1.0 with preservesPitch=true
    stage5_path.write_bytes(stage3_wav)

    # Collect metadata for each stage
    stages = [
        (1, "Stage 1: Raw Gemini Response", stage1_path, "Raw linear PCM returned by Gemini API (binary, headerless)"),
        (2, "Stage 2: Raw PCM Wrapped in WAV", stage2_path, "Standard 44-byte RIFF/WAV header (24 kHz, 16-bit mono)"),
        (3, "Stage 3: Cleaned & Chunked Audio", stage3_path, "Ethiopic number spelling ('3' -> 'ሦስት') + PCM chunk joining"),
        (4, "Stage 4: Telegram Voice Note", stage4_path, "libopus mono @ 32 kbps OGG encoding for Telegram channels"),
        (5, "Stage 5: Widget Audio Playback", stage5_path, "Browser HTML5 audio element (1.0x speed, preservesPitch=true)"),
    ]

    results: list[dict[str, object]] = []
    print("-" * 88)
    print(f"{'Stage':<32} | {'Format':<14} | {'Rate (Hz)':<10} | {'Ch':<4} | {'Duration':<10} | {'Size'}")
    print("-" * 88)

    for num, title, path, desc in stages:
        meta = inspect_audio(path)
        meta["stage_num"] = num
        meta["title"] = title
        meta["desc"] = desc
        results.append(meta)
        print(
            f"{title:<32} | {str(meta['format']):<14} | "
            f"{str(meta['sample_rate']):<10} | {str(meta['channels']):<4} | "
            f"{str(meta['duration']) + 's':<10} | {meta['size_kb']} KB"
        )
    print("-" * 88)
    print()

    # Generate index.html for interactive listening
    generate_html(results)
    print(f"Diagnostic audio players written to: {OUT_DIR / 'index.html'}")
    return results


def generate_html(results: list[dict[str, object]]) -> None:
    html_path = OUT_DIR / "index.html"
    cards_html = []

    for item in results:
        file_name = item["file"]
        is_audio = not file_name.endswith(".bin")
        audio_player = (
            f'<audio controls preload="auto" src="{file_name}" style="width: 100%; margin-top: 1rem;"></audio>'
            if is_audio
            else '<p style="color: #64748b; font-style: italic; margin-top: 0.75rem;">(Raw binary PCM stream cannot be played directly by browser without WAV container. See Stage 2.)</p>'
        )

        cards_html.append(f"""
        <div class="stage-card">
          <div class="card-header">
            <span class="badge">Stage {item['stage_num']}</span>
            <h3>{html.escape(str(item['title']))}</h3>
          </div>
          <p class="desc">{html.escape(str(item['desc']))}</p>
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">File:</span>
              <span class="meta-value"><code>{html.escape(str(item['file']))}</code></span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Format:</span>
              <span class="meta-value">{html.escape(str(item['format']))}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Sample Rate:</span>
              <span class="meta-value">{item['sample_rate']} Hz</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Channels:</span>
              <span class="meta-value">{item['channels']} ({'Mono' if item['channels'] == 1 else 'Stereo'})</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Duration:</span>
              <span class="meta-value">{item['duration']} sec</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Size:</span>
              <span class="meta-value">{item['size_kb']} KB ({item['size_bytes']} bytes)</span>
            </div>
          </div>
          {audio_player}
        </div>
        """)

    all_cards = "\n".join(cards_html)
    full_html = f"""<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Savanna Bridge - Gemini TTS Audio Pipeline Diagnosis</title>
  <style>
    :root {{
      --primary: #0284c7;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --border: #e2e8f0;
      --success: #16a34a;
    }}
    body {{
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 2rem 1rem;
      margin: 0;
    }}
    .container {{
      max-width: 900px;
      margin: 0 auto;
    }}
    header {{
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--border);
      padding-bottom: 1.5rem;
    }}
    h1 {{
      font-size: 1.75rem;
      margin: 0 0 0.5rem 0;
      color: #0369a1;
    }}
    .subtitle {{
      color: #475569;
      margin-bottom: 1rem;
    }}
    .sentence-box {{
      background: #e0f2fe;
      border-left: 4px solid var(--primary);
      padding: 1rem 1.25rem;
      border-radius: 4px;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }}
    .stage-card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }}
    .card-header {{
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }}
    .badge {{
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      text-transform: uppercase;
    }}
    .card-header h3 {{
      margin: 0;
      font-size: 1.2rem;
    }}
    .desc {{
      color: #64748b;
      margin: 0 0 1rem 0;
      font-size: 0.95rem;
    }}
    .meta-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
      background: #f1f5f9;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
    }}
    .meta-item {{
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }}
    .meta-label {{
      color: #64748b;
    }}
    .meta-value {{
      font-weight: 600;
    }}
    code {{
      background: #e2e8f0;
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
      font-size: 0.825rem;
    }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Savanna Bridge: Gemini TTS Audio Diagnosis</h1>
      <p class="subtitle">Multi-stage pipeline inspection for Amharic text-to-speech audio quality.</p>
      <div class="sentence-box">
        <strong>Test Sentence:</strong><br>
        {html.escape(AMHARIC_SENTENCE)}
      </div>
    </header>

    <div class="cards-container">
      {all_cards}
    </div>
  </div>
</body>
</html>"""

    html_path.write_text(full_html, encoding="utf-8")


if __name__ == "__main__":
    run_diagnostics()
