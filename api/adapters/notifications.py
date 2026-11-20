"""Notification channel adapters."""

from __future__ import annotations

import logging

import httpx

from adapters.base import NotificationChannel

logger = logging.getLogger("savanna_bridge.notifications")


class MockNotificationChannel(NotificationChannel):
    """Mock notification driver for local and CI testing."""

    def __init__(self) -> None:
        self.sent_messages: list[tuple[str, str]] = []

    def send_notification(self, recipient: str, message: str) -> bool:
        self.sent_messages.append((recipient, message))
        logger.info("[MockNotification] Sent to %s: %s", recipient, message)
        return True


class TelegramNotificationChannel(NotificationChannel):
    """Telegram Bot API driver; records messages in mock mode when no token is set."""

    def __init__(self, bot_token: str | None = None) -> None:
        self.bot_token = bot_token
        self.sent_messages: list[tuple[str, str]] = []

    def send_notification(self, recipient: str, message: str) -> bool:
        self.sent_messages.append((recipient, message))
        if not self.bot_token:
            logger.info("[TelegramNotification MOCK] Sent to %s: %s", recipient, message)
            return True
        try:
            response = httpx.post(
                f"https://api.telegram.org/bot{self.bot_token}/sendMessage",
                json={"chat_id": recipient, "text": message},
                timeout=10.0,
            )
            if response.status_code == 200:
                return True
            logger.warning("Telegram rejected notification for %s: HTTP %s", recipient, response.status_code)
        except httpx.HTTPError as exc:
            logger.warning("Telegram notification failed for %s: %s", recipient, exc)
        return False


class AfricasTalkingSandboxChannel(NotificationChannel):
    """Africa's Talking sandbox SMS adapter (demo only)."""

    def __init__(self, username: str = "sandbox", api_key: str | None = None) -> None:
        self.username = username
        self.api_key = api_key
        self.sent_messages: list[tuple[str, str]] = []

    def send_notification(self, recipient: str, message: str) -> bool:
        self.sent_messages.append((recipient, message))
        logger.info("[AfricasTalkingSandbox] (DEMO ONLY) SMS to %s: %s", recipient, message)
        return True
