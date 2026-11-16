# Accessibility and Quality Test Log

Record only checks that were actually performed. Do not turn planned checks into
claims. Remove names and personal data from evidence.

| Date and time EAT | Build or commit | Tester role | Device and browser | Assistive technology | Task | Result | Issues and owner | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-11-14 12:30 | M0 workspace | Setup automation | Windows, Chrome | None | Start the Docker stack and verify API, bot, console, demo host, and Prism mock | Pass | Host FFmpeg remains optional for setup; FFmpeg 8.1.3 is available in the bot container. | Compose health checks and HTTP smoke responses |
| 2026-11-14 12:34 | M0 workspace | Setup automation | Windows, Chrome | None | Scan Savanna demo, generic job board, and agent console placeholders | Pass | Zero critical and zero serious axe findings on all three M0 pages. This is not a final widget claim. | Playwright and axe-core automated run, 3 tests passed |
| 2026-11-14 12:32 | API worktree | Setup automation | Python 3.12 container | None | API unit, retrieval, contract, security, handoff, linking, provider, support-needs, and alert tests | Pass | 32 tests passed; one upstream TestClient deprecation warning. | Pytest container run |
| 2026-11-15 | Track 3 integrated workspace | Automated verification | Windows, Microsoft Edge | Keyboard contract plus axe-core; not a real screen reader | Run current Savanna host, portable widget, agent console, five-language/RTL flow, text-plus-speech fallback, consented live help, focus trap, and emoji-control checks | Pass | 11 Playwright tests passed; zero critical or serious axe findings. Real NVDA and TalkBack sessions remain pending. | `npm --prefix tests run verify` against the Compose services |
| 2026-11-15 | Track 3 integrated workspace | Automated verification | Python 3.12 API container | None | Run the complete backend regression suite and Ruff | Pass | 52 tests passed after removing the unused Ollama provider and adding Google AI speech coverage; one upstream TestClient deprecation warning. | `pytest -q`; `ruff check src tests` |
| 2026-11-16 | Agentic accessibility implementation | Automated verification | Windows, Microsoft Edge | Keyboard contract, speech API stub, and axe-core; not a real screen reader | Verify opt-in spoken setup, no background microphone request, language/RTL behavior, focus trap and restoration, 44px target floor, visible text with speech, professional SVG controls, portable host, live handoff, and agent console | Pass | 12 browser tests passed; zero critical or serious axe findings on Savanna, generic job board, console, and open widget. Real NVDA and TalkBack sessions remain pending. | Playwright `axe.spec.ts`, `integration.spec.ts`, and `screen-reader.spec.ts`, local non-Docker servers |
| 2026-11-16 | Agentic accessibility implementation | Automated verification | Python 3.13, Windows | None | Verify multilingual routing, rotating Groq credential pool, language confidence, safe action plans, consent-preserving notification updates, Telegram flow, and regressions | Pass | API: 72 tests and Ruff passed. Channels: 19 tests and Ruff passed. Contract examples and secret scan passed. | `pytest -q`; `ruff check`; `check_openapi_examples.py`; `check_secrets.py` |
| 2026-11-16 | Savanna static host integration | Automated verification | Windows, Microsoft Edge | axe-core scoped to embedded widget | Verify the accessibility widget loads, opens, carries Savanna platform context, and has no critical or serious widget findings on the static landing, paced, self-paced, and concept pages | Pass | 4 of 4 pages passed. The frozen host markup has separate pre-existing accessibility debt outside the widget scope. | Playwright `savanna-static.spec.ts`, local non-Docker server |

## Co-designer sessions

| Session | Date and time EAT | Device and access needs | Main task | Completed unaided | Blockers | Changes assigned |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | To schedule | To confirm | Ask a cited question and request a person | Not tested | Pending co-designer details | D |
| Final | To schedule | To confirm | Full demo task | Not tested | Pending | D |

