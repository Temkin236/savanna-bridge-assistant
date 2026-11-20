"""Google Gemini, Translation, and Speech provider with labelled fallback."""

from __future__ import annotations

import base64
import hashlib
import html
import json
import logging
import os
import re
import threading
import urllib.error
import urllib.parse
import urllib.request

from adapters.base import ContentChunk
from savanna_bridge.ai.audio import (
    clean_text_for_speech,
    join_pcm_chunks,
    pcm_to_wav,
    wav_to_pcm,
)
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language
from savanna_bridge.speech import make_spoken, split_sentences

logger = logging.getLogger("savanna_bridge.ai.cloud")


class CloudProvider(AIProvider):
    """Google Gemini services for grounded answers, translation, STT, and TTS."""

    def __init__(self) -> None:
        self._offline_fallback = OfflineFaqProvider()
        # Single canonical Gemini API key or rotating pool
        raw_keys = (
            os.getenv("GEMINI_API_KEYS")
            or os.getenv("GEMINI_API_KEY")
            or os.getenv("GOOGLE_AI_API_KEY")
            or os.getenv("GOOGLE_API_KEY")
            or os.getenv("CLOUD_AI_API_KEY")
            or ""
        )
        self.api_keys: list[str] = [
            k.strip() for k in re.split(r"[\s,;]+", raw_keys) if k.strip()
        ]
        self._key_index = 0
        self._key_lock = threading.Lock()
        self.translate_key = os.getenv("GOOGLE_TRANSLATE_API_KEY") or ""
        self.speech_key = os.getenv("GOOGLE_SPEECH_API_KEY") or ""
        self.model = os.getenv("CLOUD_MODEL", "gemini-2.5-flash")
        self.tts_model = (
            os.getenv("GEMINI_TTS_MODEL")
            or os.getenv("GOOGLE_TTS_MODEL")
            or "gemini-3.8-flash-lite-tts"
        )
        self.tts_voice = (
            os.getenv("GEMINI_TTS_VOICE")
            or os.getenv("GOOGLE_TTS_VOICE")
            or "Aoede"
        )
        self.tts_style = (
            os.getenv("TTS_STYLE")
            or "warm, calm tutor, moderate pace, clear, unhurried"
        )
        self._audio_cache: dict[str, str] = {}
        self._last_call_mocked = not bool(self.api_keys or self.translate_key or self.speech_key)

    @property
    def api_key(self) -> str:
        if not self.api_keys:
            return ""
        with self._key_lock:
            return self.api_keys[self._key_index % len(self.api_keys)]

    @api_key.setter
    def api_key(self, value: str) -> None:
        with self._key_lock:
            if value:
                self.api_keys = [value]
                self._key_index = 0
            else:
                self.api_keys = []

    @property
    def name(self) -> str:
        return "gemini" if self.api_keys else "google"

    @property
    def is_mocked(self) -> bool:
        return self._last_call_mocked

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate_direct(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate directly with Google Cloud Translation or Gemini (om/ti experimental)."""
        if not text or not text.strip():
            return text
        source = (source_lang or "en").lower().split("-")[0].strip()
        target = (target_lang or "en").lower().split("-")[0].strip()
        if source == target:
            self._last_call_mocked = False
            return text

        if self.translate_key:
            try:
                translated = self._call_cloud_translate(text, source, target)
                if translated:
                    self._last_call_mocked = False
                    return translated
            except Exception as exc:
                logger.warning("Google Cloud Translation error: %s", exc)

        is_experimental = target in ("om", "ti") or source in ("om", "ti")
        if is_experimental:
            logger.info("Using experimental Gemini translation for %s -> %s", source, target)

        prompt = (
            f"Translate the following text from {source} to {target}. "
            f"Return only the direct translation with no explanations or formatting:\n\n{text}"
        )
        try:
            translated = self._call_gemini(prompt) if self.api_key else ""
            if translated.strip():
                self._last_call_mocked = False
                return translated.strip()
        except Exception as exc:
            logger.warning("Gemini translation error: %s", exc)

        self._last_call_mocked = True
        return ""

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        source = (source_lang or "en").lower().split("-")[0].strip()
        target = (target_lang or "en").lower().split("-")[0].strip()
        if source == target:
            self._last_call_mocked = False
            return text

        translated = self.translate_direct(text, source, target)
        if translated:
            return translated

        self._last_call_mocked = True
        return self._offline_fallback.translate(text, source, target)

    def generate_answer_pair(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> tuple[str, str]:
        if not self.api_key:
            self._last_call_mocked = True
            ans = self._offline_fallback.generate_answer(
                question, context_chunks, language, simple_mode
            )
            return ans, make_spoken(ans, language)

        context_text = "\n\n".join(
            f"--- Section: {chunk.heading} ---\n{chunk.text}"
            for chunk in context_chunks
        )
        simplicity_instruction = (
            "Keep the response simple, short, and in very plain language."
            if simple_mode
            else "Provide a clear, accurate, and helpful response."
        )
        language_instruction = {
            Language.AM: "Respond in Amharic.",
            Language.OM: "Respond in Afaan Oromo.",
            Language.TI: "Respond in Tigrinya.",
            Language.AR: "Respond in Arabic.",
            Language.EN: "Respond in English.",
        }[language]
        prompt = f"""You are the Savanna Bridge Assistant, an accessible tutor.
Base your answer strictly and solely on the Course Content below.
Do not invent information. {simplicity_instruction}
{language_instruction}

You must return a JSON object with exactly two string fields: "answer" and "spoken".
Rules:
1. "answer":
   - Plain text formatted for on-screen reading.
   - Absolutely no emoji or decorative symbols.
   - Keep citations and links in the sources field, not in the text.
2. "spoken":
   - A version written specifically to be heard aloud via text-to-speech.
   - Start directly with the answer.
   - Two to four short sentences.
   - No markdown, emoji, URLs, citation markers, headings, or labels.
   - Turn lists into spoken transitions ('first, second, and finally').
   - Mention the source naturally (e.g. 'this is in the lesson section called X') without reading any web address or URL.
   - Write numbers, dates, and abbreviations as words in the same language.
   - Never drop numbers, negations, or warnings.
   - Use normal commas and full stops for pauses (Ethiopic punctuation for Amharic).
   - If the full answer is long, speak only the main points and end with a short offer to read more.
3. Language:
   - Write both "answer" and "spoken" in the learner's language ({language.value}).
   - Never mix languages inside one sentence.

Course Content:
{context_text}

Learner Question:
{question}

Return only JSON:
{{"answer": "...", "spoken": "..."}}
"""
        try:
            raw_response = self._call_gemini_json(prompt)
            answer, spoken = self._parse_answer_spoken(raw_response, language)
            if answer.strip():
                self._last_call_mocked = False
                return answer.strip(), spoken.strip()
        except Exception as exc:
            logger.warning("Gemini API error in generate_answer_pair: %s", exc)

        self._last_call_mocked = True
        ans = self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )
        return ans, make_spoken(ans, language)

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        ans, _ = self.generate_answer_pair(question, context_chunks, language, simple_mode)
        return ans

    def _parse_answer_spoken(self, raw: str, language: Language) -> tuple[str, str]:
        if not raw or not raw.strip():
            return "", ""
        cleaned = raw.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()

        try:
            data = json.loads(cleaned)
            if isinstance(data, dict):
                ans = str(data.get("answer", "")).strip()
                spk = str(data.get("spoken", "")).strip()
                if ans and spk:
                    return ans, spk
                if ans:
                    return ans, make_spoken(ans, language)
        except Exception:
            pass

        # Try regex if JSON was malformed
        ans_m = re.search(r'"answer"\s*:\s*"((?:[^"\\]|\\.)*)"', cleaned, re.DOTALL)
        spk_m = re.search(r'"spoken"\s*:\s*"((?:[^"\\]|\\.)*)"', cleaned, re.DOTALL)
        if ans_m:
            try:
                ans = json.loads(f'"{ans_m.group(1)}"')
                spk = json.loads(f'"{spk_m.group(1)}"') if spk_m else make_spoken(ans, language)
                return ans, spk
            except Exception:
                pass

        # Fall back to Step 3 rule-based cleaner
        return raw.strip(), make_spoken(raw.strip(), language)

    def _call_gemini_json(self, prompt: str) -> str:
        response = self._call_gemini_endpoint(
            f"{self.model}:generateContent",
            {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.2,
                    "maxOutputTokens": 1000,
                    "responseMimeType": "application/json",
                },
            },
        )
        candidates = response.get("candidates", [])
        if not isinstance(candidates, list) or not candidates:
            return ""
        parts = candidates[0].get("content", {}).get("parts", [])
        return parts[0].get("text", "") if parts else ""

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        # Use Gemini with audio input when the Gemini provider is on
        if self.api_key and len(audio_bytes) > 64:
            try:
                transcript = self._call_gemini_transcribe(audio_bytes, media_type, language)
                if transcript:
                    self._last_call_mocked = False
                    return transcript
            except Exception as exc:
                logger.warning("Gemini transcription error: %s", exc)

        if self.speech_key and audio_bytes:
            try:
                transcript = self._call_speech_to_text(audio_bytes, language)
                if transcript:
                    self._last_call_mocked = False
                    return transcript
            except Exception as exc:
                logger.warning("Google Speech-to-Text error: %s", exc)

        self._last_call_mocked = True
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(
        self, text: str, language: Language, speed: float = 1.0, style: str | None = None
    ) -> str:
        cleaned_text = clean_text_for_speech(text, language.value)
        if not cleaned_text:
            cleaned_text = text

        voice_name = self.tts_voice
        style_val = style or self.tts_style

        # Cache audio by hash of (spoken, language, voice, style)
        cache_key = hashlib.sha256(
            f"{cleaned_text}|{language.value}|{voice_name}|{style_val}".encode("utf-8")
        ).hexdigest()
        if cache_key in self._audio_cache:
            return self._audio_cache[cache_key]

        if self.api_key:
            try:
                # Group by 2 to 3 sentences per clip
                sentences = split_sentences(cleaned_text, language.value)
                if not sentences:
                    sentences = [cleaned_text]

                chunk_size = 2 if len(sentences) <= 4 else 3
                sentence_groups = []
                for i in range(0, len(sentences), chunk_size):
                    sentence_groups.append(" ".join(sentences[i : i + chunk_size]))

                if len(sentence_groups) == 1:
                    audio_b64, media_type = self._call_gemini_tts(
                        sentence_groups[0], language, speed=speed, style=style_val
                    )
                    if audio_b64:
                        raw_audio = base64.b64decode(audio_b64)
                        if "mp3" in media_type or raw_audio.startswith(b"ID3") or (len(raw_audio) >= 2 and raw_audio[:2] in (b"\xff\xfb", b"\xff\xf3", b"\xff\xf2")):
                            self._last_call_mocked = False
                            res = f"data:audio/mp3;base64,{audio_b64}"
                            self._audio_cache[cache_key] = res
                            return res
                        elif "ogg" in media_type or raw_audio.startswith(b"OggS"):
                            self._last_call_mocked = False
                            res = f"data:audio/ogg;base64,{audio_b64}"
                            self._audio_cache[cache_key] = res
                            return res
                        elif raw_audio.startswith(b"RIFF"):
                            self._last_call_mocked = False
                            res = f"data:audio/wav;base64,{audio_b64}"
                            self._audio_cache[cache_key] = res
                            return res
                        else:
                            wav_bytes = pcm_to_wav(raw_audio, sample_rate=24000, channels=1, bit_depth=16)
                            out_b64 = base64.b64encode(wav_bytes).decode("ascii")
                            self._last_call_mocked = False
                            res = f"data:audio/wav;base64,{out_b64}"
                            self._audio_cache[cache_key] = res
                            return res

                pcm_parts: list[bytes] = []
                for group in sentence_groups:
                    audio_b64, media_type = self._call_gemini_tts(
                        group, language, speed=speed, style=style_val
                    )
                    if not audio_b64:
                        continue
                    raw_audio = base64.b64decode(audio_b64)
                    if raw_audio.startswith(b"RIFF"):
                        pcm, _, _, _ = wav_to_pcm(raw_audio)
                    else:
                        pcm = raw_audio
                    pcm_parts.append(pcm)

                if pcm_parts:
                    # Join at PCM level with natural silence pause, then wrap in WAV once
                    joined_pcm = join_pcm_chunks(pcm_parts, sample_rate=24000, silence_ms=200)
                    wav_bytes = pcm_to_wav(joined_pcm, sample_rate=24000, channels=1, bit_depth=16)
                    out_b64 = base64.b64encode(wav_bytes).decode("ascii")
                    self._last_call_mocked = False
                    result_url = f"data:audio/wav;base64,{out_b64}"
                    self._audio_cache[cache_key] = result_url
                    return result_url
            except Exception as exc:
                logger.warning("Gemini Text-to-Speech error: %s", exc)

        if self.speech_key:
            try:
                audio = self._call_text_to_speech(cleaned_text, language, speed)
                if audio:
                    self._last_call_mocked = False
                    result_url = f"data:audio/mp3;base64,{audio}"
                    self._audio_cache[cache_key] = result_url
                    return result_url
            except Exception as exc:
                logger.warning("Google Text-to-Speech error: %s", exc)

        self._last_call_mocked = True
        return self._offline_fallback.synthesize(cleaned_text, language, speed, style)

    def _call_cloud_translate(
        self, text: str, source_lang: str, target_lang: str
    ) -> str:
        url = (
            "https://translation.googleapis.com/language/translate/v2?key="
            + urllib.parse.quote(self.translate_key)
        )
        response = self._post_json(
            url,
            {"q": text, "source": source_lang, "target": target_lang, "format": "text"},
        )
        translations = response.get("data", {}).get("translations", [])
        if not isinstance(translations, list) or not translations:
            return ""
        first = translations[0]
        return html.unescape(first.get("translatedText", "")) if isinstance(first, dict) else ""

    def _call_speech_to_text(self, audio_bytes: bytes, language: Language) -> str:
        url = (
            "https://speech.googleapis.com/v1/speech:recognize?key="
            + urllib.parse.quote(self.speech_key)
        )
        response = self._post_json(
            url,
            {
                "config": {
                    "languageCode": self._language_code(language),
                    "enableAutomaticPunctuation": True,
                },
                "audio": {"content": base64.b64decode(audio_bytes).decode("ascii")},
            },
        )
        results = response.get("results", [])
        if not isinstance(results, list) or not results:
            return ""
        alternatives = results[0].get("alternatives", [])
        return alternatives[0].get("transcript", "") if alternatives else ""

    def _call_text_to_speech(
        self, text: str, language: Language, speed: float
    ) -> str:
        url = (
            "https://texttospeech.googleapis.com/v1/text:synthesize?key="
            + urllib.parse.quote(self.speech_key)
        )
        response = self._post_json(
            url,
            {
                "input": {"text": text},
                "voice": {"languageCode": self._language_code(language)},
                "audioConfig": {"audioEncoding": "MP3", "speakingRate": speed},
            },
        )
        audio = response.get("audioContent", "")
        return audio if isinstance(audio, str) else ""

    def _call_gemini_endpoint(
        self, endpoint: str, payload: dict[str, object]
    ) -> dict[str, object]:
        """Post to Gemini endpoint with automatic key rotation on 429/403/network errors."""
        if not self.api_keys:
            return {}
        attempts = max(1, len(self.api_keys))
        last_error: Exception | None = None
        for _ in range(attempts):
            key = self.api_key
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{endpoint}?key={urllib.parse.quote(key)}"
            try:
                return self._post_json(url, payload)
            except urllib.error.HTTPError as exc:
                last_error = exc
                if exc.code in (429, 403, 500, 503) and len(self.api_keys) > 1:
                    logger.warning("Gemini API key HTTP %s; rotating key.", exc.code)
                    with self._key_lock:
                        self._key_index += 1
                    continue
                raise
            except Exception as exc:
                last_error = exc
                if len(self.api_keys) > 1:
                    logger.warning("Gemini request error %s; rotating key.", exc)
                    with self._key_lock:
                        self._key_index += 1
                    continue
                raise
        if last_error:
            raise last_error
        return {}

    def _call_gemini_transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language
    ) -> str:
        response = self._call_gemini_endpoint(
            f"{self.model}:generateContent",
            {
                "contents": [
                    {
                        "parts": [
                            {
                                "inlineData": {
                                    "mimeType": media_type or "audio/webm",
                                    "data": base64.b64encode(audio_bytes).decode("ascii"),
                                }
                            },
                            {
                                "text": (
                                    "Transcribe this audio accurately in "
                                    f"{language.value}. Return only the transcript."
                                )
                            },
                        ]
                    }
                ],
                "generationConfig": {"temperature": 0.0, "maxOutputTokens": 500},
            },
        )
        candidates = response.get("candidates", [])
        if not isinstance(candidates, list) or not candidates:
            return ""
        parts = candidates[0].get("content", {}).get("parts", [])
        return parts[0].get("text", "").strip() if parts else ""

    def _call_gemini_tts(
        self, text: str, language: Language, speed: float = 1.0, style: str | None = None
    ) -> tuple[str, str]:
        """Synthesize speech with Gemini using clean text and voice configuration."""
        payload: dict[str, Any] = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": text
                        }
                    ]
                }
            ],
            "generationConfig": {
                "responseModalities": ["AUDIO"],
                "speechConfig": {
                    "voiceConfig": {
                        "prebuiltVoiceConfig": {"voiceName": self.tts_voice}
                    },
                },
            },
        }
        response = self._call_gemini_endpoint(
            f"{self.tts_model}:generateContent",
            payload,
        )
        candidates = response.get("candidates", [])
        if not isinstance(candidates, list) or not candidates:
            return "", "audio/pcm;rate=24000"
        parts = candidates[0].get("content", {}).get("parts", [])
        if not parts:
            return "", "audio/pcm;rate=24000"
        inline = parts[0].get("inlineData", {})
        audio = inline.get("data", "") if isinstance(inline, dict) else ""
        media_type = (
            inline.get("mimeType", "audio/pcm;rate=24000")
            if isinstance(inline, dict)
            else "audio/pcm;rate=24000"
        )
        return (
            audio if isinstance(audio, str) else "",
            media_type if isinstance(media_type, str) else "audio/pcm;rate=24000",
        )

    @staticmethod
    def _language_code(language: Language) -> str:
        return {
            Language.AR: "ar-XA",
            Language.AM: "am-ET",
            Language.OM: "om-ET",
            Language.TI: "ti-ET",
            Language.EN: "en-US",
        }[language]

    @staticmethod
    def _post_json(url: str, payload: dict[str, object]) -> dict[str, object]:
        request = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=8) as response:
            value = json.loads(response.read().decode("utf-8"))
            return value if isinstance(value, dict) else {}

    def _call_gemini(self, prompt: str) -> str:
        response = self._call_gemini_endpoint(
            f"{self.model}:generateContent",
            {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "maxOutputTokens": 800},
            },
        )
        candidates = response.get("candidates", [])
        if not isinstance(candidates, list) or not candidates:
            return ""
        parts = candidates[0].get("content", {}).get("parts", [])
        return parts[0].get("text", "") if parts else ""
