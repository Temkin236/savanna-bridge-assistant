"""Fast contract smoke check with no third-party Python dependencies."""

from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "api" / "openapi.yaml"

REQUIRED_PATHS = [
    "/health:",
    "/ask:",
    "/link/start:",
    "/link/confirm:",
    "/support-needs:",
    "/handoff:",
    "/handoff/queue:",
    "/handoff/{handoff_id}/claim:",
    "/handoff/{handoff_id}/reply:",
    "/handoff/{handoff_id}/close:",
    "/jobs:",
    "/alerts/subscriptions:",
    "/alerts/match:",
    "/notification-settings:",
    "/learner/deadlines:",
    "/learner/modules:",
    "/accommodation/draft:",
    "/speech/transcribe:",
    "/speech/synthesize:",
    "/teacher/stats:",
]


def main() -> int:
    text = CONTRACT.read_text(encoding="utf-8")
    missing = [path for path in REQUIRED_PATHS if f"  {path}" not in text]
    if missing:
        print("Missing required API paths:")
        for path in missing:
            print(f"  - {path.removesuffix(':')}")
        return 1
    if text.count("example:") < len(REQUIRED_PATHS):
        print("The contract does not contain enough concrete examples for Prism consumers.")
        return 1
    print(f"Contract smoke check passed: {len(REQUIRED_PATHS)} paths and examples present.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

