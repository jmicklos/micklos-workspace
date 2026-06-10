# Context — Home – Remodel – Bedroom Reading Lights
*Last updated: 2026-06-09*

## What this project is
Install two adjustable brass spotlight reading lights on either side of the bed in the primary bedroom, with dimming control. This is a child project of [[Home – Remodel – Finish]] — the action items float up to the Primary Bedroom section of that parent project. Due 2026-07-31 with the rest of the remodel.

## Current state
**Fixture research is done. No purchases yet. Control approach undecided.**

Three control options are documented in the project note (relay + remote, smart bulb, built-in switch). The fixture research phase shifted to Etsy after Jonathan redirected away from generic retail — 9 top-rated Etsy brass lighting shops are cataloged, plus 3 specific Etsy listings and 4 non-Etsy options. The design target is a Cedar & Moss Fjord dupe (adjustable brass spotlight, ~$300+ each is too expensive).

The house has hardwired junction boxes on both sides of the bed with no wall switch — that's the core constraint driving the IoT approach.

## Key decisions & rationale
- **Etsy is the primary sourcing channel** — Jonathan explicitly redirected there from generic retail. He wants curated, high-quality shops, not Amazon/Wayfair browsing.
- **IoT control approach emerged from necessity** — almost no brass spotlight dupes have a built-in switch, so decoupling the switch via Zigbee relay or smart bulb opens up fixture selection dramatically.
- **Sunricher ZG2835 relay + ZG2836 rotary remote is the "best" pairing** (~$55-60/light) — direct Zigbee binding works even if HA is down. Budget alternative: Moes dimmer + IKEA RODRET (~$30/light).
- **Project was renamed** from `Home – Bedroom Reading Lights` to `Home – Remodel – Bedroom Reading Lights` to nest under the remodel parent project.

## Jonathan's preferences
- "I still need you to find a brass spotlight reading light for our bedroom — it needs an integrated switch if possible"
- "better questions, who are the highest rated brass light fixture sellers on etsy?" — wants curated shops, not category browsing
- Likes Cedar & Moss Fjord aesthetic but not the price
- Wants dimming, not just on/off
- Got frustrated when a duplicate project was created without finding the existing one — "that was lazy"

## Open threads
- Control approach not decided: relay vs smart bulb vs built-in switch
- Brass tone not chosen: warm brass vs antique/aged
- Form factor not chosen: gooseneck vs fixed cone
- Quantity assumed 2 (one per side) but not explicitly confirmed
- Junction box depth / socket type not confirmed

## Next steps
1. Jonathan browses the top Etsy shops (SmileLampWorks, Lightenstein, AWAYFROMOBJECT, LifeLightStore) and the specific listings in the project note
2. Shortlist 2-3 fixture candidates
3. Decide control approach based on what fixtures are available
4. Decide brass tone and form factor
5. Purchase fixtures (x2) + control hardware
6. Install and set up in Home Assistant
