---
type: resource
area: Digital Infrastructure
status: evergreen
created: 2026-04-09
author:
  - Jonathan D. Micklos
---

# MCP Overview

Model Context Protocol servers extend Claude's ability to interact with external services. These are configured at the user level (`~/.claude/settings.json`) so they're available across all projects.

## Installed MCPs

| MCP | Repo | Local Path | Read/Write | Auth |
|---|---|---|---|---|
| [[Spotify]] | `marcelmarais/spotify-mcp-server` | `~/.claude/mcp-servers/spotify-mcp-server/` | Read-write | OAuth 2.0 |
| [[Google Calendar]] | `nspady/google-calendar-mcp` | `~/.claude/mcp-servers/google-calendar-mcp/` | Read-write | OAuth PKCE |
| [[Google Maps]] | `cablate/mcp-google-map` | `~/.claude/mcp-servers/google-maps-mcp/` | Read-only | API Key |
| Gmail | Anthropic first-party | Cloud-hosted (`gmail.mcp.claude.com`) | Read-write | OAuth (managed by Anthropic) |

## Safety Principles

1. **No auto-updates.** Never run MCP servers via bare `npx` without a version pin. A malicious npm publish could run arbitrary code on your machine. Either:
   - **Clone locally** to `~/.claude/mcp-servers/` (preferred — you control the version, can audit, `git pull` when ready)
   - **Pin the version** if using npx: `npx -y @package/name@1.2.3`
2. **All server code lives in `~/.claude/mcp-servers/`**, not in the vault. The vault holds docs; the servers are runtime infrastructure.
3. **Auth tokens stay in each server's directory**, gitignored. Never commit secrets to the vault.
4. **Read-only where possible.** Prefer read-only OAuth scopes / API keys. Write access means a bad prompt can modify your data.
5. **Verify packages before trusting them with OAuth tokens.** Check the GitHub repo, stars, maintenance status, and npm package ownership.

## Configuration

MCPs are configured in `~/.claude/settings.json` under `mcpServers`. Self-hosted servers point to local clones in `~/.claude/mcp-servers/`. Gmail is a first-party Anthropic cloud connector (no local code).

See individual MCP docs for setup details:

- [[Spotify]] — Listening history, playlists, playback
- [[Google Calendar]] — Events, scheduling, availability
- [[Google Maps]] — Place search, directions, details

## Architecture

```
~/.claude/settings.json
  │
  ├── spotify ──→ ~/.claude/mcp-servers/spotify-mcp-server/
  │                  └──→ Spotify Web API ──→ data/ in Fucks Given
  │
  ├── google-calendar ──→ ~/.claude/mcp-servers/google-calendar-mcp/
  │                          └──→ Google Calendar API ──→ queried live
  │
  ├── google-maps ──→ ~/.claude/mcp-servers/google-maps-mcp/
  │                      └──→ Google Maps Platform ──→ queried live
  │
  └── gmail ──→ gmail.mcp.claude.com (Anthropic cloud)
                   └──→ Gmail API ──→ queried live
```

Data captured via MCPs flows into the area that owns it:
- Spotify snapshots → `02 – Areas/Fucks Given/data/`
- Calendar data is queried live, not stored
- Maps data is queried live, not stored

## Maintenance

- **Auth refresh**: Spotify OAuth tokens expire — if tools start failing, re-run the auth flow
- **API quotas**: Google Maps has usage-based pricing. Quotas set in Google Cloud Console (project: `claude-mcp-492902`). Places API capped at 150/day, Routes/Geocoding at 200/day. All within free tier at these limits ($0/month). $10 billing alert set as backup.
- **Enabled Maps tools**: Limited to 6 of 18 via `GOOGLE_MAPS_ENABLED_TOOLS`: geocode, reverse-geocode, search-places, search-nearby, place-details, directions
- **Updates**: `cd ~/.claude/mcp-servers/<server> && git pull && npm install && npm run build` — manual only, never automatic
- **Monthly health check**: Tracked in [[Digital Infrastructure]] recurring responsibilities
