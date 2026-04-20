# HVAC Automation — Home Assistant Integration
*claude.md — AI context file for project continuity*
*Last updated: 2026-03-25 (v5 — weather integration, Natural Ventilation Mode state machine, skylight-as-sensor logic)*

---

## Project goal

Build a centralized, seasonally-aware Home Assistant automation layer across all 7 Daikin mini-split zones in Jonathan's Tudor Revival home in Capitol Hill, Seattle. All units are Daikin WVJU9 series connected via Faikin S21 adapters, exposing full bidirectional control and telemetry to Home Assistant over local WiFi (no cloud).

Outcome: a single ruleset that manages mode, setpoint, fan behavior, presence-based economy, and Natural Ventilation Mode across all zones — with per-zone comfort preferences for Jonathan vs. Wan Ting, a Tenant Mode that isolates the ADU, and a Natural Ventilation Mode (NVM) that coordinates skylights, windows, weather, and HVAC intelligently.

---

## The house

**Address:** Capitol Hill, Seattle, WA 98112
**Structure:** Tudor Revival, 3 floors + basement ADU (~3000 sqft total, ADU ~1000 sqft)
**Exterior:** Brick construction — no new penetrations without significant masonry work
**Network:** Ubiquiti Unifi, local MQTT broker, Zigbee2MQTT, Home Assistant

---

## Compressor topology

Two compressors, each spanning exactly two floors, overlapping on the main floor.

### Compressor A — Daikin 3MXL24WMVJU9 (3-zone)
**Floors served:** Basement ADU + Main Floor

| Zone | Model | Type | Hostname | Status |
|---|---|---|---|---|
| Main Floor — Study | CTXS07WVJU9 | Wall mount | TBD | ✅ Operational, ⬜ Faikin pending |
| Basement ADU — Living Room | FTXS12WVJU9 | Wall mount | `adu-living-room-hvac-controller.local` | ✅ Faikin live |
| Basement ADU — Bedroom | CTXS07WVJU9 | Wall mount | `adu-bedroom-hvac-controller.local` | ✅ Faikin live |

### Compressor B — Daikin 4MXL36WVJU9 (4-zone)
**Floors served:** Main Floor + Top Floor

| Zone | Model | Type | Hostname | Status |
|---|---|---|---|---|
| Main Floor — Kitchen | FVXS09WVJU9 | Floor mount | `kitchen-hvac-controller.local` | ✅ Faikin live |
| Main Floor — Dining Room | FVXS09WVJU9 | Floor mount | TBD | ✅ Operational, ⬜ Faikin pending |
| Main Floor — Living Room | FVXS09WVJU9 | Floor mount | TBD | ✅ Operational, ⬜ Faikin pending |
| Top Floor — All rooms (ducted) | FDMQ18WVJU9 | Attic mounted | TBD | ✅ Operational, ⬜ HA integration pending — P1P2 protocol (no S21) |

**3 of 7 units have Faikin. All 7 units are operational.**

---

## All 7 HVAC units summary

| Zone | Model | Compressor | Hostname | Faikin |
|---|---|---|---|---|
| ADU Bedroom | CTXS07WVJU9 | A (3MXL24) | `adu-bedroom-hvac-controller.local` | ✅ |
| ADU Living Room | FTXS12WVJU9 | A (3MXL24) | `adu-living-room-hvac-controller.local` | ✅ |
| Main Floor Study | CTXS07WVJU9 | A (3MXL24) | TBD | ⬜ |
| Main Floor Kitchen | FVXS09WVJU9 | B (4MXL36) | `kitchen-hvac-controller.local` | ✅ |
| Main Floor Dining Room | FVXS09WVJU9 | B (4MXL36) | TBD | ⬜ |
| Main Floor Living Room | FVXS09WVJU9 | B (4MXL36) | TBD | ⬜ |
| Top Floor All rooms (ducted) | FDMQ18WVJU9 | B (4MXL36) | TBD | ⬜ (P1P2, not S21 — Faikin incompatible) |

### Unit notes
- CTXS07: cross-flow fan, max ~1120 RPM observed in auto
- FTXS12: wall mount, 12k BTU — primary ADU unit
- FVXS09: turbo fan, airflow H/M/L/SL = 290/230/169/145 cfm, fan motor 12W
- FDMQ18: attic-mounted ducted, fan motor 230W — most critical unit, fighting 5 Velux skylights
- 6 of 7 units have S21 ports. The FDMQ18 uses **P1P2 protocol** (2-wire screw terminal), not S21. Daikin explicitly excludes FDMQ and FFQ from S21. No adapter (KRP067A41 etc.) adds S21 to the FDMQ.
- Faikin chosen for all 6 S21 units. FDMQ18 requires a separate P1P2-compatible solution.
- BRC1H wired controller compatible alongside Faikin on S21 units; connects via P1P2 on the FDMQ18

### FDMQ18WVJU9 connectivity options (P1P2 unit)

The FDMQ18 is Daikin's concealed duct type — it uses the P1P2 two-wire bus protocol, shared with VRV and SkyAir units. No native S21.

**Constraints:** Must be local-only (no cloud), no app required for setup, available in the US.

#### Shortlisted options

| Option | Interface | HA Integration | Setup | Est. Cost | Notes |
|---|---|---|---|---|---|
| **Greg Davill daikin-esp** | P1P2 (2-wire) | ESPHome (fully local) | Order PCBs from JLCPCB, flash ESPHome via USB, configure via YAML | ~$25–35/unit | Open-source (KiCad + Gerbers). ESP32-C3 + MAX22088 transceiver. Bus-powered. Best architectural fit. |
| **Daikin DKN Plus (AZAI6WSPDKC)** | P1P2 | Modbus RTU → HA Modbus integration | Wire RS-485 adapter (~$20), configure Modbus registers in HA | ~$345 | Commercial, confirmed FDMQ compatible. No app, no cloud. US retail available. |

#### Ruled out

| Option | Reason |
|---|---|
| P1P2MQTT (Arnold Niessen) | Cannot import into USA — confirmed with developer |
| Daikin DKN Cloud (AZAI6WSCDKA) | Cloud-only, no local API |
| Daikin One+ (DTST-ONE-ADA-A) | Cloud-dependent, requires app |
| Airzone Aidoo Pro | May require app for bootstrap — unconfirmed, FDMQ P1P2 compatibility also unconfirmed |
| Intesis IN485DAI001R000 | ~$389+, overkill for single residential unit |
| CoolAutomation CoolMaster | Commercial VRF product, opaque pricing |
| Legacy P1P2MQTT Arduino HAT (MM1192) | MM1192/XL1192 chips not available from US suppliers |

#### Key references
- Greg Davill daikin-esp: https://github.com/gregdavill/daikin-esp
- Greg Davill writeup: https://gregdavill.com/posts/daikin-esp-001/
- MAX22088 transceiver: available from DigiKey and Mouser (US stock)
- DKN Plus: available from Total Home Supply, Sylvane, AC Direct

---

## Faikin details

**Hardware:** Faikout-S3-MINI-N4-R2
**Firmware:** 54756b57, built 2026-01-18T12:18:34
**Interface:** Local HTTP API via hostname (NOT MQTT — using native Daikin HA integration)
**Product page:** https://www.faikin.au/products/faikin-wifi-controller
**S21 note:** 5-pin JST connector inside the electrical box on each S21 unit, labeled S21 on PCB silkscreen (6 of 7 units — FDMQ18 uses P1P2 instead)
**HA integration:** Daikin AC integration, 3 devices × 6 entities each (climate, temp, humidity, liquid temp, outside temp, fan RPM)

### S21 telemetry available (confirmed on live units)
- Home temp (room thermistor)
- Humidity
- Liquid line temp
- Outside temp (from outdoor unit via Daikin protocol)
- Fan RPM
- Mode, setpoint, fan speed step

---

## Weather integration

Natural Ventilation Mode (NVM) requires two complementary weather data sources. Using both provides forecast-based proactive decisions AND real-time ground truth.

### Source 1 — Open-Meteo (forecast)
- Free, no API key, built into HA natively
- Provides: current conditions, hourly forecast, precipitation probability
- Use for: proactive decisions ("don't start NVM if rain forecast in next 2 hours")
- Setup: enable via HA Settings → Integrations → Open-Meteo

### Source 2 — Physical rain sensor (ground truth)
- A dedicated Zigbee rain sensor mounted on the exterior
- Provides: actual precipitation at this specific location right now
- Use for: immediate emergency triggers ("rain is falling NOW → close everything")
- Seattle rain is hyper-local — a weather API may lag or miss light drizzle
- Suggested hardware: Ecowitt rain sensor with Zigbee gateway, or similar
- Integrates via Zigbee2MQTT into HA as a binary wet/dry sensor

### Decision logic combining both sources
- **Forecast says rain in 2 hours:** don't start NVM, stay in HVAC mode
- **Forecast clear but physical sensor detects rain:** immediate close — ground truth wins
- **Physical sensor triggers close:** this IS the rain event, regardless of forecast
- **Velux skylight closes on its own:** also treated as rain ground truth (see skylight state machine below)

---

## Velux skylights — fully integrated in HA

**5x Velux Solar Powered Fresh Air Skylights** — all on top floor, all in FDMQ18 zone
**Integration:** HomeKit Device via Velux KIX 300 gateway (Netatmo), already live in HA
**Each skylight has two entities:** VELUX Window (open/close) + VELUX Internal Cover (blind position)

| Device | Area | Notes |
|---|---|---|
| Kids' Bathroom Skylight + Blind | Kids' Bathroom | |
| Kids' Bedroom Skylight + Blind | Kids' Bedroom | |
| Kids' Closet NW Skylight + Blind | Kids' Closet | |
| Kids' Closet SW Skylight + Blind | Kids' Closet | |
| Primary Bedroom Skylight + Blind | Primary Bedroom | Large — major solar/heat loss impact |
| Stairwell Skylight | [ADU] Stairwell* | **Most critical — stack effect exhaust** |
| VELUX Gateway | Kids' Closet | |

*Area label "[ADU] Stairwell" is a misnomer — thermally part of main/top floor zone. Rename to "Main Stairwell" in HA.

### Skylights as sensors — state machine

The Velux skylights have built-in rain sensors. Their state changes are information, not just commands. HA must distinguish between closes it commanded vs. closes the skylight initiated itself.

**Skylight state meanings:**

| State | Meaning | Action |
|---|---|---|
| Open (commanded by HA) | NVM running normally | Continue |
| Closes unexpectedly during NVM | Rain detected at roof — ground truth | Emergency close all, notify open windows, resume HVAC |
| Refuses to open when commanded | Rain sensor active or fault | NVM unavailable, stay in HVAC, notify "NVM unavailable" |
| Closed and not opening | Stack exhaust blocked | Do not start NVM, do not notify to open windows |

**Key insight:** if the stairwell skylight won't open or closes on its own, the entire Natural Ventilation Mode stack is broken — there is no exhaust. NVM must not run without confirmed stairwell skylight open.

### Blind automation logic
- Winter nights: close blinds to reduce heat loss
- Winter days: open blinds for solar gain
- Summer peak sun hours: close blinds to block solar gain
- Natural Ventilation Mode: open blinds to maximize airflow through open skylights

---

## FDMQ18 vent map (top floor)

8 vents total from one 18k BTU attic-mounted unit:

| Room | Vents | Notes |
|---|---|---|
| Primary Bedroom | 2 | Cal King room — 2 skylights nearby |
| Primary Bath | 1 | |
| Primary Closet | 1 | |
| Hallway/stair area | 1 | Wall mounted |
| Hallway/landing | 1 | **Ceiling mounted** — throws air downward |
| Kids Bedroom | 1 | 1 skylight nearby |
| Kids Bath | 1 | 1 skylight nearby |

---

## Natural Ventilation Mode (NVM)

Natural Ventilation Mode uses the house's passive stack effect to cool the house without running HVAC. Cool outside air enters through west-facing windows at main floor level, rises through the stairwell, and exhausts through the Velux stairwell skylight at the top. The Hornbeam tree canopy cools the inlet air further on summer evenings.

### Pre-conditions (all must be true to start NVM)
- Outside temp < inside temp (any live Faikin thermistor)
- Outside temp < 18°C
- Open-Meteo forecast: no rain in next 2 hours
- Physical rain sensor: dry
- Time: after 6pm, before midnight
- Season: May–September
- Stairwell skylight: available (not blocked by rain sensor)

### NVM startup sequence
1. Attempt to open stairwell skylight
2. Wait 60 seconds
3. **Check: did stairwell skylight actually open?**
   - YES → continue to step 4
   - NO → skylight blocked (rain or fault) → abort NVM, notify "Natural Ventilation Mode unavailable — stairwell skylight blocked", stay in HVAC
4. Open remaining strategic Velux skylights
5. Open Velux blinds to maximize airflow
6. Switch all HVAC zones to fan-only or off
7. Send notification: "💨 Natural Ventilation Mode active — open west-facing windows when ready"
8. Window contact sensors confirm inlets open → NVM fully confirmed active
9. In owner-occupied mode: secondary notification to open ADU basement windows for ground-cooled air

### NVM monitoring (while active)
Every 5 minutes check:
- Any skylight closed unexpectedly? → Rain event (see emergency close)
- Physical rain sensor triggered? → Rain event (see emergency close)
- Open-Meteo showing precipitation? → Rain event (see emergency close)
- Outside temp > inside temp? → Conditions no longer favorable, end NVM gracefully
- Time past midnight? → End NVM gracefully

### NVM emergency close (rain detected)
Triggered by: unexpected skylight close OR physical rain sensor OR Open-Meteo precipitation > 0

1. Close ALL Velux skylights immediately
2. Close ALL Velux blinds
3. Resume HVAC in previous mode
4. Check window contact sensors
5. If ANY windows show open → send URGENT notification:
   **"🌧️ Rain detected — windows are open! Close immediately: [list open rooms]"**
6. Log event: "NVM ended — rain event. Source: [skylight/sensor/forecast]"

### NVM graceful end (conditions no longer favorable)
1. Close Velux skylights
2. Close Velux blinds
3. Resume HVAC
4. Send notification: "Natural Ventilation Mode ended — conditions changed. HVAC resumed."
5. If windows still open → gentle reminder: "💨 Windows still open — HVAC now running"

### NVM notification tiers
| Event | Priority | Message |
|---|---|---|
| NVM starting | ℹ️ Info | "💨 Natural Ventilation Mode active — open west windows when ready" |
| Skylight blocked | ℹ️ Info | "Natural Ventilation Mode unavailable — stairwell skylight blocked" |
| NVM ended gracefully | ℹ️ Info | "Natural Ventilation Mode ended. HVAC resumed." |
| Rain detected, no open windows | ⚠️ Warning | "🌧️ Rain detected — skylights closed" |
| Rain detected, windows open | 🚨 Urgent | "🌧️ Rain detected — close windows NOW: [rooms]" |

---

## Stairwell thermal boundary — critical for automation

**Physical layout:**
- Two stairwells stacked vertically
- Top stairwell: Main Floor ↔ Top Floor — always open, air flows freely
- Bottom stairwell: Main Floor ↔ ADU Basement — separated by a door

**The boundary door:**
- Locked when ADU is tenanted — ADU is thermally isolated from main house
- Open in owner-occupied mode — ADU and main house form one air mass
- Stair treads are solid (no void between treads) — limits convection even when door is open
- Stairwell skylight has zero thermal impact on ADU even when door is open — it is two floors above

**For automation:** SONOFF SNZB-04P contact sensor on this door is a primary mode switch. Door closed = two separate thermal zones. Door open = one unified zone for NVM purposes (basement ground-cooled air becomes available as inlet).

---

## Thermal envelope — passive assets

### Tree canopy (deciduous — ideal passive solar behavior)
- **West/Northwest — Common Hornbeam row** (Carpinus betulus 'Fastigiata', 25" diameter, ~40-50ft tall): Massive canopy shades entire west-facing approach and yard in summer. Both floors benefit. Drops leaves in winter — allows low winter sun. SDOT owned (TRE-46779).
- **Southwest — Saucer Magnolia** (Magnolia × soulangeana, pink flowers): Deciduous, shades southwest corner in summer, transparent in winter.
- **Northeast — neighbor's ash** (unidentified, not on city inventory): Deciduous, shades morning sun on northeast corner.

### Thermal implications by floor
- **Main floor west/southwest:** Heavily shaded by Hornbeams + Magnolia in summer — FVXS09 units have natural allies, need less cooling capacity than raw BTU numbers suggest
- **Top floor:** Above most canopy influence — FDMQ18 fights unshaded solar load in summer that main floor units largely don't see. Skylights compound this significantly.
- **NVM inlet air:** Hornbeam microclimate cools west-facing yard air noticeably below ambient weather station readings — makes NVM more effective than weather data alone suggests

### Stack effect characteristics
- **Height differential:** ~25-30 feet from basement windows to stairwell skylight — exceptional
- **Source air (owner-occupied):** ground-cooled basement air (~10-13°C year round from soil mass)
- **Source air (tenanted):** west-facing main floor windows through Hornbeam microclimate
- **Exhaust:** stairwell skylight — must be confirmed open before NVM activates

---

## Window & door sensors

**Chosen sensor:** SONOFF SNZB-04P
- Native Zigbee — works directly with Zigbee2MQTT, no additional hub
- Dark gray housing — paint with matte black appliance paint for Marvin frames
- CR2032 battery, 1-2 year life, ~$8-10 each
- Mount with 3M adhesive — no drilling, no Marvin modification
- **Note:** Marvin Elevate windows do not have factory LSS — was not ordered. Aftermarket sensors are the correct solution.
- **Note:** No new wall penetrations — brick exterior, passive stack with existing skylights is the chosen approach

**Planned sensor locations:**

| Location | Purpose |
|---|---|
| West-facing Living Room window(s) | NVM inlet detection |
| West-facing Kitchen window | NVM inlet detection |
| West-facing Dining Room window | NVM inlet detection |
| ADU stairwell boundary door | **Primary thermal zone mode switch** |
| Front door | Presence/arrival, eco mode trigger |
| Back door | Presence/arrival, eco mode trigger |
| ADU entry door | Tenant presence detection |

---

## ADU room inventory

| Room | Conditioned | Unit |
|---|---|---|
| Bedroom | ✅ | CTXS07WVJU9 — Compressor A (secondary) |
| Living Room | ✅ | FTXS12WVJU9 — Compressor A (primary) |
| Kitchen | ❌ | Unconditioned |
| Dining Room | ❌ | Unconditioned |
| Bath | ❌ | Unconditioned |
| Office | ❌ | Unconditioned |

ADU is ~1000 sqft open plan. FTXS12 Living Room is sufficient for whole ADU at typical Seattle winter temps.

---

## Comfort preferences

| Person | Preferred temp | Notes |
|---|---|---|
| Jonathan | 21–23°C | Runs warm |
| Wan Ting | 23–25°C | From Singapore, prefers warmer |

**Negotiated default setpoint:** 23°C
**Fan preference:** Auto fan + Auto temp ±1°C — smooth, non-surging. Wan Ting dislikes hard fan surges.

---

## Seasonal mode logic

**Core principle:** lock mode seasonally. Auto mode year-round causes uncomfortable dead-band cool air blasts in winter.

| Period | Mode | Rationale |
|---|---|---|
| Nov–Apr | Heat | Outside reliably cold |
| May, Oct | Auto | Shoulder season, genuinely ambiguous |
| Jun–Sep | Cool | Outside reliably warm |

**Preferred trigger — outside temp via S21:**
- Outside > 18°C sustained 3+ hours → switch to Auto
- Outside < 12°C sustained 3+ hours → switch to Heat
- Otherwise hold current mode

---

## Per-unit recommended config (current season: Heat)

- **Mode:** Heat (not Auto until May)
- **Fan:** Auto
- **Auto temp:** On, ±1°C
- **Vertical swing:** Auto
- **Horizontal swing:** On where available
- **Night mode:** Consider 10pm–7am for bedroom zones

---

## Key automation concepts

### Compressor-aware coordination
- Never run all zones on a single compressor simultaneously at full blast
- Stagger startup 5–10 min between zones per compressor on cold morning starts
- Main floor is thermal overlap — Study (Compressor A) and Kitchen/Dining/Living (Compressor B) can work against each other if running conflicting modes

### ADU coordination (~1000 sqft open plan)
- FTXS12 Living Room (12k BTU) = **primary** — runs normally
- CTXS07 Bedroom (7k BTU) = **secondary** — only when bedroom door is closed, or outside < 2°C
- Never run both simultaneously with open floor plan — causes ping-pong overshoot
- Observed 2026-03-25: both units pushed home temp to 27.5°C against 24°C setpoint

### Skylight-aware top floor logic
- FDMQ18 ramps up proactively at sunset in winter — doesn't wait for temp drop after the fact
- Coordinate Velux blinds: close at sunset in winter, close during peak sun in summer
- Open skylights in NVM for free cooling (subject to NVM state machine)

### Presence-based eco mode
- Phone device tracking for Jonathan + Wan Ting
- Drop all zones to eco setpoints when both away
- Resume normal setpoints 30 min before expected return
- Front/back door contact sensors as secondary presence confirmation

### Stairwell door mode switching
- SNZB-04P on boundary door between main house and ADU stairwell
- Door closed → ADU thermal isolation mode (Tenant Mode logic applies, no basement air for NVM)
- Door open → unified house mode, basement ground-cooled air available as NVM inlet

---

## Tenant Mode

**Context:** ADU will eventually be rented. Tenants control ADU Bedroom + ADU Living Room (Compressor A). Study (main floor) also on Compressor A.

**HA implementation — `input_boolean.tenant_mode`:**
- **ON:** removes ADU units from global automation; optionally turns Study off if conflicting mode detected; NVM uses main floor windows only (no basement inlet)
- **OFF:** ADU units rejoin global automation; basement inlet available for NVM

**Jonathan's preference:** would rather manually turn Study off if needed rather than fight tenants.
**Lease consideration:** ~19k BTU total for ~1000 sqft. Consider reasonable use clause.

---

## Automation backlog

**Infrastructure (do first):**
- [ ] Install Faikin on 3 remaining S21 units (Study, Dining Room, Living Room)
- [ ] FDMQ18: choose between Greg Davill daikin-esp (DIY, ~$35) or Daikin DKN Plus AZAI6WSPDKC (commercial, ~$345), then access attic and install
- [ ] Assign hostnames for all remaining Faikin units
- [ ] Enable Open-Meteo integration in HA
- [ ] Install physical Zigbee rain sensor on exterior
- [ ] Install SNZB-04P sensors (paint black first): stairwell door, west windows, front door, back door, ADU entry
- [ ] Rename "[ADU] Stairwell" area to "Main Stairwell" in HA
- [ ] Integrate all 7 units into HA climate entities

**Core automations:**
- [ ] Global seasonal mode switch (outside temp trigger via S21)
- [ ] Per-zone setpoint profiles (Jonathan vs. Wan Ting zones)
- [ ] ADU primary/secondary coordination (FTXS12 primary, CTXS07 secondary)
- [ ] Compressor-aware staggered startup
- [ ] Unit unavailability alerts
- [ ] Runtime logging per zone (short cycling detection)

**Natural Ventilation Mode automations:**
- [ ] NVM pre-condition checker (temp delta, forecast, rain sensor, time, season)
- [ ] NVM startup sequence (skylight open → confirm → windows notification)
- [ ] NVM monitoring loop (5-min check cycle)
- [ ] NVM emergency close (rain event from any source)
- [ ] NVM graceful end (conditions changed)
- [ ] Skylight unexpected-close detector (distinguishes commanded vs. rain-triggered)
- [ ] Velux blind seasonal logic (winter night close, summer peak sun close, NVM open)

**Advanced automations:**
- [ ] FDMQ18 sunset ramp logic (proactive top floor heating)
- [ ] Tenant Mode toggle (`input_boolean.tenant_mode`)
- [ ] Stairwell door → thermal zone mode switch
- [ ] Presence-based eco mode (phone + door sensors)

**Dashboard:**
- [ ] Lovelace dashboard — all 7 zones grouped by compressor, skylight states, window sensor states, outside temp, NVM status, rain status

---

## Incident log

**2026-03-25 — ADU Bedroom CTXS07 dead unit**
- Cause: spark during removal of Daikin BRP WiFi module from PCB
- Scorched blue rubber boot on FU1 confirmed arc event
- Resolution: unit recovered after breaker reset — protection circuit latch, fuses likely intact
- Action: 5x Divine Lighting T3.15A 250V 5x20mm ceramic fuses ordered (Amazon overnight)
- Replace FU1 and FU2 preventively — spring clip holders, no soldering required

**2026-03-25 — ADU ping-pong overshoot**
- Both ADU units running simultaneously in Heat, open ~1000 sqft floor plan
- Home temp rose to 27.5°C against 24°C setpoint
- Fix: run FTXS12 Living Room (primary) only
- Informs: ADU primary/secondary automation design

---

## Key references

- Faikin: https://www.faikin.au/products/faikin-wifi-controller
- CTXS07WVJU9 service manual: ManualsLib
- FTXS12WVJU9 service manual: ManualsLib
- FVXS09WVJU9 submittal: https://backend.daikincomfort.com/docs/default-source/product-documents/residential/submittal/fvxs09wvju9.pdf
- FDMQ18WVJU9: RXL-W series service manual SiUS092231E
- Fuse spec: T3.15A H250V 5x20mm ceramic slow-blow (FU1 + FU2 on all WVJU9 indoor PCBs)
- SONOFF SNZB-04P: Zigbee contact sensor, dark gray, CR2032, ~$8-10
- Velux KIX 300: integrated via HomeKit Device (Netatmo) in HA
- Open-Meteo: free weather integration, native in HA, no API key required

---

## Weather integration

**Strategy: dual-layer (forecast + physical sensor)**

### Layer 1 — Open-Meteo (forecast, built into HA)
- Free, no API key, native HA weather integration
- Use for: proactive decisions — don't start Natural Ventilation Mode if rain forecast in next 2 hours
- Entity: `weather.home` (or similar after setup)
- Key attributes: `condition`, `precipitation`, `precipitation_probability`

### Layer 2 — Physical rain sensor (ground truth)
- Zigbee rain sensor mounted on exterior — actual precipitation at this specific location
- Use for: immediate emergency close triggers — rain is falling RIGHT NOW
- Seattle rain is hyper-local — weather API can lag or miss localized showers
- Recommended: Ecowitt or similar Zigbee-compatible rain sensor
- Integrates directly with Zigbee2MQTT → HA binary sensor

### Combined logic
- Open-Meteo: "don't start Natural Ventilation Mode if rain forecast within 2 hours"
- Physical sensor: "close everything immediately if rain detected now"
- Both feed into Natural Ventilation Mode decision tree (see below)

---

## Natural Ventilation Mode — full specification

**Definition:** Natural Ventilation Mode (referred to as "Natural Ventilation Mode" throughout — never abbreviated) is a coordinated HA automation that uses the house's passive stack effect to cool the house using outside air, coordinating skylights, HVAC, and window sensor state to maximize effectiveness and protect against rain events.

### The stack effect in this house
- Cool air enters low (west-facing Marvin windows, ADU basement windows in owner-occupied mode)
- Warm air exhausts high (stairwell skylight at top of 3-floor stack, ~25-30 feet)
- Hornbeam microclimate cools inlet air on west side — noticeably cooler than ambient
- Effective June–September evenings when outside temp drops below inside temp

### Trigger conditions (ALL must be true to start)
1. Outside temp < inside temp (any live Faikin S21 thermistor)
2. Outside temp < 18°C
3. No rain — Open-Meteo condition is not rain/drizzle/storm
4. No rain forecast — precipitation probability < 20% for next 2 hours (Open-Meteo)
5. Physical rain sensor: dry
6. Time: after 6pm, before midnight
7. Season: May–September
8. Stairwell skylight: available (not already closed by rain sensor)

### Decision tree

```
All trigger conditions met?
  ↓ YES
Command stairwell skylight open
  ↓
Did stairwell skylight actually open within 60 seconds?
  ↓ YES                         ↓ NO
Open remaining skylights     Rain detected or fault
Open Velux blinds            Stay in HVAC mode
Switch HVAC to fan-only      Notify: "Natural Ventilation Mode
  or off on all zones         unavailable — skylight won't open"
Notify: "Skylights open.     Log: reason + timestamp
 Open west windows for
 natural cooling"
Natural Ventilation Mode
  is now ACTIVE
         ↓
Monitor continuously during Natural Ventilation Mode
```

### Skylight states as information — critical logic

**Skylight closes unexpectedly (not commanded by HA):**
- Ground truth: rain is falling on your roof right now
- More reliable than any weather API — the Velux rain sensor is on-site
- Distinguish: HA tracks last commanded state vs. current state
  - If current state = closed AND last command = open → rain event
- Response: emergency close sequence (see below)

**Skylight refuses to open when commanded:**
- Either Velux rain sensor is active, or unit fault
- Natural Ventilation Mode is physically unavailable
- Do NOT notify to open windows — there's no point without exhaust
- Notify: "Natural Ventilation Mode unavailable — skylight blocked"
- If happening on clear days → maintenance flag, log for investigation

**Stairwell skylight is closed and stack is blocked:**
- Natural Ventilation Mode cannot work — exhaust is unavailable
- Skip the entire automation, stay in HVAC mode
- Stairwell skylight is the minimum required — others are additive

### Emergency close sequence (rain event)

**Trigger:** any skylight closes unexpectedly OR physical rain sensor fires

**Actions (in order):**
1. Close ALL Velux skylights immediately
2. Close ALL Velux blinds
3. Check window contact sensors — identify any open windows
4. If open windows detected → URGENT notification:
   - 🌧️ "Rain detected — close windows now!"
   - List each open window by room name
   - Repeat notification every 5 minutes until all windows show closed
5. Resume HVAC (return to seasonal mode — Heat/Auto/Cool as appropriate)
6. Log event: timestamp, which skylight triggered, which windows were open

### Notification tiers during Natural Ventilation Mode

| Event | Priority | Message |
|---|---|---|
| Natural Ventilation Mode starting | ℹ️ Info | "Skylights opening for natural cooling. Open west windows when ready." |
| Skylight won't open | ℹ️ Info | "Natural Ventilation Mode unavailable — skylights blocked (rain sensor or fault)" |
| Rain detected mid-session | 🌧️ URGENT | "Rain detected — close windows now! Open: [room list]" |
| All windows closed after rain alert | ✅ Resolved | "All windows closed. Natural Ventilation Mode ended." |
| Skylight fault on clear day | ⚠️ Warning | "Skylight [name] failed to open — check for fault" |

### Natural Ventilation Mode end conditions (any one triggers end)
- Rain detected (physical sensor OR unexpected skylight close)
- Outside temp rises above inside temp
- Open-Meteo rain forecast probability rises above 40%
- Time reaches midnight (or configurable off time)
- All window sensors show closed (user manually ended session)
- Manual override via HA dashboard

### Owner-occupied bonus
When stairwell boundary door is open (contact sensor confirms):
- Add to Natural Ventilation Mode notification: "Open ADU basement windows for ground-cooled air"
- ADU basement air is ~10-13°C year round from soil mass — significantly cooler than main floor inlet air
- This is the most effective inlet source available

---

## Rain sensor recommendation

**Ecowitt WH40 or similar Zigbee-compatible rain gauge**
- Mounts on exterior, detects precipitation immediately
- Integrates with Zigbee2MQTT → HA binary_sensor
- Backup to Velux built-in rain sensors (which are also monitored via skylight state changes)
- Place on roof or exterior wall away from overhang — needs direct sky exposure

**Velux built-in rain sensors (already present)**
- Each Velux skylight has its own rain sensor that triggers automatic close
- HA monitors state changes to detect these closures as rain events
- Already integrated via HomeKit/KIX 300 gateway
- These ARE the primary rain detection mechanism — the Ecowitt is the backup

