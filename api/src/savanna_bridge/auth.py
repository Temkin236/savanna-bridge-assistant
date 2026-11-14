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
