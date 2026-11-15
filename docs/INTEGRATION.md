# Savanna Bridge Assistant — Platform Integration Guide

This guide describes how to integrate the **Savanna Bridge Assistant** into any learning platform, university LMS, or employment portal.

---

## 1. Quick Start: Embed via Web Component

The assistant is delivered as a lightweight, framework-agnostic Web Component bundled with Shadow DOM styling, preventing CSS leakage and host style contamination.

### Two-Line Embed Snippet

```html
<!-- 1. Include the assistant widget bundle -->
<script type="module" src="https://YOUR_DOMAIN/widget/widget.js"></script>

<!-- 2. Mount the assistant using either <db-assistant> or <bridge-assistant> -->
<db-assistant 
  api-base="https://api.yourdomain.org" 
  course-id="cs-101" 
  lang="en">
</db-assistant>
```

> **Note on Compatibility:** Both `<db-assistant>` and `<bridge-assistant>` custom element tags are fully supported and interchangeable. They share the same underlying architecture and attribute contracts.

---

## 2. Configuration Attributes

All attributes can be passed using standard kebab-case or `data-*` attributes:

| Attribute | Alias / Data Attribute | Type | Default | Description |
|:---|:---|:---|:---|:---|
| `api-base` | `api`, `data-api` | String | `http://localhost:8000` | The backend API base URL (protocol + host + port). |
| `course-id` | `course`, `data-course` | String | `"default"` | Active course identifier for grounded retrieval. |
| `widget-token` | `token`, `data-token` | String | `""` | Optional Bearer JWT or API token for authenticated requests. |
| `lang` | `data-lang` | String | `"en"` | Initial UI language (`"en"`, `"am"`, `"om"`, `"ti"`, `"so"`, `"ar"`). |

### Example with All Attributes

```html
<db-assistant
  id="assistant"
  api-base="https://api.savanna-bridge.et"
  course-id="frontend-react-2026"
  widget-token="eyJhbGciOiJIUzI1NiIs..."
  lang="am">
</db-assistant>
```

---

## 3. Host Event Lifecycle

Host applications can subscribe to custom DOM events emitted by the assistant:

```javascript
const assistant = document.querySelector('db-assistant');

// Fired when the learner submits a question
assistant.addEventListener('db-assistant:question', (event) => {
  console.log('Learner question:', event.detail.question);
});

// Fired when an answer is delivered with citations
assistant.addEventListener('db-assistant:answer', (event) => {
  console.log('Answer text:', event.detail.answer);
  console.log('Citations:', event.detail.citations);
  console.log('Grounded status:', event.detail.reason);
});

// Fired when a learner escalates to a human mentor
assistant.addEventListener('db-assistant:escalated', (event) => {
  console.log('Handoff ticket ID:', event.detail.id);
  console.log('Live room URL:', event.detail.room_url);
});
```

*(Identical events prefixed with `bridge-assistant:*` are also dispatched for existing integrations).*

---

## 4. Multi-Tenant Deployment

Savanna Bridge supports multiple institutions out of the box using header-based tenant resolution (`X-Tenant-ID`):

1. **Default Tenant**: `"savanna"` (ALX / African Leadership X).
2. **Custom Institution Example**: Pass `X-Tenant-ID: aastu` or register custom institutions via `api/src/savanna_bridge/tenant.py`.
3. **Tenant Config Contract**:
   - `id`: Unique identifier (e.g., `"aastu"`, `"jimma-univ"`)
   - `name`: Display name
   - `course_content_path`: Isolated directory of indexed markdown/JSON course documents
   - `supported_languages`: Enabled language subsets
   - `sms_enabled`: Boolean flag

---

## 5. Versioned API Reference (`/api/v1`)

All endpoints are registered on both `/` and `/api/v1/` for backward compatibility.

### `POST /api/v1/ask`
Submit a question grounded in course materials.

**Request:**
```json
{
  "question": "What is the deadline for project 2?",
  "language": "en",
  "course_id": "cs-101",
  "simple_mode": false,
  "channel": "web"
}
```

**Response (Grounded Answer):**
```json
{
  "answer": "Project 2 must be submitted by Friday at 11:59 PM East Africa Time.",
  "citations": [
    {
      "source_id": "syllabus-mod2",
      "title": "Module 2 Syllabus",
      "heading": "Deadlines & Milestones",
      "url": "/courses/cs-101#deadlines"
    }
  ],
  "confidence": 0.88,
  "reason": "grounded",
  "offer_human": false
}
```

**Response (Off-Topic / Insufficient Evidence Refusal):**
```json
{
  "answer": "I could not find reliable information about this in your course materials. Would you like to talk to a human mentor?",
  "citations": [],
  "confidence": 0.0,
  "reason": "low_confidence",
  "offer_human": true
}
```

---

### `POST /api/v1/sms/inbound`
Process incoming SMS from telecom aggregators (Africa's Talking, Ethio Telecom).

**Request:**
```json
{
  "from": "+251911223344",
  "text": "What does Module 2 teach?"
}
```

**Response:** Plain text (Content-Type: `text/plain; charset=utf-8`), guaranteed $\le 160$ characters for standard GSM-7 SMS delivery:
```text
Savanna Bridge: Module 2 covers accessibility, keyboard navigation, and live human help. Details: /courses/module-2
```

---

### `POST /api/v1/handoff`
Create a human mentor support ticket.

**Request:**
```json
{
  "consent": true,
  "learner_ref": "learner_123",
  "card": {
    "language": "am",
    "context": "Need clarification on responsive layouts",
    "support_needs": ["written_instructions", "extra_time"],
    "contact_mode": "video"
  },
  "channel": "web"
}
```

---

## 6. Host Accessibility Requirements

To maintain WCAG 2.2 AA conformance when embedding Savanna Bridge:
1. **Focus Trap Prevention**: Do not enclose `<db-assistant>` inside non-interactive containers with `tabindex="-1"` or `overflow: hidden`.
2. **Zoom and Reflow**: Ensure your host viewport meta tag allows scaling:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
3. **Contrast and Themes**: The assistant's Shadow DOM isolates high-contrast styles, but host pages should avoid translucent overlays directly covering the bottom-right launcher button.
4. **Keyboard Access**: The assistant launcher is at the bottom right. Ensure host floating action buttons (FABs) or cookie banners do not overlap the coordinate box (`bottom: 1.5rem; right: 1.5rem;`).
