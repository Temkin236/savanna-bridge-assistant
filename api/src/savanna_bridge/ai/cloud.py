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
        self.model = os.getenv("CLOUD_MODEL", "gemini-1.5-flash")

    @property
    def name(self) -> str:
        return "cloud"

    @property
    def is_mocked(self) -> bool:
        return not bool(self.api_key)

    def detect_language(self, text: str) -> Language:
        return self._offline_fallback.detect_language(text)

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        if not self.api_key:
            return self._offline_fallback.translate(text, source_lang, target_lang)

        prompt = f"Translate the following text from {source_lang} to {target_lang}. Return ONLY the direct translation:\n\n{text}"
        try:
            res = self._call_gemini(prompt)
            if res:
                return res.strip()
        except Exception as e:
            logger.warning("Gemini translate error: %s, falling back to offline", e)
        return self._offline_fallback.translate(text, source_lang, target_lang)

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
                "Respond in Tigrinya." if language == Language.TI else "Respond in English."
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
            logger.warning("Gemini API error: %s, falling back to offline", e)

        return self._offline_fallback.generate_answer(
            question, context_chunks, language, simple_mode
        )

    def transcribe(
        self, audio_bytes: bytes, media_type: str, language: Language, retain: bool = False
    ) -> str:
        return self._offline_fallback.transcribe(audio_bytes, media_type, language, retain)

    def synthesize(self, text: str, language: Language, speed: float = 1.0) -> str:
        return self._offline_fallback.synthesize(text, language, speed)

    def _call_gemini(self, prompt: str) -> str:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "maxOutputTokens": 800,
            }
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_data = json.loads(resp.read().decode("utf-8"))
            candidates = resp_data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "")
        return ""
