"""AI Provider factory."""

from __future__ import annotations

from savanna_bridge.ai.addis import AddisAiProvider
from savanna_bridge.ai.base import AIProvider
from savanna_bridge.ai.cloud import CloudProvider
from savanna_bridge.ai.offline import OfflineFaqProvider
from savanna_bridge.ai.ollama import OllamaProvider
from savanna_bridge.config import AI_PROVIDER


def get_ai_provider(provider_name: str | None = None) -> AIProvider:
    name = (provider_name or AI_PROVIDER).lower().strip()
    if name == "addis":
        return AddisAiProvider()
    elif name == "ollama":
        return OllamaProvider()
    elif name == "cloud":
        return CloudProvider()
    else:
        return OfflineFaqProvider()
