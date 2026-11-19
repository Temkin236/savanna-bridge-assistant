"""Signed widget token generation and verification."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
from typing import Any

import jwt

from savanna_bridge.config import SECRET_KEY, TOKEN_EXPIRY_MINUTES


def create_widget_token(
    session_id: str,
    course_id: str = "course_demo",
    expires_in_minutes: int = TOKEN_EXPIRY_MINUTES,
) -> str:
    """Generate a signed HMAC-SHA256 JWT widget token."""
    now = datetime.now(UTC)
    payload = {
        "sub": session_id,
        "course_id": course_id,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_in_minutes)).timestamp()),
        "iss": "savanna-bridge",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_widget_token(token: str) -> dict[str, Any] | None:
    """Validate a signed widget token. Returns decoded payload or None if invalid/expired."""
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except (jwt.PyJWTError, Exception):
        return None


def create_helper_token(
    agent_ref: str = "agent_sarah",
    role: str = "helper",
    expires_in_minutes: int = 480,
) -> str:
    """Generate a signed HMAC-SHA256 JWT helper token."""
    now = datetime.now(UTC)
    payload = {
        "sub": agent_ref,
        "role": role,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_in_minutes)).timestamp()),
        "iss": "savanna-bridge",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_helper_token(token: str) -> dict[str, Any] | None:
    """Validate a helper token. Returns decoded payload if valid and role == 'helper'."""
    if not token:
        return None
    try:
        clean_token = token
        if clean_token.lower().startswith("bearer "):
            clean_token = clean_token[7:].strip()
        payload = jwt.decode(clean_token, SECRET_KEY, algorithms=["HS256"])
        if payload.get("role") in ("helper", "admin", "agent"):
            return payload
        return None
    except (jwt.PyJWTError, Exception):
        return None
