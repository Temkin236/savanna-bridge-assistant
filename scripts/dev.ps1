param(
    [Parameter(Position = 0)]
    [ValidateSet('up', 'down', 'mock-api', 'test', 'integration', 'axe', 'verify', 'lint', 'logs', 'status', 'install-test')]
    [string]$Command = 'up'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Push-Location $root
try {
    switch ($Command) {
        'up' {
            docker compose up --build -d
            docker compose ps
        }
        'down' {
            docker compose down --remove-orphans
        }
        'mock-api' {
            docker compose up mock-api
        }
        'test' {
            docker compose run --rm api pytest -q
            python tests/check_openapi_examples.py
            python tests/check_secrets.py
            docker compose run --rm channels-tests
        }
        'integration' {
            docker compose up --build -d api bot console demo-host
            docker compose exec -T bot python /tests/integration_flow.py --api http://api:8000 --channel-dir /app
        }
        'axe' {
            docker compose --profile test run --rm accessibility-tests
        }
        'verify' {
            docker compose run --rm api pytest -q
            python tests/check_openapi_examples.py
            python tests/check_secrets.py
            docker compose run --rm channels-tests
            docker compose up --build -d api bot console demo-host
            docker compose exec -T bot python /tests/integration_flow.py --api http://api:8000 --channel-dir /app
            docker compose --profile test run --rm accessibility-tests
        }
        'lint' {
            docker compose run --rm api ruff check .
            docker run --rm -v "${root}:/work" -w /work node:22-alpine `
                npx --yes '@redocly/cli@2.78.0' lint api/openapi.yaml
        }
        'logs' {
            docker compose logs -f --tail=100
        }
        'status' {
            docker compose ps
        }
        'install-test' {
            & (Join-Path $PSScriptRoot 'clean-install-test.ps1')
        }
    }
}
finally {
    Pop-Location
}

