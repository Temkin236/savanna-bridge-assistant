"""Pydantic models matching openapi.yaml schemas."""

from __future__ import annotations

from enum import StrEnum
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class Language(StrEnum):
    AM = "am"
    EN = "en"
    OM = "om"
    TI = "ti"
    AR = "ar"


class Health(BaseModel):
    status: Literal["ok", "degraded"]
    service: str
    version: str
    provider: str
    mocked: bool | None = None


class Citation(BaseModel):
    title: str
    heading: str
    page: int | None = None
    url: str


class AskRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=2000)
    language: Language
    course_id: str | None = None
    simple_mode: bool = False
    anonymous: bool = False
    channel: Literal["web", "telegram", "sms_sandbox"] | None = None


class Answer(BaseModel):
    answer: str
    citations: list[Citation]
    language: Language
    offer_human: bool
    reason: Literal["grounded", "low_confidence", "no_content", "provider_unavailable"]
    confidence: float | None = None
    provider: str | None = None
    mocked: bool | None = None


class LinkStartRequest(BaseModel):
    session_id: str = "web_session"
    channel: Literal["web", "telegram"] = "telegram"
    learner_reference: str | None = None


class LinkStartResponse(BaseModel):
    token: str
    deep_link: str
    expires_in: int = 600
    link_id: str
    code: str
    expires_at: str
    single_use: bool = True
    channel: str = "telegram"
    mocked: bool | None = None


class LinkStatusResponse(BaseModel):
    linked: bool
    channel: Literal["telegram"] | None = None


class LinkConfirmRequest(BaseModel):
    token: str | None = None
    telegram_chat_id: str | int | None = None
    link_id: str | None = None
    code: str | None = None


class LinkConfirmResponse(BaseModel):
    linked: bool
    channel: str | None = "telegram"
    learner_ref: str
    mocked: bool | None = None


class LinkDisconnectRequest(BaseModel):
    token: str | None = None
    learner_ref: str | None = None


class LinkDisconnectResponse(BaseModel):
    disconnected: bool = True
    message: str = "Telegram account disconnected successfully."


class SupportNeeds(BaseModel):
    needs: list[str] = Field(default_factory=list)
    other_text: str | None = ""
    preferred_contact_mode: Literal["text", "voice", "video", "telegram"] = "text"


class HandoffCard(BaseModel):
    language: Language = Language.EN
    context: str
    support_needs: list[str] = Field(default_factory=list)
    contact_mode: Literal["text", "voice", "video", "telegram"] = "text"


class HandoffRequest(BaseModel):
    consent: bool
    card: HandoffCard
    learner_ref: str | None = None


class Handoff(BaseModel):
    id: str
    status: Literal["waiting", "claimed", "closed"]
    card: HandoffCard
    room_url: str
    agent_ref: str | None = None
    created_at: str
    mocked: bool | None = None


class AgentAction(BaseModel):
    agent_ref: str


class HandoffReplyRequest(BaseModel):
    agent_ref: str
    message: str


class HandoffReply(BaseModel):
    handoff_id: str
    delivered: bool
    message: str
    sent_at: str


class Job(BaseModel):
    id: str
    title: str
    description: str
    hiring_organization: str
    employment_type: str | None = None
    job_location: str
    date_posted: str
    valid_through: str | None = None
    application_url: str
    source_url: str
    accommodations: list[str] = Field(default_factory=list)


class JobListResponse(BaseModel):
    items: list[Job]


class AlertSubscription(BaseModel):
    learner_ref: str
    channel: Literal["telegram", "sms_sandbox"]
    fields: list[str] = Field(default_factory=list)
    support_needs: list[str] = Field(default_factory=list)
    active: bool = True


class AlertMatchRequest(BaseModel):
    job: Job


class AlertMatchItem(BaseModel):
    learner_ref: str
    channels: list[str]


class AlertMatchResponse(BaseModel):
    matches: list[AlertMatchItem]


class NotificationSettings(BaseModel):
    deadlines: bool = True
    new_lessons: bool = True
    job_alerts: bool = True
    muted: bool = False
    low_bandwidth: bool = True


class Deadline(BaseModel):
    id: str
    title: str
    due_at: str
    course_id: str
    url: str


class DeadlineListResponse(BaseModel):
    items: list[Deadline]


class CourseModule(BaseModel):
    id: str
    number: int
    title: str
    summary: str
    url: str


class ModuleListResponse(BaseModel):
    items: list[CourseModule]


class AccommodationDraftRequest(BaseModel):
    job_id: str | None = None
    support_needs: list[str] = Field(default_factory=list)
    employer_name: str | None = None
    language: Language = Language.EN


class AccommodationDraft(BaseModel):
    subject: str
    message: str
    editable: bool = True
    sent: bool = False


class TranscriptionRequest(BaseModel):
    audio_base64: str
    media_type: Literal["audio/webm", "audio/ogg", "audio/wav", "audio/mpeg"]
    language: Language
    retain: bool = False


class Transcription(BaseModel):
    transcript: str
    language: Language
    retained: bool
    editable: bool
    provider: str
    mocked: bool | None = None


class SynthesisRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    language: Language
    speed: float = Field(default=1.0, ge=0.5, le=2.0)


class SynthesisResult(BaseModel):
    audio_url: str
    text: str
    language: Language
    expires_at: str
    provider: str
    mocked: bool | None = None


class QuestionStat(BaseModel):
    question: str
    count: int


class TeacherStats(BaseModel):
    questions: list[QuestionStat]
    privacy: str


class ErrorDetail(BaseModel):
    code: str
    message: str
    request_id: str
    details: dict[str, Any] | None = None


class ErrorResponse(BaseModel):
    error: ErrorDetail


class SmsInboundRequest(BaseModel):
    from_number: str = Field(..., alias="from")
    text: str

    model_config = ConfigDict(populate_by_name=True)


class ContentChunkInput(BaseModel):
    chunk_id: str | None = None
    course_id: str = "default"
    title: str = "Course Material"
    heading: str
    text: str
    url: str = "https://learning.example.org"
    page: int = 1
    language: str = "en"


class ContentIngestRequest(BaseModel):
    course_id: str | None = None
    chunks: list[ContentChunkInput]


class EscalationRequest(BaseModel):
    conversation: list[dict[str, Any]] | None = None
    card: HandoffCard | None = None
    learner_ref: str | None = None
