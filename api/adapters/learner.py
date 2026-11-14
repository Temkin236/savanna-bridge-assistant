"""Mock learner directory adapter."""

from __future__ import annotations

from adapters.base import LearnerDirectory
from savanna_bridge.models import CourseModule, Deadline


class MockLearnerDirectory(LearnerDirectory):
    """Provides sample deadlines and course modules for demo learners."""

    def __init__(self) -> None:
        self._deadlines: list[Deadline] = [
            Deadline(
                id="deadline_01",
                title="Module 2 knowledge check",
                due_at="2026-11-16T17:00:00+03:00",
                course_id="course_demo",
                url="https://learning.example.org/courses/course_demo/module-2",
            ),
            Deadline(
                id="deadline_02",
                title="Customer empathy scenario submission",
                due_at="2026-11-20T23:59:00+03:00",
                course_id="course_demo",
                url="https://learning.example.org/courses/course_demo/module-3",
            ),
        ]

        self._modules: list[CourseModule] = [
            CourseModule(
                id="module_1",
                number=1,
                title="Welcome and Core Principles",
                summary="Understand respectful customer care and active listening fundamentals.",
                url="https://learning.example.org/courses/course_demo/module-1",
            ),
            CourseModule(
                id="module_2",
                number=2,
                title="Communicating with customers",
                summary="Learn how to listen, clarify, and respond clearly with accessible steps.",
                url="https://learning.example.org/courses/course_demo/module-2",
            ),
            CourseModule(
                id="module_3",
                number=3,
                title="Handling Inquiries and Escalations",
                summary="Master de-escalation, empathy, and seamless handoff to supervisors.",
                url="https://learning.example.org/courses/course_demo/module-3",
            ),
        ]

    def get_deadlines(self, learner_ref: str | None = None) -> list[Deadline]:
        # Return learner deadlines
        return self._deadlines

    def get_modules(self, course_id: str | None = None) -> list[CourseModule]:
        if course_id:
            # Filter if needed or return default course modules
            return self._modules
        return self._modules
