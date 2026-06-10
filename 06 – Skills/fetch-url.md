Fetch the URL provided by the user as a fallback when WebFetch fails (e.g., 403 errors from sites that block automated requests).

## Usage
The user will provide a URL as the argument: `/fetch-url https://example.com/page`

Use the argument as `$ARGUMENTS`.

## Instructions

### Attempt 1 — curl with browser headers

Run curl with browser-mimicking headers and a 10-second timeout:

```bash
curl -s -L --max-time 10 \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Accept-Encoding: identity' \
  -H 'Cache-Control: no-cache' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: none' \
  -H 'Sec-Fetch-User: ?1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  "$ARGUMENTS"
```

If curl returns a non-zero exit code, empty output, a 403/blocking page, or times out, proceed to Attempt 2.

### Attempt 2 — curl_cffi (browser TLS fingerprint impersonation)

Many modern bot-protection systems (Akamai, Cloudflare, PerimeterX) fingerprint the TLS handshake (JA3/JA4), not just headers. Python's `curl_cffi` wraps curl-impersonate to reproduce real Chrome TLS/HTTP2 fingerprints — this defeats most TLS-fingerprinting bot walls without requiring a browser. Fast (~1s), no GUI.

**Prerequisites:** Python 3 + `curl_cffi` (already installed via `pip3 install curl_cffi`). If missing: `pip3 install --quiet curl_cffi`.

```bash
python3 -c "
from curl_cffi import requests
r = requests.get('$ARGUMENTS', impersonate='chrome120', timeout=15)
print('status:', r.status_code, 'len:', len(r.text))
# Write to a temp file so it can be grepped/parsed
open('/tmp/fetch-url-result.html','w').write(r.text)
print(r.text[:15000])
"
```

If this returns a 403/blocked page or fails, proceed to Attempt 3.

### Attempt 3 — Playwright non-headless browser

If curl and curl_cffi both fail, use Playwright in **non-headless** mode to fetch the fully-rendered page. Reserved for sites that additionally fingerprint the JS runtime (navigator.webdriver, window.chrome, plugins, WebGL). A visible browser window flashes up — confirm with user before running if that's disruptive.

**Prerequisites:** Node.js, Playwright, and Chromium. If Node is missing on macOS: `brew install node`. Then:
```bash
cd /tmp && npm install playwright && npx playwright install chromium
```

Run the fetch script from `/tmp` (where playwright is installed):

```bash
cd /tmp && node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('$ARGUMENTS', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(8000);
  const text = await page.innerText('body');
  console.log(text.substring(0, 15000));
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
"
```

**Why non-headless?** Sites with Akamai/Cloudflare bot detection fingerprint the JS environment. Headless mode leaks signals (`navigator.webdriver=true`, missing `window.chrome`, zero plugins, SwiftShader WebGL renderer) that headed mode does not.

## Parsing the output

The output will be page text or raw HTML. Parse it to extract the useful content the user is looking for. Focus on:
- Product names, descriptions, and pricing
- Main content areas (articles, product details, etc.)
- Structured data (JSON-LD, meta tags, Open Graph)
- Ignore navigation, footers, ads, and tracking scripts

Present the extracted information clearly and concisely to the user.

## Notes
- This is a **read-only** utility — it only fetches and reads content, never submits forms or modifies anything.
- Use this as a fallback when WebFetch returns 403 or similar blocking errors.
- If all attempts fail, inform the user and suggest they open the URL in their browser.
- curl_cffi is the sweet spot for most bot walls — no GUI, no Node, fast. Try it before Playwright.
