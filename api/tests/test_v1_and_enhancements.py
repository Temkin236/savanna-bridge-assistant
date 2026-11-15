"""Tests for v1 versioned endpoints and enhancements (Track 3 compliance)."""

import uuid

from fastapi.testclient import TestClient

from savanna_bridge.language import LanguageGuard
from savanna_bridge.main import app

client = TestClient(app)


def test_api_v1_health() -> None:
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert data["service"] == "savanna-bridge-api"


def test_api_v1_ask_grounded() -> None:
    res = client.post(
        "/api/v1/ask",
        json={"question": "What does Module 2 teach?", "language": "en"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert len(data["citations"]) > 0


def test_sms_inbound_offline_grounded() -> None:
    res = client.post(
        "/sms/inbound",
        json={"from": "+251911223344", "text": "What is shaping the future of VA work?"},
    )
    assert res.status_code == 200
    assert res.headers["content-type"].startswith("text/plain")
    reply = res.text
    assert len(reply) <= 160
    assert "Savanna" in reply


def test_sms_inbound_offline_refusal() -> None:
    res = client.post(
        "/api/v1/sms/inbound",
        json={"from": "0912345678", "text": "What is the capital of Peru?"},
    )
    assert res.status_code == 200
    assert res.headers["content-type"].startswith("text/plain")
    reply = res.text
    assert len(reply) <= 160
    assert "not found in course" in reply.lower()


def test_link_revoke_and_attempt_limit() -> None:
    # 1. Start link
    start_res = client.post("/link/start", json={"session_id": "sess_test", "channel": "web"})
    assert start_res.status_code == 200
    link_id = start_res.json()["link_id"]
    _ = start_res.json()["code"]

    # 2. Test failed attempts increment
    for _ in range(4):
        bad_res = client.post("/link/confirm", json={"link_id": link_id, "code": "999999"})
        assert bad_res.status_code == 400

    # 5th attempt should lock code
    fifth_res = client.post("/link/confirm", json={"link_id": link_id, "code": "999999"})
    assert fifth_res.status_code in (400, 410, 429)

    # 3. Test Revoke on a fresh link
    start2 = client.post("/link/start", json={"session_id": "sess_test2", "channel": "web"})
    link_id2 = start2.json()["link_id"]
    revoke_res = client.post("/link/revoke", json={"link_id": link_id2})
    assert revoke_res.status_code == 200
    assert revoke_res.json()["revoked"] is True

    # 4. Attempting to consume revoked code returns 410 Gone
    confirm_revoked = client.post("/link/confirm", json={"link_id": link_id2, "code": start2.json()["code"]})
    assert confirm_revoked.status_code == 410


def test_content_and_escalations_endpoints() -> None:
    # Host content indexing
    content_res = client.post(
        "/api/v1/content",
        json={
            "course_id": "course_01",
            "chunks": [
                {
                    "title": "Accessible Web Design",
                    "heading": "Color Contrast",
                    "text": "Text must meet 4.5:1 ratio.",
                }
            ],
        },
    )
    assert content_res.status_code == 201
    assert content_res.json()["status"] == "indexed"

    # Escalations
    esc_res = client.post(
        "/api/v1/escalations",
        json={
            "conversation": [{"sender": "learner", "text": "Need human tutor for exercise 3"}],
            "language": "am",
            "reason": "Trouble understanding assignment",
        },
    )
    assert esc_res.status_code == 201
    assert "ticketId" in esc_res.json()
    assert "roomUrl" in esc_res.json()


def test_tenants_and_languages_metadata() -> None:
    tenants_res = client.get("/api/v1/tenants")
    assert tenants_res.status_code == 200
    tenants = tenants_res.json()
    assert len(tenants) >= 3
    tenant_ids = [t["id"] for t in tenants]
    assert "savanna" in tenant_ids
    assert "alx" in tenant_ids

    lang_res = client.get("/api/v1/languages")
    assert lang_res.status_code == 200
    languages = lang_res.json()
    lang_codes = [item["code"] for item in languages]
    assert "am" in lang_codes
    assert "ar" in lang_codes
    assert "om" in lang_codes


def test_language_guard_detection_and_normalization() -> None:
    # Arabic script detection
    assert LanguageGuard.detect_language("مرحبا كيف حالك؟") == "ar"
    # Ethiopic script detection
    assert LanguageGuard.detect_language("ሰላም እንዴት ነህ?") == "am"
    # Afaan Oromo detection
    assert LanguageGuard.detect_language("Akkam jirtu barnoota?") == "om"
    # English default
    assert LanguageGuard.detect_language("Hello, how are you?") == "en"

    # Ethiopian phone normalization
    assert LanguageGuard.normalize_ethiopian_phone("0911223344") == "+251911223344"
    assert LanguageGuard.normalize_ethiopian_phone("0711223344") == "+251711223344"
    assert LanguageGuard.normalize_ethiopian_phone("+251911223344") == "+251911223344"


def test_translation_routes_and_endpoint() -> None:
    # 1. Local language routes to Addis AI
    am_res = client.post(
        "/api/v1/translate",
        json={"text": "Hello world", "source_language": "en", "target_language": "am"},
    )
    assert am_res.status_code == 200
    am_data = am_res.json()
    assert am_data["provider"] == "addis"
    assert am_data["target_language"] == "am"
    assert "translated_text" in am_data

    # 2. English & Arabic routes to Gemini
    ar_res = client.post(
        "/api/v1/translate",
        json={"text": "Hello world", "source_language": "en", "target_language": "ar"},
    )
    assert ar_res.status_code == 200
    ar_data = ar_res.json()
    assert ar_data["provider"] == "gemini"
    assert ar_data["target_language"] == "ar"
    assert "translated_text" in ar_data


def test_accessibility_profile_crud_and_sync() -> None:
    ref = f"learner_voice_{uuid.uuid4().hex[:8]}"
    # 1. Default profile
    res = client.get(f"/api/v1/accessibility-profile?learner_ref={ref}")
    assert res.status_code == 200
    data = res.json()
    assert data["learner_ref"] == ref
    assert data["language"] == "en"
    assert data["voice_enabled"] is False

    # 2. Update profile with voice accessibility, large text, and speech rate
    update_payload = {
        "learner_ref": ref,
        "language": "am",
        "voice_enabled": True,
        "auto_welcome": True,
        "auto_tts": True,
        "speech_rate": 1.25,
        "voice_input_enabled": True,
        "screen_reader_mode": True,
        "keyboard_navigation": True,
        "high_contrast": True,
        "large_text": "larger",
        "simple_mode": True,
        "sync_enabled": True,
        "needs": ["screen_reader", "extra_time"],
        "other_text": "Need Tigrinya and Amharic voice assistance",
        "preferred_contact_mode": "voice",
        "onboarded": True,
    }
    put_res = client.post("/api/v1/accessibility-profile", json=update_payload)
    assert put_res.status_code == 200
    saved = put_res.json()
    assert saved["voice_enabled"] is True
    assert saved["language"] == "am"
    assert saved["speech_rate"] == 1.25
    assert saved["onboarded"] is True

    # 3. Retrieve saved profile (simulating another website restore)
    get_res = client.get(f"/api/v1/accessibility-profile?learner_ref={ref}")
    assert get_res.status_code == 200
    synced = get_res.json()
    assert synced["voice_enabled"] is True
    assert synced["language"] == "am"
    assert synced["high_contrast"] is True
    assert synced["large_text"] == "larger"
    assert synced["auto_welcome"] is True
    assert synced["auto_tts"] is True

