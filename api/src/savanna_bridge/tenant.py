"""Multi-tenant institution configuration for Savanna Bridge Assistant.

Provides backward-compatible institution configurations defaulting to Savanna.
Allows platforms to customize branding, available languages, support options,
and content sources without database schema changes.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class InstitutionConfig:
    institution_id: str
    name: str
    tagline: str
    primary_color: str
    default_language: str
    supported_languages: list[str] = field(default_factory=lambda: ["am", "en", "om", "ti", "ar"])
    allow_human_handoff: bool = True
    allow_job_board: bool = True
    default_course_id: str = "course_demo"
    sms_enabled: bool = True


class TenantRegistry:
    """In-memory registry of institution configurations."""

    _TENANTS: dict[str, InstitutionConfig] = {
        "savanna": InstitutionConfig(
            institution_id="savanna",
            name="Savanna Learning Platform",
            tagline="Your Language. Your Ability. Your Opportunity.",
            primary_color="#002b56",
            default_language="en",
            supported_languages=["am", "en", "om", "ti", "ar"],
            allow_human_handoff=True,
            allow_job_board=True,
            default_course_id="course_demo",
            sms_enabled=True,
        ),
        "alx": InstitutionConfig(
            institution_id="alx",
            name="ALX Africa",
            tagline="Empowering young African leaders with digital skills.",
            primary_color="#1d4ed8",
            default_language="en",
            supported_languages=["en", "am", "om", "ti", "ar"],
            allow_human_handoff=True,
            allow_job_board=True,
            default_course_id="course_demo",
            sms_enabled=True,
        ),
        "community": InstitutionConfig(
            institution_id="community",
            name="Community Open Portal",
            tagline="Open, accessible, self-paced learning for everyone.",
            primary_color="#0284c7",
            default_language="am",
            supported_languages=["am", "en", "om", "ti", "ar"],
            allow_human_handoff=True,
            allow_job_board=True,
            default_course_id="course_demo",
            sms_enabled=True,
        ),
    }

    @classmethod
    def get(cls, institution_id: str | None = None) -> InstitutionConfig:
        """Resolve institution by ID or header, defaulting safely to Savanna."""
        clean_id = (institution_id or "savanna").lower().strip()
        return cls._TENANTS.get(clean_id, cls._TENANTS["savanna"])

    @classmethod
    def list_tenants(cls) -> list[dict[str, Any]]:
        return [
            {
                "id": t.institution_id,
                "name": t.name,
                "tagline": t.tagline,
                "primary_color": t.primary_color,
                "default_language": t.default_language,
                "supported_languages": t.supported_languages,
            }
            for t in cls._TENANTS.values()
        ]
