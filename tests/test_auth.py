"""Comprehensive Authentication, Learner Isolation, and Privacy Tests.

Covers:
1. Helper endpoints without authentication return 401.
2. Learner tokens presented to helper endpoints return 403.
3. Learner ticket creation generates random url-safe ticket_secret (>= 32 chars).
4. Learner A cannot read, reply to, or delete Learner B's ticket.
5. Missing or invalid ticket secret returns 403 with identical response body
   to nonexistent tickets (zero existence leakage).
6. Helper login with environment credentials can claim, reply, and close tickets.
7. Expired helper sessions return 401.
8. Helper logout revokes session token (subsequent use returns 401).
9. Brute-force failed logins trigger 429 Too Many Requests with Retry-After header.
10. Application refuses to start in public-demo mode without configured helper secret.
11. Learner can manually delete their own ticket using their ticket secret.
12. Retention cleanup deletes closed tickets older than TICKET_RETENTION_DAYS.
13. Public teacher stats stay strictly aggregate and anonymous with zero ticket text.
"""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
import secrets
import sys
from pathlib import Path
from typing import Any

import jwt
import pytest
from fastapi.testclient import TestClient

# Ensure api and api/src are importable if running pytest from repository root
REPO_ROOT = Path(__file__).resolve().parent.parent
API_DIR = REPO_ROOT / "api"
API_SRC = API_DIR / "src"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))
if str(API_SRC) not in sys.path:
    sys.path.insert(0, str(API_SRC))

from savanna_bridge.auth import REVOKED_TOKENS, create_widget_token, revoke_helper_token  # noqa: E402
from savanna_bridge.config import (  # noqa: E402
    SECRET_KEY,
    validate_auth_config,
)
from savanna_bridge.database import get_connection  # noqa: E402
from savanna_bridge.main import app, db, login_rate_limiter  # noqa: E402

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_rate_limiter_and_state():
    """Ensure a clean rate-limiter state for each test."""
    login_rate_limiter.failures.clear()
    REVOKED_TOKENS.clear()
    yield
    login_rate_limiter.failures.clear()
    REVOKED_TOKENS.clear()


def test_helper_endpoints_without_auth_return_401() -> None:
    """Helper routes must reject requests without login with HTTP 401."""
    helper_routes = [
        ("GET", "/handoff/queue"),
        ("GET", "/api/v1/handoff/queue"),
        ("GET", "/tickets/queue"),
        ("GET", "/api/v1/tickets/queue"),
        ("POST", "/handoff/dummy_ticket_1/claim"),
        ("POST", "/api/v1/handoff/dummy_ticket_1/claim"),
        ("POST", "/tickets/dummy_ticket_1/claim"),
        ("POST", "/api/v1/tickets/dummy_ticket_1/claim"),
        ("POST", "/handoff/dummy_ticket_1/reply"),
        ("POST", "/api/v1/handoff/dummy_ticket_1/reply"),
        ("POST", "/tickets/dummy_ticket_1/reply"),
        ("POST", "/api/v1/tickets/dummy_ticket_1/reply"),
        ("POST", "/handoff/dummy_ticket_1/close"),
        ("POST", "/api/v1/handoff/dummy_ticket_1/close"),
        ("POST", "/tickets/dummy_ticket_1/close"),
        ("POST", "/api/v1/tickets/dummy_ticket_1/close"),
        ("POST", "/api/v1/tickets/cleanup"),
    ]

    for method, path in helper_routes:
        if method == "GET":
            res = client.get(path)
        else:
            json_body: dict[str, Any] = {}
            if "reply" in path:
                json_body = {"message": "hello learner"}
            elif "claim" in path:
                json_body = {"agent_ref": "Agent Sarah"}
            res = client.post(path, json=json_body)
        assert res.status_code == 401, f"{method} {path} expected 401, got {res.status_code}"


def test_learner_token_to_helper_routes_returns_403() -> None:
    """Presenting learner credentials to helper endpoints must return HTTP 403."""
    learner_token = create_widget_token(session_id="learner_anon_42", course_id="course_test")

    # 1. Learner JWT in Authorization header
    res1 = client.get("/handoff/queue", headers={"Authorization": f"Bearer {learner_token}"})
    assert res1.status_code == 403
    assert "Forbidden" in str(res1.json())

    # 2. Learner token in X-Widget-Token header
    res2 = client.get("/handoff/queue", headers={"X-Widget-Token": learner_token})
    assert res2.status_code == 403

    # 3. Learner token in X-Learner-Token header
    res3 = client.post(
        "/handoff/probe_ticket/close",
        headers={"X-Learner-Token": learner_token},
    )
    assert res3.status_code == 403

    # 4. Ticket secret in X-Ticket-Secret header
    res4 = client.post(
        "/handoff/probe_ticket/claim",
        headers={"X-Ticket-Secret": secrets.token_urlsafe(32)},
    )
    assert res4.status_code == 403


def test_learner_ticket_creation_anonymous_and_generates_secret() -> None:
    """Ticket creation must never ask for email or password and returns ticket_secret >= 32 chars."""
    payload = {
        "consent": True,
        "learner_ref": "anon_learner_101",
        "card": {
            "language": "en",
            "context": "Need help understanding Module 1 question 3",
            "support_needs": ["extra_time"],
            "contact_mode": "text",
        },
    }

    res = client.post("/handoff", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert "id" in data
    assert "ticket_secret" in data
    ticket_secret = data["ticket_secret"]
    assert isinstance(ticket_secret, str)
    assert len(ticket_secret) >= 32


def test_learner_isolation_learner_a_cannot_read_write_or_delete_learner_b() -> None:
    """Learner A cannot read, add message to, or delete Learner B's ticket."""
    ticket_a = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "learner_A",
            "card": {"language": "en", "context": "Question from Learner A"},
        },
    ).json()

    ticket_b = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "learner_B",
            "card": {"language": "am", "context": "Question from Learner B"},
        },
    ).json()

    id_a, secret_a = ticket_a["id"], ticket_a["ticket_secret"]
    id_b, secret_b = ticket_b["id"], ticket_b["ticket_secret"]

    # Learner A can read own ticket
    res_a_read = client.get(f"/tickets/{id_a}", headers={"X-Ticket-Secret": secret_a})
    assert res_a_read.status_code == 200
    assert res_a_read.json()["id"] == id_a

    # Learner A cannot read Learner B's ticket
    res_b_read = client.get(f"/tickets/{id_b}", headers={"X-Ticket-Secret": secret_a})
    assert res_b_read.status_code == 403

    # Learner A cannot add message to Learner B's ticket
    res_b_msg = client.post(
        f"/tickets/{id_b}/messages",
        headers={"X-Ticket-Secret": secret_a},
        json={"message": "Injected message from Learner A"},
    )
    assert res_b_msg.status_code == 403

    # Learner A cannot delete Learner B's ticket
    res_b_del = client.delete(
        f"/tickets/{id_b}",
        headers={"X-Ticket-Secret": secret_a},
    )
    assert res_b_del.status_code == 403

    # Learner B's ticket is intact and readable by Learner B
    res_b_own = client.get(f"/tickets/{id_b}", headers={"X-Ticket-Secret": secret_b})
    assert res_b_own.status_code == 200
    assert res_b_own.json()["id"] == id_b


def test_wrong_secret_returns_403_identical_to_missing_ticket() -> None:
    """Wrong secret returns 403 with the same error message as a missing ticket (no existence leakage)."""
    ticket = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "learner_probe",
            "card": {"language": "en", "context": "Probe ticket existence"},
        },
    ).json()
    real_id = ticket["id"]
    fake_id = "nonexistent_ticket_999999"
    bad_secret = secrets.token_urlsafe(32)

    def extract_error(resp):
        data = resp.json()
        err = data.get("error", {})
        return {
            "code": err.get("code") or data.get("detail"),
            "message": err.get("message") or data.get("detail"),
        }

    # 1. GET requests
    real_res = client.get(f"/tickets/{real_id}", headers={"X-Ticket-Secret": bad_secret})
    fake_res = client.get(f"/tickets/{fake_id}", headers={"X-Ticket-Secret": bad_secret})
    no_secret_res = client.get(f"/tickets/{real_id}")

    assert real_res.status_code == 403
    assert fake_res.status_code == 403
    assert no_secret_res.status_code == 403
    assert extract_error(real_res) == extract_error(fake_res) == extract_error(no_secret_res)

    # 2. POST message requests
    msg_payload = {"message": "probe", "ticket_secret": bad_secret}
    real_msg_res = client.post(f"/tickets/{real_id}/messages", json=msg_payload)
    fake_msg_res = client.post(f"/tickets/{fake_id}/messages", json=msg_payload)

    assert real_msg_res.status_code == 403
    assert fake_msg_res.status_code == 403
    assert extract_error(real_msg_res) == extract_error(fake_msg_res)

    # 3. DELETE requests
    real_del_res = client.delete(
        f"/tickets/{real_id}",
        headers={"X-Ticket-Secret": bad_secret},
    )
    fake_del_res = client.delete(
        f"/tickets/{fake_id}",
        headers={"X-Ticket-Secret": bad_secret},
    )

    assert real_del_res.status_code == 403
    assert fake_del_res.status_code == 403
    assert extract_error(real_del_res) == extract_error(fake_del_res)


def test_correct_helper_login_can_claim_reply_and_close(monkeypatch) -> None:
    """Valid helper credentials allow claiming, replying, and closing tickets."""
    test_password = "secure_mentor_pass_2026"
    monkeypatch.setenv("HELPER_PASSWORD", test_password)

    # 1. Create a ticket
    ticket = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "learner_lifecycle",
            "card": {"language": "en", "context": "Need mentor clarification"},
        },
    ).json()
    ticket_id = ticket["id"]

    # 2. Helper logs in
    login_res = client.post("/api/v1/helper/login", json={"password": test_password})
    assert login_res.status_code == 200
    token = login_res.json()["token"]
    assert token
    auth_header = {"Authorization": f"Bearer {token}"}

    # 3. View queue
    queue_res = client.get("/handoff/queue", headers=auth_header)
    assert queue_res.status_code == 200
    items = queue_res.json().get("items", [])
    assert any(item["id"] == ticket_id for item in items)

    # 4. Helper claims ticket
    claim_res = client.post(
        f"/handoff/{ticket_id}/claim",
        headers=auth_header,
        json={"agent_ref": "Agent Sarah"},
    )
    assert claim_res.status_code == 200
    assert claim_res.json()["status"] == "claimed"

    # 5. Helper replies to ticket
    reply_res = client.post(
        f"/handoff/{ticket_id}/reply",
        headers=auth_header,
        json={"message": "Here is the explanation for your course query."},
    )
    assert reply_res.status_code == 200
    assert reply_res.json()["message"] == "Here is the explanation for your course query."

    # 6. Helper closes ticket
    close_res = client.post(
        f"/handoff/{ticket_id}/close",
        headers=auth_header,
        json={"resolution": "Resolved during mentor live session."},
    )
    assert close_res.status_code == 200
    assert close_res.json()["status"] == "closed"


def test_expired_session_returns_401() -> None:
    """An expired helper session token must return HTTP 401."""
    expired_payload = {
        "sub": "agent_sarah",
        "role": "helper",
        "exp": datetime.now(UTC) - timedelta(minutes=10),
    }
    expired_token = jwt.encode(expired_payload, SECRET_KEY, algorithm="HS256")

    res = client.get("/handoff/queue", headers={"Authorization": f"Bearer {expired_token}"})
    assert res.status_code == 401
    assert "expired" in str(res.json()).lower()


def test_helper_logout_revokes_token(monkeypatch) -> None:
    """Logging out revokes the helper token; subsequent requests return 401."""
    test_password = "logout_test_pass"
    monkeypatch.setenv("HELPER_PASSWORD", test_password)

    login_res = client.post("/api/v1/helper/login", json={"password": test_password})
    assert login_res.status_code == 200
    token = login_res.json()["token"]
    auth_header = {"Authorization": f"Bearer {token}"}

    # Queue access works before logout
    assert client.get("/handoff/queue", headers=auth_header).status_code == 200

    # Logout
    logout_res = client.post("/api/v1/helper/logout", headers=auth_header)
    assert logout_res.status_code == 200

    # Queue access fails with 401 after logout
    assert client.get("/handoff/queue", headers=auth_header).status_code == 401


def test_failed_logins_are_rate_limited(monkeypatch) -> None:
    """Repeated failed login attempts trigger HTTP 429 with Retry-After header."""
    monkeypatch.setenv("HELPER_PASSWORD", "correct_pass")

    # 5 failed attempts
    for _ in range(5):
        res = client.post("/api/v1/helper/login", json={"password": "wrong_password"})
        assert res.status_code == 401

    # 6th attempt is rate-limited
    res_limited = client.post("/api/v1/helper/login", json={"password": "wrong_password"})
    assert res_limited.status_code == 429
    assert "Retry-After" in res_limited.headers
    assert int(res_limited.headers["Retry-After"]) > 0


def test_app_refuses_to_start_without_helper_secret_in_public_demo(monkeypatch) -> None:
    """validate_auth_config() refuses to start when public demo mode has no helper secret."""
    monkeypatch.setenv("PUBLIC_DEMO", "true")
    monkeypatch.delenv("HELPER_PASSWORD", raising=False)
    monkeypatch.delenv("HELPER_API_KEY", raising=False)
    monkeypatch.delenv("HELPER_AGENT_KEY", raising=False)

    with pytest.raises(RuntimeError, match="Refusing to start in public-demo mode"):
        validate_auth_config()


def test_learner_manual_ticket_deletion() -> None:
    """Learners can manually delete their ticket using their ticket secret."""
    ticket = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "learner_delete_test",
            "card": {"language": "en", "context": "Ticket to be deleted by learner"},
        },
    ).json()
    ticket_id = ticket["id"]
    ticket_secret = ticket["ticket_secret"]

    del_res = client.delete(
        f"/tickets/{ticket_id}",
        headers={"X-Ticket-Secret": ticket_secret},
    )
    assert del_res.status_code == 200
    assert del_res.json()["deleted"] is True

    # After deletion, ticket is gone: request with secret gives uniform 403
    get_res = client.get(
        f"/tickets/{ticket_id}",
        headers={"X-Ticket-Secret": ticket_secret},
    )
    assert get_res.status_code == 403


def test_retention_cleanup_job(monkeypatch) -> None:
    """Closed tickets older than TICKET_RETENTION_DAYS are purged by cleanup."""
    test_key = "cleanup_helper_key_test"
    monkeypatch.setenv("HELPER_API_KEY", test_key)

    ticket = client.post(
        "/handoff",
        json={
            "consent": True,
            "learner_ref": "retention_learner",
            "card": {"language": "en", "context": "Older closed ticket"},
        },
    ).json()
    ticket_id = ticket["id"]
    db.close_handoff(ticket_id, resolution="Old resolution")

    # Manually backdate closed_at to 14 days ago
    old_time = (datetime.now(UTC) - timedelta(days=14)).isoformat()
    with get_connection(db.db_path) as conn:
        conn.execute("UPDATE handoffs SET closed_at = ? WHERE id = ?", (old_time, ticket_id))
        conn.commit()

    # Trigger cleanup job with helper key
    cleanup_res = client.post(
        "/api/v1/tickets/cleanup",
        headers={"X-Helper-Key": test_key},
    )
    assert cleanup_res.status_code == 200
    assert cleanup_res.json()["deleted"] >= 1

    # Verify ticket was deleted
    assert db.get_ticket_detail(ticket_id) is None


def test_teacher_stats_stay_anonymous() -> None:
    """Public stats endpoint returns aggregate counts only with zero ticket text."""
    res = client.get("/teacher/stats")
    assert res.status_code == 200
    data = res.json()
    assert "questions" in data
    assert "privacy" in data
    # Ensure no ticket secret or private text is leaked
    assert "ticket_secret" not in str(data)
    assert "ticket_id" not in str(data)
    assert "learner_ref" not in str(data)
