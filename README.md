# Savanna Bridge Assistant

Savanna Bridge Assistant is an installable accessibility module for learning
platforms and job boards. It gives learners an Amharic and English tutor grounded
only in indexed content, editable voice input, read-aloud with a complete text
path, Telegram access and alerts, barrier-free account linking, and one-click
human help. Savanna is the first adapter, not the architecture.

This repository now contains the G0 foundation plus a tested API vertical
slice. The frozen contract, real offline API, contract mock, starter frontends,
and shared quality gates let the four owners work independently from day one.

## Start in five minutes

Prerequisites: Git, Docker Desktop with Compose v2, and a running Docker engine.
Node 20+ and Python 3.11+ are needed only for host-side development. FFmpeg is
included in the bot container; channel developers should also install it locally.

```sh
git clone https://github.com/Temkin236/savanna-bridge-assistant.git
cd savanna-bridge-assistant
cp .env.example .env
docker compose up --build -d
docker compose ps
```

On Windows PowerShell, use `Copy-Item .env.example .env` and optionally run:

```powershell
./scripts/dev.ps1 up
```

Open:

- API health: `http://localhost:8000/health`
- API documentation: `http://localhost:8000/docs`
- Contract mock: `http://localhost:4010/health`
- Agent console placeholder: `http://localhost:8080`
- Demo hosts: `http://localhost:4173`

The API runs without paid credentials in `offline` mode. It demonstrates the
non-negotiable grounded-answer and low-confidence-refusal paths, and exposes
the remaining contract routes for linking, support needs, speech, handoff,
jobs, alerts, and anonymous teacher statistics.

## Three integration levels

### 1. Add the widget to an HTML page

Build `widget/` once and self-host the generated module. The Docker demo does
this automatically and never loads runtime code from a CDN.

```html
<bridge-assistant
  data-api="https://assistant.example.org"
  data-course="course_demo"
  data-lang="en">
</bridge-assistant>
<script type="module" src="/assets/savanna-bridge/widget.js"></script>
```

The custom element uses Shadow DOM, so host-page CSS does not leak into the
assistant. Keep the API origin in `CORS_ORIGINS`.

### 2. Use the REST API directly

Every client uses the same OpenAPI contract. A minimal grounded question is:

```sh
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What does Module 2 teach?","language":"en"}'
```

Successful grounded answers contain citations. Weak retrieval returns no
citations, refuses to guess, and sets `offer_human` to `true`.

### 3. Connect through open standards and adapters

- Generate clients or mocks from `api/openapi.yaml` (OpenAPI 3.1).
- Index ordinary HTML through a `ContentSource` implementation.
- Import jobs expressed as schema.org `JobPosting` data.
- Implement `LearnerDirectory`, `JobSource`, or `NotificationChannel` without
  importing another workstream's code.

Savanna is the first content adapter, not a hard-coded platform boundary.

## Architecture

```text
Host page or job board          Telegram and SMS sandbox
          |                               |
          v                               v
  Shadow DOM widget                 Channel adapters
          \                               /
           +------ HTTP/OpenAPI contract -+
                           |
                           v
                    FastAPI service
              /          |           \
       content       learner/jobs     AI provider
       adapters        adapters       interface
          |                               |
  Savanna static or generic HTML   Addis, cloud, Ollama,
                                   or offline FAQ/BM25
```

All platform dependencies sit behind `ContentSource`, `LearnerDirectory`,
`JobSource`, and `NotificationChannel` boundaries. Workstreams communicate over
HTTP and never import another owner's folder.

## Team ownership

| Owner | Folder | First milestone |
| --- | --- | --- |
| A | `api/` | Extend the working adapters, BM25 retrieval, citations, provider integrations, and security controls |
| B | `widget/` | Build the accessible Shadow DOM chat shell against the Prism mock |
| C | `channels/` | Build the Telegram bot against the mock and retain the health endpoint |
| D | `docs/`, `tests/`, `demo-host/`, root | CI, integration, accessibility evidence, README, and delivery |

Branches are `<initial>/m<N>-<topic>`, for example `b/m1-widget-shell`. CI rejects
changes outside the branch owner's folders. Root changes go through D. After G0,
only A edits `api/openapi.yaml`, and only additively.

Before M1, every person completes [the team start checklist](docs/team-start-checklist.md)
and reads the OpenAPI examples as a consumer.

## Independent development

Run the frozen examples without waiting for API implementation:

```sh
docker compose up mock-api
```

Person B runs the widget:

```sh
cd widget
npm install
npm run dev
```

Person A runs API tests:

```sh
docker compose run --rm api pytest -q
```

Person D runs the integration and accessibility gates:

```sh
make integration
make axe
```

On Windows without GNU Make, use `./scripts/dev.ps1 integration` and
`./scripts/dev.ps1 axe`.

The full contract is in `api/openapi.yaml`. The source requirements remain in
`Savanna_Bridge_Assistant_Requirements,_Stack_and_Agent_Prompts_2.docx`.

## Configuration and secrets

Copy `.env.example` to `.env`; `.env` is ignored. Never commit or paste API keys,
bot tokens, voice recordings, learner names, support needs, or phone numbers.
Only the API receives AI-provider credentials. The widget and bot call the API.

`AI_PROVIDER` will support `addis`, another cloud provider, `ollama`, and
`offline`. The default is `offline`, so the core demonstration has no paid-API
lock-in. Start the optional model service with:

```sh
docker compose --profile ollama up ollama
```

SMS is an Africa's Talking sandbox demonstration only; `SMS_DRIVER=mock` is the
safe default. No production SMS is sent.

## Accessibility and privacy gates

- WCAG 2.2 AA; axe-core must report zero critical and zero serious findings.
- Keyboard-only, 200 percent zoom, sound-off, NVDA, and TalkBack runs are recorded.
- A co-designer must complete the main task unaided before submission.
- Text is always equivalent to voice; voice is not retained by default.
- Linking and support flows never request ID, medical proof, diagnosis, or history.
- Weak retrieval refuses and offers a person; the tutor never invents content.
- Screen sharing starts only after explicit consent and remains learner-controlled.

Use [the test protocol](docs/test-protocol.md) and record only completed checks in
[the test log](docs/test-log.md). The WCAG report is intentionally a draft until
evidence exists.

The automated gate is deliberately narrower than a conformance claim: axe must
find zero critical or serious issues, but keyboard, reflow, sound-off, NVDA,
TalkBack, and co-designer evidence are still required before final submission.

## Common commands

| Command | Purpose |
| --- | --- |
| `docker compose up --build -d` | Start the complete M0 stack |
| `docker compose down --remove-orphans` | Stop it |
| `docker compose up mock-api` | Serve OpenAPI examples on port 4010 |
| `docker compose run --rm api pytest -q` | Run API tests |
| `make integration` | Run ask, refusal, handoff, jobs, and mock Telegram flow |
| `make axe` | Run blocking critical/serious axe checks |
| `./scripts/dev.ps1 install-test` | Export a clean copy and rehearse installation on alternate ports |
| `python tests/check_openapi_examples.py` | Check required paths and examples |
| `docker compose config --quiet` | Validate Compose configuration |
| `./scripts/dev.ps1 status` | Show service status on Windows |

GNU Make users can use `make up`, `make down`, `make mock-api`, `make test`,
`make lint`, and `make axe`.

## Current limitations

- The API uses local SQLite and bundled demonstration content; production
  persistence and approved Savanna content still need configuration.
- The widget is an accessible starter shell, not the complete chat experience.
- The Telegram worker and agent queue UI remain starter services; their API
  routes and queue persistence are available for integration.
- Voice, Addis AI, Africa's Talking, and Ollama integrations require local keys or
  models and must be tested before any capability claim.
- The bundled demo content is minimal; D still needs the approved Savanna static
  pages and baseline accessibility report.
- Automated Telegram evidence is explicitly mock delivery unless a team member
  adds a real bot token to their uncommitted `.env`.

