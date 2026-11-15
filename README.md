# Savanna Bridge Assistant

[![Accessibility: Tested with axe-core & NVDA](https://img.shields.io/badge/Accessibility-Axe--core%20%26%20NVDA%20Tested-success)](CONFORMANCE.md)
[![OpenAPI 3.1.0](https://img.shields.io/badge/OpenAPI-3.1.0-blue)](openapi.yaml)
[![License: MIT / ALX Open](https://img.shields.io/badge/License-MIT%20%2F%20ALX%20Open-green.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Compose%20v2-2496ED?logo=docker&logoColor=white)](docker-compose.yml)

**Track 3:** Multilingual Assistant and Live Help  
**Team Members:** Person A (Backend & Retrieval), Person B (Accessible Widget), Person C (Channels & Console), Person D (Quality & Integration)  
**Co-Designer Collaboration:** Stand-in rehearsal protocol conducted on low-cost Android and Windows NVDA (appointment pending with mentor desk).

---

## What it does

Savanna Bridge Assistant is an embeddable, accessible tutoring and live support module for learning platforms and job portals. It answers learner course questions strictly from indexed materials with citations in Amharic and English, refusing and offering human help when unverified. The module provides editable voice input, full text-speech equivalence, zero-proof accessibility preferences, a Telegram bot (`@savannah_assistant3_bot`), and one-click live mentor handoff.

---

## The main task we tested

> "A blind or low-connectivity learner asks course questions by voice in Amharic on an entry-level Android phone without sighted assistance, receives cited grounding, and can escalate to a live mentor."

---

## Run it

### 1. Start the stack in one command

Prerequisites: Git and Docker Desktop with Docker Compose v2.

```sh
git clone https://github.com/Temkin236/savanna-bridge-assistant.git
cd savanna-bridge-assistant
cp .env.example .env
docker compose up --build -d
```

### Configuration Settings (.env)

| Variable | Default / Example | Purpose |
|---|---|---|
| `API_PORT` | `8000` | Port for the core FastAPI backend. |
| `AI_PROVIDER` | `offline` | Active AI provider: `offline` (extractive BM25), `cloud` (Gemini), or `addis`. |
| `TELEGRAM_BOT_TOKEN` | `""` | Telegram Bot token issued by BotFather. |
| `TELEGRAM_BOT_USERNAME` | `savannah_assistant3_bot` | Bot username used to construct seamless one-button deep links. |
| `BOT_API_SECRET` | `change-me-bot-secret` | Shared secret header (`X-Bot-Secret`) required to confirm link tokens. |
| `GOOGLE_AI_API_KEY` | `""` | Optional Google Gemini key used when `AI_PROVIDER=cloud`. |

*(On Windows PowerShell, use `./scripts/dev.ps1 up`)*

### 2. Service Directory & URLs to open

| Service | Address | What to test |
|---|---|---|
| **Blank Page Host** | [http://localhost:4173/blank.html](http://localhost:4173/blank.html) | **Proof outside Savanna:** Zero Bootstrap, zero Savanna CSS, single script tag |
| **Savanna Demo Host** | [http://localhost:4173/savanna/](http://localhost:4173/savanna/) | Assistant embedded inside the official Savanna starter lesson |
| **Career Gateway (Jobs)** | [http://localhost:4173/savanna/pages/jobs.html](http://localhost:4173/savanna/pages/jobs.html) | Level 3 schema.org `JobPosting` JSON-LD job board integration |
| **Mentor Agent Console** | [http://localhost:8080](http://localhost:8080) | Live WCAG 2.2 AA queue where mentors claim and answer tickets |
| **API Documentation** | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive Swagger UI testing every API endpoint |
| **API Health Check** | [http://localhost:8000/health](http://localhost:8000/health) | API health status and active AI provider |
| **Contract Mock (Prism)** | [http://localhost:4010/health](http://localhost:4010/health) | Frozen contract mock conforming to [openapi.yaml](openapi.yaml) |
| **Telegram Bot Health** | [http://localhost:8081/health](http://localhost:8081/health) | Telegram polling and channel health status |

---

## Install, Level 1

Embed the assistant into any HTML page using **one classic script tag** and **one custom element**. No npm packages or framework dependencies are needed on the host.

### 1. HTML Snippet

```html
<!-- 1. Load the module (Classic IIFE script - no CORS module restrictions) -->
<script src="/widget/widget.iife.js" defer></script>

<!-- 2. Place it (supports both <db-assistant> and <bridge-assistant>) -->
<db-assistant 
  lang="am" 
  api="http://localhost:8000" 
  content="course_demo">
</db-assistant>

<!-- 3. Optionally, listen to bubbling CustomEvents -->
<script>
  document.addEventListener("db-assistant:question", (event) => {
    console.log("Learner asked:", event.detail.text, "Language:", event.detail.language);
  });

  document.addEventListener("db-assistant:escalated", (event) => {
    console.log("Escalated to human tutor. Ticket ID:", event.detail.ticketId);
  });
</script>
```

> **Module Script Alternative:** Modern ES module loading is also supported via:  
> `<script type="module" src="/widget/widget.js"></script>`

### 2. Tag Attributes

| Attribute | Plain Alias | Default | Description |
|---|---|---|---|
| `lang` | `data-lang` | `"en"` | Initial UI language: `"en"` (English), `"am"` (Amharic), `"om"` (Afaan Oromo), `"ti"` (Tigrinya), `"ar"` (Arabic). |
| `api` | `data-api` | `"http://localhost:8000"` | Base URL of the Savanna Bridge Assistant REST API. |
| `content` | `data-course` | `"course_demo"` | Course or curriculum identifier used for context-bounded retrieval. |
| `token` | `data-token` | `null` | Optional HMAC-SHA256 widget session token (`X-Widget-Token`). |

### 3. Events Dispatched by the Module

The component emits bubbling, composed custom events allowing host pages to respond without modifying widget code:

- **`db-assistant:question`**: Dispatched whenever a question is submitted.  
  `detail: { text: string, language: string }`
- **`db-assistant:escalated`**: Dispatched whenever a learner creates a live mentor handoff ticket.  
  `detail: { ticketId: string }`

### 4. Production-Ready Widget Layout & User Flow

The assistant panel is structured for immediate cognitive ease, screen-reader clarity, and one-button continuity:

1. **Header**:
   - Course assistant title with auto-truncation.
   - Script-native language toggle buttons (`አማርኛ` / `English`).
   - Settings button (`⚙️`) opening the modal settings dialog.
   - Accessible Close button (`✕`) restoring focus to the floating launcher.
2. **Body (Message Log)**:
   - **Empty State**: Welcoming message with **3 course-grounded suggested questions** ("What does Module 2 teach?", "Explain customer service foundations", "How do I communicate with customers?") for one-tap answers.
   - **Answer Cards**: Each answer presents a clear heading, explanatory text, action toolbar (**Listen** TTS with pause/resume, **Make simpler** simplification toggle), and clickable course source citations with human-readable titles.
   - **Refusals / Low Confidence**: Answers outside course bounds explicitly state refusal and offer two buttons: **Talk to a person** and **Try another question**.
   - **Offline Resilience**: Offline status banner with automatic `localStorage` question queuing and auto-flush on reconnection.
3. **Footer (Always Visible)**:
   - Input row: Text field, accessible Microphone button (speech-to-text with editable preview), and primary Send button.
   - Persistent action buttons:
     - **Talk to a person**: Instantly connects to the human mentor queue and provides a Jitsi meeting room with mobile Chrome screen sharing fallback notes.
     - **Continue on Telegram**: A real `<a href="https://t.me/savannah_assistant3_bot?start=TOKEN">` deep link. Tapping it initiates automatic status polling every 2 seconds for up to 10 minutes. Upon linking, the live region announces *"Telegram connected"*, and the UI displays *"Connected to Telegram"* alongside a **Disconnect** button and a privacy notice: *"Telegram will receive your questions and the answers."*
4. **Settings Dialog**:
   - Modal overlay accessible via keyboard or button.
   - Text size controls (`smaller`, `normal`, `larger`).
   - High contrast toggle.
   - Simple mode toggle.
   - Private support needs declaration (extra time, screen reader friendly materials, written instructions) stored separately via `PUT /api/v1/support-needs` with zero medical proof requested.

---

## Install, Level 2

Level 2 allows any host server to interact with the assistant directly via the frozen contract: [openapi.yaml](openapi.yaml).

### Curl Examples for Every Endpoint

#### 1. System Health
```sh
curl -s http://localhost:8000/api/v1/health
```

#### 2. Grounded Question (English)
```sh
curl -s -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What does Module 2 teach?","language":"en"}'
```

#### 3. Grounded Question (Amharic)
```sh
curl -s -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"ሞጁል 2 ደንበኛ አያያዝ","language":"am"}'
```

#### 4. Low-Confidence Refusal (Safe Fallback with Human Offer)
```sh
curl -s -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is the capital of France?","language":"en"}'
```

#### 5. Inbound SMS Webhook (Returns Max 160 Characters Plain Text)
```sh
curl -s -X POST http://localhost:8000/sms/inbound \
  -H "Content-Type: application/json" \
  -d '{"from":"+251911223344","text":"What is module 2?"}'
```

#### 6. Dynamic Content Ingestion (Host Indexes Course Lessons)
```sh
curl -s -X POST http://localhost:8000/api/v1/content \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": "course_demo",
    "chunks": [
      {
        "title": "Customer Service Foundations",
        "heading": "Module 3 - De-escalation",
        "text": "Always stay calm and acknowledge customer concerns before offering a resolution.",
        "url": "https://learning.example.org/module-3",
        "page": 3,
        "language": "en"
      }
    ]
  }'
```

#### 7. Create Mentor Escalation / Handoff
```sh
curl -s -X POST http://localhost:8000/api/v1/escalations \
  -H "Content-Type: application/json" \
  -d '{"conversation":[{"role":"user","text":"I am stuck on assignment 2"}],"learner_ref":"demo_learner"}'
```

#### 8. Mentor Queue Inspection
```sh
curl -s http://localhost:8000/handoff/queue
```

#### 9. Mentor Claim Ticket
```sh
curl -s -X POST http://localhost:8000/handoff/handoff_01/claim \
  -H "Content-Type: application/json" \
  -d '{"agent_ref":"mentor_abebe"}'
```

#### 10. Mentor Reply to Learner
```sh
curl -s -X POST http://localhost:8000/handoff/handoff_01/reply \
  -H "Content-Type: application/json" \
  -d '{"agent_ref":"mentor_abebe","message":"Hello! Review step 2 of the instructions."}'
```

#### 11. Close Handoff Ticket
```sh
curl -s -X POST http://localhost:8000/handoff/handoff_01/close
```

#### 12. Start One-Button Telegram Linking (Deep Link)
```sh
curl -s -X POST http://localhost:8000/api/v1/link/start \
  -H "Content-Type: application/json" \
  -d '{"session_id":"web_session_123","channel":"web"}'
# Returns: {"token":"<32-char-token>","deep_link":"https://t.me/savannah_assistant3_bot?start=<token>","expires_in":600}
```

#### 13. Poll Telegram Linking Status
```sh
curl -s "http://localhost:8000/api/v1/link/status?token=<32-char-token>"
# Returns: {"linked":false,"channel":null} or {"linked":true,"channel":"telegram"}
```

#### 14. Confirm Linking Token (Bot Authenticated)
```sh
curl -s -X POST http://localhost:8000/api/v1/link/confirm \
  -H "Content-Type: application/json" \
  -H "X-Bot-Secret: change-me-bot-secret" \
  -d '{"token":"<32-char-token>","telegram_chat_id":"12345678"}'
```

#### 15. Disconnect Telegram Link
```sh
curl -s -X POST http://localhost:8000/api/v1/link/disconnect \
  -H "Content-Type: application/json" \
  -d '{"session_id":"web_session_123","channel":"telegram"}'
```

#### 14. Get Support Needs (Zero Medical Proof)
```sh
curl -s http://localhost:8000/api/v1/support-needs
```

#### 15. Update Support Needs
```sh
curl -s -X PUT http://localhost:8000/api/v1/support-needs \
  -H "Content-Type: application/json" \
  -d '{"needs":["extra_time","screen_reader"],"preferred_contact_mode":"text"}'
```

#### 16. List Jobs
```sh
curl -s http://localhost:8000/api/v1/jobs
```

#### 17. Draft Workplace Accommodation Request
```sh
curl -s -X POST http://localhost:8000/accommodation/draft \
  -H "Content-Type: application/json" \
  -d '{"job_id":"job_01","support_needs":["quiet_space","screen_reader"],"language":"en"}'
```

#### 18. Subscribe to Alerts
```sh
curl -s -X POST http://localhost:8000/alerts/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"learner_ref":"demo_learner","channel":"telegram","fields":["customer_service"]}'
```

#### 19. Match Alerts
```sh
curl -s -X POST http://localhost:8000/alerts/match \
  -H "Content-Type: application/json" \
  -d '{"job":{"id":"job_01","title":"Support Specialist","job_location":"Addis Ababa","hiring_organization":"Acme","description":"Support role","date_posted":"2026-11-14","application_url":"https://example.org","source_url":"https://example.org"}}'
```

#### 20. Speech-to-Text Transcription (Default: Zero Audio Retained)
```sh
curl -s -X POST http://localhost:8000/speech/transcribe \
  -H "Content-Type: application/json" \
  -d '{"audio_base64":"UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=","media_type":"audio/wav","language":"en","retain":false}'
```

#### 21. Speech Synthesis (TTS Audio URL)
```sh
curl -s -X POST http://localhost:8000/speech/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text":"Welcome to Module 2.","language":"en","speed":1.0}'
```

#### 22. Anonymous Teacher Question Analytics
```sh
curl -s http://localhost:8000/teacher/stats
```

#### 23. Learner Privacy Data Export (GDPR / Privacy Access)
```sh
curl -s http://localhost:8000/api/v1/me/export
```

#### 24. Learner Privacy Data Erasure (Right to Be Forgotten)
```sh
curl -s -X DELETE http://localhost:8000/api/v1/me
```

---

## Install, Level 3

Level 3 implements the open **schema.org `JobPosting`** standard.

Jobs are marked up with structured JSON-LD directly within the host page at [demo-host/savanna/pages/jobs.html](demo-host/savanna/pages/jobs.html). Search engines, accessibility crawlers, and job aggregators can parse job specifications and employer accommodations without proprietary APIs:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Junior Front-End Developer",
  "description": "Accessible front-end development position with inclusive mentoring.",
  "datePosted": "2026-11-14",
  "employmentType": "FULL_TIME",
  "jobLocationType": "TELECOMMUTE",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Test Employer PLC"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "ET"
    }
  },
  "jobBenefits": "Remote work, flexible hours, interpreter for interviews, screen reader friendly toolchain"
}
</script>
```

---

## Languages and How to Add One

The system currently supports:
- **English (`en`)**: Complete offline BM25 and cloud generation.
- **Amharic (`am`, አማርኛ)**: Complete offline BM25 extraction with Ge'ez punctuation normalizer and Addis AI/Gemini generation.
- **Afaan Oromo (`om`) & Tigrinya (`ti`)**: *Experimental* via Addis AI SDK cloud translations; UI strings translated.
- **Arabic (`ar`)**: Right-to-left (`dir="rtl"`) CSS logical property layout support.

### Adding a New Language (e.g., Somali `so`)

1. Add translation keys to `widget/src/bridge-assistant.ts` under `I18N.so`:
   ```typescript
   so: {
     appTitle: "Kaaliyaha Buundada Savanna",
     launcherLabel: "Caawinaad",
     closeLabel: "Xidh",
     inputPlaceholder: "Weydii su'aal...",
     // ...
   }
   ```
2. The UI uses CSS logical properties (`margin-inline-start`, `inset-inline-end`, `dir="auto"`), ensuring right-to-left scripts render automatically.

---

## Offline and Slow Connection

- **Offline Behavior**:
  - Offline FAQ BM25 requires **zero network requests** and operates with sub-50ms latency.
  - When a device loses internet connectivity, typed questions are stored in `localStorage` under `db_assistant_offline_queue`.
  - The assistant announces: *"Saved on this phone. It will send when you are online."*
  - As soon as the `online` event fires, queued questions automatically flush and submit.
- **Measured Production Bundle Size**:
  - Classic IIFE bundle (`widget.iife.js`): **55.7 KB uncompressed, 15.35 KB gzipped**.
  - Modern ES bundle (`widget.js`): **62.6 KB uncompressed, 16.06 KB gzipped**.
  - *Well below the 500 KB hackathon target, matching the ~15 KB budget.*
- **Measured Load Time on Slow 3G** (Chrome DevTools Throttling: 400ms RTT, 400 kbps down):
  - Blank page load & custom element mount: **~1.15 seconds**.

---

## Data and Privacy

- **What is Collected**:
  - Learner questions (stripped of names/emails for anonymous teacher analytics).
  - Self-declared support preferences (stored in SQLite under an anonymous session reference).
  - Handoff context summaries (retained only until ticket resolution).
- **Zero Proof Policy**:
  - The system **never** asks for kebele ID, national identification, medical history, or diagnosis proof.
- **Third-Party AI Consent Disclosure**:
  - In default `offline` mode, **zero** data leaves the host container.
  - When `AI_PROVIDER=cloud` (Google Gemini) or `addis` is enabled, question text is sent to the respective third-party API without learner identifiers.
- **Data Export & Deletion**:
  - Learners can view and export all data held about them via `GET /api/v1/me/export`.
  - Learners can permanently erase all their data with `DELETE /api/v1/me`.

---

## Cost to Run per Month (Rough Estimate for 3,000 Learners)

Assuming 3,000 active learners asking an average of 20 questions per month:

| Architecture Component | Setup | Estimated Monthly Cost |
|---|---|---|
| **Default Offline Setup** | Extractive BM25 running on existing host server | **$0.00 / month** (zero paid APIs) |
| **Cloud AI (Google Gemini 1.5 Flash)** | 60,000 queries/mo @ ~600 tokens/query | **~$3.00 / month** |
| **Self-Hosted VPS** | 2 vCPU / 4 GB RAM container host | **~$10.00 - $20.00 / month** |
| **Total Deployment Cost** | Fully functional accessibility suite | **Under $25 / month** |

---

## Finished and Not Finished (Honest Status)

### What is Finished & Verified
- [x] Full Level 1 Web Component (`<db-assistant>` and `<bridge-assistant>`) supporting both classic IIFE and ES module builds.
- [x] Custom event emission: `db-assistant:question` and `db-assistant:escalated`.
- [x] Blank page external host verification (`demo-host/blank.html` with no Bootstrap/Savanna CSS).
- [x] Level 3 schema.org `JobPosting` JSON-LD embedded on `savanna/pages/jobs.html`.
- [x] Versioned API routes (`/api/v1/ask`, `/api/v1/content`, `/api/v1/escalations`, `/api/v1/me`).
- [x] Inbound SMS webhook (`POST /sms/inbound`) returning <= 160 character plain text.
- [x] Offline question queuing via `localStorage` with automatic online reconnection flush.
- [x] Accessible mentor console ([http://localhost:8080](http://localhost:8080)) with live ticket claiming and direct replies.
- [x] Telegram bot (`@savannah_assistant3_bot`) handling voice notes, plain text Q&A, and numeric menu actions.
- [x] Automated accessibility test pass (0 critical, 0 serious violations via `axe-core`).

### What is Not Finished / Experimental
- [ ] **Co-Designer Live Session**: Stand-in rehearsal protocols completed on Windows NVDA and Android Chrome; live co-designer session with an assigned participant is pending mentor desk scheduling.
- [ ] **Afaan Oromo & Tigrinya Offline Retrieval**: Currently experimental via Addis AI cloud translation; offline BM25 dictionary index is populated for English and Amharic only.
- [ ] **Production LMS Integration**: Demonstrated with bundled mock learner directory (deadlines and modules are test fixtures).
- [ ] **Android Screen Sharing Fallback**: Mobile Chrome does not support `getDisplayMedia`; helper receives current URL, heading anchor, and active element details instead of live video stream.

---

## Libraries and Their Licences

| Library / Component | Version | Licence | Purpose |
|---|---|---|---|
| **FastAPI** | 0.115.0+ | MIT | Asynchronous REST backend |
| **Pydantic** | 2.10.0+ | MIT | Data validation and OpenAPI models |
| **Uvicorn** | 0.32.0+ | BSD-3-Clause | ASGI web server |
| **rank-bm25** | 0.2.2+ | Apache-2.0 | BM25 retrieval indexer |
| **aiogram** | 3.15.0+ | MIT | Telegram Bot framework |
| **Vite** | 6.4.6 | MIT | Web component compiler |
| **TypeScript** | 5.6.0 | Apache-2.0 | Type-safe widget logic |
| **axe-core / Playwright** | 4.10.0 | MPL-2.0 / Apache-2.0 | Automated accessibility auditing |

---

## Conformance & Quality Checks

Full evaluation details and assistive technology logs are documented in [CONFORMANCE.md](CONFORMANCE.md).

```sh
# Run API integration and contract tests
docker compose run --rm api pytest -q

# Run automated axe-core accessibility audit
npm --prefix tests run axe

# Verify secrets and environment safety
python tests/check_secrets.py
```
