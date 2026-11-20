"""Signed widget and helper token generation and verification."""

from __future__ import annotations

import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

import jwt

from savanna_bridge.config import SECRET_KEY, TOKEN_EXPIRY_MINUTES

# Set of revoked token strings or identifiers
REVOKED_TOKENS: set[str] = set()


def revoke_helper_token(token: str) -> None:
    """Revoke a helper token on logout."""
    if not token:
        return
    clean_token = token
    if clean_token.lower().startswith("bearer "):
        clean_token = clean_token[7:].strip()
    REVOKED_TOKENS.add(clean_token)


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
        "role": "learner",
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_in_minutes)).timestamp()),
        "iss": "savanna-bridge",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_widget_token(token: str) -> dict[str, Any] | None:
    """Validate a signed widget token. Returns decoded payload or None if invalid/expired."""
    if not token:
        return None
    clean_token = token
    if clean_token.lower().startswith("bearer "):
        clean_token = clean_token[7:].strip()
    try:
        payload = jwt.decode(clean_token, SECRET_KEY, algorithms=["HS256"])
        if "course_id" in payload or payload.get("role") == "learner":
            return payload
        return None
    except (jwt.PyJWTError, Exception):
        return None


def is_learner_token(token: str) -> bool:
    """Check whether a token represents a learner/widget token."""
    if not token:
        return False
    clean_token = token
    if clean_token.lower().startswith("bearer "):
        clean_token = clean_token[7:].strip()
    try:
        unverified = jwt.decode(
            clean_token,
            options={"verify_signature": False, "verify_exp": False},
        )
        if unverified.get("role") == "learner" or "course_id" in unverified:
            return True
        return unverified.get("role") not in ("helper", "admin", "agent")
    except Exception:
        pass
    return False


def create_helper_token(
    agent_ref: str = "agent_sarah",
    role: str = "helper",
    expires_in_minutes: int = 480,
) -> str:
    """Generate a signed HMAC-SHA256 JWT helper token."""
    now = datetime.now(UTC)
    payload = {
        "jti": secrets.token_hex(16),
        "sub": agent_ref,
        "role": role,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_in_minutes)).timestamp()),
        "iss": "savanna-bridge",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_helper_token(token: str) -> dict[str, Any] | None:
    """Validate a helper token.
    
    Returns decoded payload if valid and role in ('helper', 'admin', 'agent').
    Raises jwt.ExpiredSignatureError if the token has expired.
    Returns None if signature is invalid or token is revoked.
    """
    if not token:
        return None
    clean_token = token
    if clean_token.lower().startswith("bearer "):
        clean_token = clean_token[7:].strip()
    if clean_token in REVOKED_TOKENS:
        return None
    try:
        payload = jwt.decode(clean_token, SECRET_KEY, algorithms=["HS256"])
        if payload.get("role") in ("helper", "admin", "agent"):
            return payload
        return None
    except jwt.ExpiredSignatureError:
        raise
    except (jwt.PyJWTError, Exception):
        return None

