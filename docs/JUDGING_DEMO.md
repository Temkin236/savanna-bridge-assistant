# Savanna Bridge Assistant — Official Judging Demonstration Script

**ALX Digital Bridge Accessibility Hackathon 2026 — Track 3: Multilingual Assistant and Live Help**  
*Motto: "Your Language. Your Ability. Your Opportunity."*  
*Estimated Duration: 5–7 Minutes*

---

## Preparation & Startup

Ensure the stack is running locally:
```bash
# Terminal 1: Start Docker Compose or run the API directly
docker compose up --build
# OR locally via Python:
cd api && .venv/bin/uvicorn savanna_bridge.main:app --port 8000 --reload
```

---

## Category 1: Works for the People It Is For (30 Points)

### Scenario A: Screen Reader & Keyboard Only Navigation (Blind Learner)
1. Open the Savanna Demo: `http://localhost:4173/savanna/` or `demo-host/blank.html`.
2. **Keyboard Operation**:
   - Press `Tab` until the floating launcher "Open Bridge Assistant" receives focus.
   - Observe the visible blue focus ring (`:focus-visible`).
   - Press `Enter` to open the dialog.
   - Note: Focus moves into the dialog automatically (`role="dialog"`, `aria-modal="true"`).
3. **Sound-Off Equivalence**:
   - Ask a question: *"What does Module 2 teach?"*
   - The answer appears in plain text in the chat log (`role="log"`, `aria-live="polite"`).
   - Click the Read Aloud button (`🔊 Read Aloud`). Synchronized text remains permanently visible on screen.

### Scenario B: Simple Mode (Cognitive & Low-Literacy Learners)
1. In the chat footer, toggle the **"Simple explanations (plain language & steps)"** checkbox.
2. Ask: *"Explain responsive web design."*
3. Observe the response: Broken into numbered steps, jargon simplified, technical terms defined, while retaining grounded course citations.

### Scenario C: AccessProfile & Support Needs (Zero Proof)
1. Click the **"Support Needs"** tab.
2. Select *"Extra time on assignments"* and *"Written step-by-step instructions"*.
3. Note the prominent banner:  
   🛡️ **"Zero Proof Required: We adapt the platform to you. No medical diagnosis or paperwork needed."**
4. Save preferences. Confirmation is announced via live region.

---

## Category 2: Can Be Adopted by Another Platform (25 Points)

### Scenario D: Two-Line Independent Embed (`<db-assistant>`)
1. Open the independent blank test page: `http://localhost:4173/blank.html`.
2. Inspect page source:
   ```html
   <script type="module" src="/widget/widget.js"></script>
   <db-assistant api-base="http://localhost:8000" course-id="alx-fe-2026" lang="en"></db-assistant>
   ```
3. Demonstrate that the `<db-assistant>` custom element alias loads seamlessly with zero framework dependencies.
4. Open DevTools Console and observe that host custom events (`db-assistant:question`, `db-assistant:answer`, `db-assistant:escalated`) fire into the host page.

### Scenario E: Backward-Compatible Versioned API
Run via curl to verify `/api/v1` routes:
```bash
curl -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What does Module 2 teach?", "language": "en"}'
```
*Expected*: Returns JSON with grounded citation to Module 2.

### Scenario F: Inbound SMS Gateway (Africa's Talking / Ethio Telecom)
Run via curl:
```bash
curl -X POST http://localhost:8000/api/v1/sms/inbound \
  -H "Content-Type: application/json" \
  -d '{"from": "+251911223344", "text": "What does Module 2 teach?"}'
```
*Expected*: Plain text output $\le 160$ GSM-7 characters suitable for immediate SMS transmission.

---

## Category 3: Built for Ethiopia (15 Points)

### Scenario G: Multilingual Course Retrieval (Amharic & Afaan Oromo)
1. In the assistant header, toggle to **አማርኛ (Amharic)**.
2. Verify Ethiopic font rendering and native labels.
3. Query via API or UI in Afaan Oromo:
```bash
curl -X POST http://localhost:8000/api/v1/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Barnoonni kutaa lammaffaa maali?", "language": "om"}'
```
*Expected*: Course-grounded response returned in learner's preferred language.

### Scenario H: Arabic RTL Layout
1. Set `lang="ar"` on `<db-assistant>`.
2. Open dialog. Observe:
   - Dialog flips to right-to-left (`dir="rtl"`).
   - Text, buttons, and close icon align in natural RTL sequence.

---

## Category 4: Quality, Security and Privacy (15 Points)

### Scenario I: BridgePass (Web-to-Telegram Linking)
1. In the assistant, click **"Link Account"** and click **"Generate 6-Digit Code"**.
2. Notice the single-use 6-digit code.
3. Test Brute-Force Protection via curl:
```bash
# Attempt 5 incorrect guesses:
for i in {1..5}; do
  curl -s -X POST http://localhost:8000/api/v1/link/confirm \
    -H "Content-Type: application/json" \
    -d "{\"link_id\": \"test_code\", \"code\": \"00000$i\"}"
done
```
*Expected*: Code is permanently locked out after 5 attempts.
4. Test instant revocation via `POST /api/v1/link/revoke` or Telegram `/unlink`.

### Scenario J: Consented Human Escalation & Agent Console
1. Click **"Talk to a Mentor"** tab.
2. Note the required consent checkbox.
3. Open the Agent Support Console (`http://localhost:8080/`).
4. See the newly created ticket with learner language, preferred contact mode, and declared preferences—**with zero medical diagnosis displayed**.
5. Claim the ticket and launch the private Jitsi video room.

---

## Category 5: Can Be Kept Running (15 Points)

1. **Zero Cost Default**: The platform runs 100% offline using BM25 course retrieval. Zero cloud API keys required.
2. **Lightweight Bundle**: `widget.js` is only **17.4 kB gzipped** (64.4 kB uncompressed), delivering instant load times on 2G/3G networks.
3. **Single Command Deploy**:
```bash
docker compose up --build
```
Everything—API, Widget, Bot, Console, Demo Hosts, and Mock services—spins up in under 60 seconds.
