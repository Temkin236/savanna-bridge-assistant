# Accessibility and Quality Test Log

Record only checks that were actually performed. Do not turn planned checks into
claims. Remove names and personal data from evidence.

| Date and time EAT | Build or commit | Tester role | Device and browser | Assistive technology | Task | Result | Issues and owner | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-11-14 12:30 | M0 workspace | Setup automation | Windows, Chrome | None | Start the Docker stack and verify API, bot, console, demo host, and Prism mock | Pass | Host FFmpeg remains optional for setup; FFmpeg 8.1.3 is available in the bot container. | Compose health checks and HTTP smoke responses |
| 2026-11-14 12:34 | M0 workspace | Setup automation | Windows, Chrome | None | Scan Savanna demo, generic job board, and agent console placeholders | Pass | Zero critical and zero serious axe findings on all three M0 pages. This is not a final widget claim. | Playwright and axe-core automated run, 3 tests passed |
| 2026-11-14 12:32 | API worktree | Setup automation | Python 3.12 container | None | API unit, retrieval, contract, security, handoff, linking, provider, support-needs, and alert tests | Pass | 32 tests passed; one upstream TestClient deprecation warning. | Pytest container run |

## Co-designer sessions

| Session | Date and time EAT | Device and access needs | Main task | Completed unaided | Blockers | Changes assigned |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | To schedule | To confirm | Ask a cited question and request a person | Not tested | Pending co-designer details | D |
| Final | To schedule | To confirm | Full demo task | Not tested | Pending | D |

