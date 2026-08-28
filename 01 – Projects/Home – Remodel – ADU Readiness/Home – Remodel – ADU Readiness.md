---
type: project
area: Home
parent: "[[Home – Remodel – Finish]]"
status: active
due:
energy:
created: 2026-03-31
todoist-project-id: 6fR75W7pvJMhwQ3x
todoist-section-id: 6h5CgCJXCrwP5QqQ
next-review: 2026-06-12
---

# Home – Remodel – ADU Readiness

> **Parent project:** [[Home – Remodel – Finish]]

## Definition of Done
The basement/ADU is physically rentable.

## Next Actions

### This Weekend
- [x] Clear out back room (make usable / photo-ready)
- [x] Clear clutter from rest of basement

### Soon
- [ ] Complete furnishing/inventory audit — answer open questions (rental model, BR1 status, appliances, laundry) then build shopping list ([[Furnishing Inventory Audit]])
- [x] Tim: stain and install basement/ADU railings (code requirement) — do at same time as main stairwell handrail (see [[Home – Remodel – Finish]] › Stairwell)
- [ ] Get ADU RRIO permit from the city (Sara handling, snail's pace)
- [x] Figure out basement dining chairs (existing chairs going upstairs)
- [x] Swap art — nice stuff upstairs, less nice stuff downstairs
- [x] Heated floor thermostats: **DECIDED — keep floors, don't disable.** Bought **2× Schluter DITRA-HEAT-E-WiFi (RS1)** thermostats.
	- [ ] Install + configure: set **max floor-temp limit = 80°F** + keypad/range lockout so a tenant can't override the config. Set up the WiFi/app for remote management.
	- Zones: bathroom + kitchen, ~250 sq ft total (comfort/supplemental, not primary heat).
	- Cost analysis (Seattle @ $0.12/kWh, 12 W/sq ft): 80°F cap ≈ **~$35/mo peak winter**, ~$0 in warm months, ~$100–150/yr.
	- ⚠️ Confirms it's a **Schluter DITRA-HEAT** system → floor sensor should already be run. Verify sensor at each thermostat location during install.
- [ ] ~~Find a sound bar (+ maybe subwoofer) for basement TV~~ — **dropped, TV has built-in audio**
- [x] Move all Sonos gear upstairs to main house
- [ ] Touch up paint in a few places
- [x] Move remaining personal items upstairs
- [ ] Keep main-bedroom combo in place (gas water heater accessed through bedroom → CO required in-room)
- [x] Buy + install 1 Kidde FireX CUAC10YFEX combo in the common area (gas fireplace + outside sleeping areas)
- [x] Relocate the displaced common-area smoke unit to the stairwell (no purchase needed)
- [ ] **Required (diligence):** Buy Airthings View Plus (~$300) — radon test *before listing* (basement = higher risk) + air quality (PM2.5/VOC/CO₂/humidity). If radon >4 pCi/L, plan mitigation
- [ ] Verify gas water heater in bedroom-access closet meets combustion-air/sealed-closet code (GC). See [[Furnishing Inventory Audit]]
- [x] Install door hardware for top of stairs
- [x] Add insulation/soundproofing to basement-to-main-floor door
- [ ] Make key copies for entryway
- [x] Buy blinds — 2" cordless white faux wood, HD/Lowe's cut-to-width (5 stock + 1 custom for narrow Office West as fallback). Decided; backlog post-IKEA. See [[Blinds Research]]
- [ ] Install blinds — **all hung EXCEPT the secondary-bedroom (BR2) window**
- [ ] Set up digital lock — **rental model is hybrid (short + mid-term) → smart lock REQUIRED.** See "Hybrid Rental Model" note below
- [ ] Take listing photos
- [x] IKEA stock-up run — see [[IKEA Run]] (low-analysis "Both" kitchen/linen/bath/utility items)
- [ ] Water leak sensors — **Third Reality 4-pack PURCHASED, not yet installed.** Place at heater pan, laundry, under vanity/kitchen sink; tie into HA. Low priority
	- [ ] **Two threat models, two responses:** (A) supply leaks → Zigbee spot sensors + optional supply auto-shutoff; (B) sewer backflow → the backwater valve + a floor-drain/cleanout float alarm (HA-integrated) as early warning. Supply shutoff does NOT protect against sewer backup.
	- [ ] **DECIDED — supply sensors: Third Reality Zigbee Leak 4-pack** (B09XDP2LZF, pairs to Zigbee2MQTT). 120 dB onboard siren so a tenant-present hears it AND it reports to HA. Heater pan, laundry, under vanity, kitchen sink. Chose over Aqara (silent, HA-only) and Sonoff SNZB-05P.
	- [ ] Highest-value single add: Zigbee/WiFi float alarm in the floor drain/cleanout → alerts remotely while tenanted, covers both a valve failure AND the "own wastewater trapped behind a closed valve" case. Options: Blackwater Alert (~$150) or Sump Alarm WiFi septic/sewage float (B0C821SFPX, ~$150).
- [ ] **Identify backwater valve model** — photo the access cover / read the nameplate. Determines: (1) whether it has a manual gate you can force shut vs. plain passive flapper, (2) what the annual inspection involves. Caveat: forcing it shut also traps the ADU's own wastewater — vacant-unit / no-water-use tool only.
- [ ] Build a lightweight ADU maintenance schedule — recurring annual items: (1) backwater/backflow valve flapper inspection (contractor says low-maintenance; manufacturers still recommend an annual look); (2) fire extinguisher check — pressure gauge in the green + within shelf life (~10–12 yr disposable). Migrate to the Rental Property area as recurring responsibilities once the unit is live
- [ ] Security sensors — hybrid model leans **YES on cheap Zigbee window open/close** (vacant-between-guests awareness, easy HA add); **skip glass-break** (niche)

### Furnish Second Bedroom (~$1,600 budget)
Decision: second bedroom over office — higher rental rate across all models (Airbnb, corporate, travel nurse). Payback: 5 weeks (Airbnb) to 3 months (corporate housing).
- [x] Buy queen bed frame + mattress (Amazon: B0CKYZNGM8 + B075FBJXZ7)
- [x] Buy dresser (IKEA BRIMNES 4-drawer, black)
- [x] Buy 2 nightstands (IKEA GRAFJÄLLET, anthracite) — one per bedroom
- [x] Buy clothes rack w/ shoe storage (IKEA GRAFJÄLLET) for BR2 closet
- [x] Buy lamps — already have two table lamps
- [x] Buy bedding set (~$100–160)
- [x] Assemble and stage room

### Install / Setup (bought, needs doing)
- [ ] Install fire extinguisher (purchased) — mount in kitchen/common area
- [ ] Install first aid kit (purchased) — mount/place in kitchen
- [ ] Set up coffee maker (purchased) — place + test
- [ ] Buy baking sheet + baking dish (~$25) — still needed
- [ ] ~~2 bedroom wastebaskets + broom/mop~~ — **dropped, not doing**

### Completed
- [x] AC Control (Faikin install)
- [x] Sconces / ADU lighting

## Hybrid Rental Model (decided 2026-08-09)
**Model: hybrid / experimental** — mix short-term (Airbnb) + mid-term (traveling nurses via Furnished Finder, ~30–90 day). Try it, see what fills. The furnished unit already works for all models, so staging doesn't change. What the hybrid model *does* change:

**Resolves (was pending):**
- **Digital lock → REQUIRED.** Any short-term/self-check-in component needs a smart lock with rotating codes. Decision flips from "investigate" to "buy + install."
- **Security sensors → cheap Zigbee window open/close = YES** (vacant-between-guests awareness). Skip glass-break.

**New items the hybrid model surfaces (VERIFY — Seattle-specific, confirm before relying on):**
- **Seattle Short-Term Rental (STR) operator's license** — required for any stay <30 nights. Separate from RRIO. Also needs a Seattle business license tax certificate; regulatory license # must appear on the listing.
- **RRIO still applies** to the 30+ day (tenancy) stays — WA Landlord-Tenant Act governs those. Hybrid = potentially BOTH regimes.
- **Short-term rental insurance** — landlord policy + STR endorsement / host protection.
- **Lodging/occupancy tax** — Airbnb typically auto-collects & remits WA + Seattle; direct/Furnished Finder bookings you'd owe yourself. Track by channel.
- **Turnover/cleaning plan** — line up a cleaner + linen par levels + consumables restock for the short-term side.

## Notes
- **Tonight's IKEA cart:** [[IKEA Run]]
- **Amazon list:** [[Amazon List]]
- Window measurements and blinds research: [[Blinds Research]]
- Full furnishing/inventory audit (what a rentable unit needs, by model): [[Furnishing Inventory Audit]]
- Prioritized, budgeted shopping list (per model): [[Shopping List]]
