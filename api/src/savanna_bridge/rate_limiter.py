"""Sliding window rate limiter."""

from __future__ import annotations

import time
from collections import defaultdict

from savanna_bridge.config import RATE_LIMIT_PER_MINUTE


class RateLimiter:
    """Sliding-window in-memory rate limiter per key (e.g. client IP)."""

    def __init__(self, max_requests: int = RATE_LIMIT_PER_MINUTE, window_seconds: int = 60) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: dict[str, list[float]] = defaultdict(list)

    def is_allowed(self, key: str) -> tuple[bool, int]:
        """Check if request is allowed. Returns (allowed, retry_after_seconds)."""
        now = time.time()
        window_start = now - self.window_seconds

        # Prune older entries
        timestamps = [ts for ts in self.requests[key] if ts > window_start]
        self.requests[key] = timestamps

        if len(timestamps) >= self.max_requests:
            oldest = timestamps[0]
            retry_after = max(1, int(oldest + self.window_seconds - now))
            return False, retry_after

        self.requests[key].append(now)
        return True, 0


class LoginFailureRateLimiter:
    """Sliding-window rate limiter for failed login attempts."""

    def __init__(self, max_failures: int = 5, window_seconds: int = 60) -> None:
        self.max_failures = max_failures
        self.window_seconds = window_seconds
        self.failures: dict[str, list[float]] = defaultdict(list)

    def is_blocked(self, key: str) -> tuple[bool, int]:
        now = time.time()
        window_start = now - self.window_seconds
        timestamps = [ts for ts in self.failures[key] if ts > window_start]
        self.failures[key] = timestamps
        if len(timestamps) >= self.max_failures:
            oldest = timestamps[0]
            retry_after = max(1, int(oldest + self.window_seconds - now))
            return True, retry_after
        return False, 0

    def record_failure(self, key: str) -> None:
        now = time.time()
        window_start = now - self.window_seconds
        timestamps = [ts for ts in self.failures[key] if ts > window_start]
        timestamps.append(now)
        self.failures[key] = timestamps

    def record_success(self, key: str) -> None:
        self.failures.pop(key, None)

