"""Tests for human handoff and agent console queue (Milestone A-M3)."""

from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)


def test_handoff_requires_consent() -> None:
    payload = {
        "consent": False,
        "card": {
            "language": "en",
            "context": "Needs help with exam navigation",
            "support_needs": ["screen_reader_friendly"],
            "contact_mode": "video",
        },
    }
    res = client.post("/handoff", json=payload)
    assert res.status_code == 400


def test_handoff_full_lifecycle_claim_reply_close(monkeypatch) -> None:
    # Set helper credentials in environment (no default credentials permitted)
    monkeypatch.setenv("HELPER_PASSWORD", "savanna2026")

    # 1. Create handoff
    create_payload = {
        "consent": True,
        "learner_ref": "learner_test_42",
        "card": {
            "language": "am",
            "context": "የሞጁል 2 ምዝገባ ጥያቄ",
            "support_needs": ["written_instructions"],
            "contact_mode": "text",
        },
    }
    created = client.post("/handoff", json=create_payload)
    assert created.status_code == 201
    handoff_data = created.json()
    handoff_id = handoff_data["id"]
    assert handoff_data["status"] == "waiting"
    assert "ticket_secret" in handoff_data
    assert "https://meet.jit.si/savanna-bridge-demo-" in handoff_data["room_url"]

    # 2. Privacy check: unauthenticated queue read & close must be rejected (401)
    unauth_queue = client.get("/handoff/queue")
    assert unauth_queue.status_code == 401

    unauth_close = client.post(f"/handoff/{handoff_id}/close", json={})
    assert unauth_close.status_code == 401

    # 3. Helper login
    login_res = client.post(
        "/api/v1/helper/login",
        json={"username": "agent_sarah", "password": "savanna2026"},
    )
    assert login_res.status_code == 200
    token = login_res.json()["token"]
    auth_headers = {"Authorization": f"Bearer {token}"}

    # 4. Check queue with helper token
    queue_res = client.get("/handoff/queue", headers=auth_headers)
    assert queue_res.status_code == 200
    waiting_ids = [item["id"] for item in queue_res.json()["items"]]
    assert handoff_id in waiting_ids

    # 5. Agent claims handoff
    claim_res = client.post(
        f"/handoff/{handoff_id}/claim",
        json={"agent_ref": "agent_sarah"},
        headers=auth_headers,
    )
    assert claim_res.status_code == 200
    assert claim_res.json()["status"] == "claimed"
    assert claim_res.json()["agent_ref"] == "agent_sarah"

    # 6. Agent replies
    reply_res = client.post(
        f"/handoff/{handoff_id}/reply",
        json={"agent_ref": "agent_sarah", "message": "ሰላም፣ በምን ልርዳዎት?"},
        headers=auth_headers,
    )
    assert reply_res.status_code == 200
    reply_data = reply_res.json()
    assert reply_data["delivered"] is True
    assert reply_data["message"] == "ሰላም፣ በምን ልርዳዎት?"

    # 7. Agent closes handoff
    close_res = client.post(f"/handoff/{handoff_id}/close", json={}, headers=auth_headers)
    assert close_res.status_code == 200
    assert close_res.json()["status"] == "closed"
