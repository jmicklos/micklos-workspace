#!/usr/bin/env bash
# verify-urls.sh <file> [--force]
#
# Extracts markdown URLs from <file>, verifies each via HTTP, and caches
# results in .url-cache.json alongside this script.
#
# Cache TTL:
#   - OK results cached for 30 days
#   - FAIL results cached for 7 days (gives flaky sites a chance to recover)
#
# Exit codes:
#   0 — all URLs OK
#   1 — one or more URLs failed
#   2 — usage/setup error

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <file> [--force]" >&2
  exit 2
fi

FILE="$1"
FORCE=0
if [ "${2:-}" = "--force" ]; then FORCE=1; fi

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE" >&2
  exit 2
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required. Install: brew install jq" >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CACHE="$SCRIPT_DIR/.url-cache.json"
[ -f "$CACHE" ] || echo '{}' > "$CACHE"

NOW=$(date +%s)
OK_TTL=$(( 30 * 86400 ))
FAIL_TTL=$(( 7 * 86400 ))

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

# Extract unique URLs from markdown links [text](url).
# Uses a two-pass grep to handle multiple links per line cleanly.
mapfile -t URLS < <(
  grep -oE '\]\(https?://[^) ]+\)' "$FILE" \
    | sed -E 's/^\]\((.*)\)$/\1/' \
    | sort -u
)

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No URLs found in $FILE"
  exit 0
fi

echo "Checking ${#URLS[@]} unique URLs in $FILE"
echo

fail_count=0
ok_count=0
cached_count=0

for url in "${URLS[@]}"; do
  cached=$(jq -r --arg u "$url" '.[$u] // empty' "$CACHE")
  if [ -n "$cached" ] && [ "$FORCE" -eq 0 ]; then
    status=$(echo "$cached" | jq -r '.status')
    ts=$(echo "$cached" | jq -r '.ts')
    code=$(echo "$cached" | jq -r '.code')
    age=$(( NOW - ts ))
    if [ "$status" = "ok" ] && [ "$age" -lt "$OK_TTL" ]; then
      printf '  [cache] OK  %s  %s\n' "$code" "$url"
      ok_count=$(( ok_count + 1 ))
      cached_count=$(( cached_count + 1 ))
      continue
    fi
    if [ "$status" = "fail" ] && [ "$age" -lt "$FAIL_TTL" ]; then
      printf '  [cache] FAIL %s  %s\n' "$code" "$url"
      fail_count=$(( fail_count + 1 ))
      cached_count=$(( cached_count + 1 ))
      continue
    fi
  fi

  code=$(curl -s -L -o /dev/null -w '%{http_code}' --max-time 15 \
    -A "$UA" \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
    -H 'Accept-Language: en-US,en;q=0.9' \
    "$url" 2>/dev/null || echo "000")

  if [ "$code" -ge 200 ] && [ "$code" -lt 400 ]; then
    printf '   [live] OK  %s  %s\n' "$code" "$url"
    st="ok"
    ok_count=$(( ok_count + 1 ))
  else
    printf '   [live] FAIL %s  %s\n' "$code" "$url"
    st="fail"
    fail_count=$(( fail_count + 1 ))
  fi

  tmp=$(mktemp)
  jq --arg u "$url" \
     --arg s "$st" \
     --arg c "$code" \
     --arg t "$NOW" \
     '.[$u] = {status:$s, code:($c|tonumber), ts:($t|tonumber)}' \
     "$CACHE" > "$tmp"
  mv "$tmp" "$CACHE"
done

echo
printf 'Summary: %d ok, %d fail (%d from cache)\n' "$ok_count" "$fail_count" "$cached_count"

if [ "$fail_count" -gt 0 ]; then
  exit 1
fi
exit 0
