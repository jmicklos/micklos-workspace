# 07 — System Notes

## Architecture

**Ground truth:** This PARA file set. Update here when anything significant changes.

**claude.ai memory (30-entry cap, 500 char/entry):** Thin operational layer — recent activity, active bookings, urgent flags, recency-sensitive info. Not the place for deep lists.

**Tool integrations in claude.ai** (maps, places search, image search, weather): These stay in claude.ai — they don't exist in Claude Code. Don't migrate advisory workflows to Claude Code.

---

## How to Refresh Context

1. Open a new project conversation
2. Paste relevant files into project instructions:
   - Always paste `00-identity.md`
   - Add domain-specific files as needed
3. Update this PARA set when things change; re-paste the updated file

**Which files to paste by conversation type:**
| Conversation type | Files to paste |
|---|---|
| Dining / restaurant recs | 00, 02, 03 |
| Anniversary / travel planning | 00, 01, 05 |
| Photography / ghost towns | 00, 04 |
| Music | 00, 06 |
| General advisory | 00, 01 |
| Full context refresh | All files |

---

## Key Contacts / Accounts

- **Chris** — owner of Nue (Beli 8.6), close friend. Strong ear for Seattle food and music. Runs Nue Recommends series.
- **@tanedaseattle** — Instagram account for Taneda reservation drops (11am, second-to-last Saturday of month)

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

If 1+ month since last update, prompt Jonathan to share new ratings for incorporation into `02-dining-jonathan.md`.

---

## Archive

### Willows Inn, Lummi Island
**Permanently closed.** Chef Blaine Wetzel. 7pm single seating, $225/person. Donated to Lighthouse Mission Ministries. Listed for sale March 2025. Do not recommend. Do not resurface.

### Over the Moon Tacoma (April 11, 2026)
36-seat scratch kitchen, Opera Alley, Tacoma. Was booked for anniversary April 11. Cancelled in favor of Longmire overnight plan. Still a valid target for future non-anniversary visit.

---

## PARA File Change Log

| Date | Change |
|---|---|
| April 9, 2026 | Initial PARA migration from memory-only system. Full multi-file export built from conversation history. |
