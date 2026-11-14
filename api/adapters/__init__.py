"""Adapter interfaces and platform drivers."""

from adapters.base import (
    ContentChunk,
    ContentSource,
    JobSource,
    LearnerDirectory,
    NotificationChannel,
)
from adapters.jobs import JobPostingSource
from adapters.learner import MockLearnerDirectory
from adapters.notifications import (
    AfricasTalkingSandboxChannel,
    MockNotificationChannel,
    TelegramNotificationChannel,
)
from adapters.savanna import GenericHtmlSource, SavannaStaticSource

__all__ = [
    "ContentChunk",
    "ContentSource",
    "JobSource",
    "LearnerDirectory",
    "NotificationChannel",
    "SavannaStaticSource",
    "GenericHtmlSource",
    "MockLearnerDirectory",
    "JobPostingSource",
    "MockNotificationChannel",
    "TelegramNotificationChannel",
    "AfricasTalkingSandboxChannel",
]
