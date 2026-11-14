"""Base adapter interfaces.

Platform-specific logic must implement these interfaces so the core assistant
remains platform-agnostic and installable across any learning platform or job board.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any

from savanna_bridge.models import CourseModule, Deadline, Job


@dataclass
class ContentChunk:
    """A single retrieved chunk of course content."""

    chunk_id: str
    title: str
    heading: str
    text: str
    url: str
    page: int | None = None
    course_id: str = "course_demo"
    language: str = "en"
    metadata: dict[str, Any] = field(default_factory=dict)


class ContentSource(ABC):
    """Retrieves course content chunks from an underlying platform."""

    @abstractmethod
    def get_chunks(self, course_id: str | None = None) -> list[ContentChunk]:
        """Return content chunks, optionally filtered by course_id."""
        ...


class LearnerDirectory(ABC):
    """Interface to read learner deadlines and enrolled course modules."""

    @abstractmethod
    def get_deadlines(self, learner_ref: str | None = None) -> list[Deadline]:
        """Return upcoming deadlines for the learner."""
        ...

    @abstractmethod
    def get_modules(self, course_id: str | None = None) -> list[CourseModule]:
        """Return modules for a given course."""
        ...


class JobSource(ABC):
    """Interface to retrieve jobs formatted according to schema.org/JobPosting."""

    @abstractmethod
    def get_jobs(self, field: str | None = None, support_need: str | None = None) -> list[Job]:
        """Return available job opportunities matching filters."""
        ...


class NotificationChannel(ABC):
    """Interface to dispatch notifications to a messaging channel."""

    @abstractmethod
    def send_notification(self, recipient: str, message: str) -> bool:
        """Deliver a message to a recipient."""
        ...
