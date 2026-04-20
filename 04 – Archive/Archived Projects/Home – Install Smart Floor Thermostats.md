---
type: project
area:
status:
next-review: 2026-04-13
due:
energy:
created: 2026-03-07
---

# Home – Install Smart Floor Thermostats

## Definition of Done
(What must be true for this to be archived?)

## Next Actions
- [ ] Clarify with Jerrod what we can do. 
- [ ] [Optionally purchase more zigby antennas ](https://www.amazon.com/dp/B0D6KY9XMD?ref_=ppx_hzsearch_conn_dt_b_fed_asin_title_12&th=1)
- [ ] Purchase models that make the most sense 

## Waiting On
- [ ] 

## Notes

**Sinopé TH1300ZB** is the cleaner story. Zigbee devices communicate directly with your Zigbee coordinator (the USB stick on your HA machine) over a local radio protocol. It's one of the only floor heating thermostats that doesn't need another gateway device or cloud control [Hubitat](https://community.hubitat.com/t/success-with-sinope-th1300zb-floor-thermostat/9988). There's no Sinopé account, no internet dependency, nothing. It's just a radio device talking directly to your HA instance.

**Meross MTS215MA** uses Matter, which is local by design — HA's Matter integration communicates directly with the device over your local WiFi network. You do need to go through an initial commissioning step via the Meross app to get it on your network, but after that HA controls it entirely locally. When the internet is down, you can still control it in your home WiFi network via the Meross app [Amazon](https://www.amazon.com/Thermostat-Electric-Baseboard-SmartTings-Underfloor/dp/B0C4YDRHBS) — and HA operates the same way.

So both are genuinely local after setup. The Sinopé never touches a cloud at any point. The Meross needs a brief cloud-assisted setup but is local from then on.

I have a SMLIGHT SLZB-06P7 Zigbee 3.0 to Ethernet,USB,and WiFi Gateway Coordinator ... that should do the trick, ya?

4:49 PM

Yes, that's perfect. The SLZB-06P7 is a well-regarded coordinator and will work great with either ZHA or Zigbee2MQTT in HA. The Sinopé TH1300ZB will pair with it directly and you're fully local end to end — no additional hardware needed.

The Ethernet connectivity on the SLZB-06P7 is actually a nice bonus for reliability, since it keeps the Zigbee coordinator off WiFi entirely, which reduces potential interference and latency.