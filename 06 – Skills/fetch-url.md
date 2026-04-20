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

### Attempt 2 — Playwright non-headless browser

If curl fails, use Playwright in **non-headless** mode to fetch the fully-rendered page. This bypasses aggressive bot detection (e.g., Akamai Bot Manager) because headed mode has legitimate `navigator.webdriver`, `window.chrome`, plugins, and WebGL signals.

**Prerequisites:** Playwright and Chromium must be installed. If not:
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
- If both attempts fail, inform the user and suggest they open the URL in their browser.
