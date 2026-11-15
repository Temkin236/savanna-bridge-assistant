"""Google Gemini, Translation, and Speech provider with labelled fallback."""

from __future__ import annotations

import base64
import html
import json
import logging
import os
import urllib.parse
import urllib.request

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.cloud")


class CloudProvider(AIProvider):
    """Google services for grounded answers, translation, STT, and TTS."""

    def __init__(self) -> None:
        self._offline_fallback = OfflineFaqProvider()
        shared_key = os.getenv("GOOGLE_API_KEY", "")
        self.api_key = (
            os.getenv("GOOGLE_AI_API_KEY")
            or os.getenv("CLOUD_AI_API_KEY")
            or os.getenv("CLOUD_API_KEY")
            or os.getenv("GOOGLE_AI_API")
            or shared_key
        )
        self.translate_key = os.getenv("GOOGLE_TRANSLATE_API_KEY") or shared_key
        self.speech_key = os.getenv("GOOGLE_SPEECH_API_KEY") or shared_key
        self.model = os.getenv("CLOUD_MODEL", "gemini-3.8-flash")
        self.tts_model = os.getenv("GOOGLE_TTS_MODEL", "gemini-3.8-flash-tts")
        self.tts_voice = os.getenv("GOOGLE_TTS_VOICE", "Kore")
        self._last_call_mocked = not bool(
            self.api_key or self.translate_key or self.speech_key
        )

    @property
    def name(self) -> str:
        return "google"

    @property
    def is_mocked(self) -> bool:
        return self._last_call_mocked

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        if source_lang == target_lang:
            self._last_call_mocked = False
            return text

        if self.translate_key:
            try:
                translated = self._call_cloud_translate(text, source_lang, target_lang)
                if translated:
                    self._last_call_mocked = False
                    return translated
            except Exception as exc:
                logger.warning("Google Cloud Translation error: %s", exc)

        prompt = (
            f"Translate the following text from {source_lang} to {target_lang}. "
            f"Return only the direct translation:\n\n{text}"
        )
        try:
            translated = self._call_gemini(prompt) if self.api_key else ""
            if translated.strip():
                self._last_call_mocked = False
                return translated.strip()
        except Exception as exc:
            logger.warning("Gemini translation error: %s", exc)

        self._last_call_mocked = True
        return self._offline_fallback.translate(text, source_lang, target_lang)

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        if not self.api_key:
            self._last_call_mocked = True
            return self._offline_fallback.generate_answer(
                question, context_chunks, language, simple_mode
            )

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

Course Content:
{context_text}

Learner Question:
{question}
"""
        try:
            answer = self._call_gemini(prompt)
            if answer.strip():
                self._last_call_mocked = False
                return answer.strip()
        except Exception as exc:
            logger.warning("Gemini API error: %s", exc)

        self._last_call_mocked = True
        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        if self.speech_key and audio_bytes:
            try:
                transcript = self._call_speech_to_text(audio_bytes, language)
                if transcript:
                    self._last_call_mocked = False
                    return transcript
            except Exception as exc:
                logger.warning("Google Speech-to-Text error: %s", exc)
        if self.api_key and len(audio_bytes) > 64:
            try:
                transcript = self._call_gemini_transcribe(audio_bytes, media_type, language)
                if transcript:
                    self._last_call_mocked = False
                    return transcript
            except Exception as exc:
                logger.warning("Gemini transcription error: %s", exc)
        self._last_call_mocked = True
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        if self.speech_key:
            try:
                audio = self._call_text_to_speech(text, language, speed)
                if audio:
                    self._last_call_mocked = False
                    return f"data:audio/mp3;base64,{audio}"
            except Exception as exc:
                logger.warning("Google Text-to-Speech error: %s", exc)
        if self.api_key:
            try:
                audio, media_type = self._call_gemini_tts(text, language, speed)
                if audio:
                    self._last_call_mocked = False
                    return f"data:{media_type};base64,{audio}"
            except Exception as exc:
                logger.warning("Gemini Text-to-Speech error: %s", exc)
        self._last_call_mocked = True
        return self._offline_fallback.synthesize(text, language, speed)

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
                "audio": {"content": base64.b64encode(audio_bytes).decode("ascii")},
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

    def _call_gemini_transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language
    ) -> str:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.model}:generateContent?key={urllib.parse.quote(self.api_key)}"
        )
        response = self._post_json(
            url,
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
        self, text: str, language: Language, speed: float
    ) -> tuple[str, str]:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.tts_model}:generateContent?key={urllib.parse.quote(self.api_key)}"
        )
        response = self._post_json(
            url,
            {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": (
                                    f"Read this at {speed:.2f}x speed, preserving its "
                                    f"language and meaning: {text}"
                                )
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "responseModalities": ["AUDIO"],
                    "speechConfig": {
                        "languageCode": self._language_code(language),
                        "voiceConfig": {
                            "prebuiltVoiceConfig": {"voiceName": self.tts_voice}
                        },
                    },
                    "responseFormat": {
                        "audio": {"mimeType": "AUDIO_MP3", "delivery": "INLINE"}
                    },
                },
            },
        )
        candidates = response.get("candidates", [])
        if not isinstance(candidates, list) or not candidates:
            return "", "audio/mp3"
        parts = candidates[0].get("content", {}).get("parts", [])
        if not parts:
            return "", "audio/mp3"
        inline = parts[0].get("inlineData", {})
        audio = inline.get("data", "") if isinstance(inline, dict) else ""
        media_type = inline.get("mimeType", "audio/mp3") if isinstance(inline, dict) else "audio/mp3"
        return (
            audio if isinstance(audio, str) else "",
            media_type if isinstance(media_type, str) else "audio/mp3",
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
        with urllib.request.urlopen(request, timeout=20) as response:
            value = json.loads(response.read().decode("utf-8"))
            return value if isinstance(value, dict) else {}

    def _call_gemini(self, prompt: str) -> str:
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.model}:generateContent?key={urllib.parse.quote(self.api_key)}"
        )
        response = self._post_json(
            url,
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
