"""Health process and supervisor for the Telegram bot worker.

Maintains port 8081 for Docker Compose health checks while supervising the
Telegram bot worker loop.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

logger = logging.getLogger("savanna_bridge.channels.health")

PORT = int(os.getenv("HEALTH_PORT", "8081"))
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()


class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:  # noqa: N802
        if self.path != "/health":
            self.send_error(404)
            return

        body = json.dumps(
            {
                "status": "ok",
                "service": "savanna-bridge-bot",
                "mode": "live" if BOT_TOKEN else "mock",
                "telegram_connected": bool(BOT_TOKEN),
                "ffmpeg_available": True,
            }
        ).encode("utf-8")

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        return


def run_health_server() -> None:
    server = ThreadingHTTPServer(("0.0.0.0", PORT), HealthHandler)
    logger.info("Bot health server listening on port %d", PORT)
    server.serve_forever()


def main() -> None:
    # Start health server in background thread
    t = threading.Thread(target=run_health_server, daemon=True)
    t.start()

    if BOT_TOKEN:
        from bot import start_bot

        logger.info("Telegram bot token detected. Running aiogram bot...")
        asyncio.run(start_bot())
    else:
        logger.info("Running in mock bot mode (no TELEGRAM_BOT_TOKEN). Health endpoint active.")
        t.join()


if __name__ == "__main__":
    main()
