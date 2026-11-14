"""Enforce the one-owner-per-folder working agreement on pull requests."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def changed_files(base_ref: str) -> list[str]:
    command = ["git", "diff", "--name-only", f"origin/{base_ref}...HEAD"]
    result = subprocess.run(command, cwd=ROOT, check=True, capture_output=True, text=True)
    return [line.strip().replace("\\", "/") for line in result.stdout.splitlines() if line.strip()]


def allowed(path: str, prefixes: list[str]) -> bool:
    for prefix in prefixes:
        normalized = prefix.replace("\\", "/")
        if normalized.endswith("/") and path.startswith(normalized):
            return True
        if path == normalized:
            return True
    return False


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--branch", required=True)
    parser.add_argument("--base", default="main")
    args = parser.parse_args()

    branch = args.branch.removeprefix("refs/heads/")
    initial = branch.split("/", 1)[0].lower()
    if branch in {"main", "master"}:
        print("Scope check skipped on the protected default branch.")
        return 0

    rules = json.loads((ROOT / ".github" / "ownership.json").read_text(encoding="utf-8"))
    if initial not in rules:
        print("Branch must begin with a/, b/, c/, or d/ (for example b/m1-widget-shell).")
        return 1

    changed = changed_files(args.base)
    violations = [path for path in changed if not allowed(path, rules[initial])]
    if violations:
        print(f"Branch owner {initial.upper()} changed files outside the owned area:")
        for path in violations:
            print(f"  - {path}")
        print("Stop and ask the folder owner to make the shared change.")
        return 1

    print(f"Scope check passed for owner {initial.upper()} ({len(changed)} changed files).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

