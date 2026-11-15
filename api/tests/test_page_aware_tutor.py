"""Unit and integration tests for Page-Aware Multilingual AI Tutor."""

from __future__ import annotations

import base64
from fastapi.testclient import TestClient
from savanna_bridge.main import app

client = TestClient(app)

SAMPLE_PAGE_URL = "http://localhost:4173/savanna/pages/concept-with-navigation.html"
SAMPLE_PAGE_TITLE = "Concept page: The Future of the VA Industry | G-School Intranet"
SAMPLE_PAGE_CONTENT = """
The Virtual Assistant profession is not shrinking. It is evolving.
As businesses become more digital, more global, and more comfortable with remote collaboration,
the need for skilled support professionals continues to grow.

An Important Distinction:
Virtual Assistant can refer to AI software assistants such as chatbots and voice agents,
or human remote professionals who provide business support online. The future includes both.

What is Shaping the Future of VA Work?
1. More remote-first businesses: Companies build distributed teams across locations and time zones.
2. Growing demand for flexibility: Businesses value flexible, efficient, scalable support.
3. Rise of AI and digital productivity tools: Virtual assistants leverage generative AI to automate routine tasks.
"""

def test_page_aware_overview_english():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "What is this course about?",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert data["offer_human"] is False
    assert len(data["citations"]) > 0
    assert "Virtual Assistant" in data["answer"] or "evolving" in data["answer"].lower() or "future" in data["answer"].lower()

def test_page_aware_summarize():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "Summarize this page for me.",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert "summary" in data["answer"].lower() or "•" in data["answer"] or "future" in data["answer"].lower()

def test_page_aware_read_aloud():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "Read this page for me.",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert "Virtual Assistant" in data["answer"]
    assert "Important Distinction" in data["answer"]

def test_page_aware_amharic():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "ይህ ኮርስ ስለ ምንድን ነው? አብራራልኝ።",
            "language": "am",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["language"] == "am"
    assert data["reason"] == "grounded"
    assert len(data["citations"]) > 0
    # Must contain Ethiopic characters
    assert any("\u1200" <= c <= "\u137F" for c in data["answer"])

def test_page_aware_afaan_oromo():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "Koorsiin kun waa'ee maalii ti? Naaf ibsi.",
            "language": "om",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["language"] == "om"
    assert data["reason"] == "grounded"
    assert len(data["citations"]) > 0
    assert len(data["answer"]) > 15

def test_page_aware_arabic():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "ما موضوع هذه الدورة؟ اشرحها لي.",
            "language": "ar",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["language"] == "ar"
    assert data["reason"] == "grounded"
    assert len(data["citations"]) > 0
    # Must contain Arabic characters
    assert any("\u0600" <= c <= "\u06FF" for c in data["answer"])

def test_navigation_context_update():
    # Page 1: Customer Service
    cs_url = "http://localhost:4173/savanna/pages/module1.html"
    cs_content = "Customer Service Foundations: Rule 1 is respect. Rule 2 is active listening."
    res1 = client.post(
        "/api/v1/ask",
        json={
            "question": "What is this lesson about?",
            "language": "en",
            "page_url": cs_url,
            "page_title": "Module 1: Customer Service",
            "page_content": cs_content,
        },
    )
    assert res1.status_code == 200
    assert "Customer Service" in res1.json()["answer"] or "respect" in res1.json()["answer"].lower()

    # Learner navigates to Page 2: Cybersecurity Basics
    sec_url = "http://localhost:4173/savanna/pages/cybersecurity.html"
    sec_content = "Cybersecurity Fundamentals: Always use strong passwords and two-factor authentication."
    res2 = client.post(
        "/api/v1/ask",
        json={
            "question": "What is this lesson about?",
            "language": "en",
            "page_url": sec_url,
            "page_title": "Cybersecurity Fundamentals",
            "page_content": sec_content,
        },
    )
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["citations"][0]["url"] == sec_url
    assert "Cybersecurity" in data2["answer"] or "passwords" in data2["answer"].lower()
    # Must not contain stale page 1 content
    assert "Customer Service" not in data2["answer"]

def test_speech_endpoints_multilingual():
    # Test transcribe endpoint with Amharic
    res_stt = client.post(
        "/api/v1/speech/transcribe",
        json={
            "audio_base64": base64.b64encode(b"dummy-audio-bytes-header-sample").decode("utf-8"),
            "media_type": "audio/webm",
            "language": "am",
            "retain": False,
        },
    )
    assert res_stt.status_code == 200
    assert any("\u1200" <= c <= "\u137F" for c in res_stt.json()["transcript"])

    # Test synthesize endpoint with Afaan Oromo
    res_tts = client.post(
        "/api/v1/speech/synthesize",
        json={
            "text": "Barnoota kana nagaan baradhaa.",
            "language": "om",
            "speed": 1.0,
        },
    )
    assert res_tts.status_code == 200
    assert "audio_url" in res_tts.json()

def test_page_aware_followup_example():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "Explain this concept with examples.",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert "example" in data["answer"].lower()

def test_page_aware_followup_prerequisite():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "What should I understand before moving to the next lesson?",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert "next lesson" in data["answer"].lower() or "before" in data["answer"].lower()

def test_page_aware_followup_quiz():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "Quiz me on this topic to test my understanding.",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["reason"] == "grounded"
    assert "1." in data["answer"] and "2." in data["answer"]

def test_page_aware_overview_invites_followups():
    res = client.post(
        "/api/v1/ask",
        json={
            "question": "What is this course about?",
            "language": "en",
            "page_url": SAMPLE_PAGE_URL,
            "page_title": SAMPLE_PAGE_TITLE,
            "page_content": SAMPLE_PAGE_CONTENT,
            "section": "The Future of the VA Industry",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert "Would you like me to" in data["answer"] or "Explain this concept with practical examples" in data["answer"]


