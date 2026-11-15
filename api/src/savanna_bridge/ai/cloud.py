"""Gemini / Cloud AI provider."""

from __future__ import annotations

import json
import logging
import os
import urllib.error
import urllib.request

from adapters.base import ContentChunk
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.models import Language

logger = logging.getLogger("savanna_bridge.ai.cloud")


class CloudProvider(AIProvider):
    """Google Gemini AI Provider."""

    def __init__(self) -> None:
        self._offline_fallback = OfflineFaqProvider()
        self.api_key = (
            os.getenv("CLOUD_AI_API_KEY")
            or os.getenv("CLOUD_API_KEY")
            or os.getenv("GOOGLE_AI_API")
            or os.getenv("GOOGLE_API_KEY")
            or ""
        )
        self.model = os.getenv("CLOUD_MODEL", "gemini-2.5-flash")

    @property
    def name(self) -> str:
        return "cloud"

    @property
    def is_mocked(self) -> bool:
        return not bool(self.api_key)

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate_direct(self, text: str, source_lang: str, target_lang: str) -> str:
        """Call Gemini to translate English and Arabic."""
        if not text or not text.strip():
            return text
        src = (source_lang or "en").lower().split("-")[0].strip()
        tgt = (target_lang or "en").lower().split("-")[0].strip()
        if src == tgt:
            return text

        if self.api_key:
            lang_names = {
                "en": "English",
                "ar": "Arabic",
                "am": "Amharic",
                "om": "Afaan Oromo",
                "ti": "Tigrinya",
            }
            src_name = lang_names.get(src, src)
            tgt_name = lang_names.get(tgt, tgt)

            prompt = (
                f"You are a professional educational translator. "
                f"Translate the following text accurately from {src_name} to {tgt_name}. "
                f"Preserve terminology and tone. Output ONLY the raw translated text without quotes or notes:\n\n{text}"
            )
            try:
                res = self._call_gemini(prompt)
                if res and res.strip():
                    return res.strip()
            except Exception as e:
                logger.warning("Gemini translate call error: %s", e)
        return ""

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """Translate text using Gemini for English and Arabic, delegating local languages to Addis AI."""
        if not text or not text.strip():
            return text
        src = (source_lang or "en").lower().split("-")[0].strip()
        tgt = (target_lang or "en").lower().split("-")[0].strip()
        if src == tgt:
            return text

        # If local language, route to Addis AI
        local_langs = {"am", "om", "ti", "so"}
        if src in local_langs or tgt in local_langs:
            from savanna_bridge.ai.addis import AddisAiProvider

            return AddisAiProvider().translate(text, src, tgt)

        # For English and Arabic, call Gemini directly
        direct = self.translate_direct(text, src, tgt)
        if direct:
            return direct

        from savanna_bridge.language import LanguageGuard

        return LanguageGuard._neural_translate(text, src, tgt)

    def generate_answer(
        self,
        question: str,
        context_chunks: list[ContentChunk],
        language: Language,
        simple_mode: bool = False,
    ) -> str:
        if not self.api_key:
            return self._offline_fallback.generate_answer(
                question, context_chunks, language, simple_mode
            )

        context_text = "\n\n".join(
            [f"--- Section: {c.heading} ---\n{c.content}" for c in context_chunks]
        )
        
        simplicity_instruction = (
            "Keep the response simple, short, and in very plain language."
            if simple_mode
            else "Provide a clear, accurate, and helpful response."
        )

        lang_instruction = "Respond in Amharic (አማርኛ)." if language == Language.AM else (
            "Respond in Afaan Oromo." if language == Language.OM else (
                "Respond in Tigrinya." if language == Language.TI else (
                    "Respond in Arabic." if language == Language.AR else "Respond in English."
                )
            )
        )

        prompt = f"""You are the Savanna Bridge Assistant, an accessible tutor.
You MUST base your answer strictly and solely on the provided Course Content below.
Do not invent information. {simplicity_instruction}
{lang_instruction}

Course Content:
{context_text}

Learner Question:
{question}
"""
        try:
            res = self._call_gemini(prompt)
            if res:
                return res.strip()
        except Exception as e:
            logger.warning("Gemini API error: %s, falling back to grounded platform extraction", e)

        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        if self.api_key and audio_bytes and len(audio_bytes) > 64:
            import base64
            b64_audio = base64.b64encode(audio_bytes).decode("utf-8")
            models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-pro"]
            for m in models:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={self.api_key}"
                payload = {
                    "contents": [{
                        "parts": [
                            {"inlineData": {"mimeType": media_type or "audio/webm", "data": b64_audio}},
                            {"text": f"Transcribe this speech accurately in {language.value}. Output only the transcribed text without extra formatting, notes, or punctuation marks."}
                        ]
                    }],
                    "generationConfig": {"temperature": 0.0, "maxOutputTokens": 300}
                }
                data = json.dumps(payload).encode("utf-8")
                req = urllib.request.Request(
                    url,
                    data=data,
                    headers={"Content-Type": "application/json"},
                    method="POST",
                )
                try:
                    with urllib.request.urlopen(req, timeout=12) as resp:
                        resp_data = json.loads(resp.read().decode("utf-8"))
                        candidates = resp_data.get("candidates", [])
                        if candidates:
                            parts = candidates[0].get("content", {}).get("parts", [])
                            if parts:
                                text = parts[0].get("text", "").strip()
                                if text:
                                    return text
                except Exception:
                    continue
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return self._offline_fallback.synthesize(text, language, speed)

    def _call_gemini(self, prompt: str) -> str:
        models = [self.model, "gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-pro"]
        models = list(dict.fromkeys([m for m in models if m]))

        last_err: Exception | None = None
        for m in models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={self.api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.2,
                    "maxOutputTokens": 800,
                },
            }
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                url,
                data=data,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=12) as resp:
                    resp_data = json.loads(resp.read().decode("utf-8"))
                    candidates = resp_data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts:
                            return parts[0].get("text", "")
            except Exception as e:
                last_err = e
                continue
        if last_err:
            raise last_err
        return ""
