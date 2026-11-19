"""Application configuration loaded from environment variables."""

from __future__ import annotations

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# Paths
API_DIR = Path(__file__).resolve().parents[2]
ROOT_DIR = API_DIR.parent
DEFAULT_DB_PATH = str(API_DIR / "savanna_bridge.db")

# Local development uses the repository-level environment file. Values already
# provided by the process or deployment platform keep precedence.
if "pytest" not in sys.modules and not os.getenv("TESTING"):
    load_dotenv(ROOT_DIR / ".env", override=False)

# Gemini API key (canonical single variable with legacy fallbacks)
GEMINI_API_KEY: str = (
    os.getenv("GEMINI_API_KEY")
    or os.getenv("GOOGLE_AI_API_KEY")
    or os.getenv("CLOUD_AI_API_KEY")
    or os.getenv("GOOGLE_API_KEY")
    or ""
)
GOOGLE_AI_API_KEY: str = GEMINI_API_KEY

# Provider settings: "gemini", "offline", "groq", "auto"
# Defaults: "gemini" when GEMINI_API_KEY is present, otherwise "offline"
AI_PROVIDER: str = os.getenv("AI_PROVIDER", "gemini" if GEMINI_API_KEY else "offline").lower()
TTS_PROVIDER: str = os.getenv("TTS_PROVIDER", "gemini").lower()
GEMINI_TTS_MODEL: str = os.getenv("GEMINI_TTS_MODEL", "gemini-3.8-flash-lite-tts")
GEMINI_TTS_VOICE: str = os.getenv("GEMINI_TTS_VOICE", "Aoede")
GOOGLE_TTS_MODEL: str = os.getenv("GOOGLE_TTS_MODEL", GEMINI_TTS_MODEL)
GOOGLE_TTS_VOICE: str = os.getenv("GOOGLE_TTS_VOICE", GEMINI_TTS_VOICE)

# Groq is a supporting provider. Multiple keys are accepted so a rate-limited
# or unavailable key can be rotated without exposing credentials to the widget.
GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
GROQ_API_KEY_2: str = os.getenv("GROQ_API_KEY_2", "")
GROQ_API_KEYS: str = os.getenv("GROQ_API_KEYS", "")
GROQ_CHAT_MODEL: str = os.getenv("GROQ_CHAT_MODEL", "llama-3.3-70b-versatile")
GROQ_STT_MODEL: str = os.getenv("GROQ_STT_MODEL", "whisper-large-v3-turbo")
GROQ_TTS_MODEL_EN: str = os.getenv(
    "GROQ_TTS_MODEL_EN", "canopylabs/orpheus-v1-english"
)
GROQ_TTS_MODEL_AR: str = os.getenv(
    "GROQ_TTS_MODEL_AR", "canopylabs/orpheus-arabic-saudi"
)

# Gemini and Google Cloud TTS settings
GOOGLE_TTS_MODEL: str = os.getenv("GOOGLE_TTS_MODEL", GEMINI_TTS_MODEL)
GOOGLE_TTS_VOICE: str = os.getenv("GOOGLE_TTS_VOICE", GEMINI_TTS_VOICE)

# Database
DB_PATH: str = os.getenv("DB_PATH", DEFAULT_DB_PATH)

# Security and auth
SECRET_KEY: str = os.getenv("SECRET_KEY", "savanna-bridge-hackathon-2026-secret-key")
BOT_API_SECRET: str = os.getenv("BOT_API_SECRET", "change-me-bot-secret")
TELEGRAM_BOT_USERNAME: str = os.getenv("TELEGRAM_BOT_USERNAME", "savannah_assistant3_bot")
HELPER_USERNAME: str = os.getenv("HELPER_USERNAME", "agent_sarah")
HELPER_PASSWORD: str = os.getenv("HELPER_PASSWORD", "savanna2026")
HELPER_AGENT_KEY: str = os.getenv("HELPER_AGENT_KEY", "helper-secret-key-2026")
TOKEN_EXPIRY_MINUTES: int = int(os.getenv("TOKEN_EXPIRY_MINUTES", "60"))
RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
CORS_ORIGINS: list[str] = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173,http://localhost:8080,http://127.0.0.1:8080,http://localhost:8082,http://127.0.0.1:8082,http://localhost:8090,http://127.0.0.1:8090,http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

# Retrieval settings
CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.30"))

# Service metadata
SERVICE_NAME: str = "savanna-bridge-api"
SERVICE_VERSION: str = "0.1.0"
