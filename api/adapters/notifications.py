"""Notification channel adapters."""

from __future__ import annotations

import logging

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
    """Telegram notification channel stub / mock driver."""

    def __init__(self, bot_token: str | None = None) -> None:
        self.bot_token = bot_token
        self.sent_messages: list[tuple[str, str]] = []

    def send_notification(self, recipient: str, message: str) -> bool:
        self.sent_messages.append((recipient, message))
        logger.info("[TelegramNotification] Dispatched to %s: %s", recipient, message)
        return True


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
