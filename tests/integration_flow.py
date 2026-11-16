"""Credential-free D-M2 integration gate for the API and Telegram alert path."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any
from urllib.error import HTTPError
from urllib.request import Request, urlopen


def request_json(
    base_url: str,
    method: str,
    path: str,
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(
        f"{base_url.rstrip('/')}{path}",
        data=body,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urlopen(request, timeout=10) as response:  # noqa: S310 - local test URL
            return json.load(response)
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise AssertionError(f"{method} {path} failed: {exc.code} {detail}") from exc


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api", default="http://localhost:8000")
    parser.add_argument("--channel-dir", default="/app")
    args = parser.parse_args()

    health = request_json(args.api, "GET", "/health")
    require(health.get("status") == "ok", "API is not healthy")

    grounded = request_json(
        args.api,
        "POST",
        "/ask",
        {"question": "What does Module 2 teach?", "language": "en"},
    )
    require(grounded.get("reason") == "grounded", "Expected a grounded answer")
    require(bool(grounded.get("citations")), "Grounded answer has no citation")
    require(grounded.get("offer_human") is False, "Grounded answer offered unnecessary handoff")

    refused = request_json(
        args.api,
        "POST",
        "/ask",
        {"question": "Who won the football match on Mars?", "language": "en"},
    )
    require(refused.get("reason") == "low_confidence", "Off-topic question was not refused")
    require(refused.get("citations") == [], "Refusal must not invent citations")
    require(refused.get("offer_human") is True, "Refusal must offer a person")

    handoff = request_json(
        args.api,
        "POST",
        "/handoff",
        {
            "consent": True,
            "learner_ref": "integration_learner",
            "card": {
                "language": "en",
                "context": "D-M2 integration check",
                "support_needs": ["written_instructions"],
                "contact_mode": "text",
            },
        },
    )
    handoff_id = handoff["id"]
    queue = request_json(args.api, "GET", "/handoff/queue")
    require(any(item["id"] == handoff_id for item in queue["items"]), "Handoff missing from queue")

    claimed = request_json(
        args.api,
        "POST",
        f"/handoff/{handoff_id}/claim",
        {"agent_ref": "integration_agent"},
    )
    require(claimed.get("status") == "claimed", "Console claim did not persist")
    reply = request_json(
        args.api,
        "POST",
        f"/handoff/{handoff_id}/reply",
        {"agent_ref": "integration_agent", "message": "I can help by text."},
    )
    require(reply.get("delivered") is True, "Console reply was not delivered")
    closed = request_json(args.api, "POST", f"/handoff/{handoff_id}/close", {})
    require(closed.get("status") == "closed", "Handoff did not close")

    request_json(
        args.api,
        "POST",
        "/alerts/subscriptions",
        {
            "learner_ref": "integration_learner",
            "channel": "telegram",
            "fields": [],
            "support_needs": [],
            "active": True,
        },
    )
    request_json(
        args.api,
        "PUT",
        "/api/v1/notification-settings?learner_ref=integration_learner",
        {
            "telegram_enabled": True,
            "consent_granted": True,
            "job_alerts": True,
            "frequency": "immediate",
            "platform_id": "integration-test",
        },
    )
    jobs = request_json(args.api, "GET", "/jobs")
    require(bool(jobs.get("items")), "No job fixture is available")
    job = jobs["items"][0]
    matches = request_json(args.api, "POST", "/alerts/match", {"job": job})
    require(
        any(
            item.get("learner_ref") == "integration_learner"
            and "telegram" in item.get("channels", [])
            for item in matches.get("matches", [])
        ),
        "Telegram subscription did not match the job",
    )

    channel_dir = Path(args.channel_dir)
    sys.path.insert(0, str(channel_dir))
    from notification_channels import NotificationScheduler, TelegramDriver

    telegram = TelegramDriver(bot_token=None)
    scheduler = NotificationScheduler(api_base_url=args.api, telegram_driver=telegram)
    delivered = scheduler.dispatch_job_alert(
        job,
        recipient="integration-chat-id",
        channel="telegram",
        learner_ref="integration_learner",
    )
    require(delivered, "Mock Telegram job alert was not delivered")
    require(len(telegram.sent_log) == 1, "Telegram delivery evidence was not recorded")
    message = telegram.sent_log[0]["message"]
    require("Interested" in message and "Call me" in message, "Alert lacks numeric reply choices")

    print(
        json.dumps(
            {
                "status": "passed",
                "checks": [
                    "grounded answer with citation",
                    "low-confidence refusal with human offer",
                    "handoff queue, claim, reply, and close",
                    "job subscription and match",
                    "mock Telegram alert with reply choices",
                ],
                "telegram_mode": "mock-no-credential",
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
