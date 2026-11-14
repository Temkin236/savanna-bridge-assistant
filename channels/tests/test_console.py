"""Tests for Agent Console accessibility and integration (Milestones C-M2, C-M4)."""

from pathlib import Path

CONSOLE_HTML_PATH = Path(__file__).resolve().parents[1] / "console" / "index.html"


def test_console_html_exists_and_is_valid() -> None:
    assert CONSOLE_HTML_PATH.is_file()
    content = CONSOLE_HTML_PATH.read_text(encoding="utf-8")
    assert "<!doctype html>" in content.lower()
    assert 'lang="en"' in content
    assert '<meta name="viewport"' in content


def test_console_accessibility_features() -> None:
    content = CONSOLE_HTML_PATH.read_text(encoding="utf-8")
    # Live regions for screen readers
    assert 'aria-live="polite"' in content
    assert 'role="status"' in content

    # Focus styles
    assert ":focus-visible" in content
    assert "outline: 3px" in content

    # Minimum target size
    assert "min-height: 2.75rem" in content

    # Form labels
    assert 'for="agentRef"' in content
    assert 'id="agentRef"' in content
    assert 'for="apiEndpoint"' in content
    assert 'id="apiEndpoint"' in content


def test_screen_sharing_learner_control_notice_is_present() -> None:
    content = CONSOLE_HTML_PATH.read_text(encoding="utf-8")
    # Explicit constraint: agent console never starts screen sharing
    assert "never starts screen sharing on behalf of the learner" in content
    assert "learner initiates, controls, and stops screen sharing" in content
    # No WebRTC getDisplayMedia call in console script
    assert "getDisplayMedia" not in content


def test_console_queue_lifecycle_methods_present() -> None:
    content = CONSOLE_HTML_PATH.read_text(encoding="utf-8")
    assert "fetchQueue" in content
    assert "claimHandoff" in content
    assert "replyHandoff" in content
    assert "closeHandoff" in content
