"""Small repository secret/configuration gate for local work and CI."""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HIGH_RISK_PATTERNS = {
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    "OpenAI-style key": re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
    "GitHub token": re.compile(r"\bgh[oprsu]_[A-Za-z0-9]{20,}\b"),
    "Telegram bot token": re.compile(r"\b\d{6,12}:AA[A-Za-z0-9_-]{20,}\b"),
}


def main() -> None:
    ignored = subprocess.run(
        ["git", "check-ignore", "--quiet", ".env"],
        cwd=ROOT,
        check=False,
    )
    if ignored.returncode != 0:
        raise SystemExit(".env is not ignored by Git")

    example = (ROOT / ".env.example").read_text(encoding="utf-8")
    for name in (
        "GEMINI_API_KEY",
        "TELEGRAM_BOT_TOKEN",
        "AT_API_KEY",
    ):
        match = re.search(rf"(?m)^{re.escape(name)}=(.*)$", example)
        if not match or match.group(1).strip():
            raise SystemExit(f"{name} must be present and empty in .env.example")

    findings: list[str] = []
    extensions = {".py", ".ts", ".js", ".mjs", ".json", ".yaml", ".yml", ".md", ".html", ".ps1"}
    excluded_parts = {".git", "node_modules", "dist", "build", ".venv", "test-results", "playwright-report"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in extensions:
            continue
        if excluded_parts.intersection(path.parts):
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for label, pattern in HIGH_RISK_PATTERNS.items():
            if pattern.search(text):
                findings.append(f"{path.relative_to(ROOT)}: {label}")

    if findings:
        raise SystemExit("Potential committed secrets found:\n" + "\n".join(findings))

    print("Secret/configuration check passed: no high-risk credential patterns found.")


if __name__ == "__main__":
    main()
