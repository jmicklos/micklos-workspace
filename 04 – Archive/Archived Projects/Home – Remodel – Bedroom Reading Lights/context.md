# Context — Home – Remodel – Bedroom Reading Lights
*Last updated: 2026-06-14*

## What this project is
Install two adjustable brass spotlight reading lights on either side of the bed in the primary bedroom, with dimming control. This is a child project of [[Home – Remodel – Finish]] — the action items float up to the Primary Bedroom section of that parent project. Due 2026-07-31 with the rest of the remodel.

## Current state
**Fixtures ordered. Waiting on manufacturing + shipping.**

Control approach is decided: **Option C — fixture with a built-in switch**, solved by pairing an adjustable brass spotlight with an add-on switch back plate from the same Etsy shop (SmileLampWorks). This sidestepped the Zigbee-relay/smart-bulb routes that were on the table earlier.

Ordered (x2 each) from SmileLampWorks on Etsy:
- Adjustable Spotlight — Directional (Etsy #1222560088)
- Add a Switch on Back Plate, No.0490 (Etsy #645215572)

The house has hardwired junction boxes on both sides of the bed with no wall switch — that's the core constraint that drove the IoT discussion before the built-in-switch solution landed.

## Key decisions & rationale
- **Etsy is the sourcing channel** — Jonathan explicitly redirected away from generic retail (Amazon/Wayfair). Wants curated, high-rated shops.
- **Built-in switch via add-on back plate** chosen over Zigbee relay / smart bulb — gets the brass spotlight look with a switch at the fixture, lower price than a true integrated-switch fixture.
- Design target was a Cedar & Moss Fjord dupe (adjustable brass spotlight, ~$300+/ea too expensive). SmileLampWorks dupe achieves the look for less.
- **Project nested under the remodel** — renamed to `Home – Remodel – Bedroom Reading Lights`; action items float up to the parent's Primary Bedroom P0 section.

## Jonathan's preferences
- "I still need you to find a brass spotlight reading light for our bedroom — it needs an integrated switch if possible"
- "better questions, who are the highest rated brass light fixture sellers on etsy?" — wants curated shops, not category browsing
- Likes Cedar & Moss Fjord aesthetic but not the price
- Wants dimming, not just on/off
- Got frustrated when a duplicate project was created without finding the existing one — "that was lazy"

## Open threads
- **Dimming not yet solved** for the built-in-switch fixture — may still want a Zigbee relay or smart bulb for HA dimming.
- Junction box depth / socket type not confirmed for fixture compatibility.

## Next steps
1. Receive fixtures (waiting on manufacturing + shipping).
2. Decide whether dimming via Zigbee relay / smart bulb is still wanted; source that hardware if so.
3. Confirm junction box depth / socket type before install.
4. Install fixtures (x2).
5. Set up in Home Assistant if going the IoT-dimming route.
