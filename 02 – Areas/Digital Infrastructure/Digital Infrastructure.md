---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-14
---

# Digital Infrastructure

## Standards
- Local-first: no cloud dependency for core systems
- Syncthing keeps Obsidian vault synced across devices

## Mobile Access to Claude Code
- Claude Code runs on the MacBook (laptop must be awake)
- Start remote control: `claude remote-control` in a terminal
- Connect from phone via Claude mobile app or `claude.ai/code`
- Full access to vault, `/morning` skill, all tools
- Syncthing keeps vault files in sync between phone and laptop
- Future: dedicated always-on device (Raspberry Pi 5 or mini PC) on separate VLAN
	- Syncthing syncs vault from laptop
	- Runs `claude remote-control` 24/7
	- Could also host Jellyfin, other always-on services
	- Unifi makes VLAN isolation straightforward

## MCP Servers

External service integrations for Claude Code. All servers cloned locally to `/Users/micklos/tools/` — no auto-updates. See [[MCP Overview]] for full details including safety principles.

| MCP | Local Path | Read/Write | Status |
|---|---|---|---|
| [[Spotify]] | `~/tools/spotify-mcp-server/` | Read-write | Cloned, auth needed |
| [[Google Calendar]] | `~/tools/google-calendar-mcp/` | Read-write | Cloned, auth needed |
| [[Google Maps]] | `~/tools/google-maps-mcp/` | Read-only | Cloned, API key needed |

## Recurring Responsibilities
- Internet Presence Audit | cadence: quarterly | on: first-week | last-done: 2026-04-06
- Mac maintenance (sudo nvram -c) | cadence: quarterly | on: first-week | last-done: 2026-04-06
	- Search for Jonathan Micklos / jmicklos across search engines, social media, data brokers
	- Clean up or request removal of anything unwanted
	- Known issue: old DeviantArt artwork needs takedown
	- Tools to explore: Redact app, DeleteMe, manual DMCA/takedown requests
- MCP health check | cadence: monthly | on: first-weekend | last-done:
	- Verify all MCP servers connect and auth tokens are valid
	- Check Google Cloud API usage/billing
	- Update packages if needed

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Digital Infrastructure"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Digital Infrastructure"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Digital Infrastructure"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Someday Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Digital Infrastructure"
AND status = "someday"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Digital Infrastructure"
AND status = "done"
SORT file.mtime DESC
```