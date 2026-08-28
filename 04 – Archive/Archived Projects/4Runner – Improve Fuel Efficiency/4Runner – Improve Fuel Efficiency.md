---
type: project
area: Vehicles
status: done
next-review: 2026-09-01
due:
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

### Leading suspect: Exhaust manifold gasket leak
- **Symptom:** Raw gas smell in first ~15 seconds of cold start; sometimes detectable in cabin
- **Why this is the answer:** During cold start, the ECU runs rich and the cats aren't lit yet. If the exhaust manifold gasket has a leak, unburned fuel escapes before reaching the cats. The HVAC fresh air intake sits right above the engine bay, pulling fumes into the cabin.
- **Why OBD didn't catch it:** O2 sensors sit downstream of the manifold — they never see the escaping fuel, so fuel trims look perfect
- **Why it stops after 15 sec:** Metal expands and partially seals the gap; engine switches from rich open-loop to stoichiometric closed-loop
- **Contributes to MPG decline:** Fuel escaping unburned before the cats is literally wasted energy
- **Confirm:** On next cold start, listen for ticking/hissing from the exhaust manifolds for the first 30 seconds
- [ ] **Inspect and replace exhaust manifold gaskets** — ~$400-600 labor, ~$30-50 parts. Do not DIY (V8 manifold bolts at 175k love to snap). Could bundle with spark plugs.

### Ruled out by OBD-II scan (2026-06-11)
- [x] ~~O2 sensors~~ — lambda readings perfect (B1S1: 0.996, B2S1: 0.994), fuel trims at 0%. Do NOT replace.
- [x] ~~Fuel injectors~~ — fuel trims ideal across both banks (LTFT B1: +0.78%, B2: 0%). Injectors delivering correctly.
- [x] ~~Spark plugs~~ — zero misfires across all 8 cylinders (EWMA and current cycle both 0). Not causing MPG loss.
- [x] ~~Trouble codes~~ — no stored, pending, or permanent DTCs. MIL off.
- [x] ~~Thermostat~~ — coolant temp 186.8°F, normal operating range.
- [x] ~~Charging system~~ — 13.24V, alternator healthy.

### Primary cause: Vehicle modifications (~2.3-4.2 MPG impact)
The OBD scan confirmed the fuel management system is running perfectly. The 3 MPG decline is almost entirely explained by modifications that trade capability for efficiency:

| Mod | Detail | Est. MPG hit |
|---|---|---|
| **BFG KO2 tires (Load E)** | ~58 lbs each, aggressive tread, high rolling resistance | -1.5 to -2.5 |
| **2-3" suspension lift** | Removed XREAS system, Bilstein replacement. Raises frontal profile, changes driveline angles | -0.5 to -1.0 |
| **Hub spacers (all four)** | Wider track = more frontal area + altered scrub radius | -0.2 to -0.5 |
| **Metal skid plate** | Replaced plastic engine splash guard. Heavier but similar aero | -0.1 to -0.2 |
| **Total** | | **-2.3 to -4.2** |

**Biggest recovery opportunity: tires.** KO2s are due for replacement in ~6k miles. Switching to a lighter SL all-terrain could recover 1.5-2.5 MPG alone.

#### Tire replacement candidates (all 3PMSF snow-rated, 265/70R17 SL)
| Tire | Weight | Tread Life | Price/ea | Notes |
|---|---|---|---|---|
| **Falken Wildpeak AT4W** | ~48 lb | 65k mi | $175-210 | Top pick — 4Runner community favorite for this trade-off |
| **Toyo Open Country AT3** | ~48-52 lb | 65k mi | $185-225 | Quietest, most highway-refined |
| **Cooper Discoverer AT3 4S** | ~45 lb | 65k mi | $155-190 | Best snow, best value, lightest |
| **Nokian Outpost nAT** | ~stock | 60k mi | $175-210 | Fuel efficiency focused |

All available at Discount Tire (NE Northgate Way — where last set was purchased).

### Secondary factors (cumulative age-related wear)
- Exhaust manifold gasket leak — ~0.3-0.5 MPG, not worth the $400-600 fix
- Piston ring wear, valve stem seals — reduced compression, more blowby (no fix short of rebuild)
- Drivetrain friction — bearings, transmission, diffs all accumulating drag
- Suspension bushing wear — alignment drift, tire scrub
- Weight accumulation — audio system ($9,500 in Car Toys gear), mods, gear
- Driving patterns — city, hills, short trips in Seattle, aggressive driving style

### Watch item: Bank 2 catalyst
- Mode 6 value: 0.3032 vs minimum threshold 0.2995 — passes with only **1.2% margin**
- Bank 1 is fine (0.2714, well above 0.0387 min)
- Not a problem today but Bank 2 cat will be the first thing to fail. Monitor at future scans.

### Lower priority
- [ ] Replace spark plugs — not urgent per scan, but at 56k miles they're approaching the 90k interval. Bundle with manifold gasket job.
- [ ] Replace air filters — 26k since last change, approaching due

## Diagnostics

### OBDLink MX+ ($139.95)
- **Purchased:** 2026-06-11, arriving today
- **App:** OBD Fusion (~$10, iOS/Android) or OBDLink app (free, has Toyota OEM enhanced diagnostics)

### First scan results — 2026-06-11
- [x] DTCs — zero stored, pending, or permanent codes. MIL off. Ready for emissions.
- [x] LTFT — Bank 1: +0.78%, Bank 2: 0%. Textbook perfect (anything within +/- 5% is normal).
- [x] STFT — Bank 1: -1.56%, Bank 2: 0%. Perfect.
- [x] O2 sensors — upstream lambda B1S1: 0.996, B2S1: 0.994. Downstream voltage B1S2: 0.66V, B2S2: 0.68V. All healthy.
- [x] Misfire counts — 0 across all 8 cylinders (EWMA and current cycle).
- [x] Mode 6 — all tests pass. Bank 2 catalyst barely passing (0.3032 vs 0.2995 min).
- [x] Battery voltage — 13.24V. Alternator healthy.
- [x] Coolant temp — 186.8°F. Thermostat functioning normally.
- [x] Engine RPM at idle — 744.5 RPM. Normal warm idle.
- [x] Fuel/Air equivalence ratio — 1.000. Stoichiometric. Perfect.

**Conclusion:** Fuel management system is running perfectly. The MPG decline is not electronic/sensor-related. Leading actionable suspect is now exhaust manifold gasket leak based on raw fuel smell in first 15 seconds of cold start.

## Next Steps
1. **Confirm exhaust manifold leak** — cold start, pop hood, listen for ticking/hissing from manifolds in first 30 seconds
2. **If confirmed** — get shop quotes for manifold gasket replacement + spark plugs as a bundle
3. **Monitor Bank 2 catalyst** — rescan in 3-6 months, track whether margin continues to shrink

## Notes
- Already swapped to a simpler roof rack for MPG improvement (separate project)
- 2006 4Runner (4th gen V8) is inherently not a fuel-efficient vehicle — realistic expectations matter
- Seattle's hilly terrain and short trips compound the cold-start penalty
- Spreadsheet shows 11.5 MPG average over ownership — cold-start + city driving + hills
- Jim Startup's visit (2026-04-29) logged in Google Sheet — timing belt bundle + 5th gen front brake swap done
- OBDLink MX+ purchased 2026-06-11 ($139.95) — first scan completed same day
