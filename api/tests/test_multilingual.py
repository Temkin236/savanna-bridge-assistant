"""Provider routing and labelled multilingual fallback tests."""

from __future__ import annotations

from fastapi.testclient import TestClient

from savanna_bridge.ai.cloud import CloudProvider
from savanna_bridge.ai.factory import get_ai_provider
from savanna_bridge.ai.multilingual import MultilingualProvider
from savanna_bridge.main import app
from savanna_bridge.models import Language

client = TestClient(app)


def test_auto_provider_routes_languages() -> None:
    provider = get_ai_provider("auto")
    assert isinstance(provider, MultilingualProvider)

    provider.translate("hello", "en", "am")
    assert provider.name in ("auto/google", "auto/gemini", "auto/groq")

    provider.translate("hello", "en", "ar")
    assert provider.name in ("auto/google", "auto/gemini", "auto/groq")


def test_google_translation_uses_dedicated_api(monkeypatch) -> None:
    monkeypatch.setenv("GOOGLE_TRANSLATE_API_KEY", "test-key")
    provider = CloudProvider()
    monkeypatch.setattr(
        provider,
        "_post_json",
        lambda url, payload: {
            "data": {"translations": [{"translatedText": "مرحبا &amp; أهلا"}]}
        },
    )

    result = provider.translate("Hello and welcome", "en", "ar")

    assert result == "مرحبا & أهلا"
    assert provider.is_mocked is False


def test_google_speech_returns_playable_data_url(monkeypatch) -> None:
    monkeypatch.setenv("GOOGLE_SPEECH_API_KEY", "test-key")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    monkeypatch.delenv("GEMINI_API_KEYS", raising=False)
    monkeypatch.delenv("GOOGLE_AI_API_KEY", raising=False)
    monkeypatch.delenv("GOOGLE_API_KEY", raising=False)
    provider = CloudProvider()
    monkeypatch.setattr(
        provider,
        "_post_json",
        lambda url, payload: {"audioContent": "SUQzBA=="},
    )

    result = provider.synthesize("مرحبا", Language.AR)

    assert result == "data:audio/mp3;base64,SUQzBA=="
    assert provider.is_mocked is False


def test_google_ai_key_can_generate_gemini_speech(monkeypatch) -> None:
    monkeypatch.setenv("GOOGLE_AI_API_KEY", "test-key")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    monkeypatch.delenv("GEMINI_API_KEYS", raising=False)
    monkeypatch.delenv("GOOGLE_SPEECH_API_KEY", raising=False)
    monkeypatch.delenv("GOOGLE_API_KEY", raising=False)
    provider = CloudProvider()
    monkeypatch.setattr(
        provider,
        "_post_json",
        lambda url, payload: {
            "candidates": [
                {
                    "content": {
                        "parts": [
                            {
                                "inlineData": {
                                    "data": "SUQzBA==",
                                    "mimeType": "audio/mp3",
                                }
                            }
                        ]
                    }
                }
            ]
        },
    )

    result = provider.synthesize("مرحبا", Language.AR)

    assert result == "data:audio/mp3;base64,SUQzBA=="
    assert provider.is_mocked is False


def test_translate_endpoint_labels_offline_fallback(monkeypatch) -> None:
    from savanna_bridge.ai.groq import GroqProvider

    monkeypatch.setattr(GroqProvider, "translate", lambda self, text, src, tgt: "")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    monkeypatch.delenv("GEMINI_API_KEYS", raising=False)
    monkeypatch.delenv("GOOGLE_AI_API_KEY", raising=False)
    monkeypatch.delenv("GOOGLE_TRANSLATE_API_KEY", raising=False)
    response = client.post(
        "/api/v1/translate",
        json={
            "text": "Welcome",
            "source_language": "en",
            "target_language": "ar",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["provider"] in ("auto/google", "auto/gemini", "auto/offline")
    assert payload["mocked"] is True
    assert payload["target_language"] == "ar"
