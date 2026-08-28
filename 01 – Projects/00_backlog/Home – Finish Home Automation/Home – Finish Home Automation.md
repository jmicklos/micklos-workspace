---
type: project
area: Home
status: paused
due:
energy: high
created: 2026-03-30
next-review: 2026-04-13
todoist-project-id: 6hP8Xh5m2Ppxgx7c
---

# Home – Finish Home Automation

## Tasks
- [ ] Pi hole <!-- todoist:6h6p6jpfwH7F35Xq -->

## Definition of Done
Home Assistant is running all HVAC zones, floor thermostats, cameras, leak sensors, and skylights with dashboarding and automations. Wire closet is clean and fully terminated. Safe installed. Jellyfin running.

## Next Actions

### HVAC — Faikin Installs (3 of 7 live)
- [x] Buy Faikins
- [x] Buy Faikin cables
- [x] Inquire P1P2MQTT compatibility
- [ ] Install remaining 4 Faikin adapters (Study, Dining Room, Living Room, FDMQ18 attic)
- [ ] FDMQ18: access attic, locate S21 port, install Faikin
- [ ] Assign hostnames for all remaining Faikin units
- [ ] Integrate all 7 HVAC units into HA climate entities

### HVAC — Weather & Sensors
- [ ] Enable Open-Meteo weather integration in HA
- [ ] Install physical Zigbee rain sensor on exterior
- [ ] Install SNZB-04P contact sensors (stairwell door, west windows, front/back doors)
- [x] Fix Velux stairwell skylight area assignment (moved to "Stairwell")

### HVAC — Weather-Based Optimization
- [ ] Implement seasonal mode logic (outside temp via S21)
- [ ] Implement Natural Ventilation Mode (full spec in hvac_para_project/claude.md)

### Smart Floor Thermostats
- [ ] Clarify with Jerrod on installation options
- [ ] Decide: Sinopé TH1300ZB (pure Zigbee) vs Meross MTS215MA (Matter)
- [ ] Optionally purchase more Zigbee antennas
- [ ] Purchase thermostats
- [ ] Install

### Wire Closet — Phase 2
- [ ] Decide rack/mount strategy
- [ ] Buy racks
- [ ] Install racks
- [ ] Terminate remaining network jacks (upstairs cameras, downstairs cameras, upstairs jacks, downstairs jacks)
	- [ ] Braid → Terminate each end → Test → Mount (per run)

### Dashboarding
- [x] Decide overall dashboarding strategy — which dashboards do I need?
- [x] Camera monitoring dashboard
- [x] Build full dashboard YAML (Home, HVAC, Lights, Cameras, Skylights, Media, Appliances, Energy)
- [x] Map all HA entity IDs to real devices
- [x] Set up HA areas (Portico, Front Yard, Deck, Exterior Main Floor, Exterior Top Floor, etc.)
- [ ] Review options for entryway physical dashboard panel
- [ ] Purchase + install entryway panel
- [ ] Ask about best interfaces for panels — tap into power switches? Mount above?

### Remote Access
- [ ] Set up remote access for HA (Tailscale, Cloudflare Tunnel, or Nabu Casa)
- [ ] Configure access for Wan Ting

### Automations
- [x] Create ADU Nighttime script (all interior lights off except bedroom, HVAC off)
- [x] Create ADU Morning script (under-cabinet lights + ADU living room HVAC)
- [x] Create All Lights Off script (interior only, outdoor stays on)
- [x] Create Vacation Mode (occupancy simulation, skylight close, HVAC guard temps)
- [x] Create Cold Guard automation (any zone < 12°C → heat to 15°C, always on)
- [x] Create Hot Guard automation (any zone > 30°C → cool to 27°C, always on)
- [x] Fix automations.yaml format (was bare object, needed list)
- [ ] Design schedule-based automation plan (daily light/HVAC schedules)
- [ ] Implement schedule-based automations in HA

### Water Leak Sensors
- [ ] Design water leak sensor plan

### Safe
- [ ] Research safe options
- [ ] Purchase safe
- [ ] Install safe

### Jellyfin (someday)
- [ ] Set up Jellyfin server

## Waiting On
- [ ] Main house construction to finish before some installs (wire closet, sensors)
- [ ] Faikin install on FDMQ18 requires attic access

## Notes
Full HVAC automation spec: `hvac-spec.md` (in this project folder)
Includes: compressor topology, NVM state machine, Velux skylight integration, tenant mode, comfort preferences, seasonal logic, and full automation backlog.

### HA Config Files (in this project folder)
- `ha-dashboard.yaml` — 8-view dashboard (paste into HA Raw Config Editor)
- `ha-scripts.yaml` — 3 scripts (ADU Nighttime, ADU Morning, All Lights Off)
- `ha-vacation-mode.yaml` — 4 automations (Vacation Setup, Cold Guard, Hot Guard, Occupancy Simulation)
- HA's `automations.yaml` was fixed (was bare object, needed to be a YAML list)

Sinopé TH1300ZB: pure Zigbee, no cloud ever. Pairs directly with SLZB-06P7 coordinator.
Meross MTS215MA: Matter/WiFi, needs brief cloud setup then local. Both genuinely local after setup.
