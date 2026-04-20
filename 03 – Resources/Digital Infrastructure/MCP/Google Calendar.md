---
type: resource
area: Digital Infrastructure
status: evergreen
created: 2026-04-09
author:
  - Jonathan D. Micklos
---

# Google Calendar MCP

**Repo:** https://github.com/nspady/google-calendar-mcp
**Package:** `@cocal/google-calendar-mcp`
**Local clone:** `/Users/micklos/.claude/mcp-servers/google-calendar-mcp/`
**Stars:** 1,100+ | **Tools:** 13

## Security Posture

- **Read/Write:** Full read-write by default. Can create, update, and delete events. Can respond to invitations.
- **Auth:** OAuth 2.0 with PKCE — no Google Cloud project or API key needed. Opens browser for consent on first use.
- **Auto-update risk:** Previously configured via bare `npx` which pulls latest from npm on every run. **Switched to local clone to eliminate this risk.**
- **Token storage:** Local, managed by the server. Not committed to git.
- **Data exfiltration:** Talks only to Google Calendar API. No third-party calls.
- **Scope:** Requests full calendar read-write. No read-only mode available in this package.

**Alternative considered:** `taylorwilsdon/google_workspace_mcp` (2k+ stars, MIT, Python) supports `--tools calendar --read-only` for minimal scope. Heavier dependency (Python + uvx) but better security granularity. Worth revisiting if read-only becomes a priority.

## What It Provides

| Tool | Type | Description |
|---|---|---|
| `list-calendars` | Read | List all available calendars |
| `list-events` | Read | List events with date range filtering |
| `get-event` | Read | Get details of a specific event |
| `search-events` | Read | Search events by keyword |
| `get-freebusy` | Read | Check availability across calendars |
| `get-current-time` | Read | Get current time in any timezone |
| `list-colors` | Read | List available event/calendar colors |
| `create-event` | Write | Create a single event |
| `create-events` | Write | Bulk create multiple events |
| `update-event` | Write | Modify an existing event |
| `delete-event` | Write | Delete an event |
| `respond-to-event` | Write | Accept/decline/maybe an invitation |
| `manage-accounts` | Admin | Add/remove/list connected Google accounts |

## Setup

### Step 1: Clone Locally

```bash
cd ~/tools
git clone https://github.com/nspady/google-calendar-mcp.git google-calendar-mcp
cd google-calendar-mcp
npm install && npm run build
```

### Step 2: Add to Claude Code

Add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "node",
      "args": ["/Users/micklos/.claude/mcp-servers/google-calendar-mcp/dist/index.js"]
    }
  }
}
```

### Step 3: Authenticate

On first use, it will open a browser for Google OAuth consent (PKCE flow — no API key needed). Grant calendar access for your Google account.

### Step 4: Multi-Account (Optional)

Use the `manage-accounts` tool to add additional Google accounts if you want both personal and work calendars.

## Use Cases by Area

| Area | How It's Used |
|---|---|
| All | "What's on my calendar this week?" |
| Fucks Given | "When did we last eat at Spinasse?" (search events) |
| Wedding | "Block off Dec 12 for wedding" |
| Relationships | "When is our next date night?" |
| Health | "When is my next derm appointment?" |
| Vehicles | "When are car tabs due?" |
| Travel | "What trips are booked?" |

## Data Flow

Calendar data is queried **live** — not stored in the vault. This MCP is for reading and writing events, not for building a local database. If we want historical dining analysis, we'd search events and aggregate on the fly.

## Notes

- No Google Cloud project required — uses OAuth PKCE
- Works with any Google account (personal Gmail, Workspace)
- Supports recurring event modification
- Natural language date parsing built in
