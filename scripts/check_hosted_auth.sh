#!/usr/bin/env bash
# scripts/check_hosted_auth.sh
# Verifies that helper endpoints require authentication on hosted or local instances.
# Unauthorized access must return HTTP 401.
# Learner access must return HTTP 403.

set -euo pipefail

BASE_URL="${1:-http://localhost:8000}"
BASE_URL="${BASE_URL%/}"

echo "========================================================"
echo "Checking Helper Auth Security against: ${BASE_URL}"
echo "========================================================"

FAILED=0

check_endpoint() {
  local method="$1"
  local path="$2"
  local expected_status="$3"
  local desc="$4"
  local extra_header="${5:-}"

  local url="${BASE_URL}${path}"
  local http_code

  if [ -n "${extra_header}" ]; then
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -X "${method}" -H "${extra_header}" "${url}" || echo "000")
  else
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -X "${method}" "${url}" || echo "000")
  fi

  if [ "${http_code}" -eq "${expected_status}" ]; then
    echo "  [PASS] ${desc} -> HTTP ${http_code} (expected ${expected_status})"
  else
    echo "  [FAIL] ${desc} -> HTTP ${http_code} (expected ${expected_status})"
    FAILED=$((FAILED + 1))
  fi
}

echo ""
echo "--- 1. Helper routes without credentials (must return 401) ---"
check_endpoint "GET"  "/handoff/queue" 401 "GET /handoff/queue without login"
check_endpoint "GET"  "/api/v1/handoff/queue" 401 "GET /api/v1/handoff/queue without login"
check_endpoint "POST" "/handoff/ticket_probe_id/claim" 401 "POST /handoff/{id}/claim without login"
check_endpoint "POST" "/handoff/ticket_probe_id/reply" 401 "POST /handoff/{id}/reply without login"
check_endpoint "POST" "/handoff/ticket_probe_id/close" 401 "POST /handoff/{id}/close without login"
check_endpoint "POST" "/api/v1/handoff/ticket_probe_id/close" 401 "POST /api/v1/handoff/{id}/close without login"

echo ""
echo "--- 2. Helper routes with Learner token (must return 403) ---"
LEARNER_HEADER="X-Widget-Token: dummy_learner_token_12345"
check_endpoint "GET"  "/handoff/queue" 403 "GET /handoff/queue with learner token" "${LEARNER_HEADER}"
check_endpoint "POST" "/handoff/ticket_probe_id/close" 403 "POST /handoff/{id}/close with learner token" "${LEARNER_HEADER}"

echo ""
echo "--- 3. Public teacher stats (anonymous, must return 200 without ticket text) ---"
STATS_CODE=$(curl -s -o /tmp/sb_stats.json -w "%{http_code}" "${BASE_URL}/teacher/stats" || echo "000")
if [ "${STATS_CODE}" -eq 200 ]; then
  if grep -q -i '"ticket_secret"' /tmp/sb_stats.json || grep -q -i '"learner_ref"' /tmp/sb_stats.json || grep -q -i '"messages"' /tmp/sb_stats.json; then
    echo "  [FAIL] /teacher/stats exposed ticket secret or learner details!"
    FAILED=$((FAILED + 1))
  else
    echo "  [PASS] /teacher/stats returned 200 with anonymous aggregate metrics only"
  fi
else
  echo "  [WARN] /teacher/stats returned HTTP ${STATS_CODE}"
fi
rm -f /tmp/sb_stats.json

echo ""
echo "========================================================"
if [ "${FAILED}" -eq 0 ]; then
  echo "ALL AUTH CHECKS PASSED: Helper endpoints are securely protected."
  echo "========================================================"
  exit 0
else
  echo "SECURITY CHECK FAILED: ${FAILED} check(s) did not return expected status code."
  echo "========================================================"
  exit 1
fi
