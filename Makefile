.PHONY: up down mock-api test integration axe verify lint logs ps setup quick full

quick:
ifeq ($(F),widget)
	cd widget && npm run build
else ifeq ($(F),api)
	docker compose run --rm api ruff check .
	docker compose run --rm api pytest -q $(if $(T),$(T),tests/test_bootstrap.py)
else ifeq ($(F),channels)
	docker compose run --rm --entrypoint "/bin/sh -lc" channels-tests "pip install --no-cache-dir pytest -q && pytest -q -o cache_dir=/tmp/.pytest_cache $(if $(T),$(T),tests/)"
else
	@echo "Usage: make quick F=api|widget|channels [T=test_file]"
endif

full: verify


up:
	docker compose up --build -d
	docker compose ps

down:
	docker compose down --remove-orphans

mock-api:
	docker compose up mock-api

test:
	docker compose run --rm api pytest -q
	python tests/check_openapi_examples.py
	python tests/check_secrets.py
	docker compose run --rm channels-tests

integration:
	docker compose up --build -d api bot console demo-host
	docker compose exec -T bot python /tests/integration_flow.py --api http://api:8000 --channel-dir /app

axe:
	docker compose --profile test run --rm accessibility-tests

verify: test integration axe

lint:
	docker compose run --rm api ruff check .
	docker run --rm -v "$(CURDIR):/work" -w /work node:22-alpine npx --yes @redocly/cli@2.78.0 lint api/openapi.yaml

logs:
	docker compose logs -f --tail=100

ps:
	docker compose ps

setup:
	@test -f .env || cp .env.example .env
	docker compose pull

