---
type: resource
area: Fucks Given
status: evergreen
created: 2026-03-26
author: Jonathan D. Micklos
---

# System Notes

## Architecture

**Ground truth:** The resource files in this directory. Update here when anything significant changes.

**Resource files:**
- `identity.md` — anchor document. Load always.
- `dining-jonathan.md` — Jonathan's dining philosophy, approach, booking notes.
- `dining-wan-ting.md` — Wan Ting's taste profile across cities.
- `music.md` — music DNA, artist notes, adjacency clusters.
- `photography.md` — gear, style, ghost town backlog.
- `travel.md` — frameworks, joint history, honeymoon planning.
- `experiences.md` — experiences philosophy, PNW seasonal day trips.
- `system.md` — this file. Operational instructions.

**Data files** (in `../data/`):
- `beli-ratings.csv` — Jonathan's Beli scores.
- `want-to-try.csv` — Jonathan's want-to-try list.
- `ghost-restaurants.csv` — do-not-revisit list.
- `wan-ting-lists.csv` — Wan Ting's full restaurant/bar lists.
- `ghost-towns-backlog.csv` — photography exploration backlog.
- `travel-backlog.csv` — travel bucket list.

**claude.ai memory (30-entry cap, 500 char/entry):** Thin operational layer — recent activity, active bookings, urgent flags, recency-sensitive info. Not the place for deep lists.

**Tool integrations in claude.ai** (maps, places search, image search, weather): These stay in claude.ai — they don't exist in Claude Code. Don't migrate advisory workflows to Claude Code.

---

## How to Refresh Context

1. Open a new project conversation.
2. Load relevant resource files:
   - Always load `identity.md`
   - Add domain-specific files as needed
3. Update resource files when things change; reload the updated file.

**Which files to load by conversation type:**

| Conversation type | Files to load |
|---|---|
| Dining / restaurant recs | identity, dining-jonathan, dining-wan-ting |
| Anniversary / travel planning | identity, travel |
| Photography / ghost towns | identity, photography |
| Music | identity, music |
| PNW day trips / seasonal | identity, experiences |
| Experiences / events / concerts | identity, experiences, music (if music-related) |
| General advisory | identity |
| Full context refresh | All files |

---

## Key Contacts / Accounts

- **Chris** — owner of Nue (Beli 8.6), close friend. Strong ear for Seattle food and music. Runs Nue Recommends series.
- **@tanedaseattle** — Instagram account for Taneda reservation drops (11am, second-to-last Saturday of month).

---

## Key Tools

| Tool | Use |
|---|---|
| **Beli** | Primary dining rating system for Jonathan and Wan Ting. Ground truth for "have we been / what did we think." |
| **Tock** | Reservation platform — Surrell, Sushi Kaunta, others. |
| **Spotify** | Extended Streaming History (request from privacy page — NOT device telemetry export). Daylist for time-of-day patterns. |
| **Lightroom** | Post-production. RAW workflow. |

---

## Beli Sync Protocol

If 1+ month since last update, prompt Jonathan to share new ratings for incorporation into `dining-jonathan.md` and the `../data/beli-ratings.csv` data file.

---

## Archive

### Willows Inn, Lummi Island
**Permanently closed.** Chef Blaine Wetzel. 7pm single seating, $225/person. Donated to Lighthouse Mission Ministries. Listed for sale March 2025. Do not recommend. Do not resurface.

### Over the Moon Tacoma (April 11, 2026)
36-seat scratch kitchen, Opera Alley, Tacoma. Was booked for anniversary April 11. Cancelled in favor of Longmire overnight plan. Still a valid target for future non-anniversary visit.

---

## Change Log

| Date | Change |
|---|---|
| April 9, 2026 | Initial PARA migration from memory-only system. Full multi-file export built from conversation history. |
| April 9, 2026 | Restructured into resource files with separate data references. |
