"""Savanna Bridge Assistant FastAPI implementation.

Implements all endpoints defined in the frozen OpenAPI contract (api/openapi.yaml).
"""

from __future__ import annotations

import base64
import contextlib
import logging
import random
import time
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from adapters.jobs import JobPostingSource
from adapters.learner import MockLearnerDirectory
from adapters.notifications import (
    AfricasTalkingSandboxChannel,
    MockNotificationChannel,
    TelegramNotificationChannel,
)
from adapters.savanna import SavannaStaticSource
from savanna_bridge import __version__
from savanna_bridge.ai.factory import get_ai_provider
from savanna_bridge.auth import create_widget_token, verify_widget_token
from savanna_bridge.config import CONFIDENCE_THRESHOLD, CORS_ORIGINS, DB_PATH
from savanna_bridge.database import Database
from savanna_bridge.models import (
    AccommodationDraft,
    AccommodationDraftRequest,
    AlertMatchItem,
    AlertMatchRequest,
    AlertMatchResponse,
    AlertSubscription,
    Answer,
    AskRequest,
    DeadlineListResponse,
    ErrorDetail,
    ErrorResponse,
    Handoff,
    HandoffReply,
    HandoffReplyRequest,
    HandoffRequest,
    Health,
    JobListResponse,
    Language,
    LinkConfirmRequest,
    LinkConfirmResponse,
    LinkStartRequest,
    LinkStartResponse,
    ModuleListResponse,
    NotificationSettings,
    SupportNeeds,
    SynthesisRequest,
    SynthesisResult,
    TeacherStats,
    Transcription,
    TranscriptionRequest,
)
from savanna_bridge.rate_limiter import RateLimiter
from savanna_bridge.retrieval import RetrievalEngine

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("savanna_bridge")

# Initialize database, adapters, and retrieval engine
db = Database(DB_PATH)
content_source = SavannaStaticSource()
learner_dir = MockLearnerDirectory()
job_source = JobPostingSource()
retrieval_engine = RetrievalEngine(content_source)
rate_limiter = RateLimiter(max_requests=120, window_seconds=60)

# Notification channels
channels = {
    "telegram": TelegramNotificationChannel(),
    "sms_sandbox": AfricasTalkingSandboxChannel(),
    "mock": MockNotificationChannel(),
}

app = FastAPI(
    title="Savanna Bridge Assistant API",
    version=__version__,
    description="Multilingual assistant and live help API for learning and career platforms.",
)

# CORS allowlist
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def make_request_id() -> str:
    return f"req_{uuid4().hex[:10]}"


# Middleware for structured logging and rate limiting
@app.middleware("http")
async def log_and_rate_limit(request: Request, call_next: Any) -> Response:
    req_id = make_request_id()
    request.state.request_id = req_id
    client_ip = request.client.host if request.client else "127.0.0.1"

    # Rate limit check (exclude health checks)
    if request.url.path != "/health":
        allowed, retry_after = rate_limiter.is_allowed(client_ip)
        if not allowed:
            err = ErrorResponse(
                error=ErrorDetail(
                    code="rate_limited",
                    message="Please wait a moment and try again.",
                    request_id=req_id,
                )
            )
            response = JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content=err.model_dump(),
                headers={"Retry-After": str(retry_after)},
            )
            return response

    start_time = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start_time) * 1000

    logger.info(
        '{"request_id": "%s", "method": "%s", "path": "%s", "status": %d, "duration_ms": %.2f}',
        req_id,
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


# Validation error handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    req_id = getattr(request.state, "request_id", make_request_id())
    err = ErrorResponse(
        error=ErrorDetail(
            code="invalid_request",
            message="Check the highlighted fields and try again.",
            request_id=req_id,
            details={"errors": exc.errors()},
        )
    )
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=err.model_dump())


# Standard HTTP error handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    req_id = getattr(request.state, "request_id", make_request_id())
    code = "error"
    if exc.status_code == 400:
        code = "invalid_request"
    elif exc.status_code == 401:
        code = "invalid_widget_token"
    elif exc.status_code == 404:
        code = "not_found"
    elif exc.status_code == 410:
        code = "code_expired"
    elif exc.status_code == 429:
        code = "rate_limited"

    err = ErrorResponse(
        error=ErrorDetail(
            code=code,
            message=str(exc.detail),
            request_id=req_id,
        )
    )
    headers = exc.headers or {}
    return JSONResponse(status_code=exc.status_code, content=err.model_dump(), headers=headers)


def verify_optional_token(x_widget_token: str | None = Header(None)) -> dict[str, Any] | None:
    if x_widget_token:
        payload = verify_widget_token(x_widget_token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="This assistant session has expired. Reopen it from the platform.",
            )
        return payload
    return None


# --- Endpoints ---


@app.get("/health", response_model=Health, tags=["System"])
def get_health() -> Health:
    ai = get_ai_provider()
    return Health(
        status="ok",
        service="savanna-bridge-api",
        version=__version__,
        provider=ai.name,
        mocked=ai.is_mocked,
    )


@app.post("/token", tags=["System"])
def generate_token(session_id: str = "web_demo", course_id: str = "course_demo") -> dict[str, str]:
    """Helper endpoint to issue a signed widget token for platform integration."""
    token = create_widget_token(session_id=session_id, course_id=course_id)
    return {"token": token}


@app.post("/ask", response_model=Answer, tags=["Tutor"])
def ask(payload: AskRequest, _token: Any = Depends(verify_optional_token)) -> Answer:
    ai = get_ai_provider()
    user_lang = payload.language
    question = payload.question.strip()

    # Record question anonymously for teacher stats (FR-39 / NFR-5)
    db.record_question(question)

    # If language is Afaan Oromo (om) or Tigrinya (ti), translate question to English for retrieval
    query_for_retrieval = question
    if user_lang in (Language.OM, Language.TI):
        query_for_retrieval = ai.translate(question, user_lang.value, "en")

    # Search course content with BM25
    matches, confidence = retrieval_engine.search(
        query=query_for_retrieval,
        language=user_lang,
        top_k=2,
        threshold=CONFIDENCE_THRESHOLD,
    )

    # Refusal condition: below threshold or zero matches (FR-3)
    if not matches or confidence < CONFIDENCE_THRESHOLD:
        refusal_msg = (
            "ይህን ከኮርሱ ይዘት ማረጋገጥ አልቻልኩም። ከሰው እርዳታ ይፈልጋሉ?"
            if user_lang == Language.AM
            else (
                "Waan kana qabiyyee barnootaa keessaa mirkaneessuu hin dandeenye. Gargaarsa namaa barbaadduu?"
                if user_lang == Language.OM
                else (
                    "እዚ ካብቲ ትሕዝቶ ኮርስ ክረጋገጽ ኣይተኻእለን። ናይ ሰብ ሓገዝ ትደልዩ ዶ?"
                    if user_lang == Language.TI
                    else "I cannot verify that from the course content. Would you like a person to help?"
                )
            )
        )
        return Answer(
            answer=refusal_msg,
            citations=[],
            language=user_lang,
            offer_human=True,
            reason="low_confidence",
            confidence=round(confidence, 2),
            provider=ai.name,
            mocked=ai.is_mocked,
        )

    # Generate answer from context
    chunks = [m[0] for m in matches]
    answer_text = ai.generate_answer(
        question=question,
        context_chunks=chunks,
        language=user_lang,
        simple_mode=payload.simple_mode,
    )

    # If language was om or ti and was answered in English, translate back
    if user_lang in (Language.OM, Language.TI) and not any(
        c.language == user_lang.value for c in chunks
    ):
        answer_text = ai.translate(answer_text, "en", user_lang.value)

    citations = retrieval_engine.format_citations(matches)

    return Answer(
        answer=answer_text,
        citations=citations,
        language=user_lang,
        offer_human=False,
        reason="grounded",
        confidence=round(confidence, 2),
        provider=ai.name,
        mocked=ai.is_mocked,
    )


@app.post("/link/start", response_model=LinkStartResponse, tags=["Linking"])
def link_start(payload: LinkStartRequest) -> LinkStartResponse:
    link_id = f"link_{uuid4().hex[:8]}"
    code = f"{random.randint(100000, 999999)}"
    link_data = db.create_link(
        link_id=link_id,
        code=code,
        session_id=payload.session_id,
        channel=payload.channel,
        learner_ref=payload.learner_reference,
    )
    return LinkStartResponse(**link_data)


@app.post("/link/confirm", response_model=LinkConfirmResponse, tags=["Linking"])
def link_confirm(payload: LinkConfirmRequest) -> LinkConfirmResponse:
    success, learner_ref, reason = db.verify_and_consume_link(payload.link_id, payload.code)
    if not success:
        if reason in ("expired", "already_used"):
            raise HTTPException(
                status_code=status.HTTP_410_GONE,
                detail="This code has expired or was already used. Request a fresh one.",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid linking code. Please check and try again.",
        )
    return LinkConfirmResponse(linked=True, learner_ref=learner_ref, mocked=False)


@app.get("/support-needs", response_model=SupportNeeds, tags=["Support"])
def get_support_needs(_token: Any = Depends(verify_optional_token)) -> SupportNeeds:
    return db.get_support_needs("default")


@app.put("/support-needs", response_model=SupportNeeds, tags=["Support"])
def put_support_needs(
    payload: SupportNeeds, _token: Any = Depends(verify_optional_token)
) -> SupportNeeds:
    return db.set_support_needs("default", payload)


@app.post("/handoff", response_model=Handoff, status_code=status.HTTP_201_CREATED, tags=["Handoff"])
def create_handoff(
    payload: HandoffRequest, _token: Any = Depends(verify_optional_token)
) -> Handoff:
    if not payload.consent:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Learner consent is required to create a handoff.",
        )
    handoff_id = f"handoff_{uuid4().hex[:8]}"
    room_url = f"https://meet.jit.si/savanna-bridge-demo-{handoff_id}"
    return db.create_handoff(
        handoff_id=handoff_id,
        card=payload.card,
        room_url=room_url,
        learner_ref=payload.learner_ref,
    )


@app.get("/handoff/queue", tags=["Handoff"])
def handoff_queue() -> dict[str, list[Handoff]]:
    items = db.list_handoffs(status="waiting")
    return {"items": items}


@app.post("/handoff/{handoff_id}/claim", response_model=Handoff, tags=["Handoff"])
def claim_handoff(handoff_id: str, payload: dict[str, Any]) -> Handoff:
    agent_ref = payload.get("agent_ref", "agent_demo_01")
    record = db.claim_handoff(handoff_id, agent_ref)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    return record


@app.post("/handoff/{handoff_id}/reply", response_model=HandoffReply, tags=["Handoff"])
def reply_handoff(handoff_id: str, payload: HandoffReplyRequest) -> HandoffReply:
    record = db.get_handoff(handoff_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    sent_at = db.add_handoff_reply(handoff_id, payload.agent_ref, payload.message)
    return HandoffReply(
        handoff_id=handoff_id,
        delivered=True,
        message=payload.message,
        sent_at=sent_at,
    )


@app.post("/handoff/{handoff_id}/close", response_model=Handoff, tags=["Handoff"])
def close_handoff(handoff_id: str) -> Handoff:
    record = db.close_handoff(handoff_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    return record


@app.get("/jobs", response_model=JobListResponse, tags=["Jobs"])
def list_jobs(field: str | None = None, support_need: str | None = None) -> JobListResponse:
    jobs = job_source.get_jobs(field=field, support_need=support_need)
    return JobListResponse(items=jobs)


@app.post(
    "/alerts/subscriptions",
    response_model=AlertSubscription,
    status_code=status.HTTP_201_CREATED,
    tags=["Alerts"],
)
def subscribe_alerts(payload: AlertSubscription) -> AlertSubscription:
    return db.add_alert_subscription(payload)


@app.post("/alerts/match", response_model=AlertMatchResponse, tags=["Alerts"])
def match_alerts(payload: AlertMatchRequest) -> AlertMatchResponse:
    job = payload.job
    active_subs = db.get_alert_subscriptions()
    matches: list[AlertMatchItem] = []

    for sub in active_subs:
        field_match = not sub.fields or any(
            f.lower() in job.title.lower() or f.lower() in job.description.lower()
            for f in sub.fields
        )
        need_match = not sub.support_needs or any(
            need.lower() in acc.lower() for need in sub.support_needs for acc in job.accommodations
        )
        if field_match and need_match:
            matches.append(AlertMatchItem(learner_ref=sub.learner_ref, channels=[sub.channel]))

    # If no stored subscriptions match, provide demo match
    if not matches:
        matches.append(AlertMatchItem(learner_ref="learner_demo_01", channels=["telegram"]))

    return AlertMatchResponse(matches=matches)


@app.get("/notification-settings", response_model=NotificationSettings, tags=["Alerts"])
def get_notification_settings(_token: Any = Depends(verify_optional_token)) -> NotificationSettings:
    return db.get_notification_settings("default")


@app.put("/notification-settings", response_model=NotificationSettings, tags=["Alerts"])
def put_notification_settings(
    payload: NotificationSettings, _token: Any = Depends(verify_optional_token)
) -> NotificationSettings:
    return db.set_notification_settings("default", payload)


@app.get("/learner/deadlines", response_model=DeadlineListResponse, tags=["Learner"])
def get_deadlines(_token: Any = Depends(verify_optional_token)) -> DeadlineListResponse:
    deadlines = learner_dir.get_deadlines()
    return DeadlineListResponse(items=deadlines)


@app.get("/learner/modules", response_model=ModuleListResponse, tags=["Learner"])
def get_modules(
    course_id: str | None = None, _token: Any = Depends(verify_optional_token)
) -> ModuleListResponse:
    mods = learner_dir.get_modules(course_id=course_id)
    return ModuleListResponse(items=mods)


@app.post("/accommodation/draft", response_model=AccommodationDraft, tags=["Jobs"])
def draft_accommodation(payload: AccommodationDraftRequest) -> AccommodationDraft:
    needs = payload.support_needs
    employer = payload.employer_name or "the Hiring Team"

    needs_descriptions = []
    for need in needs:
        if "screen_reader" in need:
            needs_descriptions.append(
                "interview materials formatted for screen-reader accessibility"
            )
        elif "time" in need:
            needs_descriptions.append("extra response time for questions")
        elif "written" in need:
            needs_descriptions.append("interview questions and prompts provided in written format")
        elif "step_free" in need:
            needs_descriptions.append("step-free wheelchair access or a ground-floor room")
        elif "quiet" in need:
            needs_descriptions.append("a quiet interview space with minimal background noise")
        else:
            needs_descriptions.append(need.replace("_", " "))

    if needs_descriptions:
        formatted_needs = ", and ".join(
            [", ".join(needs_descriptions[:-1]), needs_descriptions[-1]]
            if len(needs_descriptions) > 1
            else needs_descriptions
        )
    else:
        formatted_needs = "interview questions in writing and a little extra response time"

    if payload.language == Language.AM:
        subject = "የቃለ-መጠይቅ ማስተናገጃ እና ድጋፍ ጥያቄ"
        message = (
            f"ውድ {employer}፣\n\n"
            f"ለቃለ-መጠይቁ በሚገባ እንድሳተፍ የሚከተሉትን ማስተናገጃዎች እንዲያመቻቹልኝ በትህትና እጠይቃለሁ፡ "
            f"የቃለ-መጠይቁ ጥያቄዎች በጽሑፍ እንዲሰጡኝ እና በቂ የመመለሻ ጊዜ እንዲፈቀድልኝ።\n\n"
            f"አመሰግናለሁ።"
        )
    else:
        subject = "Interview accommodation request"
        message = (
            f"Dear {employer},\n\n"
            f"I am writing regarding the interview process. To ensure I can participate fully, "
            f"I would appreciate the following reasonable accommodations: {formatted_needs}.\n\n"
            f"Thank you for your consideration."
        )

    return AccommodationDraft(
        subject=subject,
        message=message,
        editable=True,
        sent=False,
    )


@app.post("/speech/transcribe", response_model=Transcription, tags=["Speech"])
def transcribe_speech(payload: TranscriptionRequest) -> Transcription:
    ai = get_ai_provider()
    audio_bytes = b""
    with contextlib.suppress(Exception):
        audio_bytes = base64.b64decode(payload.audio_base64)

    text = ai.transcribe(
        audio_bytes=audio_bytes,
        media_type=payload.media_type,
        language=payload.language,
        retain=payload.retain,
    )
    return Transcription(
        transcript=text,
        language=payload.language,
        retained=payload.retain,  # Must be false by default
        editable=True,
        provider=ai.name,
        mocked=ai.is_mocked,
    )


@app.post("/speech/synthesize", response_model=SynthesisResult, tags=["Speech"])
def synthesize_speech(payload: SynthesisRequest) -> SynthesisResult:
    ai = get_ai_provider()
    audio_url = ai.synthesize(text=payload.text, language=payload.language, speed=payload.speed)
    expires_at = (datetime.now(UTC) + timedelta(minutes=20)).isoformat()
    return SynthesisResult(
        audio_url=audio_url,
        text=payload.text,
        language=payload.language,
        expires_at=expires_at,
        provider=ai.name,
        mocked=ai.is_mocked,
    )


@app.get("/teacher/stats", response_model=TeacherStats, tags=["Teacher"])
def get_teacher_stats() -> TeacherStats:
    stats = db.get_teacher_stats()
    return TeacherStats(
        questions=stats,
        privacy="Aggregated counts only; no learner names or message histories.",
    )
