# Worklog — Home – Remodel – Bedroom Reading Lights

## 2026-06-07 / 2026-06-08 — Initial Research

### Situation
Jonathan needs two reading lights for the primary bedroom. Junction boxes are already wired on either side of the bed. He likes the Cedar & Moss Fjord — an adjustable brass spotlight (~$300+ each) — but wants a cheaper alternative. The catch: almost all brass spotlight dupes lack a built-in switch, and the fixture is hardwired with no wall switch.

### Approach & Rationale
Explored three paths:
1. **IoT relay + wireless remote** — decouple switching from the fixture, opening up any brass spotlight as an option
2. **Smart bulb** — simplest approach, no relay needed, just pair with a Zigbee remote
3. **Fixture with built-in switch** — original plan, but selection is extremely limited and expensive

Jonathan's home runs Zigbee2MQTT + Home Assistant on a Ubiquiti network, so Zigbee devices are the natural fit.

### What Jonathan Said
- Likes the Cedar & Moss Fjord aesthetic but finds it too expensive
- Wants a "dupe" — similar look, much lower price
- The lack of a built-in switch on dupes is what prompted the IoT discussion
- Asked specifically about **dimmer** relays and remotes (not just on/off)
- Noted he has two open sessions on this topic and wants a single project to consolidate

### Research Findings

**Dimmer relays (Zigbee, fit in junction box):**
- Sunricher SR-ZG2835 — best option, trailing-edge, Z2M native
- Moes Zigbee Dimmer Module — budget alternative

**Wireless dimmer remotes (Zigbee):**
- Sunricher ZG2836 rotary knob — direct binding with SR-ZG2835, works without HA
- IKEA RODRET / STYRBAR — budget button options
- Hue Dimmer Switch — polished, Z2M compatible

**Best combo:** Sunricher relay + rotary remote (~$55-60/light)
**Budget combo:** Moes dimmer + IKEA RODRET (~$30/light)

**Smart bulb option** also discussed as the simplest path — avoids relay entirely.

### Outputs & State
- `Home – Bedroom Reading Lights.md` — project note created with all three options documented
- No fixtures selected yet, no hardware purchased

### Open Threads
- Jonathan hasn't decided between relay vs smart bulb approach yet
- No fixture research done — waiting on control approach decision
- Need to confirm junction box depth / socket type for fixture compatibility

### Next Steps
1. Jonathan decides on control approach (relay vs smart bulb)
2. Browse the top Etsy shops and specific listings now captured in the project note — shortlist 2-3 favorites
3. Decide on brass tone (warm vs antique/aged) and form factor (gooseneck vs fixed cone)
4. Verify Sunricher availability if going the relay route
5. Purchase and install

---

## 2026-06-08 — Etsy Fixture Research

### Situation
Jonathan circled back asking to find a brass spotlight reading light with an integrated switch. Didn't realize this project already existed (previous session had created it). After initial generic retail results, he redirected to Etsy specifically — wanted the highest-rated brass lighting sellers there.

### What Jonathan Said
- "I still need you to find a brass spotlight reading light for our bedroom — it needs an integrated switch if possible"
- "better questions, who are the highest rated brass light fixture sellers on etsy?" — redirected away from generic retail toward curated Etsy shops
- Got frustrated when a duplicate project folder was created instead of finding this one — "that was lazy, please fix this"

### Research Findings
Identified top Etsy brass lighting shops by review volume and rating:
- **SmileLampWorks** — 2,670 reviews, 5/5 stars, brass spotlights specifically
- **Lightenstein** — 4.8+ stars, known for quality and personal touches
- **AWAYFROMOBJECT** — highly rated, great communication
- **LifeLightStore** — praised for slender designs and customer service
- Also: SteelLightingCompany, RanorLightingDesign, HekaDesignLighting, DECOCREATIONStudio, LightingstudioUK

Found 3 specific Etsy listings and 4 non-Etsy options with integrated switches — all captured in the project note.

### Outputs & State
- Project note updated with full Etsy shop table, specific listings, and non-Etsy alternatives
- Duplicate project folder (`Home – Bedroom Reading Light`, singular) deleted after merging content

### Next Steps
1. Browse top Etsy shops and shortlist 2-3 fixtures
2. Decide open questions: brass tone, form factor, control approach
3. Purchase fixtures + control hardware
4. Install

---

## 2026-06-09 — Checkpoint & project restructuring

### Situation
Jonathan asked to run the checkpoint skill on this project. Also confirmed via external edits that this project is a child of `Home – Remodel – Finish`, with action items floating up to the Primary Bedroom section of the parent.

### Approach & Rationale
Renamed the project from `Home – Bedroom Reading Lights` to `Home – Remodel – Bedroom Reading Lights` to match the parent project naming convention. Updated all wikilinks in both directions. Added missing action items (control approach decision, control hardware purchase, HA automation) to the parent project's Primary Bedroom P0 section so they're visible from the remodel tracker.

### What Jonathan Said
- "Let's make sure this project is a child of the 'Home – Remodel – Finish'. Let's make sure all of its action items float up to it."
- "The action items should be for the Primary bedroom."
- "Please rename this project 'Home – Remodel – Bedroom Reading Lights'."

### Outputs & State
- Project folder/files renamed to `Home – Remodel – Bedroom Reading Lights`
- Parent project (`Home – Remodel – Finish.md`) updated with child project link and expanded Primary Bedroom action items
- `context.md` created — full cold-start briefing for a fresh session
- Worklog updated with this entry

### Open Threads
- Same as before: control approach, brass tone, form factor, fixture shortlist all still open

### Next Steps
1. Browse top Etsy shops and shortlist 2-3 fixtures
2. Decide control approach, brass tone, form factor
3. Purchase and install
- 2026-06-09 08:10 -- `Home – Remodel – Bedroom Reading Lights.md` via Edit
- 2026-06-09 08:15 -- `Home – Remodel – Bedroom Reading Lights.md` via Edit
- 2026-06-09 08:15 -- `Home – Remodel – Bedroom Reading Lights.md` via Edit
