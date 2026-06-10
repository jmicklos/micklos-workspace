---
type: project
area: Vehicles
status: active
next-review: 2026-06-24
due: 2026-08-01
energy: medium
created: 2026-06-10
---

# 4Runner – Improve Fuel Efficiency

## Goal
Diagnose and improve fuel efficiency on the 4Runner, starting with the cold-start MPG drop observed on the digital readout.

## Trigger
Morning cold starts show ~2 MPG drop on the digital fuel economy readout. Seems excessive.

## Investigation: Cold-Start MPG Drop

### Why this happens — it's actually normal (but worth understanding)

The ~2 MPG drop you see on cold start is real, and here's what's going on:

1. **Rich fuel mixture on cold start.** When the engine is cold, the ECU intentionally runs a richer air-fuel ratio (more fuel, less air). Cold fuel doesn't vaporize well, so the engine compensates by injecting more. This is the modern equivalent of a choke — it's by design.

2. **Higher idle RPM.** You've probably noticed the RPM sits higher (~1,200–1,500) for the first few minutes. That's the fast idle / cold idle strategy burning more fuel to get the catalytic converter up to operating temperature quickly (emissions compliance).

3. **Thicker oil resistance.** Cold oil is more viscous, creating more internal friction. The engine works harder to overcome it until everything warms up.

4. **The digital readout amplifies the effect.** If your readout is showing "current" or "trip" MPG, a few minutes of cold idling at 0 MPG tanks the average dramatically. A 2 MPG swing on an overall average that's probably 16–18 MPG is ~10–12%, which tracks with typical cold-start fuel penalty.

### What's NOT normal (worth checking)
- Drop persists well after the engine is warm (10+ min of driving) — could indicate O2 sensor, thermostat stuck open, or coolant temp sensor issue
- Check Engine Light or pending codes
- Coolant temp gauge not reaching normal operating range — thermostat may be stuck open, keeping the ECU in "cold" enrichment mode indefinitely

## Vehicle Details
- **Year/Make/Model:** 2006 Toyota 4Runner
- **VIN:** JTEBT17R968034129
- **Current miles:** 174,500
- **Purchased:** 2016-06-16 at 97,933 miles
- **Maintenance log:** [Google Sheet](https://docs.google.com/spreadsheets/d/1iazjqliWsVlODmyygnmZDirc0b3DIQUBdNpD-nFbit0)

## Maintenance History Analysis (from spreadsheet)

### Already done — ruled out as causes
- [x] Tire pressure — healthy (confirmed 2026-06-10)
- [x] Air filter — healthy (confirmed 2026-06-10; last replaced Mar 2023 at 148k)
- [x] Thermostat — replaced Jul 2017 at 115k (with timing belt job)
- [x] Transmission fluid — changed Jan 2024 at 153k
- [x] Front & rear differential fluid — changed Jan 2024 at 153k
- [x] Transfer case fluid — changed Jan 2024 at 153k
- [x] Front brakes (calipers, rotors, pads) — replaced May 2024 at 154k
- [x] Rear brakes (calipers, rotors, pads) — replaced Jan 2024 at 153k
- [x] MAF sensor cleaned — Jul 2025 at 169k
- [x] Suspension — Bilstein replacement Aug 2025 at 170k

### Likely causes of 3 MPG decline — action items
- [ ] **Replace spark plugs** — last done Feb 2018 at 118,804 mi (56k miles ago). Gradually degrading combustion efficiency. Biggest single suspect.
- [ ] **Replace O2 sensors (upstream pair)** — never replaced per log. At 175k miles, well past typical 100-150k lifespan. Likely running rich without throwing a code.
- [ ] **Fuel injector service** — never done per log. 175k miles of deposit buildup affects atomization.
- [ ] **Scan for pending OBD-II codes** — free at AutoZone. Could surface lazy sensors or other issues.

### Lower priority
- [ ] Replace air filters — 26k since last change, approaching due
- [ ] Review driving habits (warm-up idling duration)
- [ ] Confirm roof rack swap is complete ([[4Runner – Replace Roof Rack and Ladder]])

## Recent work not yet in spreadsheet
- [ ] Get receipt/details for recent radiator and front brake work, then update Google Sheet and this project note

## Notes
- Already swapped to a simpler roof rack for MPG improvement (separate project)
- 2006 4Runner (4th gen V8) is inherently not a fuel-efficient vehicle — realistic expectations matter
- Seattle's hilly terrain and short trips compound the cold-start penalty
- Spreadsheet shows 11.5 MPG average over ownership — cold-start + city driving + hills
- Thermostat was replaced at 115k (2017) — now at 175k, worth verifying it still functions correctly (9 years old)
