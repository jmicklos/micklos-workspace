---
type: resource
area: Digital Infrastructure
status: evergreen
created: 2026-04-09
author:
  - Jonathan D. Micklos
---

# Spotify MCP

**Repo:** https://github.com/marcelmarais/spotify-mcp-server
**Local clone:** `/Users/micklos/.claude/mcp-servers/spotify-mcp-server/`
**Language:** TypeScript/Node.js
**Stars:** 279+ | **Tools:** 27

## What It Provides

- `searchSpotify` — search tracks, artists, albums, playlists
- `getNowPlaying` — current playback
- `getMyPlaylists` — user's playlists
- `getPlaylistTracks` — tracks in a playlist
- `getRecentlyPlayed` — recently played tracks
- `getUsersSavedTracks` — saved/liked tracks
- `playMusic`, `pausePlayback`, `resumePlayback`, `skipToNext` — playback control
- `createPlaylist`, `addTracksToPlaylist` — playlist management

## Security Posture

- **Read/Write:** Full read-write. 27 tools including playback control, playlist CRUD, library modification, volume control. A bad prompt could skip a track or delete a playlist.
- **OAuth scopes (11):** `user-read-private`, `user-read-email`, `user-read-playback-state`, `user-modify-playback-state`, `user-read-currently-playing`, `playlist-read-private`, `playlist-modify-private`, `playlist-modify-public`, `user-library-read`, `user-library-modify`, `user-read-recently-played`
- **Token storage:** Plaintext `spotify-config.json` in the server directory (contains refresh token). Not committed to git.
- **Auto-update risk:** None — local git clone, pinned to whatever commit you checked out. Update manually with `git pull && npm install && npm run build`.
- **Data exfiltration:** Talks only to `api.spotify.com`. No third-party calls.
- **Requires Spotify Premium** for playback controls (read-only tools work without Premium).

## Setup

### Step 1: Create Spotify Developer App

1. Go to https://developer.spotify.com/dashboard
2. Create a new app
3. Set redirect URI to `http://127.0.0.1:8888/callback`
4. Note the **Client ID** and **Client Secret**

### Step 2: Clone and Build

```bash
cd ~/tools
git clone https://github.com/marcelmarais/spotify-mcp-server.git
cd spotify-mcp-server
npm install && npm run build
```

### Step 3: Create Config

Create `spotify-config.json` in the repo root:
```json
{
  "clientId": "YOUR_CLIENT_ID",
  "clientSecret": "YOUR_CLIENT_SECRET",
  "redirectUri": "http://127.0.0.1:8888/callback"
}
```

### Step 4: Authenticate

```bash
npm run auth
```
This opens a browser for OAuth consent. Tokens are saved locally.

### Step 5: Add to Claude Code

Add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "spotify": {
      "command": "node",
      "args": ["/Users/micklos/.claude/mcp-servers/spotify-mcp-server/build/index.js"],
      "env": {}
    }
  }
}
```

## Data Flow

Spotify MCP → Claude → appends to `02 – Areas/Fucks Given/data/`:
- `beli-ratings.csv` (indirect — informs dining recs)
- `spotify-tracks.csv` (periodic snapshots)
- `spotify-playlists.csv` (periodic snapshots)

## Known Gaps

- Does NOT expose `get_user_top_items` (top artists/tracks by time range: short_term / medium_term / long_term). This is the most valuable endpoint for distinguishing binge cycles from long-term preferences.
- **Workaround:** Could add this endpoint to the server, or use `tylerpina/spotify-mcp` alongside for that one tool.

## Recurring

Monthly: Run a snapshot of recent listening and append to Fucks Given data.
