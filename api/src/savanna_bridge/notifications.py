"""Consent-aware notification orchestration for learner events."""

from __future__ import annotations

from adapters.base import NotificationChannel
from savanna_bridge.database import Database
from savanna_bridge.models import Handoff


class NotificationService:
    """Resolve learner preferences and linked destinations before delivery."""

    def __init__(self, database: Database, telegram: NotificationChannel) -> None:
        self.database = database
        self.telegram = telegram

    def notify_handoff_claimed(self, handoff: Handoff) -> bool:
        learner_ref = self.database.get_handoff_learner_ref(handoff.id)
        if not learner_ref:
            return False

        settings = self.database.get_notification_settings(learner_ref)
        recipient = self.database.get_linked_telegram_chat_id(learner_ref)
        if not (
            recipient
            and settings.consent_granted
            and settings.telegram_enabled
            and settings.live_help
            and not settings.muted
        ):
            return False

        return self.telegram.send_notification(
            recipient,
            "A helper has claimed your support request. Your private Jitsi room is ready: "
            f"{handoff.room_url}",
        )
