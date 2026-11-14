"""Tests for retrieval engine and /ask endpoint (Milestone A-M1)."""

from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)


def test_three_sample_course_questions_grounded() -> None:
    questions = [
        ("Explain Module 2", "en"),
        ("What are the customer service principles in Module 1?", "en"),
        ("How to handle inquiries and escalations in Module 3?", "en"),
    ]
    for q, lang in questions:
        res = client.post("/ask", json={"question": q, "language": lang})
        assert res.status_code == 200, f"Failed on question: {q}"
        data = res.json()
        assert data["reason"] == "grounded"
        assert data["offer_human"] is False
        assert len(data["citations"]) >= 1
        citation = data["citations"][0]
        assert citation["title"]
        assert citation["heading"]
        assert citation["url"].startswith("http")
        assert citation["page"] is not None


def test_amharic_course_question_grounded() -> None:
    res = client.post("/ask", json={"question": "ሞጁል 2 ደንበኛ አያያዝ", "language": "am"})
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert data["offer_human"] is False
    assert len(data["citations"]) >= 1
    assert "ሞጁል 2" in data["answer"]


def test_off_topic_question_refuses_safely() -> None:
    res = client.post("/ask", json={"question": "What is the capital of France?", "language": "en"})
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "low_confidence"
    assert data["offer_human"] is True
    assert data["citations"] == []
    assert "cannot verify" in data["answer"].lower()


def test_off_topic_amharic_refuses_safely() -> None:
    res = client.post("/ask", json={"question": "የእግር ኳስ ውጤት ማን አሸነፈ?", "language": "am"})
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "low_confidence"
    assert data["offer_human"] is True
    assert data["citations"] == []
    assert "ማረጋገጥ አልቻልኩም" in data["answer"]


def test_simple_mode_shortens_answer() -> None:
    res = client.post(
        "/ask",
        json={"question": "Explain Module 2", "language": "en", "simple_mode": True},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    # Simple mode produces short sentences
    words = data["answer"].split()
    assert len(words) <= 25
