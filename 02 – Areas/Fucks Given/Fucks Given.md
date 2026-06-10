---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-03-26
---

# Fucks Given

Personal culture advisor system. Maintains Jonathan and Wan Ting's taste profiles, dining intelligence, music DNA, photography backlog, and travel frameworks.

**Rule Zero:** Does someone give a fuck? Feel the investment. This is the filter for every recommendation — dining, music, experiences, travel.

## How This System Works

- **`resources/`** — Living narrative files (philosophy, style, frameworks). Edit freely as tastes evolve.
- **`data/`** — Structured CSV data (ratings, lists, backlogs). **Append-only. Never delete rows.** If something changes, add a status column update — the history is the point.
- **`planning/`** — Active plans that emerge from this system (anniversary, honeymoon).
- **`source-archive/`** — Date-versioned raw materials. **Immutable.** New exports get new dated folders.

See [[system]] for operational instructions and conversation-type routing.

## Resources

| File | Domain |
|---|---|
| [[identity]] | Rule Zero, who Jonathan is, cross-domain philosophy |
| [[dining-jonathan]] | Jonathan's dining philosophy, references `data/` CSVs |
| [[dining-wan-ting]] | Wan Ting's taste profile, references `data/` CSVs |
| [[music]] | Music DNA, 25+ core artists, adjacency clusters |
| [[photography]] | Gear, style, ghost town philosophy |
| [[travel]] | Frameworks, seasonal calendar, outdoor preferences |
| [[experiences]] | Experience philosophy, PNW day trips |
| [[reading-backlog]] | Running queue of books, essays, long reads |
| [[system]] | Operational instructions, routing, tools |

## Data Files

| File | Records | Description |
|---|---|---|
| `data/beli-ratings.csv` | 35 | Jonathan's Beli restaurant ratings |
| `data/wan-ting-lists.csv` | 217 | Wan Ting's curated restaurant/experience lists |
| `data/want-to-try.csv` | 11 | Restaurants on the radar |
| `data/ghost-restaurants.csv` | 6 | Places to avoid |
| `data/ghost-towns-backlog.csv` | 39 | Photography/exploration destinations |
| `data/travel-backlog.csv` | 888 | Full travel bucket list (from xlsx) |
| `data/spotify-tracks.csv` | 959 | Resolved Spotify track history (Extended Streaming History export) |
| `data/spotify-playlists.csv` | 391 | Resolved Spotify playlist history (Extended Streaming History export) |
| `data/spotify-saved-tracks.csv` | 664 | Full liked/saved songs library (Spotify API, Apr 10 2026) |
| `data/spotify-saved-albums.csv` | 164 | Full saved albums library (Spotify API, Apr 10 2026) |
| `data/spotify-library-playlists.csv` | 65 | All playlists — 19 owned, 46 following (Spotify API, Apr 10 2026) |
| `data/spotify-recently-played.csv` | 50 | Most recent plays snapshot (Spotify API, Apr 10 2026) |

## Recurring Responsibilities

- Beli sync | cadence: monthly | on: first-weekend | last-done: 2026-06-06
  - Export latest Beli ratings and append new entries to `data/beli-ratings.csv`
  - Deferred 2026-04-20 → next surface: Jun 6 first-weekend
- Music discovery review | cadence: quarterly | on: first-week | last-done:
  - Review Spotify data, update `resources/music.md` with new artists/shifts
- Travel backlog review | cadence: quarterly | on: first-week | last-done:
  - Review and update `data/travel-backlog.csv` priorities
- Restaurant backlog review | cadence: monthly | on: last-weekend | last-done: 2026-06-10
  - Review `data/want-to-try.csv`, book or remove stale entries
  - Deferred 2026-04-20 → next surface: Jun 27 last-weekend
- Reading backlog review | cadence: monthly | last-done:
  - Review and update `resources/reading-backlog.md` — move items through queue → reading → finished, add new ones, prune stale
