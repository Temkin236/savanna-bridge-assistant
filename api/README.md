# Savanna Bridge Assistant API

Portable multilingual assistant and live help service for learning platforms and job boards.
Owned by **Person A**. Built against the frozen contract in `openapi.yaml`.

---

## 1. Quick Start

### Run locally (uvicorn)

```sh
cd api
uvicorn savanna_bridge.main:app --host 0.0.0.0 --port 8000 --reload
```

Interactive OpenAPI documentation is available at `http://localhost:8000/docs`.

### Run via Docker Compose

From the repository root:

```sh
docker compose up api
```

### Run contract mock (Prism)

```sh
docker compose up mock-api
```

Prism serves responses based directly on `api/openapi.yaml` at `http://localhost:4010`.

---

## 2. Testing & Quality Checks

Run the complete test suite:

```sh
cd api
pytest -v
```

Lint and format code:

```sh
python -m ruff check .
python -m ruff format --check .
```

---

## 3. Core Architecture & Milestones

The API implements all Person A milestones:

- **A-M0 (Kickoff & Frozen OpenAPI Contract)**: Complete OpenAPI 3.1.0 schema with examples for all 20 endpoints and error responses.
- **A-M1 (Vertical Slice)**:
  - Adapter interfaces: `ContentSource`, `LearnerDirectory`, `JobSource`, `NotificationChannel`.
  - `SavannaStaticSource`: parses HTML documents into heading-aware chunks (`<h1>`, `<h2>`, `<h3>`), with default bilingual course content for *Customer Service Foundations*.
  - `RetrievalEngine`: BM25+ indexer with multilingual tokenization (English, Amharic Ge'ez script, Afaan Oromo, Tigrinya).
  - Grounded `/ask`: answers include page, heading, and URL citations. Low-confidence queries safely refuse and offer human assistance (`offer_human: true`).
- **A-M2 (Languages, Providers, Linking)**:
  - `AddisAiProvider`: integration with the `addisai` SDK for Amharic, Afaan Oromo, Tigrinya, and English speech-to-text, text-to-speech, and chat.
  - Pluggable AI switching via `AI_PROVIDER` (`auto`, `offline`, `addis`, `cloud`). `auto` routes Ethiopian languages to Addis AI and Arabic to Google.
  - Simple mode flag (`simple_mode: true`) to rewrite answers in short, plain sentences.
  - Expiring, single-use 6-digit account linking (`POST /link/start` and `POST /link/confirm`) with 10-minute expiry.
  - Barrier-free `GET` and `PUT /support-needs` (no ID or medical proof asked).
  - `MockLearnerDirectory`: deadlines and modules.
  - `POST /accommodation/draft`: drafts polite, customizable interview accommodation requests.
  - `POST /speech/transcribe` & `POST /speech/synthesize`: voice input with visible editable transcripts; default `retain: false` (zero voice recordings stored without explicit consent).
- **A-M3 (Handoff, Jobs, Alerts, Security)**:
  - `POST /handoff`: summary card, learner consent check, and Jitsi room URL (`https://meet.jit.si/savanna-bridge-demo-...`).
  - Agent console queue (`GET /handoff/queue`, `POST /handoff/{id}/claim`, `POST /handoff/{id}/reply`, `POST /handoff/{id}/close`) backed by SQLite.
  - `JobPostingSource`: schema.org `JobPosting` loader with filtering by field and accommodations.
  - Alert subscription (`POST /alerts/subscriptions`) and matching (`POST /alerts/match`).
  - Security: signed HMAC-SHA256 widget tokens (`X-Widget-Token`), CORS allowlist, sliding-window rate limiting (429 + `Retry-After`), structured JSON logging.
  - Anonymous `GET /teacher/stats`: aggregated question counts, zero learner identities.
- **A-M4 (Hardening & Verification)**:
  - Contract tests verifying all routes against `openapi.yaml`.
  - Consistent error format with unique `request_id` and error codes.
  - Secrets scan verified.

---

## 4. Curl Verification Examples

### 1. Grounded Question (English)

```sh
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Explain Module 2", "language": "en"}'
```

Response:
```json
{
  "answer": "Module 2 explains how to listen, clarify a customer's need, and respond clearly. Listen carefully without interrupting.",
  "citations": [
    {
      "title": "Customer Service Foundations",
      "heading": "Module 2 - Communicating with customers",
      "page": 2,
      "url": "https://learning.example.org/courses/course_demo/module-2"
    }
  ],
  "language": "en",
  "offer_human": false,
  "reason": "grounded",
  "confidence": 0.67,
  "provider": "offline",
  "mocked": false
}
```

### 2. Grounded Question (Amharic)

```sh
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "ሞጁል 2 ደንበኛ አያያዝ", "language": "am"}'
```

Response:
```json
{
  "answer": "ሞጁል 2 ደንበኛን ማዳመጥ፣ ፍላጎቱን ማብራራት እና ግልጽ ምላሽ መስጠትን ያስረዳል።",
  "citations": [
    {
      "title": "የደንበኞች አገልግሎት መሠረታዊ መርሆዎች",
      "heading": "ሞጁል 2 - ከደንበኞች ጋር መገናኘት",
      "page": 2,
      "url": "https://learning.example.org/courses/course_demo/module-2"
    }
  ],
  "language": "am",
  "offer_human": false,
  "reason": "grounded",
  "confidence": 0.71,
  "provider": "offline",
  "mocked": false
}
```

### 3. Off-topic Refusal (Safe fallback, offers human)

```sh
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the capital of France?", "language": "en"}'
```

Response:
```json
{
  "answer": "I cannot verify that from the course content. Would you like a person to help?",
  "citations": [],
  "language": "en",
  "offer_human": true,
  "reason": "low_confidence",
  "confidence": 0.0,
  "provider": "offline",
  "mocked": false
}
```

---

## 5. Provider Configuration & Benchmarks

Switch AI providers via the `AI_PROVIDER` environment variable:

| Provider | `AI_PROVIDER` | Latency Target | Description |
|---|---|---|---|
| **Automatic multilingual** | `auto` (default) | Provider dependent | Addis AI for Amharic/Oromo/Tigrinya, Google for Arabic, with labelled offline fallback. |
| **Offline FAQ** | `offline` | `< 50 ms` | 100% offline rule-based & extractive BM25 QA. Zero external calls. |
| **Addis AI** | `addis` | `< 3.5 s` | Cloud SDK for Amharic, Afaan Oromo, Tigrinya speech and chat. Requires `ADDIS_API_KEY`. |
| **Cloud** | `cloud` | `< 4 s` | General cloud provider integration. |

---

## 6. How to Add a New Platform Adapter

Savanna Bridge is platform-agnostic. To connect a new LMS, CMS, or job portal, implement the interfaces in `adapters/base.py`:

### Step 1: Implement `ContentSource`

```python
from adapters.base import ContentSource, ContentChunk

class MoodleContentSource(ContentSource):
    def __init__(self, api_client):
        self.client = api_client

    def get_chunks(self, course_id: str | None = None) -> list[ContentChunk]:
        raw_lessons = self.client.fetch_lessons(course_id)
        return [
            ContentChunk(
                chunk_id=f"moodle_{l['id']}",
                course_id=course_id or "default",
                title=l["course_name"],
                heading=l["lesson_title"],
                text=l["html_body"],
                url=l["web_link"],
                page=l.get("section_number", 1),
                language="en",
            )
            for l in raw_lessons
        ]
```

### Step 2: Implement `LearnerDirectory`

```python
from adapters.base import LearnerDirectory
from savanna_bridge.models import Deadline, CourseModule

class MoodleLearnerDirectory(LearnerDirectory):
    def get_deadlines(self, learner_ref: str | None = None) -> list[Deadline]:
        # Fetch from LMS calendar API
        ...

    def get_modules(self, course_id: str | None = None) -> list[CourseModule]:
        # Fetch course syllabus from LMS API
        ...
```

### Step 3: Plug into `main.py`

In `savanna_bridge/main.py`, instantiate your new adapter:

```python
content_source = MoodleContentSource(...)
learner_dir = MoodleLearnerDirectory(...)
retrieval_engine = RetrievalEngine(content_source)
```
