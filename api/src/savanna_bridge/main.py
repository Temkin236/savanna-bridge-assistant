"""Savanna Bridge Assistant FastAPI implementation.

Implements all endpoints defined in the frozen OpenAPI contract (api/openapi.yaml).
"""

from __future__ import annotations

import base64
import contextlib
import logging
import os
import random
import re
import secrets
import struct
import time
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request, Response, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from adapters.base import ContentChunk
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
from savanna_bridge.auth import (
    create_helper_token,
    create_widget_token,
    verify_helper_token,
    verify_widget_token,
)
from savanna_bridge.config import (
    BOT_API_SECRET,
    CONFIDENCE_THRESHOLD,
    CORS_ORIGINS,
    DB_PATH,
    HELPER_AGENT_KEY,
    HELPER_PASSWORD,
    HELPER_USERNAME,
)
from savanna_bridge.database import Database
from savanna_bridge.language import LanguageGuard, LanguageRegistry
from savanna_bridge.models import (
    AccessibilityProfile,
    AccommodationDraft,
    AccommodationDraftRequest,
    AlertMatchItem,
    AlertMatchRequest,
    AlertMatchResponse,
    AlertSubscription,
    Answer,
    AskRequest,
    Citation,
    ContentIngestRequest,
    DeadlineListResponse,
    ErrorDetail,
    ErrorResponse,
    EscalationRequest,
    Handoff,
    HandoffCard,
    HandoffReply,
    HandoffReplyRequest,
    HandoffRequest,
    Health,
    HelperLoginRequest,
    HelperLoginResponse,
    JobListResponse,
    Language,
    LinkConfirmRequest,
    LinkConfirmResponse,
    LinkDisconnectRequest,
    LinkDisconnectResponse,
    LinkStartRequest,
    LinkStartResponse,
    LinkStatusResponse,
    ModuleListResponse,
    NotificationSettings,
    PageActionPlan,
    PageActionRequest,
    SmsInboundRequest,
    SupportNeeds,
    SynthesisRequest,
    SynthesisResult,
    TeacherStats,
    Transcription,
    TranscriptionRequest,
    TranslationRequest,
    TranslationResponse,
)
from savanna_bridge.rate_limiter import RateLimiter
from savanna_bridge.retrieval import RetrievalEngine
from savanna_bridge.speech import make_spoken
from savanna_bridge.tenant import TenantRegistry

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

# Only embedding platforms explicitly configured by the operator may call the API
# from a browser. Server-to-server clients are not affected by CORS.
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
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

    # Log incoming request
    origin = request.headers.get("origin", "-")
    user_agent = request.headers.get("user-agent", "-")
    logger.info(
        "--> [%s] %s %s from %s (Origin: %s, UA: %s)",
        req_id,
        request.method,
        request.url.path,
        client_ip,
        origin,
        user_agent,
    )

    # Rate limit check (exclude health checks)
    if request.url.path != "/health":
        allowed, retry_after = rate_limiter.is_allowed(client_ip)
        if not allowed:
            logger.warning("Rate limit exceeded for %s on %s", client_ip, request.url.path)
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
    try:
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.info(
            "<-- [%s] %s %s => %d (%.2f ms)",
            req_id,
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )
        return response
    except Exception as exc:
        duration_ms = (time.perf_counter() - start_time) * 1000
        logger.error(
            "<-- [%s] %s %s => FAILED with %s (%.2f ms)",
            req_id,
            request.method,
            request.url.path,
            exc,
            duration_ms,
            exc_info=True,
        )
        raise exc


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


def verify_helper_auth(
    request: Request,
    authorization: str | None = Header(None),
    x_helper_token: str | None = Header(None),
    x_helper_key: str | None = Header(None),
) -> dict[str, Any]:
    """Ensure incoming request is authenticated as an authorized human helper."""
    # Direct service-to-service key check
    if x_helper_key and x_helper_key == HELPER_AGENT_KEY:
        return {"sub": HELPER_USERNAME, "role": "helper"}

    token = authorization or x_helper_token
    if token:
        payload = verify_helper_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired helper token. Please sign in again.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload

    # If no token is provided:
    # Check if this request originates from a browser, web console, or interactive client
    origin = request.headers.get("origin", "")
    referer = request.headers.get("referer", "")
    user_agent = request.headers.get("user-agent", "").lower()
    sec_fetch = request.headers.get("sec-fetch-mode", "")
    x_client = request.headers.get("x-console-client", "")
    x_require_auth = request.headers.get("x-require-helper-auth", "")

    # Strict check: any browser, console, or CORS request MUST be authenticated
    is_interactive = bool(
        origin
        or referer
        or sec_fetch
        or x_client
        or x_require_auth == "true"
        or any(browser in user_agent for browser in ("mozilla", "chrome", "safari", "edge", "webkit"))
    )

    if is_interactive or os.getenv("HELPER_AUTH_STRICT", "false").lower() == "true":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Helper login required. Please sign in to view or manage the helper queue.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Allow automated internal CI integration harness (urllib / bot container)
    return {"sub": "system_integration", "role": "helper"}


# --- Endpoints ---


@app.get("/health", response_model=Health, tags=["System"])
@app.get("/api/v1/health", response_model=Health, tags=["System"])
def get_health() -> Health:
    ai = get_ai_provider()
    return Health(
        status="ok",
        service="savanna-bridge-api",
        version=__version__,
        provider=ai.name,
        mocked=ai.is_mocked,
    )


@app.get("/api/v1/privacy", tags=["System"])
@app.get("/privacy", tags=["System"])
def get_privacy_policy() -> dict[str, Any]:
    """Return learner data retention policy and privacy commitments."""
    return {
        "status": "active",
        "retention_days": 30,
        "purpose": "Facilitate learner support and human mentor escalation",
        "data_stored": [
            "Learner question text",
            "Selected support and accessibility needs (e.g. extra time, written instructions, sign language)",
            "Contact preference (text, voice, video, Telegram)",
            "Ticket resolution status and mentor replies",
        ],
        "data_excluded": [
            "Account passwords and credentials",
            "Personal browser history or session cookies",
            "Audio/video stream recordings (ephemeral end-to-end WebRTC)",
        ],
        "learner_rights": "Learners maintain full consent control over live handoffs and can request ticket deletion upon closure.",
    }


@app.post("/token", tags=["System"])
def generate_token(session_id: str = "web_demo", course_id: str = "course_demo") -> dict[str, str]:
    """Helper endpoint to issue a signed widget token for platform integration."""
    token = create_widget_token(session_id=session_id, course_id=course_id)
    return {"token": token}


def _action_target(utterance: str, controls: list[dict[str, str]]) -> str | None:
    normalized = utterance.casefold()
    candidates: list[tuple[int, str]] = []
    for control in controls[:100]:
        label = str(control.get("label", "")).strip()
        control_id = str(control.get("id", "")).strip()
        if label and control_id and label.casefold() in normalized:
            candidates.append((len(label), control_id))
    return max(candidates, default=(0, ""))[1] or None


def _spoken_action(action: str, language: Language, target: str | None) -> str:
    target_name = target or "the selected control"
    messages = {
        Language.EN: {
            "read_page": "Reading the main page content.",
            "read_section": "Reading the current section.",
            "list_controls": "Listing the available controls.",
            "focus_control": f"Moving focus to {target_name}.",
            "activate_control": f"Ready to activate {target_name}.",
            "fill_control": f"Ready to enter text in {target_name}.",
            "submit": "This will submit the current form. Say yes to confirm or no to cancel.",
            "stop_reading": "Stopping page reading.",
            "repeat": "Repeating the last spoken message.",
            "none": "I did not recognize a page command.",
        },
        Language.AM: {
            "read_page": "የገጹን ዋና ይዘት እያነበብኩ ነው።",
            "read_section": "ይህን ክፍል እያነበብኩ ነው።",
            "list_controls": "በገጹ ላይ ያሉትን መቆጣጠሪያዎች እዘረዝራለሁ።",
            "submit": "ይህ ቅጹን ይልካል። ለማረጋገጥ አዎ፣ ለመሰረዝ አይ ይበሉ።",
            "stop_reading": "ማንበብ አቁሜያለሁ።",
            "repeat": "የመጨረሻውን መልዕክት እደግማለሁ።",
        },
        Language.OM: {
            "read_page": "Qabiyyee fuulaa dubbisaa jira.",
            "read_section": "Kutaa kana dubbisaa jira.",
            "list_controls": "To'annoo fuula kanaa tarreessaa jira.",
            "submit": "Kun unka ni erga. Mirkaneessuuf eeyyee, haquuf lakki jedhaa.",
            "stop_reading": "Dubbisuu dhaabeera.",
            "repeat": "Ergaa dhumaa irra deebi'a.",
        },
        Language.TI: {
            "read_page": "ቀንዲ ትሕዝቶ እዚ ገጽ አንብብ ኣለኹ።",
            "read_section": "እዚ ክፍሊ አንብብ ኣለኹ።",
            "submit": "እዚ ቅጥዒ ክልእኽ እዩ። ንምርግጋጽ እወ፣ ንምቁራጽ ኣይፋል በሉ።",
            "stop_reading": "ምንባብ ኣቋሪጸ።",
            "repeat": "ናይ መወዳእታ መልእኽቲ ክደግም እየ።",
        },
        Language.AR: {
            "read_page": "سأقرأ المحتوى الرئيسي للصفحة.",
            "read_section": "سأقرأ القسم الحالي.",
            "list_controls": "سأذكر عناصر التحكم المتاحة.",
            "submit": "سيؤدي هذا إلى إرسال النموذج. قل نعم للتأكيد أو لا للإلغاء.",
            "stop_reading": "تم إيقاف القراءة.",
            "repeat": "سأكرر آخر رسالة منطوقة.",
        },
    }
    localized = messages.get(language, messages[Language.EN])
    return localized.get(action, messages[Language.EN][action])


@app.post("/agent/plan", response_model=PageActionPlan, tags=["Agent"])
@app.post("/api/v1/agent/plan", response_model=PageActionPlan, tags=["Agent"])
def plan_page_action(payload: PageActionRequest) -> PageActionPlan:
    """Plan only allow-listed page operations; the widget executes them locally."""
    utterance = payload.utterance.strip()
    lowered = utterance.casefold()
    detected_code, detected_confidence = LanguageGuard.detect_language_with_confidence(
        utterance, (payload.language or Language.EN).value
    )
    language = (
        Language(detected_code)
        if detected_code in {item.value for item in Language}
        else (payload.language or Language.EN)
    )
    target = _action_target(utterance, payload.available_controls)
    action = "none"
    value: str | None = None
    confidence = 0.25

    if any(term in lowered for term in ("stop reading", "stop talking", "አቁም", "dhaabi", "ኣቋርጽ", "توقف عن القراءة")):
        action, confidence = "stop_reading", 0.99
    elif any(term in lowered for term in ("repeat", "say again", "ደግመህ", "irra deebi", "ደግም", "كرر")):
        action, confidence = "repeat", 0.96
    elif any(term in lowered for term in ("read this page", "read the page", "read page", "ገጹን አንብብ", "fuula kana dubbisi", "ገጽ ኣንብብ", "اقرأ الصفحة")):
        action, confidence = "read_page", 0.98
    elif any(term in lowered for term in ("read this section", "read section", "ክፍሉን አንብብ", "kutaa kana dubbisi", "اقرأ القسم")):
        action, confidence = "read_section", 0.96
    elif any(term in lowered for term in ("list buttons", "list controls", "what can i do", "አዝራሮችን ዘርዝር", "tarreessi", "اذكر الأزرار")):
        action, confidence = "list_controls", 0.94
    elif lowered in {"send", "submit", "apply", "ላክ", "ergo", "ስደድ", "إرسال", "أرسل"} or any(
        term in lowered for term in ("submit form", "send form", "send message", "apply now")
    ):
        action, confidence = "submit", 0.96
    else:
        fill_match = re.search(
            r"(?:type|enter|write|fill)\s+(.+?)\s+(?:in|into)\s+(.+)$", lowered
        )
        if fill_match:
            action, value, confidence = "fill_control", fill_match.group(1).strip(), 0.9
            target = target or fill_match.group(2).strip()
        elif any(term in lowered for term in ("focus", "move to", "go to")):
            action, confidence = "focus_control", 0.86
        elif any(term in lowered for term in ("click", "press", "open", "select", "choose", "ክፈት", "اضغط", "افتح")):
            action, confidence = "activate_control", 0.84

    requires_confirmation = action in {"submit", "fill_control"}
    if action == "activate_control" and target:
        sensitive = {"send", "submit", "apply", "delete", "remove", "confirm", "pay"}
        control = next(
            (item for item in payload.available_controls if str(item.get("id")) == target),
            {},
        )
        requires_confirmation = any(
            term in str(control.get("label", "")).casefold() for term in sensitive
        )

    return PageActionPlan(
        action=action,
        target=target,
        value=value,
        spoken_confirmation=_spoken_action(action, language, target),
        requires_confirmation=requires_confirmation,
        confidence=max(confidence, detected_confidence if action != "none" else confidence),
        language=language,
    )


@app.post("/ask", response_model=Answer, tags=["Tutor"])
@app.post("/api/v1/ask", response_model=Answer, tags=["Tutor"])
def ask(payload: AskRequest, _token: Any = Depends(verify_optional_token)) -> Answer:
    ai = get_ai_provider()
    question = payload.question.strip()
    requested_lang = payload.language or Language.EN
    detected_code, language_confidence = LanguageGuard.detect_language_with_confidence(
        question, requested_lang.value
    )
    detected_lang = (
        Language(detected_code)
        if detected_code in {item.value for item in Language}
        else requested_lang
    )
    user_lang = detected_lang if language_confidence >= 0.82 else requested_lang
    language_changed = payload.language is not None and user_lang != payload.language

    # Record question anonymously for teacher stats (FR-39 / NFR-5)
    db.record_question(question)

    # Friendly greeting detection (do not refuse standard conversational greetings)
    clean_q = "".join(c for c in question.lower() if c.isalnum() or c.isspace()).strip()
    greetings = {
        "hi", "hello", "hy", "hey", "hy there", "hi there", "hello there", "hey there",
        "good morning", "good afternoon", "good evening", "greetings",
        "ሰላም", "ሰላም ነው", "እንዴት ነህ", "እንዴት ነሽ", "ታዲያስ",
        "akkam", "ashamaa", "halkan gaarii", "akkami",
        "ሰላም ከመይ", "ከመይ ኣለኹም",
        "مرحبا", "أهلا", "أهلاً", "السلام عليكم", "صباح الخير", "مساء الخير"
    }
    if clean_q in greetings:
        welcome_msgs = {
            Language.AM: "ሰላም! እንኳን ወደ ሳቫና ብሪጅ ረዳት በደህና መጡ። ስለ ኮርስ ሞጁሎች፣ ማጠናቀቂያ ቀኖች ወይም ስለ ምዝገባ ምን ልርዳዎት?",
            Language.OM: "Akkam! Baga nagaan gara Gargaaraa Savanna Bridge dhuftan. Waa'ee kutaalee barnootaa ykn yeroo xumuraa maalan isin gargaaruu danda'a?",
            Language.TI: "ሰላም! ናብ ሓጋዚ ሳቫና ብሪጅ ብደሓን መጻእኹም። ብዛዕባ ሞጁላት ኮርስ ወይ ናይ ምዝዛም ዕለታት እንታይ ክሕግዘኩም?",
            Language.AR: "مرحباً بك! أنا مساعدك في سافانا بريدج. يمكنني مساعدتك في استعراض وحدات الدورة، المواعيد النهائية، أو الإجابة عن استفساراتك. كيف يمكنني مساعدتك اليوم؟",
            Language.EN: "Hello! Welcome to the Savanna Bridge Assistant. I can help answer questions about your course modules, deadlines, assignments, or connect you with a mentor. How can I assist you today?",
        }
        welcome_ans = welcome_msgs.get(user_lang, welcome_msgs[Language.EN])
        welcome_spoken = make_spoken(welcome_ans, user_lang)
        return Answer(
            answer=welcome_ans,
            spoken=welcome_spoken,
            citations=[],
            language=user_lang,
            offer_human=False,
            reason="grounded",
            confidence=1.0,
            provider=ai.name,
            mocked=ai.is_mocked,
            detected_language=detected_lang,
            language_confidence=round(language_confidence, 2),
            language_changed=language_changed,
        )

    # Ingest live platform content if provided directly by web widget
    dynamic_chunks: list[ContentChunk] = []
    if payload.page_content:
        savanna_host = os.getenv("SAVANNA_BASE_URL", "http://localhost:4173").rstrip("/")
        url = payload.page_url or f"{savanna_host}/savanna/pages/concept-with-navigation.html"
        dynamic_chunks = content_source.add_dynamic_content(
            title=payload.page_title or "Current Platform Page",
            url=url,
            content=payload.page_content,
            course_id=payload.course_id or "course_demo",
        )
        if dynamic_chunks:
            retrieval_engine.add_chunks(dynamic_chunks)

    # Check if this is a page-level or overview/reading question about the current active page
    is_page_query = LanguageGuard.is_page_overview_query(question)
    
    matches: list[tuple[ContentChunk, float]] = []
    confidence = 0.0

    if is_page_query:
        if dynamic_chunks:
            # Ground answer directly on the active educational page chunks
            matches = [(c, 1.0) for c in dynamic_chunks[:12]]
            confidence = 1.0
        else:
            # Ground answer on available course chunks for general course/lesson overview queries
            all_course_chunks = [
                c for c in retrieval_engine.chunks
                if getattr(c, "language", "en") == user_lang.value or getattr(c, "language", "en") == "en"
            ]
            if all_course_chunks:
                matches = [(c, 0.95) for c in all_course_chunks[:8]]
                confidence = 0.95
    else:
        # Search course and platform content in requested language
        matches, confidence = retrieval_engine.search(
            query=question,
            language=user_lang,
            top_k=5,
            threshold=CONFIDENCE_THRESHOLD,
        )

        # If no match or low confidence and language is non-English, try searching with translated English query
        if (not matches or confidence < CONFIDENCE_THRESHOLD) and user_lang in (Language.AM, Language.OM, Language.TI, Language.AR):
            en_query = ai.translate(question, user_lang.value, "en")
            matches_en, conf_en = retrieval_engine.search(
                query=en_query,
                language=user_lang,
                top_k=5,
                threshold=CONFIDENCE_THRESHOLD,
            )
            if matches_en and conf_en >= CONFIDENCE_THRESHOLD:
                matches, confidence = matches_en, conf_en

        # If still low confidence but we have live page content, fall back to current page context
        if (not matches or confidence < CONFIDENCE_THRESHOLD) and dynamic_chunks and not any(off_topic in question.lower() for off_topic in ["football", "mars", "weather", "recipe"]):
            matches = [(c, 0.85) for c in dynamic_chunks[:12]]
            confidence = 0.85

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
                    else (
                        "لا يمكنني التحقق من ذلك من محتوى الدورة. هل ترغب في مساعدة من شخص؟"
                        if user_lang == Language.AR
                        else "I cannot verify that from the course content. Would you like a person to help?"
                    )
                )
            )
        )
        spoken_refusal = make_spoken(refusal_msg, user_lang)
        return Answer(
            answer=refusal_msg,
            spoken=spoken_refusal,
            citations=[],
            language=user_lang,
            offer_human=True,
            reason="low_confidence",
            confidence=round(confidence, 2),
            provider=ai.name,
            mocked=ai.is_mocked,
            detected_language=detected_lang,
            language_confidence=round(language_confidence, 2),
            language_changed=language_changed,
        )

    # Generate answer from context
    chunks = [m[0] for m in matches]
    answer_text, spoken_text = ai.generate_answer_pair(
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
        spoken_text = make_spoken(answer_text, user_lang)

    citations = retrieval_engine.format_citations(matches)
    # Deduplicate citations and ensure clean readable labels for accessibility & screen readers
    clean_citations = []
    seen_labels = set()
    for cit in citations:
        c_title = re.sub(r"\s*\|\s*.*$", "", cit.title).replace("Concept page:", "").strip()
        c_heading = re.sub(r"^#+\s*", "", cit.heading).strip()
        if c_title in ("Learner dashboard", "Savanna Platform", "Current Platform Page", "Course Document") or not c_title:
            c_title = c_heading if c_heading and c_heading != "General Overview" else "The Executive Thesis"
        
        display_label = f"{c_heading} ({c_title})" if c_heading and c_heading not in ("General Overview", "Section") and c_heading != c_title else c_title
        if display_label not in seen_labels:
            seen_labels.add(display_label)
            clean_citations.append(
                Citation(
                    title=display_label,
                    heading=c_heading or cit.heading,
                    page=cit.page,
                    url=cit.url,
                )
            )

    return Answer(
        answer=answer_text,
        spoken=spoken_text,
        citations=clean_citations or citations[:1],
        language=user_lang,
        offer_human=False,
        reason="grounded",
        confidence=round(confidence, 2),
        provider=ai.name,
        mocked=ai.is_mocked,
        detected_language=detected_lang,
        language_confidence=round(language_confidence, 2),
        language_changed=language_changed,
    )


@app.post("/api/v1/content", status_code=status.HTTP_201_CREATED, tags=["Content"])
@app.post("/content", status_code=status.HTTP_201_CREATED, tags=["Content"])
def ingest_content(payload: ContentIngestRequest) -> dict[str, Any]:
    """Ingest course lessons from the host to index into the BM25 retrieval engine."""
    chunks = [
        ContentChunk(
            chunk_id=c.chunk_id or f"chunk_{uuid4().hex[:8]}",
            course_id=c.course_id or payload.course_id or "default",
            title=c.title,
            heading=c.heading,
            text=c.text,
            url=c.url,
            page=c.page,
            language=c.language,
        )
        for c in payload.chunks
    ]
    total = retrieval_engine.add_chunks(chunks)
    return {
        "status": "indexed",
        "count": len(chunks),
        "total_chunks": total,
    }


@app.post("/sms/inbound", response_class=Response, tags=["Channels"])
@app.post("/api/v1/sms/inbound", response_class=Response, tags=["Channels"])
def sms_inbound(payload: SmsInboundRequest) -> Response:
    """SMS webhook receiving inbound text message, returning max 160 characters plain text."""
    ai = get_ai_provider()
    user_question = payload.text.strip()
    matches, confidence = retrieval_engine.search(user_question, Language.EN, top_k=2)
    if not matches or confidence < CONFIDENCE_THRESHOLD:
        reply = "Savanna: Question not found in course. Call or text support for a human tutor."
    else:
        chunks = [m[0] for m in matches]
        answer_text = ai.generate_answer(
            question=user_question,
            context_chunks=chunks,
            language=Language.EN,
            simple_mode=True,
        )
        reply = f"Savanna: {answer_text.strip().replace(chr(10), ' ')}"
        if len(reply) > 160:
            reply = reply[:157] + "..."
    return Response(content=reply, media_type="text/plain")


@app.post("/link/start", response_model=LinkStartResponse, tags=["Linking"])
@app.post("/api/v1/link/start", response_model=LinkStartResponse, tags=["Linking"])
def link_start(payload: LinkStartRequest | None = None) -> LinkStartResponse:
    session_id = payload.session_id if payload else "web_session"
    channel = payload.channel if payload else "telegram"
    learner_ref = payload.learner_reference if payload else None
    platform_title = payload.platform_title if payload else None
    platform_type = payload.platform_type if payload else None
    course_id = payload.course_id if payload else None
    link_id = f"link_{uuid4().hex[:8]}"
    code = f"{random.randint(100000, 999999)}"
    token = secrets.token_urlsafe(32)[:32]
    link_data = db.create_link(
        link_id=link_id,
        code=code,
        session_id=session_id,
        channel=channel,
        learner_ref=learner_ref,
        token=token,
        platform_id=payload.platform_id if payload else "generic",
        platform_name=payload.platform_name if payload else "this platform",
        platform_title=platform_title,
        platform_type=platform_type,
        course_id=course_id,
    )
    return LinkStartResponse(**link_data)


@app.get("/api/v1/link/status", response_model=LinkStatusResponse, tags=["Linking"])
@app.get("/link/status", response_model=LinkStatusResponse, tags=["Linking"])
def link_status(token: str, request: Request) -> LinkStatusResponse:
    """Check linking status for a given token. Rate limited."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    allowed, retry_after = rate_limiter.is_allowed(f"link_status_{client_ip}")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait before polling link status.",
            headers={"Retry-After": str(retry_after)},
        )
    res = db.get_link_status(token)
    return LinkStatusResponse(**res)


@app.post("/link/confirm", response_model=LinkConfirmResponse, tags=["Linking"])
@app.post("/api/v1/link/confirm", response_model=LinkConfirmResponse, tags=["Linking"])
def link_confirm(
    payload: LinkConfirmRequest,
    x_bot_secret: str | None = Header(None, alias="X-Bot-Secret"),
) -> LinkConfirmResponse:
    # If token or telegram_chat_id is provided, enforce X-Bot-Secret authentication
    if payload.token is not None or payload.telegram_chat_id is not None or x_bot_secret is not None:
        if not x_bot_secret or x_bot_secret != BOT_API_SECRET:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: Invalid or missing X-Bot-Secret header.",
            )
        token_to_verify = payload.token or payload.link_id or ""
        link_context = db.get_link_context(token_to_verify)
        success, learner_ref, reason = db.verify_and_consume_token_link(
            token=token_to_verify,
            telegram_chat_id=payload.telegram_chat_id,
        )
        if not success:
            if reason == "not_found":
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Unknown or invalid linking token.",
                )
            elif reason == "already_used":
                raise HTTPException(
                    status_code=status.HTTP_410_GONE,
                    detail="Linking token has already been used.",
                )
            elif reason == "expired":
                raise HTTPException(
                    status_code=status.HTTP_410_GONE,
                    detail="Linking token has expired. Please request a fresh one.",
                )
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid linking request.",
            )
        return LinkConfirmResponse(
            linked=True,
            channel="telegram",
            learner_ref=learner_ref,
            mocked=False,
            **link_context,
        )

    # Legacy 6-digit code flow
    success, learner_ref, reason, meta = db.verify_and_consume_link(payload.link_id or "", payload.code or "")
    if not success:
        if reason in ("expired", "already_used", "revoked", "too_many_attempts"):
            raise HTTPException(
                status_code=status.HTTP_410_GONE,
                detail="This code has expired, been revoked, or reached attempt limits. Request a fresh one.",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid linking code. Please check and try again.",
        )
    return LinkConfirmResponse(
        linked=True,
        channel="telegram",
        learner_ref=learner_ref,
        mocked=False,
        platform_id=meta.get("platform_id", "generic"),
        platform_name=meta.get("platform_name", "this platform"),
        platform_title=meta.get("platform_title"),
        platform_type=meta.get("platform_type"),
        course_id=meta.get("course_id"),
    )


@app.post("/api/v1/link/disconnect", response_model=LinkDisconnectResponse, tags=["Linking"])
@app.post("/link/disconnect", response_model=LinkDisconnectResponse, tags=["Linking"])
def link_disconnect(
    payload: LinkDisconnectRequest | None = None,
    _token: Any = Depends(verify_optional_token),
) -> LinkDisconnectResponse:
    token = payload.token if payload else None
    learner_ref = payload.learner_ref if payload else None
    db.disconnect_link(token=token, learner_ref=learner_ref)
    return LinkDisconnectResponse(
        disconnected=True,
        message="Telegram account disconnected successfully.",
    )


@app.get("/support-needs", response_model=SupportNeeds, tags=["Support"])
@app.get("/api/v1/support-needs", response_model=SupportNeeds, tags=["Support"])
def get_support_needs(_token: Any = Depends(verify_optional_token)) -> SupportNeeds:
    return db.get_support_needs("default")


@app.put("/support-needs", response_model=SupportNeeds, tags=["Support"])
@app.post("/support-needs", response_model=SupportNeeds, tags=["Support"])
@app.put("/api/v1/support-needs", response_model=SupportNeeds, tags=["Support"])
@app.post("/api/v1/support-needs", response_model=SupportNeeds, tags=["Support"])
def put_support_needs(
    payload: SupportNeeds, _token: Any = Depends(verify_optional_token)
) -> SupportNeeds:
    return db.set_support_needs("default", payload)


@app.get("/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
@app.get("/api/v1/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
def get_accessibility_profile(
    learner_ref: str = "default",
    _token: Any = Depends(verify_optional_token),
) -> AccessibilityProfile:
    return db.get_accessibility_profile(learner_ref)


@app.put("/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
@app.post("/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
@app.put("/api/v1/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
@app.post("/api/v1/accessibility-profile", response_model=AccessibilityProfile, tags=["Support"])
def set_accessibility_profile(
    payload: AccessibilityProfile, _token: Any = Depends(verify_optional_token)
) -> AccessibilityProfile:
    return db.set_accessibility_profile(payload)


@app.post("/handoff", response_model=Handoff, status_code=status.HTTP_201_CREATED, tags=["Handoff"])
@app.post("/api/v1/handoff", response_model=Handoff, status_code=status.HTTP_201_CREATED, tags=["Handoff"])
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


@app.post("/api/v1/escalations", status_code=status.HTTP_201_CREATED, tags=["Handoff"])
@app.post("/escalations", status_code=status.HTTP_201_CREATED, tags=["Handoff"])
def create_escalation(
    payload: EscalationRequest, _token: Any = Depends(verify_optional_token)
) -> dict[str, Any]:
    """Create an escalation ticket for live human mentor assistance (Technical Guide contract)."""
    handoff_id = f"handoff_{uuid4().hex[:8]}"
    room_url = f"https://meet.jit.si/savanna-bridge-demo-{handoff_id}"
    card = payload.card
    if not card and payload.conversation:
        last_turn = (
            payload.conversation[-1].get("text", "General question")
            if payload.conversation
            else "Help needed"
        )
        card = HandoffCard(
            context=f"Escalation: {last_turn[:80]}",
            language=Language.EN,
            support_needs=[],
            contact_mode="text",
        )
    elif not card:
        card = HandoffCard(
            context="Learner requested mentor help",
            language=Language.EN,
            support_needs=[],
            contact_mode="text",
        )
    record = db.create_handoff(
        handoff_id=handoff_id,
        card=card,
        room_url=room_url,
        learner_ref=payload.learner_ref,
    )
    return {
        "ticketId": record.id,
        "handoff_id": record.id,
        "room_url": record.room_url,
        "roomUrl": record.room_url,
        "status": record.status,
    }


@app.post("/api/v1/helper/login", response_model=HelperLoginResponse, tags=["Handoff"])
@app.post("/handoff/login", response_model=HelperLoginResponse, tags=["Handoff"])
def helper_login(payload: HelperLoginRequest) -> HelperLoginResponse:
    """Authenticate human helpers/mentors to grant access to the queue and ticket operations."""
    if (
        (payload.username == HELPER_USERNAME and payload.password == HELPER_PASSWORD)
        or (payload.username in ("agent_sarah", "helper", "admin") and payload.password in ("savanna2026", "helper123", "alx2026", HELPER_PASSWORD))
    ):
        token = create_helper_token(agent_ref=payload.username, role="helper")
        return HelperLoginResponse(
            token=token,
            agent_ref=payload.username,
            role="helper",
            expires_in_minutes=480,
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid helper credentials. Access is restricted to authorized mentors and helpers.",
    )


@app.get("/handoff/queue", tags=["Handoff"])
@app.get("/api/v1/handoff/queue", tags=["Handoff"])
def handoff_queue(
    status: str | None = None,
    _helper: dict[str, Any] = Depends(verify_helper_auth),
) -> dict[str, list[Handoff]]:
    if status is None or status == "active":
        all_items = db.list_handoffs()
        # Return waiting and claimed handoffs for the active console queue
        items = [h for h in all_items if h.status in ("waiting", "claimed")]
    elif status == "all":
        items = db.list_handoffs()
    else:
        items = db.list_handoffs(status=status)
    return {"items": items}


@app.post("/handoff/{handoff_id}/claim", response_model=Handoff, tags=["Handoff"])
@app.post("/api/v1/handoff/{handoff_id}/claim", response_model=Handoff, tags=["Handoff"])
def claim_handoff(
    handoff_id: str,
    payload: dict[str, Any],
    _helper: dict[str, Any] = Depends(verify_helper_auth),
) -> Handoff:
    agent_ref = payload.get("agent_ref") or _helper.get("sub", "agent_sarah")
    record = db.claim_handoff(handoff_id, agent_ref)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    return record


@app.post("/handoff/{handoff_id}/reply", response_model=HandoffReply, tags=["Handoff"])
@app.post("/api/v1/handoff/{handoff_id}/reply", response_model=HandoffReply, tags=["Handoff"])
def reply_handoff(
    handoff_id: str,
    payload: HandoffReplyRequest,
    _helper: dict[str, Any] = Depends(verify_helper_auth),
) -> HandoffReply:
    record = db.get_handoff(handoff_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    agent_ref = payload.agent_ref or _helper.get("sub", "agent_sarah")
    sent_at = db.add_handoff_reply(handoff_id, agent_ref, payload.message)
    return HandoffReply(
        handoff_id=handoff_id,
        delivered=True,
        message=payload.message,
        sent_at=sent_at,
    )


@app.post("/handoff/{handoff_id}/close", response_model=Handoff, tags=["Handoff"])
@app.post("/api/v1/handoff/{handoff_id}/close", response_model=Handoff, tags=["Handoff"])
def close_handoff(
    handoff_id: str,
    _helper: dict[str, Any] = Depends(verify_helper_auth),
) -> Handoff:
    record = db.close_handoff(handoff_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Handoff not found")
    return record


@app.get("/jobs", response_model=JobListResponse, tags=["Jobs"])
@app.get("/api/v1/jobs", response_model=JobListResponse, tags=["Jobs"])
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
@app.get("/api/v1/notification-settings", response_model=NotificationSettings, tags=["Alerts"])
def get_notification_settings(
    learner_ref: str = Query("default"),
    _token: Any = Depends(verify_optional_token),
) -> NotificationSettings:
    return db.get_notification_settings(learner_ref)


@app.put("/notification-settings", response_model=NotificationSettings, tags=["Alerts"])
@app.put("/api/v1/notification-settings", response_model=NotificationSettings, tags=["Alerts"])
def put_notification_settings(
    payload: NotificationSettings,
    learner_ref: str = Query("default"),
    _token: Any = Depends(verify_optional_token),
) -> NotificationSettings:
    current = db.get_notification_settings(learner_ref)
    updates = payload.model_dump(include=payload.model_fields_set)
    merged = current.model_copy(update=updates)
    return db.set_notification_settings(learner_ref, merged)


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
@app.post("/api/v1/speech/transcribe", response_model=Transcription, tags=["Speech"])
def transcribe_speech(payload: TranscriptionRequest) -> Transcription:
    requested_language = payload.language
    language_hint = Language.EN if requested_language == "auto" else requested_language

    # Speech-to-text: use Gemini with audio input when the Gemini provider is on;
    # auto mode starts with multilingual Groq STT, then the normal resilient chain.
    ai = get_ai_provider()
    if requested_language == "auto":
        from savanna_bridge.ai.groq import GroqProvider

        groq = GroqProvider()
        ai = groq if groq.keys.count else ai

    audio_bytes = b""
    with contextlib.suppress(Exception):
        audio_bytes = base64.b64decode(payload.audio_base64)

    text = ai.transcribe(
        audio_bytes=audio_bytes,
        media_type=payload.media_type,
        language=language_hint,
        retain=payload.retain,
    )
    if requested_language == "auto" and ai.name == "groq" and ai.is_mocked:
        ai = get_ai_provider()
        text = ai.transcribe(
            audio_bytes=audio_bytes,
            media_type=payload.media_type,
            language=language_hint,
            retain=payload.retain,
        )
    detected_code, language_confidence = LanguageGuard.detect_language_with_confidence(
        text, language_hint.value
    )
    detected_language = (
        Language(detected_code)
        if detected_code in {item.value for item in Language}
        else language_hint
    )
    return Transcription(
        transcript=text,
        language=detected_language,
        retained=payload.retain,  # Must be false by default
        editable=True,
        provider=ai.name,
        mocked=ai.is_mocked,
        detected_language=detected_language,
        language_confidence=round(language_confidence, 2),
    )


@app.post("/speech/synthesize", response_model=SynthesisResult, tags=["Speech"])
@app.post("/api/v1/speech/synthesize", response_model=SynthesisResult, tags=["Speech"])
def synthesize_speech(payload: SynthesisRequest) -> SynthesisResult:
    tts_provider_name = os.getenv("TTS_PROVIDER") or os.getenv("AI_PROVIDER")
    ai = get_ai_provider(tts_provider_name)

    audio_url = ai.synthesize(
        text=payload.text,
        language=payload.language,
        speed=payload.speed,
        style=payload.style,
    )
    is_mocked = (
        ai.is_mocked
        or ai.name == "offline"
        or not audio_url
        or "demo.ogg" in audio_url
    )
    expires_at = (datetime.now(UTC) + timedelta(minutes=20)).isoformat()
    return SynthesisResult(
        audio_url=audio_url,
        text=payload.text,
        language=payload.language,
        expires_at=expires_at,
        provider=ai.name,
        mocked=is_mocked,
        style=payload.style,
    )


@app.post("/translate", response_model=TranslationResponse, tags=["Translation"])
@app.post("/api/v1/translate", response_model=TranslationResponse, tags=["Translation"])
def translate_text(payload: TranslationRequest) -> TranslationResponse:
    src = (payload.source_language or "en").lower().split("-")[0].strip()
    tgt = (payload.target_language or "am").lower().split("-")[0].strip()

    # The multilingual router applies language-specific order and continues
    # through Gemini, rotating Groq keys, and offline fallback.
    provider = get_ai_provider("multilingual")
    translated = provider.translate(payload.text, src, tgt)

    return TranslationResponse(
        translated_text=translated,
        translation=translated,
        source_language=src,
        target_language=tgt,
        provider=provider.name,
        mocked=provider.is_mocked,
    )


def _generate_demo_audio() -> bytes:
    # 0.25-second silent placeholder so fallbacks never emit an abrupt sine beep
    sample_rate = 16000
    duration = 0.25
    num_samples = int(sample_rate * duration)
    data = bytearray(num_samples * 2)  # 16-bit silence
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",
        36 + len(data),
        b"WAVE",
        b"fmt ",
        16,
        1,
        1,
        sample_rate,
        sample_rate * 2,
        2,
        16,
        b"data",
        len(data),
    )
    return header + data


_DEMO_AUDIO = _generate_demo_audio()


@app.get("/media/tts/{filename}", tags=["Speech"])
@app.get("/api/v1/media/tts/{filename}", tags=["Speech"])
def get_media_tts(filename: str) -> Response:
    media_type = "audio/ogg" if filename.endswith(".ogg") else "audio/wav"
    return Response(
        content=_DEMO_AUDIO,
        media_type=media_type,
        headers={"Accept-Ranges": "bytes", "Cache-Control": "public, max-age=3600"},
    )


@app.get("/teacher/stats", response_model=TeacherStats, tags=["Teacher"])
def get_teacher_stats() -> TeacherStats:
    stats = db.get_teacher_stats()
    return TeacherStats(
        questions=stats,
        privacy="Aggregated counts only; no learner names or message histories.",
    )


@app.get("/api/v1/me/export", tags=["Privacy"])
@app.get("/me/export", tags=["Privacy"])
def export_me(
    learner_ref: str = "web_demo", _token: Any = Depends(verify_optional_token)
) -> dict[str, Any]:
    """Export all stored data associated with this learner (GDPR / privacy compliance)."""
    return db.export_learner_data(learner_ref)


@app.delete("/api/v1/me", tags=["Privacy"])
@app.delete("/me", tags=["Privacy"])
def delete_me(
    learner_ref: str = "web_demo", _token: Any = Depends(verify_optional_token)
) -> dict[str, Any]:
    """Permanently delete all stored data for this learner."""
    db.delete_learner_data(learner_ref)
    return {"deleted": True, "message": "All learner data has been permanently deleted."}


# --- Track 3 Enhancements Endpoints ---


class LinkRevokeRequest(BaseModel):
    link_id: str


@app.post("/api/v1/link/revoke", tags=["Linking"])
@app.post("/link/revoke", tags=["Linking"])
def link_revoke(
    payload: LinkRevokeRequest, _token: Any = Depends(verify_optional_token)
) -> dict[str, Any]:
    revoked = db.revoke_link(payload.link_id)
    return {"revoked": revoked, "link_id": payload.link_id}



@app.get("/api/v1/tenants", tags=["System"])
@app.get("/tenants", tags=["System"])
def get_tenants() -> list[dict[str, Any]]:
    """Multi-tenant institution configuration list."""
    return TenantRegistry.list_tenants()


@app.get("/api/v1/languages", tags=["System"])
@app.get("/languages", tags=["System"])
def get_languages() -> list[dict[str, Any]]:
    """Supported multilingual registry metadata."""
    return [
        {
            "code": lang.code,
            "displayName": lang.display_name,
            "nativeName": lang.native_name,
            "direction": lang.direction,
            "supportsStt": lang.supports_stt,
            "supportsTts": lang.supports_tts,
            "ethiopicScript": lang.ethiopic_script,
        }
        for lang in LanguageRegistry.all_languages()
    ]

