---
type: project
area: Vehicles
status: active
next-review: 2026-06-12
due: 2026-06-30
energy: medium
created: 2026-06-08
---

# Vehicles -- Fix Android Auto Crash

## Problem
Android Auto crashes at **multiple specific geographic locations**, reproducible every time regardless of time of day or prior activity.

### Already tried (ruled out)
- Wired connection (not wireless) -- still crashes
- Offline maps downloaded -- still crashes
- Cleared Google Maps cache **repeatedly** -- still crashes
- Phone is < 2 years old

### Crash Locations

| # | Location | Direction | Behavior |
|---|---|---|---|
| 1 | Edgar Martinez Dr S over 4th Ave S (elevated overpass) | Eastbound only | Crashes every time |
| 2 | SR 520 floating bridge | **Both directions** | Crashes every time |

**Pattern:** Both locations involve elevated/bridge infrastructure. The 520 bridge is ~1.4 miles over water. Edgar Martinez is a short overpass. The asymmetry is interesting -- 520 crashes both ways but Edgar Martinez only eastbound.

## Root Cause (likely)
Known class of Android Auto bug: crashes at specific GPS locations tied to complex road geometry (overpasses, bridges, layered roads). Documented in [Google's Android Auto Community](https://support.google.com/androidauto/thread/116341090) since 2021 -- never formally acknowledged by Google. Multiple users report location-specific disconnections near bridges and overpasses ([autoevolution](https://www.autoevolution.com/news/the-gps-nightmare-on-android-auto-continues-with-no-fix-in-sight-145633.html)).

The 520 bridge crashing both directions suggests it may be GPS signal loss over water (no cell towers on the bridge itself) rather than map tile corruption. The Edgar Martinez eastbound-only crash may be a different root cause (map geometry).

## Action Plan

### Step 1: Isolate the cause
- [ ] Test with Waze as AA nav app at both locations -- determines if it's Maps-level or AA-level
- [ ] Test with phone nav (no AA connection) at both locations -- determines if it's AA-level or phone-level
- [ ] Note: does the crash kill just the nav app, or all of Android Auto?

### Step 2: Report the bugs
- [ ] Report Edgar Martinez Dr S location in Google Maps (drop pin -> "Report a problem")
- [ ] Report 520 bridge location in Google Maps
- [ ] Note exact coordinates for both locations
- [ ] File feedback via Android Auto app (Settings -> Help & Feedback) referencing both locations
- [ ] Post detailed bug report on [Android Auto Community](https://support.google.com/androidauto) with device info, both coordinates, and the directional asymmetry

### Step 3: Check for known fixes
- [ ] Check for Google Maps app update
- [ ] Check for Android Auto app update
- [ ] Check for Android OS update
- [ ] Check for head unit firmware update

### Step 4: Workarounds if unfixed
- [ ] If Waze works at those spots, switch default AA nav to Waze
- [ ] If nothing works, consider whether a Google Issue Tracker bug exists and star it
- [ ] Look into whether other Android users have mapped crash locations (no crowdsourced crash map found yet -- this should exist)

## Device Info
- **Phone:** TBD
- **Head Unit:** TBD
- **Vehicle:** TBD
- **Android Version:** TBD
- **Google Maps Version:** TBD
- **Android Auto Version:** TBD

## Crash Locations
### Location 1: Edgar Martinez Dr S
- **Road:** Edgar Martinez Dr S, eastbound only
- **Cross:** Over 4th Ave S (elevated overpass)
- **City:** Seattle, WA
- **Coordinates:** TBD

### Location 2: SR 520 Bridge
- **Road:** SR 520 floating bridge
- **Direction:** Both eastbound and westbound
- **City:** Seattle / Medina, WA
- **Coordinates:** TBD
