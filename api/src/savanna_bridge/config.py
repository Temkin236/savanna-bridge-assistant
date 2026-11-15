"""Application configuration loaded from environment variables."""

from __future__ import annotations

import os
from pathlib import Path

# Paths
API_DIR = Path(__file__).resolve().parents[2]
ROOT_DIR = API_DIR.parent
DEFAULT_DB_PATH = str(API_DIR / "savanna_bridge.db")

# Provider settings: "offline", "addis", "ollama", "cloud"
AI_PROVIDER: str = os.getenv("AI_PROVIDER", "offline").lower()

# Addis AI configuration
ADDIS_API_KEY: str = os.getenv("ADDIS_API_KEY", "")
ADDIS_BASE_URL: str = os.getenv("ADDIS_BASE_URL", "https://api.addisassistant.com/v1")

# Ollama configuration
OLLAMA_HOST: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2")

# Database
DB_PATH: str = os.getenv("DB_PATH", DEFAULT_DB_PATH)

# Security and auth
SECRET_KEY: str = os.getenv("SECRET_KEY", "savanna-bridge-hackathon-2026-secret-key")
BOT_API_SECRET: str = os.getenv("BOT_API_SECRET", "change-me-bot-secret")
TELEGRAM_BOT_USERNAME: str = os.getenv("TELEGRAM_BOT_USERNAME", "savannah_assistant3_bot")
TOKEN_EXPIRY_MINUTES: int = int(os.getenv("TOKEN_EXPIRY_MINUTES", "60"))
RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
CORS_ORIGINS: list[str] = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173,http://localhost:8080,http://127.0.0.1:8080,http://localhost:8082,http://127.0.0.1:8082,http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

# Retrieval settings
CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.30"))

# Service metadata
SERVICE_NAME: str = "savanna-bridge-api"
SERVICE_VERSION: str = "0.1.0"
