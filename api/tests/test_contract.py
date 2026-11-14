"""Contract verification tests for every endpoint against openapi.yaml (Milestone A-M4)."""

from pathlib import Path

import yaml
from fastapi.testclient import TestClient

from savanna_bridge.main import app

client = TestClient(app)
OPENAPI_PATH = Path(__file__).resolve().parents[1] / "openapi.yaml"


def test_every_openapi_path_exists_in_app() -> None:
    with open(OPENAPI_PATH, encoding="utf-8") as f:
        spec = yaml.safe_load(f)

    # Collect all routes defined in FastAPI app
    app_routes: dict[str, set[str]] = {}
    for route in app.routes:
        if hasattr(route, "path") and hasattr(route, "methods"):
            norm_path = route.path
            if norm_path not in app_routes:
                app_routes[norm_path] = set()
            for m in route.methods:
                app_routes[norm_path].add(m.lower())

    # Verify each path and operation in openapi.yaml has a corresponding route
    missing = []
    for spec_path, methods in spec.get("paths", {}).items():
        # normalize path parameters: {id} vs {handoff_id}
        norm_spec_path = spec_path
        if norm_spec_path not in app_routes:
            # check if path is in app_routes
            found = False
            for ar in app_routes:
                if ar == norm_spec_path:
                    found = True
                    break
            if not found:
                missing.append(f"Missing path: {spec_path}")
                continue

        for method in methods:
            if method.lower() not in app_routes.get(norm_spec_path, set()):
                missing.append(f"Missing method {method.upper()} on {spec_path}")

    assert not missing, f"Contract deviations found: {missing}"


def test_standard_error_format_on_bad_request() -> None:
    # Trigger 400 Bad Request
    res = client.post("/ask", json={"invalid_field": 123})
    assert res.status_code == 400
    data = res.json()
    assert "error" in data
    assert "code" in data["error"]
    assert "message" in data["error"]
    assert "request_id" in data["error"]
