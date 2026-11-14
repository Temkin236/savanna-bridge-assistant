"""Job source adapter supporting schema.org/JobPosting JSON format."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from adapters.base import JobSource
from savanna_bridge.models import Job


class JobPostingSource(JobSource):
    """Adapter reading schema.org/JobPosting data with accessibility accommodations."""

    def __init__(self, json_file: Path | str | None = None) -> None:
        self.json_file = Path(json_file) if json_file else None
        self._default_jobs: list[Job] = [
            Job(
                id="job_01",
                title="Customer Support Assistant",
                description="Help customers with empathy across phone, chat, and email support queues.",
                hiring_organization="Addis Services Cooperative",
                employment_type="FULL_TIME",
                job_location="Addis Ababa",
                date_posted="2026-11-12",
                valid_through="2026-11-30",
                application_url="https://jobs.example.org/customer-support-assistant",
                source_url="https://jobs.example.org/customer-support-assistant",
                accommodations=[
                    "screen_reader_compatible",
                    "step_free_office",
                    "written_instructions",
                ],
            ),
            Job(
                id="job_02",
                title="Junior Accessibility Tester",
                description="Evaluate digital learning platforms with assistive technologies including screen readers and keyboard navigation.",
                hiring_organization="EthioTech Inclusivity Hub",
                employment_type="PART_TIME",
                job_location="Remote / Addis Ababa",
                date_posted="2026-11-10",
                valid_through="2026-12-15",
                application_url="https://jobs.example.org/accessibility-tester",
                source_url="https://jobs.example.org/accessibility-tester",
                accommodations=["screen_reader_compatible", "extra_time", "quiet_space", "remote"],
            ),
            Job(
                id="job_03",
                title="Data Entry and Records Associate",
                description="Review and update student records and enrollment requests.",
                hiring_organization="National Learning Alliance",
                employment_type="FULL_TIME",
                job_location="Hawassa",
                date_posted="2026-11-08",
                valid_through="2026-11-28",
                application_url="https://jobs.example.org/data-entry",
                source_url="https://jobs.example.org/data-entry",
                accommodations=["step_free_office", "written_instructions", "extra_time"],
            ),
        ]

    def _convert_schema_org_job(self, data: dict[str, Any]) -> Job:
        """Convert a schema.org/JobPosting dict into a Job model."""
        hiring_org = data.get("hiringOrganization")
        if isinstance(hiring_org, dict):
            org_name = hiring_org.get("name", "Unknown Organization")
        else:
            org_name = str(hiring_org or "Unknown Organization")

        location = data.get("jobLocation")
        if isinstance(location, dict):
            loc_str = location.get("address", {}).get("addressLocality", "Addis Ababa")
        else:
            loc_str = str(location or "Addis Ababa")

        return Job(
            id=str(data.get("identifier", data.get("id", f"job_{id(data)}"))),
            title=data.get("title", "Job Title"),
            description=data.get("description", ""),
            hiring_organization=org_name,
            employment_type=data.get("employmentType"),
            job_location=loc_str,
            date_posted=data.get("datePosted", "2026-11-01"),
            valid_through=data.get("validThrough"),
            application_url=data.get("url", "https://jobs.example.org"),
            source_url=data.get("sameAs", data.get("url", "https://jobs.example.org")),
            accommodations=data.get("accommodations", []),
        )

    def get_jobs(self, field: str | None = None, support_need: str | None = None) -> list[Job]:
        jobs = list(self._default_jobs)

        if self.json_file and self.json_file.is_file():
            try:
                raw = json.loads(self.json_file.read_text(encoding="utf-8"))
                if isinstance(raw, list):
                    jobs.extend([self._convert_schema_org_job(j) for j in raw])
                elif isinstance(raw, dict):
                    jobs.append(self._convert_schema_org_job(raw))
            except Exception:
                pass

        if field:
            f_lower = field.lower()
            jobs = [
                j for j in jobs if f_lower in j.title.lower() or f_lower in j.description.lower()
            ]

        if support_need:
            s_lower = support_need.lower()
            jobs = [j for j in jobs if any(s_lower in acc.lower() for acc in j.accommodations)]

        return jobs
