# Savanna Bridge Assistant — Security & Privacy Architecture

**ALX Digital Bridge Accessibility Hackathon 2026 — Track 3**  
**Core Principle**: Radical Privacy, Data Minimization, and Zero Medical Proof

---

## 1. Data Minimization & Zero-Proof Policy

Savanna Bridge firmly rejects medicalization of accessibility. Under no circumstances does the assistant:
- Request, store, or verify medical diagnoses or disability documentation.
- Require government IDs, passports, or biometric verification for account linking.
- Store plain-text passwords or financial transaction information.

Learners declare **Support Preferences** (e.g., extra time, screen reader help, written instructions) solely to adapt the user experience.

---

## 2. Explicit Consent Workflows

Personal or contextual data is never shared without explicit, affirmative learner consent:
1. **Human Mentor Escalation (`POST /handoff`)**:
   - The user must explicitly check `[x] I consent to sharing this conversation with an assigned mentor`.
   - If unchecked, the ticket creation is rejected with an HTTP 400 Bad Request error.
2. **Web-to-Telegram Account Linking (BridgePass)**:
   - Linking requires physical possession of a short-lived, 6-digit one-time code.
   - Conversation context is only synchronized if the learner initiated the link.

---

## 3. BridgePass: Account Linking Security Model

- **Cryptographic Generation**: Codes are generated using Python's `secrets.SystemRandom()`, preventing pseudo-random predictability.
- **Short Expiration**: Codes expire in 10 minutes (`EXPIRY_SECONDS = 600`).
- **Single-Use**: Once confirmed, the code is marked as `consumed` in the database and cannot be replayed.
- **Brute-Force Lockout**:
  - The system tracks failed confirmation attempts per `link_id`.
  - After **5 failed attempts**, the code is automatically locked and revoked (`attempts >= 5`), neutralizing brute-force guessing attacks.
- **Instant Revocation**:
  - Learners can revoke an active link at any time via `POST /link/revoke` or by typing `/unlink` in the Telegram bot.

---

## 4. API Authorization & Input Validation

- **Pydantic Model Enforcement**: All inbound REST payloads (`/ask`, `/handoff`, `/link/start`, `/sms/inbound`) are strictly validated against Pydantic schema models before reaching application business logic.
- **SQL Injection Prevention**: All database interactions in `api/src/savanna_bridge/database.py` use parameterized SQL queries (`?` placeholders).
- **CORS Protection**: The API restricts cross-origin resource sharing to explicitly allowed domains via `CORS_ORIGINS` environment variables.

---

## 5. Privacy-Preserving Analytics (BridgeInsights)

For educational administrators and instructors monitoring course accessibility:
- **K-Anonymity Threshold**: Aggregations are suppressed for groups smaller than $k = 5$ to prevent deanonymizing individual learners in low-enrollment classes.
- **No PII in Aggregate Tables**: Analytics aggregate only topic frequencies, language distribution percentages, and common search misses. Learner IDs, phone numbers, and full message transcripts are completely excluded.
