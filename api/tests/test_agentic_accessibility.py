"""Tests for resilient Groq support, language adaptation, and safe page actions."""

from __future__ import annotations

import httpx
from fastapi.testclient import TestClient

from savanna_bridge.ai.groq import GroqProvider
from savanna_bridge.main import app

client = TestClient(app)


def test_groq_rotates_to_second_key_after_rate_limit() -> None:
    provider = GroqProvider(keys=["first-test-key", "second-test-key"])
    attempted: list[str] = []

    def operation(key: str) -> str:
        attempted.append(key)
        if key == "first-test-key":
            request = httpx.Request("POST", "https://api.groq.com/openai/v1/chat/completions")
            response = httpx.Response(429, request=request)
            raise httpx.HTTPStatusError("rate limited", request=request, response=response)
        return "available"

    assert provider._with_rotation(operation) == "available"
    assert attempted == ["first-test-key", "second-test-key"]
    assert provider.is_mocked is False


def test_ask_adopts_confident_per_turn_language() -> None:
    response = client.post(
        "/api/v1/ask",
        json={"question": "\u0645\u0631\u062d\u0628\u0627", "language": "en"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["language"] == "ar"
    assert data["detected_language"] == "ar"
    assert data["language_confidence"] >= 0.9
    assert data["language_changed"] is True


def test_short_ambiguous_command_keeps_selected_language() -> None:
    response = client.post(
        "/api/v1/ask",
        json={"question": "send", "language": "am"},
    )
    assert response.status_code == 200
    assert response.json()["language"] == "am"
    assert response.json()["language_changed"] is False


def test_agent_planner_requires_confirmation_for_submit() -> None:
    response = client.post(
        "/api/v1/agent/plan",
        json={
            "utterance": "send",
            "language": "en",
            "available_controls": [{"id": "send-button", "label": "Send", "role": "button"}],
        },
    )
    assert response.status_code == 200
    plan = response.json()
    assert plan["action"] == "submit"
    assert plan["requires_confirmation"] is True
    assert "confirm" in plan["spoken_confirmation"].lower()


def test_agent_planner_reads_without_confirmation() -> None:
    response = client.post(
        "/api/v1/agent/plan",
        json={"utterance": "read this page", "language": "en"},
    )
    assert response.status_code == 200
    plan = response.json()
    assert plan["action"] == "read_page"
    assert plan["requires_confirmation"] is False


def test_notification_partial_update_preserves_consent() -> None:
    learner_ref = "agentic_notification_test"
    enabled = client.put(
        f"/api/v1/notification-settings?learner_ref={learner_ref}",
        json={
            "telegram_enabled": True,
            "consent_granted": True,
            "job_alerts": True,
            "platform_id": "job-board",
        },
    )
    assert enabled.status_code == 200

    muted = client.put(
        f"/api/v1/notification-settings?learner_ref={learner_ref}",
        json={"muted": True},
    )
    assert muted.status_code == 200
    settings = muted.json()
    assert settings["muted"] is True
    assert settings["consent_granted"] is True
    assert settings["telegram_enabled"] is True
    assert settings["platform_id"] == "job-board"
