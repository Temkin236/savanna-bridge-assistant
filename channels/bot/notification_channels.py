"""Notification channel drivers and scheduler for Telegram and SMS (Milestone C-M3).

Includes Africa's Talking sandbox driver and Mock SMS driver, both clearly labelled.
"""

from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Any
from urllib.parse import quote
from zoneinfo import ZoneInfo

import httpx

logger = logging.getLogger("savanna_bridge.channels.notifications")


class BaseNotificationDriver(ABC):
    @property
    @abstractmethod
    def channel_name(self) -> str: ...

    @property
    @abstractmethod
    def is_sandbox(self) -> bool: ...

    @abstractmethod
    def send(self, recipient: str, message: str) -> bool: ...


class TelegramDriver(BaseNotificationDriver):
    """Dispatches notifications to Telegram chat IDs."""

    def __init__(self, bot_token: str | None = None) -> None:
        self.bot_token = bot_token
        self.sent_log: list[dict[str, str]] = []

    @property
    def channel_name(self) -> str:
        return "telegram"

    @property
    def is_sandbox(self) -> bool:
        return False

    def send(self, recipient: str, message: str) -> bool:
        self.sent_log.append({"recipient": recipient, "message": message})
        if not self.bot_token:
            logger.info("[TelegramDriver MOCK] Sent to %s: %s", recipient, message[:60])
            return True

        url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"
        try:
            with httpx.Client(timeout=10.0) as client:
                res = client.post(url, json={"chat_id": recipient, "text": message})
                return res.status_code == 200
        except Exception as e:
            logger.error("Failed to send Telegram notification to %s: %s", recipient, e)
            return False


class AfricasTalkingSandboxDriver(BaseNotificationDriver):
    """Africa's Talking sandbox SMS driver (DEMO ONLY).

    Clearly labelled as sandbox; no real Ethiopian SMS is delivered.
    """

    def __init__(self, username: str = "sandbox", api_key: str | None = None) -> None:
        self.username = username
        self.api_key = api_key
        self.sent_log: list[dict[str, str]] = []

    @property
    def channel_name(self) -> str:
        return "sms_sandbox"

    @property
    def is_sandbox(self) -> bool:
        return True

    def send(self, recipient: str, message: str) -> bool:
        labelled_message = f"[SANDBOX DEMO] {message}"
        self.sent_log.append({"recipient": recipient, "message": labelled_message})
        logger.info("[Africa's Talking Sandbox] Sending to %s: %s", recipient, labelled_message)

        if not self.api_key or self.username != "sandbox":
            return True

        url = "https://api.sandbox.africastalking.com/version1/messaging"
        headers = {
            "apiKey": self.api_key,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        }
        data = {
            "username": self.username,
            "to": recipient,
            "message": labelled_message,
        }
        try:
            with httpx.Client(timeout=10.0) as client:
                res = client.post(url, headers=headers, data=data)
                return res.status_code in (200, 201)
        except Exception as e:
            logger.warning("Africa's Talking sandbox call failed (%s). Logged in sent_log.", e)
            return True


class MockSmsDriver(BaseNotificationDriver):
    """Mock SMS driver for local testing and CI without sandbox credentials."""

    def __init__(self) -> None:
        self.sent_log: list[dict[str, str]] = []

    @property
    def channel_name(self) -> str:
        return "mock_sms"

    @property
    def is_sandbox(self) -> bool:
        return True

    def send(self, recipient: str, message: str) -> bool:
        labelled = f"[MOCK SMS] {message}"
        self.sent_log.append({"recipient": recipient, "message": labelled})
        logger.info("[MockSmsDriver] Sent to %s: %s", recipient, labelled)
        return True


class NotificationScheduler:
    """Delivers deadlines, lesson updates, and job alerts respecting opt-in and mute."""

    def __init__(
        self,
        api_base_url: str = "http://localhost:8000",
        telegram_driver: BaseNotificationDriver | None = None,
        sms_driver: BaseNotificationDriver | None = None,
    ) -> None:
        self.api_base_url = api_base_url.rstrip("/")
        self.telegram = telegram_driver or TelegramDriver()
        self.sms = sms_driver or MockSmsDriver()

    def get_settings(self, client: httpx.Client, learner_ref: str = "default") -> dict[str, Any]:
        try:
            res = client.get(
                f"{self.api_base_url}/api/v1/notification-settings"
                f"?learner_ref={quote(learner_ref)}"
            )
            if res.status_code == 200:
                return res.json()
        except Exception:
            pass
        return {
            "deadlines": True,
            "new_lessons": True,
            "job_alerts": True,
            "live_help": True,
            "muted": False,
            "low_bandwidth": True,
            "telegram_enabled": True,
            "consent_granted": True,
            "frequency": "immediate",
        }

    @staticmethod
    def _inside_quiet_hours(settings: dict[str, Any]) -> bool:
        start = settings.get("quiet_hours_start")
        end = settings.get("quiet_hours_end")
        if not start or not end:
            return False
        try:
            zone = ZoneInfo(str(settings.get("timezone") or "Africa/Addis_Ababa"))
            now = datetime.now(zone).time()
            start_time = datetime.strptime(str(start), "%H:%M").time()
            end_time = datetime.strptime(str(end), "%H:%M").time()
        except (ValueError, TypeError, KeyError):
            return False
        if start_time <= end_time:
            return start_time <= now < end_time
        return now >= start_time or now < end_time

    def _can_deliver(self, settings: dict[str, Any], category: str) -> bool:
        if settings.get("muted") or not settings.get(category, False):
            return False
        if settings.get("consent_granted") is False:
            logger.info("Notification suppressed: learner has not granted consent.")
            return False
        if settings.get("telegram_enabled") is False:
            logger.info("Notification suppressed: Telegram notifications are disabled.")
            return False
        if settings.get("frequency", "immediate") != "immediate":
            logger.info("Notification deferred to the learner's daily summary.")
            return False
        if self._inside_quiet_hours(settings):
            logger.info("Notification deferred because quiet hours are active.")
            return False
        return True

    def dispatch_job_alert(
        self,
        job_data: dict[str, Any],
        recipient: str,
        channel: str = "telegram",
        learner_ref: str = "default",
    ) -> bool:
        """Dispatches job alert with numeric actions (1=interested, 2=call me, 3=explain)."""
        with httpx.Client(timeout=5.0) as client:
            settings = self.get_settings(client, learner_ref)

        if not self._can_deliver(settings, "job_alerts"):
            return False

        title = job_data.get("title", "New Job Opportunity")
        org = job_data.get("hiring_organization", "Partner Employer")
        location = job_data.get("job_location", "Addis Ababa")
        platform = job_data.get("platform_name") or settings.get("platform_id") or "Connected platform"

        alert_text = (
            f"💼 *Job Alert from {platform}*: {title}\n"
            f"Organization: {org}\n"
            f"Location: {location}\n\n"
            f"Reply with:\n"
            f"1️⃣ - Interested (apply details)\n"
            f"2️⃣ - Call me (talk to a person for help)\n"
            f"3️⃣ - Explain this job"
        )

        driver = self.telegram if channel == "telegram" else self.sms
        return driver.send(recipient, alert_text)

    def dispatch_deadline_alert(
        self,
        deadline_data: dict[str, Any],
        recipient: str,
        channel: str = "telegram",
        learner_ref: str = "default",
    ) -> bool:
        with httpx.Client(timeout=5.0) as client:
            settings = self.get_settings(client, learner_ref)

        if not self._can_deliver(settings, "deadlines"):
            return False

        title = deadline_data.get("title", "Course Deadline")
        due_at = deadline_data.get("due_at", "Soon")
        url = deadline_data.get("url", "")
        platform = deadline_data.get("platform_name") or settings.get("platform_id") or "Connected platform"

        msg = (
            f"⏰ *Reminder from {platform}*: {title}\n"
            f"Due date: {due_at}\n"
            f"Link: {url}\n"
            f"Reply 2 if you need assistance from a mentor."
        )
        driver = self.telegram if channel == "telegram" else self.sms
        return driver.send(recipient, msg)

    def dispatch_live_help_update(
        self,
        handoff_data: dict[str, Any],
        recipient: str,
        channel: str = "telegram",
        learner_ref: str = "default",
    ) -> bool:
        """Notify an opted-in learner when a helper claims their Jitsi handoff."""
        with httpx.Client(timeout=5.0) as client:
            settings = self.get_settings(client, learner_ref)
        if not self._can_deliver(settings, "live_help"):
            return False
        room_url = handoff_data.get("room_url", "")
        helper = handoff_data.get("agent_ref") or "A helper"
        message = f"{helper} has claimed your live-help request. Join your private Jitsi room: {room_url}"
        driver = self.telegram if channel == "telegram" else self.sms
        return driver.send(recipient, message)
