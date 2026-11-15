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


def test_telegram_link_start_contract() -> None:
    res = client.post("/api/v1/link/start", json={"session_id": "session_tg_start"})
    assert res.status_code == 200
    data = res.json()
    assert "token" in data
    assert "deep_link" in data
    assert data["expires_in"] == 600
    token = data["token"]
    assert len(token) == 32
    assert data["deep_link"].startswith("https://t.me/")
    assert f"?start={token}" in data["deep_link"]


def test_telegram_link_status_polling() -> None:
    from savanna_bridge.config import BOT_API_SECRET

    start = client.post("/api/v1/link/start", json={"session_id": "session_poll"}).json()
    token = start["token"]

    # Initial status: not linked
    status_init = client.get(f"/api/v1/link/status?token={token}")
    assert status_init.status_code == 200
    assert status_init.json() == {"linked": False, "channel": None}

    # Confirm link via bot
    confirm = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 987654321},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert confirm.status_code == 200
    assert confirm.json()["linked"] is True

    # Polled status after confirm: linked
    status_after = client.get(f"/api/v1/link/status?token={token}")
    assert status_after.status_code == 200
    assert status_after.json() == {"linked": True, "channel": "telegram"}


def test_telegram_link_wrong_secret_fails_with_403() -> None:
    start = client.post("/api/v1/link/start", json={"session_id": "session_secret_fail"}).json()
    token = start["token"]

    # Missing header
    res_missing = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 12345},
    )
    assert res_missing.status_code == 403

    # Wrong header
    res_wrong = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 12345},
        headers={"X-Bot-Secret": "wrong_secret_123"},
    )
    assert res_wrong.status_code == 403


def test_telegram_link_token_reuse_fails_with_410() -> None:
    from savanna_bridge.config import BOT_API_SECRET

    start = client.post("/api/v1/link/start", json={"session_id": "session_reuse"}).json()
    token = start["token"]

    # First confirm succeeds
    res1 = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 11111},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert res1.status_code == 200

    # Second confirm must fail with 410
    res2 = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 22222},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert res2.status_code == 410
    assert "already been used" in res2.json()["error"]["message"].lower()


def test_telegram_link_token_expiry_fails_with_410() -> None:
    from savanna_bridge.config import BOT_API_SECRET

    start = client.post("/api/v1/link/start", json={"session_id": "session_exp"}).json()
    token = start["token"]

    # Artificially expire the token in SQLite
    past_iso = (datetime.now(UTC) - timedelta(minutes=15)).isoformat()
    with get_connection(db.db_path) as conn:
        conn.execute("UPDATE links SET expires_at = ? WHERE token = ?", (past_iso, token))
        conn.commit()

    res = client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 33333},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert res.status_code == 410
    assert "expired" in res.json()["error"]["message"].lower()


def test_telegram_link_unknown_token_fails_with_404() -> None:
    from savanna_bridge.config import BOT_API_SECRET

    res = client.post(
        "/api/v1/link/confirm",
        json={"token": "non_existent_token_1234567890123", "telegram_chat_id": 44444},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert res.status_code == 404
    assert "unknown" in res.json()["error"]["message"].lower()


def test_telegram_link_disconnect() -> None:
    from savanna_bridge.config import BOT_API_SECRET

    start = client.post("/api/v1/link/start", json={"session_id": "session_disconnect"}).json()
    token = start["token"]

    # Confirm link
    client.post(
        "/api/v1/link/confirm",
        json={"token": token, "telegram_chat_id": 55555},
        headers={"X-Bot-Secret": BOT_API_SECRET},
    )
    assert client.get(f"/api/v1/link/status?token={token}").json()["linked"] is True

    # Disconnect
    res = client.post("/api/v1/link/disconnect", json={"token": token})
    assert res.status_code == 200
    assert res.json()["disconnected"] is True

    # Check status is now not linked
    assert client.get(f"/api/v1/link/status?token={token}").json()["linked"] is False
