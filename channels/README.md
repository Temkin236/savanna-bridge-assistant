# Channels Workspace

Communication channels and live agent support service for Savanna Bridge Assistant.
Owned by **Person C**.

---

## 1. Overview

The channels workspace provides:

1. **Telegram Assistant Bot (`channels/bot`)**: An interactive bot (built with `aiogram`) for learners to ask course questions in Amharic, English, Afaan Oromo, and Tigrinya, receive cited answers, link accounts with one-time codes, request human help, toggle `/lite` low-bandwidth mode, receive job and deadline alerts with numeric actions (1, 2, 3), and draft interview accommodation letters.
2. **Accessible Agent Console (`channels/console`)**: A WCAG 2.2 AA compliant web console for mentors and support agents to view waiting learners, claim handoffs, inspect learner support preferences, reply to learners, and join live Jitsi video/audio rooms.
3. **Audio Processing (`channels/bot/audio_helper.py`)**: FFmpeg voice note format conversions between Telegram OGG/Opus and API speech endpoints.
4. **Notification Dispatcher & Africa's Talking Sandbox (`channels/bot/notification_channels.py`)**: Multi-channel notifications respecting learner opt-in (`job_alerts`, `deadlines`) and mute preferences.

---

## 2. Setting Up the Telegram Bot

### Step 1: Create a Bot via @BotFather
1. In Telegram, open [@BotFather](https://t.me/BotFather).
2. Send `/newbot`.
3. Choose a name (e.g. `Savanna Bridge Assistant Demo`) and username (e.g. `savanna_bridge_demo_bot`).
4. Copy the HTTP API token provided by BotFather.

### Step 2: Configure Environment
Set `TELEGRAM_BOT_TOKEN` in your `.env` file or environment:

```sh
TELEGRAM_BOT_TOKEN="your_telegram_bot_token_here"
API_BASE_URL="http://localhost:8000"
```

If `TELEGRAM_BOT_TOKEN` is omitted, the bot starts in **mock mode** and the health endpoint on port `8081` remains healthy, allowing development and testing without live credentials.

---

## 3. Running Locally & via Docker

### Run the Bot locally

```sh
cd channels/bot
python health_server.py
```

The health check is available at `http://localhost:8081/health`.

### Run the Agent Console locally

Serve the static console page using Python or any static web server:

```sh
cd channels/console
python -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

### Run with Docker Compose

From the repository root:

```sh
docker compose up bot console
```

- Agent console: `http://localhost:8080`
- Bot healthcheck: `http://localhost:8081/health`

---

## 4. Africa's Talking Sandbox (Demo SMS)

To test SMS alerts using Africa's Talking sandbox:

1. Sign up for a free developer account at [Africa's Talking](https://account.africastalking.com/).
2. Open the Sandbox dashboard at `https://account.africastalking.com/apps/sandbox`.
3. Generate an API Key under **Settings > API Key**.
4. Set the following environment variables:
   ```sh
   AT_USERNAME="sandbox"
   AT_API_KEY="your_sandbox_api_key"
   SMS_DRIVER="sandbox"
   ```
5. Launch the Africa's Talking Web Simulator at `https://simulator.africastalking.com:1517/` to view delivered SMS alerts in real time.
6. All sandbox SMS messages are strictly prefixed with `[SANDBOX DEMO]`. In mock mode, they are logged as `[MOCK SMS]`.

---

## 5. How to Add a New Communication Channel

To add a new messaging channel (e.g., WhatsApp, SMS gateway, Discord):

### Step 1: Implement `BaseNotificationDriver`

In `channels/bot/notification_channels.py`:

```python
from notification_channels import BaseNotificationDriver

class WhatsAppNotificationDriver(BaseNotificationDriver):
    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key
        self.sent_log = []

    @property
    def channel_name(self) -> str:
        return "whatsapp"

    @property
    def is_sandbox(self) -> bool:
        return False

    def send(self, recipient: str, message: str) -> bool:
        # Deliver payload to WhatsApp Business API
        logger.info("[WhatsApp] Sent to %s: %s", recipient, message)
        return True
```

### Step 2: Register in `NotificationScheduler`

```python
scheduler = NotificationScheduler(
    api_base_url="http://localhost:8000",
    telegram_driver=TelegramDriver(),
    sms_driver=WhatsAppNotificationDriver(),
)
```

---

## 6. Learner Screen-Sharing Rule & Accessibility

- **Non-negotiable consent rule:** The agent console **never** starts or forces screen sharing for the learner. The learner has exclusive control to share or stop sharing their screen from within the Jitsi room (`https://meet.jit.si/savanna-bridge-demo-...`).
- **WCAG 2.2 AA Conformance:**
  - Semantic landmark elements (`<header>`, `<main>`, `<section>`).
  - Polite ARIA live regions (`role="status"`, `aria-live="polite"`) announcing queue arrivals.
  - Interactive controls with minimum target sizes >= 2.75rem (44px).
  - High-contrast color palette with focus ring indicators (`:focus-visible`).
  - No ID or medical proof requested anywhere in the workflow.
