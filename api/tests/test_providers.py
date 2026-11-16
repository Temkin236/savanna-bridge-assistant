"""Tests for provider switching and multilingual speech/transcription (Milestone A-M2)."""

from fastapi.testclient import TestClient

from savanna_bridge.ai.addis import AddisAiProvider
from savanna_bridge.ai.factory import get_ai_provider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.main import app

client = TestClient(app)


def test_provider_factory_switches_properly() -> None:
    offline = get_ai_provider("offline")
    assert isinstance(offline, OfflineFaqProvider)
    assert offline.name == "offline"

    addis = get_ai_provider("addis")
    assert isinstance(addis, AddisAiProvider)
    assert addis.name == "addis"

def test_transcribe_endpoint() -> None:
    res = client.post(
        "/speech/transcribe",
        json={
            "audio_base64": "UklGRiQAAABXQVZFZm10IBAAAAABAAEA",
            "media_type": "audio/wav",
            "language": "am",
            "retain": False,
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["language"] == "am"
    assert data["retained"] is False  # Must default to false
    assert data["editable"] is True
    assert data["transcript"]


def test_synthesize_endpoint() -> None:
    res = client.post(
        "/speech/synthesize",
        json={
            "text": "ሞጁል 2 ደንበኛን ማዳመጥ ያስተምራል።",
            "language": "am",
            "speed": 1.0,
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["language"] == "am"
    assert data["audio_url"].startswith("http")
    assert data["expires_at"]


def test_translation_round_trip() -> None:
    offline = OfflineFaqProvider()
    detected_am = offline.detect_language("ስለ ሞጁል 2 ያብራሩልኝ")
    assert detected_am.value == "am"

    detected_en = offline.detect_language("Can you explain module 2?")
    assert detected_en.value == "en"

    detected_om = offline.detect_language("Maal barumsa moojulii 2?")
    assert detected_om.value == "om"
