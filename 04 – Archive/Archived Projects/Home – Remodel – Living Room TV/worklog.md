# Worklog — Home – Remodel – Living Room TV

## 2026-06-24 — Mantel fix confirmed; One Connect box may live in the alcove (kills the cable run)

### Situation
- Resumed via /resume-project. Cleared the three open threads from the 06-23 eve session and surfaced a routing simplification that could undo the whole "visible cable" problem.

### What Jonathan Said
- **Mantel deepen to ~5": CONFIRMED.** Tim can deepen the mantel to seat the Gen 1 Beam without throwing off fireplace/surround proportions.
- **Wall blocking: still unconfirmed.** Thinks the alcove is lath & plaster. Has a magnetic stud finder coming to check for backing/studs.
- **Sub placement: stop tracking.** He'll find a spot; no need to track.
- **One Connect box may fit IN the alcove.** Per Reddit, the box that ships with the Frame TV is **13.7 × 2.6 × 5.4 in** — small enough to potentially sit in the alcove. The alcove already has power + Ethernet, so the box can live and be serviced up there. "no cables until I want accessories 😃?"

### Reddit fetch blocked → dimensions verified another way (2026-06-24/28)
- Could NOT open the Reddit link: all three fetch-url attempts (curl, curl_cffi, non-headless Playwright) were stopped by Reddit's bot wall ("Please wait for verification" / "blocked by network security"). Fell back to WebSearch.
- **Dimension CONFIRMED: 13.7 × 2.6 × 5.4 in (W×H×D)** — but this is the box for **2024-and-earlier 55" Frame** models.
- **MAJOR NEW FINDING that changes the buy decision — the box situation depends entirely on which model Jonathan buys:**
  - **2026 standard Frame (55"+):** NO One Connect box at all — connections are built into the TV; only a single slim power cable reaches it (or none with a flush recessed outlet). If Jonathan buys this, the "box in the alcove" question is moot — even simpler.
  - **2026 Frame Pro:** ships a **Wireless One Connect Box (up to 30 ft range)** — the box lives anywhere (e.g., floor level or a closet) and talks to the TV wirelessly. This is the *actual* wireless path Jonathan originally wanted, and it's Samsung-native. Would eliminate the One Invisible Connection run too.
  - **Pre-2026 / smaller models (32/43/50"):** keep the wired One Connect box (the 13.7×2.6×5.4" one).
- Implication: **the routing outcome is now a purchase decision, not just a fit check.** Need to pin down which Frame model Jonathan intends to buy (he owns an older-gen Frame in the basement, but this living-room unit is a new purchase).

### Why this matters (routing reframed)
- If the One Connect box sits in the alcove: the **One Invisible Connection (TV→box) stays entirely in the alcove** — no run down the surround. The **Beam→box HDMI eARC** is a short hop from the mantel up into the alcove — effectively invisible, not a full surround run.
- Net: **the base setup (TV + Sonos Beam + Sub) may need ZERO visible cables down the surround.** Cables down the left side only become necessary if/when he adds source accessories (Apple TV, console, etc.) that he wants accessible at floor level — and even those could plug into the box in the alcove.
- This supersedes the prior "One Connect box on the LEFT at floor level + two cables down the left surround" plan. Treating box-in-alcove as the **leading plan, pending a physical fit check** (Jonathan posed it as a question — needs confirming the box actually fits the alcove cavity behind/below the mounted TV).

### Decisions
- Mantel deepening to ~5" is a go (Tim confirmed feasible). Still a build task to execute.
- Leading routing plan: **One Connect box in the alcove → no surround cable run for the base setup.** Verify physically.

### Open Threads
- **Confirm wall backing/blocking** — Jonathan checking with a magnetic stud finder (incoming); suspects lath & plaster.
- **Confirm the One Connect box physically fits** in the alcove with the TV mounted (clearance behind/below the slim mount).

### Next Steps
1. **DECIDE which Frame model to buy** — this determines the whole box/cable outcome:
   - 2026 standard Frame (55") → no box, single power cable, cleanest.
   - 2026 Frame Pro → wireless box (30 ft), the true-wireless path Jonathan wanted.
   - Older/cheaper 55" → wired 13.7×2.6×5.4" box in the alcove.
2. Jonathan: stud-finder check on the alcove for backing/blocking.
3. If buying an older model: confirm the wired box fits in the alcove → locks in the no-cable base setup.
4. Purchase: mount + 55" Frame TV.
5. Tim deepens mantel + installs mount → mount TV → (place box in alcove if applicable) → relocate/pair Beam + Sub.

---

## 2026-06-23 (eve) — Audio REVERSED to Sonos Beam + Sub (owned)

### Situation
- Same day, later: after locking the Samsung S801D, Jonathan re-examined the audio decision and walked it all the way back to Sonos. Net result: **use the Sonos Beam + Sub he already owns** (3.1), $0 spent.

### How we got there (the conversation arc)
- Asked what "better sound" on a Q800H actually meant. Clarified it's: sub (felt) > driver size/body > headroom > channels (room-dependent) > formats (irrelevant). The two biggest wins (sub + driver size) are exactly what the shallow mantel forbids.
- Asked about a better sub for the S801D → no: Samsung subs aren't sold as standalone upgrades, the wireless link is proprietary, and slim bars typically have no sub-out. Sub is fixed.
- Asked about alcove-mounting a Q800H → its up-firing Atmos drivers would be blocked by a recess/tight mount (kills the upgrade), plus ~5" depth protrudes and heat sits lower. Mounting hardware exists but defeats the point.
- Pivoted to "just use my existing Sonos." Confirmed it's a **Beam** (~2.7", fits the 2.33" mantel with ~⅜" overhang) **+ Sub** (covers bass).
- Asked about Sonos Amp / 4.1 with wireless fronts → explained the hard limit: a Sonos home theater has ONE TV-connected hub (Beam OR Amp, not both); wireless satellites can only be SURROUNDS, never fronts; and no Sonos device goes wireless to the TV at all. 4.1/5.1 means visible speakers around the floor-level fireplace — rejected as a separate future project.

### What Jonathan Said
- "I'm leaning sonos and saving the money and sacrificing with an ugly cable."
- Wanted either a wireless Beam or wireless front channels — accepted neither is possible with Sonos once explained.
- This returns to his original stated preference (already in context.md): "Sonos is a known entity with known quality audio and I don't want to spend a bunch of money buying a new system."

### Decisions
- **Audio = Sonos Beam + Sub (both owned), 3.1.** No new soundbar purchase.
- **Accept TWO cables** down the left surround: One Invisible Connection + slim white HDMI eARC (Beam → One Connect box on the left). Bundled/white = reads as ~one line.
- **S801D dropped** — the single saved cable wasn't worth $800 + worse sound + leaving Sonos.
- **Surrounds / 4.1+ deferred** to a possible separate future project (wireless Era 100s if ever wanted).

### Outputs & State
- Project note: audio section rewritten to Sonos (with collapsed Rejected sections for S801D and the Amp/surround paths); Setup, Open Questions, Tasks all updated. Beam-depth question flipped to "fits."
- context.md: current state, why-not-wireless, routing (two cables), open threads, and next steps all updated.

### Open Threads
- Confirm wall backing/blocking in the alcove for the mount.
- Clarify the 14"×7" alcove measurement (doesn't match a 55" TV).
- Sonos Sub placement (corner-load for bass; no furniture down there yet).
- Cable finish: slim white cables vs. painted raceway for the two-cable run.

### Next Steps
1. Clarify the 14×7 alcove dimension. → Jonathan later said it's irrelevant; dropped.
2. Confirm wall backing/blocking.
3. Purchase: mount + 55" Frame TV + two thin white cables (no soundbar — Beam + Sub owned).
4. Tim installs mount → mount TV → relocate/pair Beam + Sub → route cables down the left side.

### LATE UPDATE — Beam fit problem (corrects the "fits" note above)
- Jonathan double-checked: the owned Beam is **Gen 1 = ~4" deep**, not Gen 2 (~2.7"). On the 2.33" mantel it overhangs ~1.6" — does NOT fit as-is. The line 12 / line 27 "fits with ~⅜" overhang" note was based on a wrong-generation assumption.
- **Plan: ask Tim to deepen the mantel to ~5"** (4" bar + breathing room). Merges with the open wall-blocking task — one site visit. Fallbacks: Sonos Beam wall-mount bracket below the surround (visible bar, needs blocking there), or buy a Gen 2 Beam (~$500, undercuts the save-money rationale).
- Revised next steps: (1) ask Tim re: mantel depth + blocking together; (2) buy mount + 55" TV + 2 cables; (3) Tim deepens mantel + installs mount → mount TV → pair Beam+Sub → route cables.

---

## 2026-06-23 — Measurements taken; soundbar model resolved to S801D

### Situation
- Resumed project. Audio path had been decided 2026-06-14 (Samsung wireless route), but model (S801D vs QS90H) and all physical measurements were still open. Due date 2026-06-30, 7 days out.

### What Jonathan Said
- Confirmed 55" Frame TV is correct.
- Mantel sticks out about 2⅓" (2.33") from the alcove.
- Gave alcove dims as "14 inch wide and 7 inch deep" — flagged as inconsistent with a 55" TV (~48" wide); asked for clarification on what the 14×7 niche actually is.
- Heat check passes.
- Wall backing/blocking: still needs to confirm.
- Routing: power + internet land in the alcove itself; the thin Frame TV cable comes off the LEFT of the TV and traces down the left side of the fireplace (barely visible). → One Connect box on the LEFT.
- Tim thinks the mount makes sense.

### Decisions
- **Soundbar = Samsung S801D**, forced by mantel depth. S801D ~1.6" deep fits the 2.33" mantel; QS90H (standard ~4.7" deep) overhangs and is ruled out.
- **One Connect box on the LEFT**; cable run traces down the left side of the surround.
- **Mount approach validated by Tim.**

### Outputs & State
- Project note updated: soundbar model (S801D), setup/routing (left side), Tasks and Open Questions checked off (55" TV, mantel/Beam depth, heat, One Connect side, Tim/mount).
- context.md fully refreshed (was stale at 2026-06-09).

### Open Threads
- Clarify the 14"×7" alcove measurement (separate niche? recess depth?).
- Confirm wall backing/blocking in the alcove for the mount.
- Where to hide the S801D wireless subwoofer.
- Cable finish: slim white cable vs. painted raceway for the left-side run.

### Next Steps
1. Resolve the 14×7 alcove question.
2. Confirm wall backing/blocking.
3. Purchase: mount + 55" Frame TV + S801D + thin white cable.
4. Tim installs mount → mount TV → set up → route cable down the left side.

---

## 2026-06-09 — Wireless soundbar market research complete

### Situation
- Jonathan asked to explore all wireless soundbar options beyond Samsung
- Wanted to know if any non-Samsung soundbar could connect wirelessly to a Samsung Frame TV

### Approach & Rationale
- Researched Samsung's full 2026 Q-series and S-series lineup
- Investigated third-party options (Sonos, Bose, JBL, Leon Speakers)
- Found that Q-Symphony wireless audio is Samsung-proprietary — no third-party soundbar can wirelessly connect to a Samsung TV

### What Jonathan Said
- Asked for a full comparison of all Samsung wireless soundbar options
- Asked whether any soundbars mount directly to the TV (they don't)
- Asked about non-Samsung wireless options — confirmed none exist for Samsung TVs

### Source Material Used
- RTINGS Samsung soundbar reviews
- Samsung 2026 product announcements (Q990H, Q900H, Q800H, QS90H, S800D, S801D)
- Leon Speakers FrameBar product page and reviews (~$4k, still needs wired connection)
- Tom's Guide, Techlicious, AVForums, Techaeris reviews of S801D and QS90H
- Best Buy Q&A on wireless Frame TV soundbar options

### Outputs & State
- `context.md` — created, full project snapshot (current session)
- `worklog.md` — updated with this session entry
- Project note and parent project remain current from prior session

### Open Threads
- **Audio decision still open:** Sonos Beam (ecosystem, extra cable) vs Samsung S801D/QS90H (wireless, leaves ecosystem)
- No physical measurements taken yet

### Next Steps
1. Jonathan decides audio path: Sonos ecosystem vs. fewer cables
2. Take physical measurements (alcove dimensions, mantel shelf depth, heat check)
3. Purchase hardware once decisions are made

---

## 2026-06-08 — Audio decision reopened

### Situation
- Project renamed from "Home – TV Above Fireplace" to "Home – Remodel – Living Room TV"
- Now a child project of [[Home – Remodel – Finish]], with tasks floating up to the parent's Living Room section
- Jonathan researched Samsung wireless soundbar options and is now considering them as an alternative to Sonos Beam

### What Jonathan Said
- Asked whether Samsung soundbars mount directly to the TV (they don't — wall mount only)
- Asked about Samsung wireless soundbar reviews — generally positive, especially the QS90H (AVS Forum Top Choice 2026)
- Has NOT made a final audio decision — now weighing Sonos Beam vs Samsung wireless soundbar

### Audio Options Under Consideration

**Option A: Sonos Beam on mantel ($450)**
- eARC into One Connect box — low latency, lip-synced
- Stays in Sonos ecosystem
- Requires slim white HDMI eARC cable along surround (2 cables total)

**Option B: Samsung S801D ($800)**
- Ultra-slim, 1.4" tall, designed specifically for Frame TV
- Wireless Q-Symphony — no cable between TV and bar
- Only 1 cable along surround (One Invisible Connection)
- Needs wireless sub hidden somewhere
- Outside Sonos ecosystem

**Option C: Samsung QS90H ($1,000)**
- All-in-one 7.1.2, no separate sub needed
- Wireless Q-Symphony — no cable between TV and bar
- Excellent reviews, AVS Forum Top Choice 2026
- Standard-size bar — need to confirm mantel depth
- Outside Sonos ecosystem

### Alternatives Firmly Rejected
1. Sonos Port via optical — ~75ms latency, lip-sync issues
2. Sonos Era speakers only — same latency problem
3. In-ceiling speakers — too much construction work
4. AirPlay from Apple TV to Sonos — latency, limited to one input
5. Media console below fireplace — fireplace goes to floor level
6. Soundbar hidden in furniture off-center — Jonathan explicitly against this
7. Soundbar mounted to the TV directly — Samsung doesn't support this

### Next Steps
- **Decide audio approach** — Sonos Beam (extra cable, stays in ecosystem) vs Samsung wireless (one fewer cable, leaves ecosystem)
- Measure alcove dimensions for TV sizing
- Measure mantel shelf depth — determines whether QS90H fits or must go with S801D
- Confirm wall structure / stud backing in alcove
- Assess heat from gas insert at alcove height

---

## 2026-06-07 — Project created

### Situation
- Tudor Revival studs-out remodel in Capitol Hill, Seattle
- Fireplace has a gas insert that goes to floor level, narrow mantel shelf, alcove above
- Alcove has power + Ethernet but NO Smurf tube to either side — can't run cables through the wall
- Need TV + audio solution with clean cable management
- Jonathan has an existing Sonos system he wants to stay in

### What Jonathan Said
- Can't run a Smurf tube from the alcove to either side for HDMI
- Has power and Ethernet in the alcove
- Already has a Frame TV in the basement — knows the One Connect box setup and the thin cable
- Wanted Sonos integration — "Sonos is a known entity with known quality audio and I don't want to spend a bunch of money buying a new system"
- Completely against mounting a soundbar to the side or hiding it in furniture off-center
- Completely against draped HDMI cables — but accepted that a slim white HDMI along the white surround (bundled with the One Invisible Connection) is the pragmatic solution
- Fireplace is at floor level — no space for a media console underneath
- 2026-06-09 08:11 -- `context.md` via Write
- 2026-06-09 08:11 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-14 12:48 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-14 12:48 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:47 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:47 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:47 -- `context.md` via Edit
- 2026-06-23 22:48 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:48 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:48 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 22:48 -- `context.md` via Edit
- 2026-06-23 22:48 -- `context.md` via Edit
- 2026-06-23 23:24 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:24 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:24 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:24 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:24 -- `context.md` via Edit
- 2026-06-23 23:24 -- `context.md` via Edit
- 2026-06-23 23:28 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:28 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:29 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:29 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-23 23:29 -- `context.md` via Edit
- 2026-06-23 23:29 -- `context.md` via Edit
- 2026-06-24 22:39 -- `context.md` via Edit
- 2026-06-24 22:39 -- `context.md` via Edit
- 2026-06-24 22:39 -- `context.md` via Edit
- 2026-06-24 22:39 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-24 22:39 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-24 22:40 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-06-30 21:36 -- `context.md` via Edit
- 2026-06-30 21:36 -- `context.md` via Edit
- 2026-07-12 16:30 -- `Home – Remodel – Living Room TV.md` via Edit
- 2026-07-12 17:12 -- `Home – Remodel – Living Room TV.md` via Edit
