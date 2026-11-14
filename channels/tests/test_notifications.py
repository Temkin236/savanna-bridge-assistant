"""Tests for notification drivers, sandbox labelling, and scheduler (Milestone C-M3)."""

from notification_channels import (
    AfricasTalkingSandboxDriver,
    MockSmsDriver,
    NotificationScheduler,
    TelegramDriver,
)


def test_sandbox_and_mock_drivers_are_clearly_labelled() -> None:
    sandbox = AfricasTalkingSandboxDriver(username="sandbox")
    assert sandbox.is_sandbox is True
    sandbox.send("+251911000000", "New job available")
    assert len(sandbox.sent_log) == 1
    assert sandbox.sent_log[0]["message"].startswith("[SANDBOX DEMO]")

    mock_sms = MockSmsDriver()
    assert mock_sms.is_sandbox is True
    mock_sms.send("+251922000000", "Deadline tomorrow")
    assert len(mock_sms.sent_log) == 1
    assert mock_sms.sent_log[0]["message"].startswith("[MOCK SMS]")


def test_telegram_driver_logs_recipient_and_message() -> None:
    tg = TelegramDriver()
    assert tg.channel_name == "telegram"
    assert tg.send("12345678", "Hello from bot") is True
    assert len(tg.sent_log) == 1
    assert tg.sent_log[0]["recipient"] == "12345678"


def test_job_alert_numeric_reply_options_included() -> None:
    mock_sms = MockSmsDriver()
    tg = TelegramDriver()
    scheduler = NotificationScheduler(telegram_driver=tg, sms_driver=mock_sms)

    job_data = {
        "title": "Customer Support Assistant",
        "hiring_organization": "Addis Services",
        "job_location": "Addis Ababa",
    }
    sent = scheduler.dispatch_job_alert(job_data, recipient="12345678", channel="telegram")
    assert sent is True
    assert len(tg.sent_log) == 1
    msg = tg.sent_log[0]["message"]
    assert "1️⃣ - Interested" in msg
    assert "2️⃣ - Call me" in msg
    assert "3️⃣ - Explain this job" in msg


def test_muted_setting_suppresses_notifications() -> None:
    class MockClient:
        def __init__(self, *args, **kwargs):
            pass

        def __enter__(self):
            return self

        def __exit__(self, *args):
            pass

        def get(self, url):
            class Response:
                status_code = 200

                def json(self):
                    return {"muted": True, "job_alerts": True, "deadlines": True}

            return Response()

    import httpx

    orig_client = httpx.Client
    httpx.Client = MockClient  # type: ignore[misc]

    try:
        tg = TelegramDriver()
        scheduler = NotificationScheduler(telegram_driver=tg)
        sent = scheduler.dispatch_job_alert({"title": "Test Job"}, recipient="12345", channel="telegram")
        assert sent is False
        assert len(tg.sent_log) == 0
    finally:
        httpx.Client = orig_client  # type: ignore[misc]
