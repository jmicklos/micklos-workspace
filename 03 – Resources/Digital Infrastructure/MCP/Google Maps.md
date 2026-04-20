---
type: resource
area: Digital Infrastructure
status: evergreen
created: 2026-04-09
author:
  - Jonathan D. Micklos
---

# Google Maps MCP

**Repo:** https://github.com/cablate/mcp-google-map
**Local clone:** `/Users/micklos/.claude/mcp-servers/google-maps-mcp/`
**Stars:** 251+ | **Tools:** 18 (14 atomic + 4 composite)
**Read-only:** Yes — all tools annotated `readOnlyHint: true`

## What It Provides

### Atomic Tools (14)
- `geocode` / `reverse-geocode` — address ↔ coordinates
- `search-nearby` — find places near a location
- `search-places` — text-based place search
- `place-details` — full details including photos, reviews, hours
- `directions` — routing between points
- `distance-matrix` — travel time/distance between multiple origins and destinations
- `elevation` — elevation data for coordinates
- `timezone` — timezone for a location
- `weather` — weather forecast
- `air-quality` — air quality index
- `static-map` — generate a static map image
- `batch-geocoding` — geocode multiple addresses

### Composite Tools (4)
- `explore-area` — neighborhood overview
- `plan-route` — multi-stop route optimization
- `compare-places` — side-by-side comparison
- `local-rank-tracker` — geographic grid ranking

## Security Posture

- **Read-only:** Yes. All tools annotated with `readOnlyHint: true`, `destructiveHint: false`. Cannot modify anything.
- **Auth:** API key only — no OAuth, no user data beyond what you query.
- **Auto-update risk:** Previously configured via bare `npx` which pulls latest from npm on every run. **Switched to local clone to eliminate this risk.** A malicious npm publish could have run arbitrary code.
- **Cost risk:** Google Maps API calls cost money (Places: ~$17/1000 requests). No built-in rate limiting. Set a budget alert at $10/month in Google Cloud Console.
- **Data exfiltration:** Talks only to Google Maps Platform APIs. No third-party calls.

## Setup

### Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Create a new project (e.g., "Claude MCP")
3. Enable these APIs:
   - **Places API (New)**
   - **Routes API**
   - **Geocoding API**
   - **Maps Static API** (optional, for map images)
4. Create an API key under Credentials
5. Restrict the key to the above APIs only

### Step 2: Clone Locally

```bash
cd ~/tools
git clone https://github.com/cablate/mcp-google-map.git google-maps-mcp
cd google-maps-mcp
npm install && npm run build
```

### Step 3: Add to Claude Code

Add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "google-maps": {
      "command": "node",
      "args": ["/Users/micklos/.claude/mcp-servers/google-maps-mcp/dist/index.js", "--stdio"],
      "env": {
        "GOOGLE_MAPS_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### Step 4: (Optional) Limit Exposed Tools

To reduce context window usage, only expose the tools you need:
```json
{
  "env": {
    "GOOGLE_MAPS_API_KEY": "YOUR_API_KEY",
    "GOOGLE_MAPS_ENABLED_TOOLS": "search-places,place-details,directions,search-nearby"
  }
}
```

## Use Cases by Area

| Area | How It's Used |
|---|---|
| Fucks Given | Restaurant lookups, place details, reviews, nearby search |
| Travel | Route planning, distance calculations, destination research |
| Home | Contractor lookups, landscaping service search |
| Wedding | Venue research, hotel proximity to venues |

## Limitations

- **Cannot access personal saved/starred places** — Google locked this to on-device only
- **Cannot access location history/timeline** — also on-device only
- Personal data (Wan Ting's lists, your starred places) must come from periodic Google Takeout HTML exports
- API usage is billed — set budget alerts in Google Cloud Console

## Cost

Google Maps Platform uses pay-as-you-go pricing:
- Places API: ~$17/1000 requests (basic), ~$25/1000 (advanced)
- Routes API: ~$5-10/1000 requests
- Free tier: $200/month credit (covers light personal use easily)

Set a budget alert at $10/month to start.

## Data Flow

Maps data is queried **live** — not stored. Place details, directions, and search results are used in context and discarded. If a place lookup informs a dining decision, the result gets recorded in `Fucks Given/data/` CSVs manually.
