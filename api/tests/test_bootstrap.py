from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_grounded_answer_has_citation() -> None:
    response = client.post("/ask", json={"question": "Explain Module 2", "language": "en"})
    body = response.json()
    assert response.status_code == 200
    assert body["reason"] == "grounded"
    assert body["citations"]
    assert body["offer_human"] is False


def test_unknown_answer_refuses_and_offers_human() -> None:
    response = client.post("/ask", json={"question": "Who won the match?", "language": "en"})
    body = response.json()
    assert response.status_code == 200
    assert body["reason"] == "low_confidence"
    assert body["citations"] == []
    assert body["offer_human"] is True


def test_handoff_round_trip() -> None:
    created = client.post(
        "/handoff",
        json={
            "consent": True,
            "card": {
                "language": "en",
                "context": "Need help with Module 2",
                "support_needs": ["written_instructions"],
                "contact_mode": "text",
            },
        },
    )
    assert created.status_code == 201
    queue = client.get("/handoff/queue")
    assert any(item["id"] == created.json()["id"] for item in queue.json()["items"])
