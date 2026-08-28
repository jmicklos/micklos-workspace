# Context — Vehicles – Fix Android Auto Crash
*Last updated: 2026-06-09*

## What this project is
Jonathan's Android Auto crashes reproducibly at two specific geographic locations in Seattle. He's frustrated — the phone is < 2 years old and he's already exhausted the obvious fixes. Goal: get Google to fix the underlying bug, or find a working workaround. Due 2026-06-30.

## Current state
**Project note created** at `01 – Projects/Vehicles – Fix Android Auto Crash/Vehicles – Fix Android Auto Crash.md` with a 4-step action plan. No steps have been executed yet — this is still in the investigation/planning phase.

**Two crash locations identified:**
1. **Edgar Martinez Dr S** over 4th Ave S (elevated overpass) — crashes eastbound only
2. **SR 520 floating bridge** — crashes in both directions

**Already ruled out:** wired connection (tried), offline maps (tried), clearing Google Maps cache (tried repeatedly). The problem persists.

**Hypothesis:** Two different root causes. 520 bridge (both directions, 1.4mi over water) likely GPS signal loss. Edgar Martinez (eastbound only, short overpass with stacked road geometry) likely corrupted map tile / road layer data. Both are documented classes of Android Auto bugs — Google has never formally acknowledged them despite community reports since 2021.

## Key decisions & rationale
- **Isolation testing comes first** (before reporting): Testing Waze on AA and phone nav without AA at both locations will determine if it's a Maps bug, an AA platform bug, or a phone-level GPS bug. This makes any bug report far more credible.
- **No crowdsourced crash map exists** — searched for one. This is a gap in the ecosystem.
- **Cache clearing removed from action plan** — Jonathan has already tried this repeatedly, so it's listed as ruled out, not as a next step.

## Jonathan's preferences
- "I'm pretty damn pissed and this needs to be fixed" — high urgency, low patience for generic troubleshooting suggestions
- Has already tried the standard fixes (wired, offline maps, cache clear) — do NOT suggest these again
- Wants a real resolution, not workarounds

## Open threads
- **Device info still needed:** phone model, head unit, vehicle, Android version, Maps version, AA version
- **Exact GPS coordinates** not yet captured for either location
- **What exactly crashes?** Need to confirm: does it kill just the nav app, or all of Android Auto?

## Next steps
1. Jonathan provides device info (phone, head unit, vehicle)
2. **Isolation test at both locations:** (a) Waze as AA nav, (b) phone nav without AA — document results
3. Capture exact GPS coordinates at both crash points
4. File bug reports: Google Maps "Report a problem" at both pins, AA feedback form, Android Auto Community post with device info + coordinates + directional asymmetry
5. Check for app/OS/firmware updates
6. If unfixed: switch to Waze as default AA nav if it survives the test, explore Google Issue Tracker
