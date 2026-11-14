# Team Start Checklist

Complete this before M1 begins. Person D records evidence and blockers.

## Everyone

- [ ] Clone the repository and create a branch named `<initial>/m1-<topic>`.
- [ ] Confirm Git, Docker Compose v2, Node 20 or newer, Python 3.11 or newer, and FFmpeg.
- [ ] Start Docker Desktop or another Docker engine.
- [ ] Copy `.env.example` to `.env`; keep real credentials out of Git and chat.
- [ ] Run `docker compose config`.
- [ ] Run `docker compose up --build -d` and check `docker compose ps`.
- [ ] Open the API health endpoint, mock API health endpoint, demo host, and agent console.
- [ ] Read `api/openapi.yaml` as a consumer and send Person A either `OK` or an exact additive diff.

## Person A

- [ ] Add an Addis AI key only to local `.env` and test one Amharic STT and TTS call.
- [ ] Replace stubs behind the frozen contract; never remove or rename contract fields.
- [ ] Start with the offline retrieval and refusal tests.

## Person B

- [ ] Run the widget dev server and build against `http://localhost:4010`.
- [ ] Install axe DevTools and confirm who will run NVDA and TalkBack.
- [ ] Preserve Shadow DOM, text equivalence, and the 100 KB gzipped budget.

## Person C

- [ ] Create the Telegram bot token and store it only in local `.env`.
- [ ] Create an Africa's Talking sandbox key and label all SMS output sandbox or mock.
- [ ] Confirm `ffmpeg -version` locally or use the bot container, which includes FFmpeg.

## Person D

- [ ] Replace temporary CODEOWNERS handles with the four GitHub handles.
- [ ] Enable branch protection after CI passes once.
- [ ] Confirm co-designer device, access needs, and two test times without collecting medical history.
- [ ] Record axe, keyboard, 200 percent zoom, sound-off, NVDA, and TalkBack evidence only after testing.

