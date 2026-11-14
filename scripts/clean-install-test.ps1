param(
    [switch]$KeepWorkspace
)

$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$target = [IO.Path]::GetFullPath((Join-Path $tempRoot ("savanna-bridge-clean-" + [guid]::NewGuid().ToString('N'))))
$project = "savanna-bridge-clean-" + (Get-Random -Minimum 10000 -Maximum 99999)

if (-not $target.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to use a clean-test directory outside the system temporary directory: $target"
}

New-Item -ItemType Directory -Path $target | Out-Null
$excludeDirectories = @('.git', '.venv', 'node_modules', 'dist', 'build', '.pytest_cache', '.ruff_cache', 'playwright-report', 'test-results')
$excludeFiles = @('.env', '*.db', '*.sqlite', '*.sqlite3')

try {
    & robocopy $sourceRoot $target /E /NFL /NDL /NJH /NJS /NP /XD $excludeDirectories /XF $excludeFiles | Out-Null
    if ($LASTEXITCODE -gt 7) {
        throw "Workspace export failed with robocopy exit code $LASTEXITCODE"
    }

    Copy-Item -LiteralPath (Join-Path $target '.env.example') -Destination (Join-Path $target '.env')
    Push-Location $target
    try {
        $env:API_PORT = '18000'
        $env:MOCK_API_PORT = '14010'
        $env:CONSOLE_PORT = '18080'
        $env:DEMO_PORT = '14173'
        $env:OLLAMA_PORT = '11435'

        docker compose -p $project config --quiet
        docker compose -p $project up --build -d api mock-api bot console demo-host

        $checks = @(
            'http://localhost:18000/health',
            'http://localhost:14010/health',
            'http://localhost:18080/health.html',
            'http://localhost:14173/health.html',
            'http://localhost:14173/widget/widget.js'
        )
        foreach ($url in $checks) {
            $passed = $false
            for ($attempt = 0; $attempt -lt 30; $attempt++) {
                try {
                    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 3
                    if ($response.StatusCode -eq 200) {
                        $passed = $true
                        break
                    }
                }
                catch {
                    Start-Sleep -Seconds 2
                }
            }
            if (-not $passed) {
                throw "Clean-install health check failed: $url"
            }
        }

        docker compose -p $project exec -T bot python /tests/integration_flow.py --api http://api:8000 --channel-dir /app
        Write-Output "CLEAN_INSTALL_PASS workspace=$target project=$project"
    }
    finally {
        docker compose -p $project down --volumes --remove-orphans
        Pop-Location
    }
}
finally {
    if (-not $KeepWorkspace -and (Test-Path -LiteralPath $target)) {
        $resolvedTarget = [IO.Path]::GetFullPath($target)
        if (-not $resolvedTarget.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase) -or
            -not ([IO.Path]::GetFileName($resolvedTarget)).StartsWith('savanna-bridge-clean-')) {
            throw "Refusing to remove an unexpected clean-test directory: $resolvedTarget"
        }
        Remove-Item -LiteralPath $resolvedTarget -Recurse -Force
    }
}
