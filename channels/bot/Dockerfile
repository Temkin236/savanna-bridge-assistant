FROM python:3.12-alpine

RUN apk add --no-cache ffmpeg gcc musl-dev libffi-dev

WORKDIR /app

RUN pip install --no-cache-dir aiogram httpx

COPY audio_helper.py ./audio_helper.py
COPY notification_channels.py ./notification_channels.py
COPY bot.py ./bot.py
COPY health_server.py ./health_server.py

EXPOSE 8081
CMD ["python", "health_server.py"]
