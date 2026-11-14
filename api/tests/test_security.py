"""Tests for security, rate limiting, and signed widget tokens (Milestones A-M3, A-M4)."""

from fastapi.testclient import TestClient

from savanna_bridge.auth import create_widget_token
from savanna_bridge.main import app, rate_limiter

client = TestClient(app)


def test_invalid_widget_token_returns_401() -> None:
    res = client.get("/support-needs", headers={"X-Widget-Token": "invalid.jwt.token"})
    assert res.status_code == 401
    err = res.json()
    assert err["error"]["code"] == "invalid_widget_token"
    assert "request_id" in err["error"]


def test_valid_widget_token_accepted() -> None:
    token = create_widget_token(session_id="session_valid", course_id="course_demo")
    res = client.get("/support-needs", headers={"X-Widget-Token": token})
    assert res.status_code == 200


def test_rate_limiting_returns_429() -> None:
    # Set low rate limit temporarily
    old_max = rate_limiter.max_requests
    rate_limiter.max_requests = 3
    rate_limiter.requests.clear()

    try:
        # 3 allowed requests
        for _ in range(3):
            r = client.get("/support-needs")
            assert r.status_code == 200

        # 4th request must be rate limited
        blocked = client.get("/support-needs")
        assert blocked.status_code == 429
        assert "Retry-After" in blocked.headers
        data = blocked.json()
        assert data["error"]["code"] == "rate_limited"
    finally:
        rate_limiter.max_requests = old_max
        rate_limiter.requests.clear()
