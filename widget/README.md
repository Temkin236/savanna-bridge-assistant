# Savanna Bridge Assistant Widget (`<bridge-assistant>`)

The **Savanna Bridge Assistant** is an embeddable, accessible Web Component built with vanilla TypeScript and Shadow DOM. It provides grounded learning Q&A, multilingual support in Amharic and English, voice input with editable preview, read-aloud playback, zero-proof support preferences, barrier-free account linking, and human mentor handoffs.

Owned by **Person B** under the one-owner-per-folder agreement.

---

## 1. Quick Start / Integration

### Level 1 Embed (One Script Tag & One Custom Element)

Add the following anywhere in your LMS, learning platform, or job portal:

```html
<!-- Load the widget bundle -->
<script type="module" src="/widget/widget.js"></script>

<!-- Mount the web component -->
<bridge-assistant 
  data-api="http://localhost:8000" 
  data-course="course_demo" 
  data-lang="en">
</bridge-assistant>
```

### Configuration Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-api` | No | `http://localhost:8000` | Base URL of the Savanna Bridge Assistant API (e.g. `http://localhost:8000` or Prism mock `http://localhost:4010`). |
| `data-course` | No | `course_demo` | Course or content identifier used for context-bounded retrieval. |
| `data-lang` | No | `en` | Initial UI language: `en` (English), `am` (Amharic), `om` (Afaan Oromo), or `ti` (Tigrinya). |
| `data-token` | No | `null` | Optional HMAC-signed widget token issued by the host platform, forwarded as the `X-Widget-Token` HTTP header. |

---

## 2. Capabilities & Milestone Deliverables

### Milestone B-M1: Accessible Shell & Grounded Chat
- **Accessible Dialog:** Complies with WAI-ARIA dialog design pattern (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="bridge-title"`).
- **Focus Management:** Focus enters dialog when opened; restores to launcher on close. `Escape` key closes dialog.
- **Polite Live Region:** Message log has `role="log"`, `aria-live="polite"`, `aria-relevant="additions text"`.
- **One-Tap Language Toggle:** Immediate switch between English and Amharic (`አማርኛ`) with preference preserved in `sessionStorage`.
- **Citations as Links:** Grounded answers render citations as clickable links (`<a target="_blank" rel="noopener noreferrer">`).
- **Low-Confidence Refusal:** Explains when content cannot be verified and provides a "Talk to a person" action button.

### Milestone B-M2: Voice, Support & Consent
- **Voice Input with Editable Preview:** Captures speech via `MediaRecorder`, transcribes via `POST /speech/transcribe` with `retain: false`, and places the transcription directly into the text input for learner review/editing before sending.
- **Read-Aloud TTS on Every Answer:** Audio playback via `POST /speech/synthesize` (with Web Speech API fallback) featuring Play, Pause, and Speed controls (0.75x, 1x, 1.25x, 1.5x).
- **Sound-Off Equivalence:** Full text answers remain visible at all times for Deaf/Hard-of-Hearing learners.
- **Simple-Mode Switch:** Optional checkbox passes `simple_mode: true` to request shorter, plain-language explanations.
- **Private Support Needs (Zero Proof):** Self-declared preferences panel (`GET`/`PUT /support-needs`) for extra time, screen readers, written instructions, step-free access, and quiet spaces. Never asks for medical proof or diagnosis.
- **Barrier-Free Account Linking:** Generate temporary 6-digit codes (`POST /link/start`) or confirm Telegram codes (`POST /link/confirm`) without phone numbers or national ID.
- **Human Mentor Handoff & Consent:** Explicit consent banner explaining Jitsi Meet connection; screen sharing is strictly learner-controlled inside the meeting room. Includes persistent "Leave / Close Request" button.

### Milestone B-M3: Robustness, Offline Resilience & Styling
- **WCAG 2.2 AA Conformance:**
  - Touch targets $\ge 44 \times 44\text{px}$ (`min-height: 2.75rem; min-width: 2.75rem;`).
  - High contrast colors with full support for Windows High Contrast / Forced Colors mode (`@media (forced-colors: active)`).
  - Respects reduced motion preferences (`@media (prefers-reduced-motion: reduce)`).
  - 200% zoom compatible without horizontal scroll or content clipping.
  - Ethiopic font stack fallback: `system-ui, "Noto Sans Ethiopic", "Nyala", "Abyssinica SIL", sans-serif`.
- **Offline Resilience:** Automatically detects offline status, warns the user politely, and preserves recent Q&A history in `sessionStorage`.

### Milestone B-M4: Co-designer Polish & Verification
- Self-contained build: No external runtime CDNs or polyfills.
- Production bundle size: **~15.4 KB gzipped** (well under the 100 KB limit).
- Interactive development host at `widget/dev/index.html`.

---

## 3. Developer Commands

```sh
# Install dependencies
npm install

# Run local development server
npm run dev

# Type check
npm run lint

# Build production bundle (outputs dist/widget.js)
npm run build

# Preview production build
npm run preview
```
