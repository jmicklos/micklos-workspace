Verify that all URLs in a markdown file resolve (HTTP 2xx/3xx), with a JSON cache so repeat runs are fast.

## Why this exists

Jonathan has a standing rule: **never send a URL without verifying it resolves first** — broken links have caused real frustration. This skill mechanizes that check and caches results so Claude doesn't re-verify the same URL on every conversation.

## Usage

```
/verify-urls <path-to-file>
/verify-urls <path-to-file> --force
```

`$ARGUMENTS` will be the file path (and optionally `--force` to bypass cache).

## Instructions

### Step 1 — Run the script

```bash
bash "06 – Skills/verify-urls.sh" $ARGUMENTS
```

The script will:
1. Extract unique markdown-link URLs (`[text](url)`) from the file.
2. For each URL, check the cache at `06 – Skills/.url-cache.json`.
   - OK results are trusted for 30 days.
   - FAIL results are re-checked after 7 days (sites recover).
3. For cache misses or expired entries, run `curl -L` with a browser User-Agent and a 15-second timeout.
4. Update the cache with `{status, code, ts}` per URL.
5. Print a per-URL status line and a summary.

### Step 2 — Report results to the user

Summarize:
- How many OK / failed / cached.
- Which URLs failed (show the URL and HTTP code).
- Note that some e-commerce sites (Amazon, Castlery, iconX) use aggressive bot detection and may return 403/503 to curl even when the link is valid. For those, suggest manual confirmation or use the `fetch-url` skill (headed browser) to verify.

### Step 3 — Offer to re-check failures

If any URLs failed with 403/503, offer to retry using the `fetch-url` skill (Playwright headed browser) which bypasses most bot detection.

## Cache format

`06 – Skills/.url-cache.json`:

```json
{
  "https://example.com/page": {
    "status": "ok",
    "code": 200,
    "ts": 1713369600
  }
}
```

- `status`: "ok" or "fail"
- `code`: HTTP status code (0 on network error)
- `ts`: Unix timestamp of last check

## Notes

- The cache file is vault-local and version-controlled with the rest of the vault, so verified URLs travel across machines.
- `--force` bypasses the cache and re-verifies every URL.
- This skill is read-only — it only makes HTTP GET requests, never modifies the file being checked.
