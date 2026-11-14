"""Tests for learner support preferences and accommodation drafting (Milestone A-M2)."""

from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)


def test_get_and_put_support_needs() -> None:
    # 1. Update preferences
    payload = {
        "needs": ["screen_reader_friendly", "extra_time", "written_instructions"],
        "other_text": "Prefer keyboard shortcuts over mouse navigation",
        "preferred_contact_mode": "text",
    }
    put_res = client.put("/support-needs", json=payload)
    assert put_res.status_code == 200
    saved = put_res.json()
    assert saved["needs"] == payload["needs"]
    assert saved["other_text"] == payload["other_text"]
    assert saved["preferred_contact_mode"] == "text"

    # 2. Get preferences
    get_res = client.get("/support-needs")
    assert get_res.status_code == 200
    retrieved = get_res.json()
    assert retrieved["needs"] == payload["needs"]
    assert retrieved["other_text"] == payload["other_text"]


def test_accommodation_draft_generation() -> None:
    payload = {
        "job_id": "job_01",
        "employer_name": "Addis Services Cooperative",
        "support_needs": ["written_instructions", "extra_time"],
        "language": "en",
    }
    res = client.post("/accommodation/draft", json=payload)
    assert res.status_code == 200
    draft = res.json()
    assert draft["editable"] is True
    assert draft["sent"] is False  # Never sent automatically
    assert "written" in draft["message"].lower()
    assert "extra response time" in draft["message"].lower()


def test_accommodation_draft_amharic() -> None:
    payload = {
        "employer_name": "አዲስ ሰርቪስስ",
        "support_needs": ["written_instructions"],
        "language": "am",
    }
    res = client.post("/accommodation/draft", json=payload)
    assert res.status_code == 200
    draft = res.json()
    assert "የቃለ-መጠይቅ" in draft["subject"]
    assert "በጽሑፍ" in draft["message"]
