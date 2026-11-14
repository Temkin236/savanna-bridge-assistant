"""Tests for account linking, code expiry, and single-use validation (Milestone A-M2)."""

from datetime import UTC, datetime, timedelta

from fastapi.testclient import TestClient

from savanna_bridge.database import get_connection
from savanna_bridge.main import app, db

client = TestClient(app)


def test_link_start_creates_six_digit_code() -> None:
    res = client.post(
        "/link/start",
        json={"session_id": "test_session_01", "channel": "web", "learner_reference": "user_123"},
    )
    assert res.status_code == 200
    data = res.json()
    assert len(data["code"]) == 6
    assert data["code"].isdigit()
    assert data["single_use"] is True
    assert data["expires_at"]


def test_link_confirm_success_and_single_use() -> None:
    # 1. Start link
    start = client.post(
        "/link/start",
        json={"session_id": "session_single_use", "channel": "telegram"},
    ).json()

    # 2. First confirm should succeed
    confirm1 = client.post(
        "/link/confirm",
        json={"link_id": start["link_id"], "code": start["code"]},
    )
    assert confirm1.status_code == 200
    assert confirm1.json()["linked"] is True

    # 3. Second confirm must fail with 410 (already used)
    confirm2 = client.post(
        "/link/confirm",
        json={"link_id": start["link_id"], "code": start["code"]},
    )
    assert confirm2.status_code == 410
    err = confirm2.json()
    assert err["error"]["code"] == "code_expired"


def test_link_expired_code_fails_with_410() -> None:
    start = client.post(
        "/link/start",
        json={"session_id": "session_expired", "channel": "web"},
    ).json()

    # Artificially expire the link in SQLite
    past_iso = (datetime.now(UTC) - timedelta(minutes=15)).isoformat()
    with get_connection(db.db_path) as conn:
        conn.execute(
            "UPDATE links SET expires_at = ? WHERE link_id = ?", (past_iso, start["link_id"])
        )
        conn.commit()

    confirm = client.post(
        "/link/confirm",
        json={"link_id": start["link_id"], "code": start["code"]},
    )
    assert confirm.status_code == 410


def test_link_invalid_code_fails_with_400() -> None:
    start = client.post(
        "/link/start",
        json={"session_id": "session_invalid_code", "channel": "web"},
    ).json()

    confirm = client.post(
        "/link/confirm",
        json={"link_id": start["link_id"], "code": "000000"},
    )
    assert confirm.status_code == 400
