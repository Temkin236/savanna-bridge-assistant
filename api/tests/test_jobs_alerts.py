"""Tests for jobs, alert subscriptions, and learner endpoints (Milestone A-M3)."""

from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)


def test_list_jobs_and_filter() -> None:
    # 1. All jobs
    res = client.get("/jobs")
    assert res.status_code == 200
    jobs = res.json()["items"]
    assert len(jobs) >= 2

    # 2. Filter by field
    res_field = client.get("/jobs", params={"field": "accessibility"})
    assert res_field.status_code == 200
    acc_jobs = res_field.json()["items"]
    assert len(acc_jobs) >= 1
    assert "accessibility" in acc_jobs[0]["title"].lower()

    # 3. Filter by accommodation
    res_need = client.get("/jobs", params={"support_need": "screen_reader"})
    assert res_need.status_code == 200
    screen_reader_jobs = res_need.json()["items"]
    assert len(screen_reader_jobs) >= 1


def test_alert_subscriptions_and_matching() -> None:
    # 1. Subscribe
    sub_payload = {
        "learner_ref": "learner_sub_test",
        "channel": "telegram",
        "fields": ["customer support"],
        "support_needs": ["written_instructions"],
        "active": True,
    }
    sub_res = client.post("/alerts/subscriptions", json=sub_payload)
    assert sub_res.status_code == 201

    # 2. Match a matching job
    match_payload = {
        "job": {
            "id": "job_match_test",
            "title": "Customer Support Specialist",
            "description": "Provide customer care with written instructions and chat.",
            "hiring_organization": "Addis Tech",
            "job_location": "Addis Ababa",
            "date_posted": "2026-11-14",
            "application_url": "https://jobs.example.org/apply",
            "source_url": "https://jobs.example.org/apply",
            "accommodations": ["written_instructions"],
        }
    }
    match_res = client.post("/alerts/match", json=match_payload)
    assert match_res.status_code == 200
    matches = match_res.json()["matches"]
    assert any(m["learner_ref"] == "learner_sub_test" for m in matches)


def test_notification_settings_get_and_put() -> None:
    payload = {
        "deadlines": True,
        "new_lessons": False,
        "job_alerts": True,
        "live_help": False,
        "widget_enabled": True,
        "muted": False,
        "low_bandwidth": True,
    }
    put_res = client.put("/notification-settings", json=payload)
    assert put_res.status_code == 200
    assert put_res.json()["new_lessons"] is False
    assert put_res.json()["live_help"] is False

    get_res = client.get("/notification-settings")
    assert get_res.status_code == 200
    assert get_res.json()["new_lessons"] is False
    assert get_res.json()["low_bandwidth"] is True


def test_learner_deadlines_and_modules() -> None:
    deadlines_res = client.get("/learner/deadlines")
    assert deadlines_res.status_code == 200
    deadlines = deadlines_res.json()["items"]
    assert len(deadlines) >= 1
    assert deadlines[0]["due_at"]

    modules_res = client.get("/learner/modules")
    assert modules_res.status_code == 200
    modules = modules_res.json()["items"]
    assert len(modules) >= 2
    assert any(m["number"] == 2 for m in modules)


def test_teacher_stats_aggregated_and_anonymous() -> None:
    res = client.get("/teacher/stats")
    assert res.status_code == 200
    data = res.json()
    assert "questions" in data
    assert "privacy" in data
    assert "no learner names" in data["privacy"].lower()
