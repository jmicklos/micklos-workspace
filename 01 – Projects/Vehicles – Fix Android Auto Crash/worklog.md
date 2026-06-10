# Worklog -- Vehicles -- Fix Android Auto Crash

## 2026-06-08 -- Initial investigation and project setup

### Situation
Jonathan is experiencing a reproducible Android Auto crash at a specific geographic location: eastbound on Edgar Martinez Dr S, crossing over 4th Ave S (an elevated overpass) in Seattle. The crash happens every single time regardless of time of day or prior activity. He's already tried wired connection and offline maps -- neither helps. Phone is less than 2 years old. He's frustrated and wants this fixed.

### Approach & Rationale
Web research confirmed this is a known class of bug -- people have reported AA crashing at specific reproducible GPS locations since at least 2021 on Google's own support forums. Google has never formally acknowledged it. The leading theory is corrupted map tile/road geometry data at coordinates with complex layered road surfaces (overpasses, interchanges). The overpass stacking Edgar Martinez Dr S above 4th Ave S fits this pattern perfectly.

### What Jonathan Said
- "android auto keeps crashing on me at the exact same geographic spot regardless of time of day and prior activity"
- Already uses wired connection, already has offline maps -- ruled out the easy fixes
- "I'm pretty damn pissed and this needs to be fixed"

### Source Material Used
- [Android Auto crashes on certain GPS locations](https://support.google.com/androidauto/thread/116341090) -- confirms location-specific crashes are a known pattern
- 9to5Google, autoevolution, PhoneArena reporting on AA GPS issues through 2023-2026
- Gadget Hacks reporting on AA stability fixes rolling out for Pixel/Samsung in early 2026

### Outputs & State
- `Vehicles – Fix Android Auto Crash.md` -- project note with full action plan, created
- `worklog.md` -- this file, created

### Open Threads
- Need phone model, head unit model, and vehicle to complete device info
- Need exact GPS coordinates (Jonathan should capture when filing the report)

### Next Steps
1. Jonathan fills in device info (phone, head unit, vehicle, Android version)
2. Start with Step 1: report the bug directly in Google Maps at the exact location
3. Then Step 2: nuclear cache clear + re-download offline maps + test drive
4. If still broken, Step 3: try Waze to isolate whether it's Maps-level or AA-level

---

## 2026-06-08 — Second crash location + action plan revision

### Situation
Jonathan reported a second crash location: the SR 520 floating bridge, crashing in both directions. He also clarified that he has already tried clearing the Google Maps cache repeatedly — not just once. The action plan needed revision to stop suggesting things he's already tried.

### Approach & Rationale
Revised the project note significantly. Reframed the problem as two potentially different bugs:
- **520 bridge (both directions):** likely GPS signal loss over 1.4mi of water with no cell infrastructure
- **Edgar Martinez (eastbound only):** likely map geometry/tile corruption at a stacked overpass

Moved isolation testing (Waze on AA, phone nav without AA) to Step 1 since it's the highest-value diagnostic. Removed cache clearing from the action plan since Jonathan has already exhausted it. Searched for a crowdsourced Android Auto crash map — none exists.

### What Jonathan Said
- "I have repeatedly tried to clear the cache"
- "This also happens over the 520 bridge... in both directions"
- "Oddly, it only happens on the edgar martinez dr elevated road heading east"
- "There should be a map where android users can pinpoint where this happens"
- "This is fucking absurd for a phone less than 2 years old"

### Source Material Used
- Additional web searches for AA crashes on bridges, GPS loss over water, crowdsource crash maps
- [autoevolution: GPS Nightmare on Android Auto](https://www.autoevolution.com/news/the-gps-nightmare-on-android-auto-continues-with-no-fix-in-sight-145633.html) — confirms bridge/overpass disconnections
- [Google Maps Community: Overpasses glitch](https://support.google.com/maps/thread/184724655) — confirms map layer issues at overpasses

### Outputs & State
- `Vehicles – Fix Android Auto Crash.md` — major revision: added 520 bridge location, crash location table, directional asymmetry analysis, revised 4-step action plan
- `worklog.md` — appended this entry

### Open Threads
- Device info still TBD (phone, head unit, vehicle)
- Exact GPS coordinates not yet captured
- Need to confirm: does the crash kill just nav or all of AA?
- No crowdsourced crash map exists — Jonathan thinks one should

### Next Steps
1. Jonathan provides device info
2. Isolation testing at both locations: (a) Waze on AA, (b) phone nav without AA
3. Capture exact coordinates
4. File bug reports with full device info and directional data
5. Check for updates (Maps, AA, Android OS, head unit firmware)
- 2026-06-09 08:11 -- `Vehicles – Fix Android Auto Crash.md` via Edit
