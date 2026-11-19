FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN pip install --no-cache-dir aiogram httpx pytest

COPY audio_helper.py ./audio_helper.py
COPY notification_channels.py ./notification_channels.py
COPY bot.py ./bot.py
COPY health_server.py ./health_server.py

EXPOSE 8081
CMD ["python", "health_server.py"]
