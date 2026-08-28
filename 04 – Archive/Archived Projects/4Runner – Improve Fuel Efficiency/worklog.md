# Worklog — 4Runner – Improve Fuel Efficiency

## 2026-06-10 — Project creation and cold-start diagnosis

### Situation
- Jonathan noticed that when he starts his 4Runner in the morning, the digital MPG readout drops by ~2 MPG, which felt excessive
- He wanted to understand why and create a project to improve overall fuel efficiency

### What Jonathan Said
- "When I start my Forerunner, my miles per gallon just drops off on the digital readout by two miles per gallon or so"
- "That seems absolutely ludicrous"
- Called it "Forerunner" (means 4Runner)

### Approach & Rationale
- Explained the cold-start MPG drop: rich fuel mixture, high idle RPM, cold oil friction, and how the digital readout amplifies the effect
- Framed ~2 MPG as actually within normal range (~10-12% of typical 4Runner fuel economy)
- Created a checklist of actionable improvements to investigate beyond the cold-start issue

### Outputs & State
- `4Runner – Improve Fuel Efficiency.md` — created, includes diagnosis and improvement checklist

### Next Steps
- ~~Jonathan to confirm whether the MPG drop recovers after ~5-10 min of driving~~ → Resolved via OBD scan
- ~~Work through the improvement checklist starting with easiest wins~~ → Resolved via OBD scan

---

## 2026-06-10 to 2026-06-11 — Maintenance log canonicalization + OBD diagnostics

### Situation
- Jonathan revealed the MPG decline is ~3 MPG over the life of ownership, not just cold-start
- Shared Google Sheet with full maintenance history across multiple tabs
- Had recent work at Jim Startup's (timing belt bundle + 5th gen brake swap) not yet documented
- Bought OBDLink MX+ ($139.95) and ran first diagnostic scan same day

### What Jonathan Said
- "I've seen the MPG go down by at least 3 miles per gallon on average over the lifespan of the car as I've had it"
- "I drive like an asshole and while I should be better ... nosce te ipsum" (on front brake pad interval)
- "I can't stress this one off when I start my car after a little while I was walking so that's your fucking gasoline for the first few feet off the line"
- "I can literally smell the gas that's clearly unspent fuel that's got to be inefficient. that's got to be something broken no?" — this was the key insight that shifted the diagnosis
- On the Fiat tab: "I don't have the fiat anymore"
- Steering stops: "I haven't had any turning clunk at the extremes issues in a very long time"

### Approach & Rationale
- Fetched and parsed full Google Sheet (all tabs, including extracting Dropbox receipt URLs from xlsx hyperlinks)
- Cross-referenced maintenance history against 175k mile service intervals
- Initially identified spark plugs, O2 sensors, fuel injectors as top suspects
- Agreed on revised intervals: spark plugs 60k→90k, front calipers 35k→100k, front rotors 35k→55k, front pads stay 35k, steering stops removed
- Added missing schedule classes: O2 sensors, fuel injectors, air filters, coolant flush
- Updated Health Tracker resource with receipt links, financial data (commute costs, speed/MPG curve), and Jim Startup's visit
- OBD scan eliminated O2 sensors, fuel injectors, and spark plugs as causes — all readings textbook perfect
- Raw fuel smell in first 15 seconds + cabin penetration pointed to exhaust manifold gasket leak as the leading actionable suspect

### Source Material Used
- Google Sheet: 4Runner History tab (full service log with new Parts/Part Cost columns)
- Google Sheet: 4Runner Schedule tab (interval tracking)
- Google Sheet: Mileage Tradeoffs + Mileage Calculator tabs (removed by Jonathan, data preserved in Health Tracker)
- Jim Startup's receipt (Dropbox): 2026-04-29, $1,428.70, 175,500 miles
- OBDLink diagnostic report: `Diagnostic_Report_20260611_221542.html`
- Archived projects: 4Runner – Upgrade Brake System, 4Runner – Replace timing belt and cam seals

### Key Decisions
- PARA Health Tracker is now the canonical maintenance record; Google Sheet is the financial calculator
- Crankshaft seal was not done at Jim Startup's (confirmed via receipt + reasoning about difficulty)
- Brake fluid counted as done with caliper swap (2026-04-29) since you can't install new calipers without bleeding
- Steering stops removed from maintenance schedule — issue resolved by Bilstein suspension replacement
- O2 sensors, fuel injectors, spark plugs ruled out as MPG suspects via OBD data — do NOT replace preemptively

### Outputs & State
- `4Runner – Improve Fuel Efficiency.md` — fully updated with OBD findings, exhaust manifold gasket as leading suspect
- `03 – Resources/Vehicles/4Runner Health Tracker.md` — updated with revised intervals, receipt links, financial data, Jim Startup's visit context, new maintenance classes
- Worklog — updated

### Resolution
- OBD scan proved the engine is running perfectly — fuel trims at 0%, zero misfires, all sensors healthy
- 3 MPG decline is cumulative age-related wear across dozens of systems, not a single fixable cause
- Exhaust manifold gasket leak suspected (raw fuel smell in first 15 sec, cabin penetration) but Jonathan decided $400-600 fix for ~0.3 MPG isn't worth it right now
- Bank 2 catalyst barely passing (1.2% margin) — quarterly OBD rescan added to Vehicles area recurring responsibilities
- Jonathan's verdict: "tip top, just thirsty" — project paused, no further investment planned

### Remaining items for next session
- Health Tracker service history table still needs Jim Startup's 2026-04-29 visit added (10 line items)
- Spreadsheet schedule tab still has some stale intervals (Jonathan was updating it live during session)
- 2026-06-11 22:47 -- `4Runner – Improve Fuel Efficiency.md` via Edit
- 2026-06-11 22:53 -- `4Runner – Improve Fuel Efficiency.md` via Edit
- 2026-07-12 17:14 -- `4Runner – Improve Fuel Efficiency.md` via Edit
