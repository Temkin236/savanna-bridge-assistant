FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

COPY pyproject.toml README.md ./
COPY src ./src
COPY tests ./tests

RUN pip install --no-cache-dir -e ".[dev]"

# Top-level adapters are imported at runtime but are not part of the wheel.
# Copying them after dependency installation keeps normal adapter edits fast.
COPY adapters ./adapters

EXPOSE 8000

CMD ["sh", "-c", "uvicorn savanna_bridge.main:app --host 0.0.0.0 --port ${PORT:-8000}"]

