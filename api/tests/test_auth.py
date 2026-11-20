"""Bridge module to execute tests/test_auth.py during CI api test run."""

import sys
from pathlib import Path

# Add repository root so tests.test_auth can be imported
repo_root = Path(__file__).resolve().parents[2]
if str(repo_root) not in sys.path:
    sys.path.insert(0, str(repo_root))

from tests.test_auth import *  # noqa: E402, F401, F403
