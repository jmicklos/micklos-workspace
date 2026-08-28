# Worklog — Wedding – Invitations

## 2026-07-27 — Project created

### Situation
- Jonathan asked to create a new PARA project for wedding invitations.
- Wedding is Dec 12, 2026 in CDMX (destination wedding). Website: officialleemicklos.com.

### Approach & Rationale
- Considered folding invitations into the existing **Wedding – Guest Communications & Registry** project (which covers guest-facing comms, RSVP deadline Oct 31). Jonathan chose to make **Invitations a standalone project** instead.
- Due date set to **Aug 12, 2026** (~4 months before the wedding) — Jonathan picked the earlier of the offered send windows, reasoning being destination-wedding travel lead time for guests.
- Energy: medium (default). Status: active.

### What Jonathan Said
- "please create a new PARA project for wedding invitations"
- Chose: New standalone project; due Aug 12, 2026.

### Outputs & State
- `Wedding – Invitations/Wedding – Invitations.md` — main project note, created. Frontmatter set; `todoist-section-id` left blank pending section creation.
- `worklog.md` — this file.

### Open Threads
- **Todoist section not yet created.** Every wedding PARA project has its own section in the shared `[WT&J] Wedding Planning` Todoist project (ID 6fRX8hm4h996v6FH). Need to create an "Invitations" section and fill in `todoist-section-id`.
- No tasks defined yet — `## Tasks` section is empty.

### Next Steps
1. Create the "Invitations" section in the shared wedding Todoist project and write its ID into frontmatter `todoist-section-id`.
2. Break down invitation work into tasks (design, proof, print, address, mail) and add to `## Tasks`.
3. Confirm invitation content/channels with Guest Communications project to avoid conflicts.

---

## 2026-07-27 — Proof review + updated mockup

### Situation
- Jonathan had a proof PDF from a stationer (`invite_proof.pdf`, 5×7, 2 cards: front invite + details card). Said "it's not terrible" but preferred the fonts on their wedding site (officialleemicklos.com). Asked what I'd change, then asked me to draft the actual updated invites to see them.

### Source Material Used
- `invite_proof.pdf` — front invite (building illustration, names, request line, date/time, venue, "Evening reception to follow") + details card (timeline, map, attire, travel, RSVP, QR).
- Reverse-engineered the website's type system from raw HTML/CSS (`/css/style.css`):
  - **`Brand`** — custom self-hosted display serif (`/fonts/brand.woff2`); name table scrubbed to "Brand" so exact typeface unknown. Used for couple names + section headers.
  - **`Didot`** — body serif (macOS system Didot; no @font-face, portable fallback = Cormorant Garamond).
  - **`Didot W01 Italic`** (Monotype, `/fonts/didot-w01-italic.woff2`) — elegant italic accents.
  - **`Jost`** — geometric sans for small letterspaced labels.
  - Google Fonts also loaded: Cormorant Garamond, Montserrat, **Allura** (formal script), Calligraffitti.

### What Jonathan Said
- "I prefer the fonts on our website."
- Confirmed **ceremony is 6pm** (resolves the 5-vs-6 discrepancy in the proof).
- "I want you to draft the actual updated invites so I can see what they would look like."

### Key decisions / changes made vs. the proof
- **Fonts remapped to the site:** names + headers → `Brand`; body → `Didot`; script accents ("and", "Evening reception to follow") → **`Allura`** (formal, on-brand) replacing the proof's casual handwriting; small time labels → `Jost`.
- **Time corrected:** "at FIVE o'clock in the AFTERNOON" → **"at SIX o'clock in the EVENING"** (6pm confirmed; etiquette: 6pm = evening, not afternoon). Timeline ceremony already said six — now consistent.
- Kept the building illustration + CDMX map (extracted from the proof PDF via `pdfimages`).

### Outputs & State
- `mockup/invite-updated.html` — editable draft, loads site fonts (brand + didot-italic locally in `mockup/assets/`, Jost/Allura/Cormorant via Google Fonts). Two 5×7 cards. **State: rendered, fits cleanly, looks good.**
- `mockup/preview.png` — visual preview (what was shown to Jonathan).
- `mockup/invite-updated.pdf` — print-ready 5×7 two-card PDF.
- `mockup/assets/` — extracted `building.png`, `map.png`, `qr.png`, plus `brand.woff2`, `didot-italic.woff2`.

### Open Threads / unresolved
- **RSVP date still unreconciled:** mockup keeps the proof's "by the first of October," but Guest Comms project says **Oct 31**. Jonathan has NOT decided. Flagged, left as-is in draft.
- **Print licensing not resolved:** `Brand` (scrubbed webfont — need original licensed OTF/print license) and `Didot` (need licensed print Didot, e.g. Linotype/URW). `Jost` + `Allura` are OFL (free for print). Stationer will need real print font files, not the webfonts.
- Exact identity of the `Brand` typeface unknown (name table scrubbed).
- Considered but NOT done: offering `Didot Italic` as an alternative to Allura for the script accents.

### Next Steps
1. Get Jonathan's reaction to the mockup; iterate on type sizes/spacing if wanted.
2. Decide RSVP date (Oct 1 vs Oct 31) and align invite + website + Guest Comms project.
3. Resolve print-font licensing before sending to stationer; draft stationer handoff note (fonts + licensing + the two content fixes).

---

## 2026-07-27 (cont.) — Ampersand, accent line, sizing, and A/B name treatments

### What Jonathan asked / decided (in order)
- **Ampersand instead of "and", like the website.** Implemented: the site uses the **`Brand` glyph `&` tinted gold (#C9A961)** — verified `Brand` subset contains `&`. Confirmed the site's `.ampersand` is just Brand + gold (not a script).
- **Cursive felt "kinda cheesy."** Confirmed the website uses **no cursive at all**. Replaced Allura with **`Didot Italic`** (option A on the compare sheet) for "Evening reception to follow" + the ampersand. Built `compare.html`/`compare.png` showing ampersand variants (Brand gold / Brand charcoal / Didot-Italic gold) and 4 accent-line options.
- **Sizing:** ampersand 44px → **33px**; names 31px → **33px** (ampersand now = name size).
- **Vertical centering fix:** reception line was `margin-top:auto` (pinned to bottom) → changed to fixed **1.15em** and set front card `justify-content:center` so the whole block is vertically centered. This was the real fix for the "not vertically centered" complaint.
- **Letter-spacing question → key finding:** `Brand` is a **UNICASE** display face — lowercase glyphs are distinct but drawn at full cap-height (`a` and `A` both 714 units tall; `a` narrower). So title case vs uppercase both render cap-height; the real difference is **tracking + letterform**. Website feeds title case at **−0.05em**; the proof/invite used uppercase at **+0.18em**.

### A/B decision (OPEN — awaiting Jonathan + fiancée)
Jonathan liked BOTH and asked for complete previews of each to show his fiancée in the AM:
- **Version A** = all-caps, **+0.18em** tracking (formal-invitation convention). Files: `mockup/invite-A.{html,png,pdf}`
- **Version B** = title case, **−0.05em** tracking, name size 36px (website-exact texture). Files: `mockup/invite-B.{html,png,pdf}`
- Details/back card is identical in both (name treatment only affects the front).
- Claude's recommendation on record: A's tracking (or a middle ~+0.06em "Version C") reads better at print size than the site's tight −0.05em, which crowds "Jonathan Micklos" toward the margins. Offered Version C but Jonathan chose to compare just A and B for now.

### Other compare artifacts in mockup/
- `compare.html`/`.png` — ampersand + accent-line options.
- `compare-names.html`/`.png` — A vs B name treatment, side by side.

### Later same session — frame, QR fix, Option C, details breathing room
- **Engraved double-gold frame added to every card** (both A & B, front + details). Replicates the site's section border exactly: `box-shadow: inset 0 0 0 12px paper, 13px rgba(201,169,97,.6), 19px paper, 20px rgba(201,169,97,.25)` — stored as `--frame` var; kept in `@media print`. NOTE: gold frame in print = foil (same caveat as the ampersand); charcoal alt available.
- **QR overflow fixed:** details card was taller than 7in so the QR spilled past the bottom frame. Tightened: map 56%→50%, block margins 14→11px, qr 78→66px, foot-note 14→10px, timeline 16→12px. QR now sits inside the frame.
- **Version C created** (`mockup/invite-C.{html,png,pdf}`) per Jonathan's request: **A's uppercase cap letterforms + B's tight −0.05em tracking**, name size 35px. Reads as a denser, monumental version of the names (wide cap glyphs packed tight) vs B's narrower unicase lowercase forms. Inherits frame + QR fix.
- **Details card body text shrunk for breathing room** (Jonathan's call): `.block p` 13→12px, `.tl-desc` 14→13px, with reclaimed space returned to margins. Applied to A, B, C, D.
- **Version D created** (`mockup/invite-D.{html,png,pdf}`) per Jonathan's request: **like B (36px, −0.05em) but names set ALL-LOWERCASE**. Built `compare-case.html`/`.png` to compare uppercase/title/lowercase in Brand.
- **KEY TYPE FINDING (corrected by Jonathan):** `Brand`'s **uppercase** glyphs carry **decorative swashes/swoops under certain letters** (tail on the J, swash foot on the L, etc.) that the **lowercase** glyphs drop. So the name-case choice is an ornate↔clean spectrum:
  - A / C (all caps) = swashes present → most ornate.
  - D (all lowercase) = swashes dropped → cleanest/most restrained.
  - B (title case) = swashes on FIRST letters only (caps W/T/L/J/M) + plain unicase rest → hybrid.
  - (All render cap-height regardless — `Brand` is unicase, no true small-x-height lowercase.)
- **Header/body size delta increased** (Jonathan's call) on details card so hierarchy reads: `.subhead` 14→15.5px (letterspacing .14→.16em), `.block p` 12→11.5px. Applied to A, B, C, D. QR still inside frame.

### Still-open decisions (carry forward)
1. **Name treatment: A vs B vs C vs D** — FOUR full previews now exist (`invite-A/B/C/D.{png,pdf,html}`). Ornate→clean: A/C (swashes) · B (hybrid) · D (clean). Main open item.
2. **Ampersand + frame color:** gold (#C9A961) matches the site but = **foil stamping** in print ($, not all stationers). Charcoal/ink alternative available. Not decided.
3. **RSVP date:** drafts still say "first of October"; Guest Comms project says Oct 31. Not decided.
4. **Print-font licensing:** `Brand` + `Didot` need licensed print fonts; `Jost`/`Allura` are OFL. Not resolved.

### Final polish this session — QR balance + landing page
- **QR "too much whitespace" fix (measured, not eyeballed):** used PIL to measure top/bottom whitespace. Content already filled the padded area, so the gap under the QR was really the card's 0.55in bottom padding + frame inset — centering couldn't shrink it. Fix: details card padding 0.55in→**0.4in** (top/bottom) + map 48%→**54%** so content fills more. QR now sits snug above the frame, balanced top/bottom. Applied to A/B/C/D.
- **`mockup/index.html` landing-page write-up created** for the fiancée — on-brand (site fonts, gold frame, gold ampersand). Sections: what's new, the four options (thumbnail + View-full + PDF links each), compare sheets, "same in all four", and the 3 decisions. Written in Jonathan's voice ("Morning, love…").
- **FILE NAMING: uppercase is canonical.** Jonathan's example URL used lowercase (`invite-a.html`) but he corrected: that was an error → files are **`invite-A/B/C/D.{html,png,pdf}`** (uppercase). index.html links point to uppercase. (Briefly renamed to lowercase then back — case-insensitive FS here, but the stored/served name is uppercase.)
- **Intended hosting:** `https://www.officialleemicklos.com/invites/mockup/` → `index.html` is the entry; options at `…/invite-A.html` etc. NOT YET UPLOADED — Jonathan needs to deploy the `mockup/` folder (incl. `assets/`) to the site.

### Still-open decisions (carry forward — unchanged)
1. Name treatment A/B/C/D. 2. Gold-foil vs charcoal ink (ampersand + frame). 3. RSVP date (Oct 1 vs Oct 31). 4. Print-font licensing (`Brand`+`Didot`).

### Next Steps
1. Jonathan uploads `mockup/` to `officialleemicklos.com/invites/mockup/` and shares the index link with fiancée.
2. Fiancée picks A / B / C / D.
3. Then lock gold-foil vs charcoal (ampersand + frame) + RSVP date.
4. Draft stationer handoff note (chosen version + fonts + licensing + content fixes).

---

## 2026-07-28 — B&W variants + neutral tone

- **B&W variants created** (`mockup/invite-{A,B,C,D}-bw.{html,png,pdf}`) — Jonathan flagged the print may end up black-and-white, so we need mono versions too. Palette swap: `--gold:#C9A961`→`#4a4a4a` (charcoal ampersand) and frame `rgba(201,169,97,…)`→`rgba(75,75,75,…)` (charcoal double-rule). Illustrations already grayscale, so these are fully B&W. 8 total invite sets now (4 color + 4 B&W).
- **`index.html` tone neutralized** at Jonathan's request — he worried the fiancée might be put off by an AI-written *personal/love* note. Removed "Morning, love…", the "made with ♥" footer, and the "my gut is…" line. Now reads as a plain design update ("These are draft options for our invitation, reworked from the stationer's proof…"). Still first-person ("our website") but not a love letter.
- **B&W folded into the landing page:** each option card now has a "Black & white: view · pdf" link under the color buttons; intro notes the B&W possibility; decision #2 reworded to "Gold, or black & white?" pointing at the B&W versions.

### Still-open decisions (unchanged): A/B/C/D · gold-vs-B&W · RSVP date (Oct 1 vs 31) · print-font licensing.
- 2026-07-27 23:00 -- `mockup/invite-updated.html` via Write
- 2026-07-27 23:01 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:01 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:01 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:01 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:01 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:02 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:02 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:02 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:07 -- `mockup/compare.html` via Write
- 2026-07-27 23:07 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:07 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:07 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:07 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:15 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:15 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:16 -- `mockup/invite-updated.html` via Edit
- 2026-07-27 23:18 -- `mockup/compare-names.html` via Write
- 2026-07-27 23:24 -- `mockup/invite-A.html` via Write
- 2026-07-27 23:25 -- `mockup/invite-B.html` via Write
- 2026-07-27 23:28 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:28 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:28 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:28 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:28 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:28 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:31 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:31 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:31 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:31 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:33 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:33 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:34 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:34 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:36 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:36 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:36 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:36 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:36 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:37 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:37 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:38 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:38 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:38 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-A.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-B.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-C.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:39 -- `mockup/invite-D.html` via Edit
- 2026-07-27 23:40 -- `mockup/compare-case.html` via Write
- 2026-07-27 23:44 -- `mockup/compare-all.html` via Write
- 2026-07-28 00:07 -- `mockup/index.html` via Write
- 2026-07-28 00:13 -- `mockup/index.html` via Edit
- 2026-07-28 00:13 -- `mockup/index.html` via Edit
- 2026-07-28 00:13 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit
- 2026-07-28 00:14 -- `mockup/index.html` via Edit

---

## 2026-08-01 — High-res assets for 300dpi A5 print test

- **New map:** Jonathan synced `map_higher_res.jpeg` (1536×1024). Auto-cropped to the ink bounding box (x410–1516) to remove the big left white margin → `mockup/assets/map.png` now **1142×1016** (~529 dpi at print size). Old proof map backed up as `assets/map-proof-orig.png`.
- **New QR:** regenerated with `segno` (v3, EC-M) to **https://www.officialleemicklos.com/#rsvp** → `assets/qr.png` **1110×1110** (~1719 dpi) + `assets/qr.svg`. Decode-verified via cv2 = correct URL. Old QR backed up as `assets/qr-proof-orig.png`.
- Re-rendered all 8 invites (A/B/C/D + -bw) PNG+PDF with the new assets.
- **FLAGGED / BLOCKER for print:** `assets/building.png` is only **497×348 (~168 dpi)** — extracted from the low-res proof PDF, so it will pixelate at 300dpi A5. Need Jonathan to provide a **higher-res source of the Casino Español building illustration** (same as he did for the map); then trim + swap identically.
- Note: invite `@page` is currently **5in×7in**, not A5 (148×210mm). Aspect is nearly identical (0.714 vs 0.705) so it scales cleanly, but offered to switch to true A5 page size if wanted for an exact test print.

## 2026-08-01 (cont.) — True A5 + building still open

- **All 8 invites converted to true A5** (148×210mm). Method: `@page{size:A5}` + `zoom:1.16535` on `.card` (card authored 5×7, zoomed to fill A5 width; design scales uniformly so the tuned composition is preserved). Verified via `pdfinfo` → every PDF = "420 x 594.96 pts (A5)". Screenshot window widened to 780px.
- **Building upscale REJECTED by Jonathan** ("does not look good"). Reverted `building.png` to the original proof version (`building-proof-orig.png`). The 3× LANCZOS+unsharp attempt saved as `building-upscaled.png` (kept for reference, not used).
- **Building = still the open blocker.** Jonathan wants it redrawn in the same pen-and-ink style with CRISP lines, using Google Street View as reference for hard-to-see detail. **Claude CANNOT do this here** — no image-generation capability; hand-SVG of an ornate Beaux-Arts facade isn't feasible; potrace of the low-res source gives crisp but blobby lines (no recovered detail). Paths offered: (a) hi-res export of original art [cleanest], (b) generate via image model using a Claude-written, research-accurate prompt [drafted this session], (c) commission.
- **Facade research (for the prompt / Street View intent):** Casino Español de México, Isabel la Católica 29, built 1903–05, arch. Emilio González del Campo; eclectic "Frenchified" / Neo-Plateresque; cantera-stone facade; two crenellated corner towers w/ tall flag spires; central raised ornamented pediment; piano-nobile round-arched windows w/ pilasters + cartouches + iron balconies; central projecting balcony over ornate arched portal; ground-floor shopfronts. Source: es.wikipedia.org/wiki/Casino_Español_de_México.

### Next step on building: Jonathan to choose path (hi-res source / image-gen with the drafted prompt). Then trim + swap + re-render all 8 (already A5).

## 2026-08-01 (cont.) — Building RESOLVED (hi-res redraw)

- Jonathan generated a new crisp pen-and-ink elevation via image model → synced `building_higher_res.png` (1495×1052). Excellent: crisp lines, full ornament, correct shop signs. Matches the map's style.
- Trimmed to ink bbox → `mockup/assets/building.png` now **1468×918** (~426 dpi at A5). Previous (proof/reverted) building saved as `building-proofsize-prev.png`; the rejected upscale remains at `building-upscaled.png`.
- Aspect 1.599 (slightly wider than old 1.428) — sits well in the layout, front card still balanced.
- Re-rendered all 8 (A/B/C/D + -bw) at A5 with the new building. **All three print assets (building, map, QR) are now ≥300 dpi → the invite is fully print-ready at 300dpi A5.**

### Status: A5 ✓ · map ✓ · QR ✓ · building ✓. Remaining decisions unchanged: name option A/B/C/D · gold vs B&W · RSVP date (Oct 1 vs 31) · print-font licensing.

## 2026-08-01 (cont.) — Asset archive + transparent backgrounds

- **Archived (moved, not deleted) to project-root `_archive/`** (outside `mockup/` so it won't upload):
  - `superseded-assets/`: building-proof-orig.png, building-proofsize-prev.png, building-upscaled.png (rejected upscale), map-proof-orig.png, qr-proof-orig.png, img-000…007.png (raw pdfimages dump).
  - `source-originals/`: building_higher_res.png, map_higher_res.jpeg, invite_proof.pdf.
  - `mockup/assets/` now holds only active files: brand.woff2, didot-italic.woff2, building.png, map.png, qr.png, qr.svg.
- **Option space already on new assets:** assets were overwritten in place (same filenames), so all 8 invite HTML already reference the new building/map/qr; verified no active file references any archived name. Re-rendered anyway below.
- **Transparent-background fix** (Jonathan noticed map ~249 / building ~253 off-white rectangles vs the pure-white #ffffff card): converted `building.png` + `map.png` to **RGBA with feathered alpha** — near-white background (>bg−4) fully transparent, content (<bg−14) opaque, feathered between → no halos, all ink/shading preserved. Over the white card they now render seamlessly. QR left as-is (pure #ffffff, already matches; keeps scannable quiet zone).
- Re-rendered all 8 (A5) + compare-all.png with transparent assets.

### Fully print-ready: A5 ✓ · building/map/QR ≥300dpi ✓ · uniform white bg ✓. Open decisions unchanged: name A/B/C/D · gold vs B&W · RSVP date.

## 2026-08-01 (cont.) — A5 bottom-gap fix
- Jonathan noticed a ~2.8mm gap at the bottom of the A5 PDFs (frame sitting slightly high). Cause: card was 5×7in zoomed to fill A5 *width*, but 5:7 (0.714) is wider-proportioned than A5 (0.7048), so the scaled card was ~2.8mm shorter than the 210mm page and top-aligned.
- Fix: changed `.card` pre-zoom height `7in` → **`180.2mm`** so post-zoom (×1.16535) = ~210mm → card fills A5 height exactly; frame now centered with even margins all sides. Verified via `pdftoppm` page render (2 pages, symmetric). Re-rendered all 8.

## 2026-08-01 (cont.) — Spacing fixes (building/names + details balance)
- **Front:** building sat flush against the names after the new tight-cropped building. Set `.building` margin-bottom `6px`→**`22px`** = the names→request gap, so space above the names == space below the names. Space-above-building == space-below-reception still holds via `.front{justify-content:center}`.
- **Details:** wanted space-above-"THE CELEBRATION" == space-below-QR, with leftover space split equally above/below the map. Implemented with flex `auto` margins: `.back` center→**flex-start** (content anchored at the symmetric 0.4in top/bottom padding), `.section-title` margin-top 4px→0, `.map{margin:auto auto 0}` + new `.map + .block{margin-top:auto}` → the two auto margins split leftover space equally above and below the map. Verified by measurement (top/bottom card gaps and map gaps equal within ~1mm; residual is font leading + QR quiet-zone, not layout).
- Synced `compare-all.html` `.building` margin too. Re-rendered all 8 + compare-all.

## 2026-08-01 (cont.) — Reverted details spacing (fiancée feedback)
- Fiancée preferred the earlier look: slack back as top/bottom page margin, map with normal compact gaps (i.e., undo the auto-margin "extra space around map" change).
- Reverted details card: `.back` flex-start→**center** (whole content vertically centered), `.map` margin `auto auto 0`→**`12px auto 0`**, removed the `.map + .block{margin-top:auto}` rule. `.section-title` margin-top left at 0 for clean centering.
- Front page unchanged (building/names 22px gap kept — she didn't flag it). Both cards now vertically centered. Verified details top/bottom gaps equal within ~1mm (QR quiet-zone). Re-rendered all 8; compare-all untouched (fronts unchanged).
- 2026-08-01 12:48 -- `mockup/index.html` via Edit
- 2026-08-01 12:48 -- `mockup/index.html` via Edit

## 2026-08-01 (cont.) — Named-guest variant (proofing)
- New dimension: a "named" invitation with the guest/household name printed between "request the pleasure of your company" and "at the celebration of their marriage", in the Brand uppercase display font (letterspaced). Mirrors the "NAME HERE" slot on the original stationer proof.
- Built 3 proofs, all on **Option B** (per Jonathan, keep it simple for now): `mockup/invite-named-{individual,couple,group}.{html,png,pdf}`
  - Individual: "Adeola Adeosun" (1 line)
  - Couple: "María José Tapia Castro and Jaime Israel Ramírez Hernández" (wraps 2 lines; accents render fine via Brand)
  - Group: "Jeeihn Won, Lee Jin Rui, Diana Lee and Damien Lee" (wraps 2 lines)
- Guest-name CSS: `.guest{font-family:var(--display);text-transform:uppercase;font-size:18px;letter-spacing:.09em;line-height:1.4;margin:11px auto 8px;max-width:92%;}` inserted between split request lines (`.request` + `.req2`).
- `index.html`: added a **"With a guest's name"** section (3-col `.grid3`) after the compare section — the four font options stay in their own section above. All named links verified. Named PDFs are A5.
- NOTE ON RENDER HANG: Chrome headless now hangs on EXIT (writes output then won't quit) while Jonathan's regular Chrome is open. Workaround baked into render commands: `--headless=new --user-data-dir=<tmp>` + a kill-guard that watches the output file size and kills Chrome once stable. Use this pattern for all future renders.

## 2026-08-01 (cont.) — Named 2-line overflow fix
- Two-line guest names (couple/group) pushed the centered front content into the frame — "Evening reception to follow" landed ~3px(2x) from the bottom border. Measured: individual 36/27, couple/group 7/3 (top/bottom, 2x px).
- Fix (named variants only): `.building` 74%→**68%**, margin-bottom 22→16; `.request` (1st line) margin-top 22→16 (keeps names symmetric with building 16/16); `.guest` margin 11/8→8/6.
- Result: couple/group bottom gap 3→**34**(2x px, ~17px real); individual roomier. Reception clear of the border in all three. Re-rendered 3 named (A5 confirmed). index thumbnails auto-updated.

## 2026-08-01 (cont.) — Name-nowrap rule, HTML border fix, max image quality

- **NEW STANDING RULE: never split a person's name across lines.** Implemented in named variants by joining each person's name words with `&nbsp;`, leaving normal (breakable) spaces only at connectors (" and ", commas). Couple now wraps "MARÍA JOSÉ TAPIA CASTRO AND / JAIME ISRAEL RAMÍREZ HERNÁNDEZ" — Jaime's name stays whole. Apply this rule to ALL future name rendering.
- **HTML border clip (2-line names):** Jonathan saw "Evening reception to follow" clipping the frame in the browser though PDF/PNG looked fine. Cause = the non-standard `zoom` property scales slightly differently across browsers (likely Safari), nudging the taller 2-line content into the frame. Fix (named variants): more headroom — building 68%→**60%**, guest line-height 1.4→1.3, letter-spacing .09→.08, margin 8/6→7/5, max-width 92→94%. Reception now well clear in all three. (If this recurs elsewhere, the deeper fix is replacing `zoom` with a transform-based scale.)
- **MAX IMAGE QUALITY (300dpi A5):** measured — all assets already exceed 300dpi at A5 (building 426, map 454, QR 1475) and are at the full res of the provided source art; resolution was never the issue. The detail loss was my earlier **transparency feather being too wide** (opaque only <bg−14), which faded the faintest gray lines. Reprocessed building+map **from the full-res sources** (`_archive/source-originals/`) with a TIGHT detail-preserving alpha (opaque <bg−7): ~7 more levels of fine linework restored, clean transparent bg, no halos. building.png 1471×927, map.png 1143×1016. **QR regenerated at 1554px (2072 dpi).**
  - Note: building/map are capped at ~426/454 dpi by the source art (already >300dpi and near print's practical ceiling). To go higher, Jonathan would need to regenerate the source illustrations larger.
- Re-rendered all 11 invites (8 main + 3 named) + compare-all with the max-quality assets.

## 2026-08-01 (cont.) — Name-wrap balancing + Oxford comma
- **RULE (priority order) for multi-line names:** (1) never split a person's name across lines [via `&nbsp;` within each name]; (2) then balance the character count per line. Implemented #2 with CSS **`text-wrap:balance`** on `.guest` — with names non-breakable, the browser picks balanced break points. Group now renders "JEEIHN WON, LEE JIN RUI, / DIANA LEE, AND DAMIEN LEE" (balanced) instead of the lopsided "...DIANA LEE AND / DAMIEN LEE".
- **RULE: use the Oxford comma** in lists of 3+ names (comma before "and"). Group updated → "Diana Lee, and Damien Lee". (Couple = 2 names, no Oxford comma.)
- Re-rendered 3 named files. Apply both rules to all future name rendering.

## 2026-08-01 (cont.) — Reception line conditional on line count
- **RULE:** if the guest name is more than one line, drop "Evening reception to follow"; if one line, keep it. (Fiancée's call.)
  - Individual (1-line name) → keeps reception.
  - Couple / Group (2-line names) → reception removed.
- Since removing reception frees space, **restored named building to 74%** (matches main invites) and request margin-top back to 22 (names symmetric) for all 3 named. Verified: individual reception clears border (36px 2x bottom); couple/group roomy (84px 2x). Building now consistent across named + main.
- Re-rendered 3 named (A5).

## 2026-08-01 — DECISIONS (tentative: "for now")
- **Font: Version B** (title case, tight −0.05em, website-exact). Front-runner file = `mockup/invite-B.*` (gold). Named proofs already on B.
- **Color: GOLD** (gold ampersand + gold frame). ⚠️ Gold in print = FOIL STAMPING — confirm the stationer offers it + cost. `invite-B.*` = gold; `invite-B-bw.*` is the fallback if foil is a problem.
- **RSVP date: October 1, 2026.** Invites already say "by the first of October" ✓. Reconciled the **Guest Communications & Registry** project (was Oct 31 → now Oct 1, both the RSVP callout and the `due` frontmatter). STILL TODO (Jonathan/external): update the **website** RSVP page (officialleemicklos.com/#rsvp) to Oct 1; check Todoist due dates for that project.
- All "for now" — not final. Other options/variants retained.

### Next steps once locked
1. Confirm gold-foil feasibility/cost with stationer (else use B&W).
2. Update website RSVP deadline to Oct 1.
3. Extend named layout — already on B, so mostly done; produce the real guest list → named invites at print time.
4. Draft stationer handoff note (Version B gold, fonts + print-font licensing, Oct 1 RSVP, A5/300dpi, foil for gold).
- 2026-08-01 14:26 -- `print/PRINT-SPECS.md` via Write

## 2026-08-01 — Print-ready deliverables (hand to stationer directly)
- Jonathan wants to give the printer finished files (doesn't trust their layout skills). Built **`print/`** at project root (NOT in mockup/, so it won't upload to the web).
- Confirmed `invite-B.pdf` fonts are **fully embedded** (incl. custom Brand, subsetted) + A5 → PDFs are self-contained/portable.
- For **B/gold** and **B/black-white**, produced per card (front + details):
  - Single-page **vector PDF** (`invitation-front-gold.pdf`, `invitation-details-gold.pdf`, …) — preferred, sharp text.
  - **Flattened 300 dpi PNG** at exact A5 (1750×2479) — foolproof fallback (no fonts/scaling to mess up).
  - Combined 2-page PDFs too.
  - Split via `pdfseparate`, rasterized via `pdftoppm -r 300`.
- **`print/PRINT-SPECS.md`** — full printer instructions: A5 148×210mm @100% (no scale-to-fit), no bleed (white=paper), 300dpi, GOLD=foil on ampersand+border only (≈Pantone 871/876; else use B&W set), charcoal #2B2B2B text, embedded fonts / don't re-typeset, QR ≥25mm, cardstock ≥300gsm white/ivory. Includes 3 "confirm with client" items (2 cards vs double-sided; foil available?; personalization = separate variable-data run).
- These are the BASE (generic) invites. Personalized/named versions are a variable-data run at print time using the guest list + the naming rules (never split names, balance lines, Oxford comma, drop reception if >1 line).
- 2026-08-01 15:05 -- `guest-list.csv` via Write
- 2026-08-01 15:07 -- `generate-named-invites.py` via Write
- 2026-08-01 15:07 -- `_named_template.html` via Write
- 2026-08-01 15:11 -- `print/named/README.md` via Write

## 2026-08-01 — Personalized invitations for all 72 households (variable data)
- Jonathan gave the guest list (72 households). Saved as **`guest-list.csv`** (quoted; some names contain commas).
- Built reusable generator **`generate-named-invites.py`** + **`_named_template.html`** (front-only, Version B / gold). For each household:
  - Name formatting: nbsp within each person's name (never split), breakable at connectors, Oxford commas preserved as given, `text-wrap:balance` for even lines.
  - **Auto-drop reception** when the name wraps >1 line — done in-browser via JS (`document.fonts.ready` → measure `.guest` height vs line-height → remove `.reception`), captured reliably with Chrome `--virtual-time-budget=5000`. Verified in BOTH screenshot and print-to-pdf (tested #7 keep, #58 + #10 drop).
  - Filename: `NN_fullname` — commas removed, spaces→_, lowercased, accents ASCII-folded (María→maria). NN = list number.
- Rendered all 72 → **`print/named/NN_….pdf`** (A5, vector, embedded fonts). [background job bnapachwo]
- `print/named/`: `_INDEX.csv` (number→file→names), `_details-card-shared.pdf`+300dpi (Card 2, identical for all), `README.md`. TODO after render: 300dpi PNG per card (via pdftoppm) + `_all-fronts-combined.pdf` (via pdfunite).
- Temp `mockup/_gen_NN.html` (72) to be cleaned up after.
- 2026-08-01 15:29 -- `print/named/README.md` via Write

## 2026-08-01 — Named invites → complete 2-page (front+back) per household
- Jonathan: printers want one full PDF per household including the back. Merged the shared details card (page 2) onto each personalized front via `pdfunite` → every `print/named/NN_….pdf` is now **2-page A5** (front personalized · back details). Verified page 2 = details card.
- Rebuilt combined → **`_all-invitations-combined.pdf`** (144 pages, front/back per household, list order) for one-file double-sided batch runs. Removed old `_all-fronts-combined.pdf`.
- Removed the now-orphaned front-only 300dpi PNGs (incomplete without the back; PDFs are self-contained). PNGs regenerable on request.
- Updated `print/named/README.md` for the 2-page-per-household structure.
- Folder ~855 MB (72 complete PDFs ~316M + combined ~320M dup + details). Offered to drop the combined (→ ~320M) if they only want per-household files.
- 2026-08-01 17:13 -- `print/PRINT-SPECS.md` via Edit
- 2026-08-01 17:13 -- `print/PRINT-SPECS.md` via Edit
- 2026-08-01 17:14 -- `print/named/README.md` via Write

## 2026-08-01 — SIZE CHANGE: A5 → US 5"×7"
- Jonathan: not A5 after all — printing at **US 5×7 in**. Since the design was BUILT at 5×7 and A5 was only a `zoom:1.16535` overlay, this = removing that zoom. Reverted in all 11 invite HTML + `_named_template.html`: `.card` height 180.2mm→**7in**, removed zoom; `@page` A5→**5in 7in**. Composition identical, just physically 5×7. Verified invite-B.pdf = 360×504 pts (5×7in), 2 pages, looks same.
- At 5×7 the images are displayed smaller → even higher effective dpi (building ~500, map ~530, QR ~2400) — all well past 300.
- Regenerated 72 named HTML from reverted template. Re-rendering [bg job boqu6p92v]: 8 base invites (png+pdf) + 72 named fronts, all 5×7.
- Updated `print/PRINT-SPECS.md` and `print/named/README.md` A5→5×7in (note: `perl -CSD` mangled the × char once → rewrote README clean via Write tool; use Write, not perl, for files with × / accents).
- TODO after render: rebuild print base (front/details gold+bw split + 300dpi PNGs 1500×2100), re-merge new 5×7 details into 72 named fronts (2-page), rebuild `_all-invitations-combined.pdf`. index thumbnails auto-update from re-rendered pngs. compare-all was always 5×7 (unchanged).

### 5×7 rebuild COMPLETE
- 8 base invites (png+pdf) + 72 named re-rendered at 5×7; print base split + 300dpi PNGs (now 1500×2100); 72 named re-merged to 2-page (front + new 5×7 details); `_all-invitations-combined.pdf` rebuilt (144p, 360×504pt). Verified group #14 front. Temp `_gen` html cleaned.
- **STATUS: everything is now US 5×7 in.** Base: `print/invitation-*-{gold,bw}.*`. Named: `print/named/` (72 complete 2-page PDFs + combined + index + readme, ~855M). Specs updated.
- 2026-08-01 19:22 -- `_named_template.html` via Edit
- 2026-08-01 19:22 -- `_named_template.html` via Edit

## 2026-08-01 — Single-line named margin fix
- Jonathan: double-line spacing great, but single-line (name fits 1 line → keeps reception) had too-thin top/bottom margins on the front. Measured at 5×7: base 8.6/7.6mm, DOUBLE-line 7.3/8.3mm (great), SINGLE-line only 3.9/2.9mm (too thin). Cause: single-line carries an extra guest line AND the reception, so it's the tallest case.
- Constraint: can't touch double-line (great); reception is the only element unique to single-line. Fix: JS now tags single-line front with class `.single` (multi-line still drops reception). CSS `.front.single {…}` shaves a little off several margins (request 22→16, guest 7/5→5/3, date 26→18, venue 24→18, reception 1.15em→0.6em) — spread out so nothing looks cramped. Reclaims ~9mm.
- Verified: single-line #07 → **8.6/7.6mm** (matches base), double-line #58 unchanged 7.3/8.3mm.
- Applied to `_named_template.html` (+ patched `invite-named-individual.html` proof for the index). Regenerated 72, re-rendering fronts [bg b7suq5qwi]. TODO after: re-merge details → 2-page, rebuild combined.

## 2026-08-02 — Proofread pass + "Isabel la Católica" fix
- Ran spelling/grammar/proofread on the invite text. Verified: **Dec 12 2026 = Saturday** ✓; TWELFTH / ACCOMMODATION / recommendations + all accents correct; times consistent (6pm both cards); RSVP Oct 1 consistent; email/domain consistent.
- Jonathan confirmed the rest as intended/correct: no-year-on-front (intended), building shop signs (real names from Google Maps), Wan Ting's family name order surname-first (intended), RSVP phone/email correct, "GianLucca"/"Trân" correct.
- **FIX applied:** "Isabel La Católica" → "Isabel **la** Católica" (Spanish lowercase article) in all 13 files (8 base + 3 named proofs + _named_template + compare-all). Only affects the FRONT venue block; details card unchanged.
- Re-rendering everything [bg bxs695xdc]: 8 base (png+pdf) + 3 named proofs + compare-all + 72 named fronts. TODO after: rebuild print base (split + 300dpi png), re-merge details → 2-page, rebuild combined.

## 2026-08-02 — Isabel "La" Católica: keeping TITLE CASE (per Jonathan)
- Jonathan challenged the lowercase change. Resolved: **RAE-correct is lowercase "la"** (epithet/sobrenombre article stays lowercase, even in street names — Spanish doesn't title-case), BUT real-world usage is genuinely split (Google Maps, even Wikipedia's article title use "La"). It's technically-correct-lowercase vs legitimate-title-case-styling.
- **Decision: keep TITLE CASE "Isabel La Católica"** (matches Google Maps / title-case address styling). Reverted all 13 files la→La.
- Full rebuild in one bg job [b083sqa25]: re-render 8 base + 3 proofs + compare-all + 72 named fronts (5×7, "La"), rebuild print base (split + 300dpi png), re-merge details → 2-page, rebuild combined. Note: details card has no venue, so it was unchanged either way.

## 2026-08-02 — FINAL: lowercase "Isabel la Católica" (coordinator's call)
- Wedding day-of coordinator advised lowercase → matches RAE-correct form. FINAL decision: **"Isabel la Católica"** (lowercase la). Reverted all 13 files La→la, regenerated 72.
- Stopped the in-flight title-case render (b083sqa25); launched final full rebuild [bmqwluw7w]: 8 base + 3 proofs + compare-all + 72 named fronts (5×7, lowercase la) → rebuild print base → re-merge details 2-page → combined. Includes a pdftotext venue check on output.
- This supersedes the 2026-08-02 title-case entry above. The venue line is the ONLY text that changed across these flips; details card never affected.
- 2026-08-02 14:59 -- `print/named/README.md` via Edit

## 2026-08-02 — #00 name-free keepsake (for Wan Ting)
- Added `print/named/00_keepsake.pdf` = the base invite-B (name-free, gold, 5×7, 2-page, lowercase "la"). Verified front has no guest name. Also `00_keepsake-front-300dpi.png` (1500×2100) as a framable image.
- Prepended #00 to `_all-invitations-combined.pdf` (now 146p = 73×2) and added row to `_INDEX.csv` (top). Updated README.
- (Fixed a glob bug on first combine attempt — overlapping [0-9][1-9]/[1-9][0-9] patterns duplicated files → 258p; rebuilt with single `[0-9][0-9]_*` sorted → 146p.)

## 2026-08-02 — PAUSED (project ~complete, awaiting external steps)
- **State:** Invitation suite DONE & print-ready. 73 files in `print/named/` (#00 keepsake + 72 personalized), 5×7in, gold (B&W fallback), proofed ("Isabel la Católica" lowercase), all rules applied. Base + spec sheet in `print/`.
- **Waiting on Jonathan/Wan Ting (external, nothing left for Claude on the files):**
  1. Wan Ting does a final once-through review.
  2. Hand `print/` folder → stationer/printer.
  3. Confirm gold-FOIL availability (else use B&W set).
  4. Update website RSVP page → Oct 1.
- Optional not-yet-done: paste-ready stationer handoff email (offered, Jonathan hasn't requested). Reusable generator (`generate-named-invites.py` + `_named_template.html` + `guest-list.csv`) in place if the list changes.
- Leaving project OPEN per Jonathan until printer handoff complete.
- 2026-08-03 20:52 -- `add_cropmarks.py` via Write

## 2026-08-03 — Printer feedback: crop marks + border ≥5mm from edge
- Printer asked for: (a) all fronts in one file with CROP MARKS, back as the last page on its own; (b) border ≥5mm from edge.
- **Border:** measured current outer gold line at **3.22mm** (it's a double line; printer measured the outer one — they were right, <5mm). My earlier "5.3mm" was wrong. Moved `--frame` insets 12/13/19/20 → **24/25/31/32** px → outer line now **6.35mm** from edge (verified). Applied to all 13 source files (colors preserved: gold + bw charcoal). Affects front AND back cards.
- **Crop-mark printer file:** new `add_cropmarks.py` (PyMuPDF, vector-preserving). Builds `print/named/_PRINTER-fronts+back-cropmarks.pdf` = 72 guest fronts (page 1 of each) as pages 1-72 + shared back as page 73, each imposed on a 145×195.8mm page (5×7 trim + 9mm margin) with trim marks (3mm offset, 4mm long, 0.4pt) at the 5×7 corners. **#00 keepsake EXCLUDED** per printer's "page 73" = 72+1 (flagged to Jonathan; can include → 74p if wanted).
- Full rebuild in bg [bmv605ccp]: re-render all (border-fixed) → rebuild base + keepsake → re-merge named 2-page → per-household combined → crop-mark file.

### Printer file DONE
- `print/named/_PRINTER-fronts+back-cropmarks.pdf` — 73 pages (72 fronts + back), page 145×195.8mm, 5×7in trim with crop marks. Verified front (pg33) + back (pg73): marks at all 4 corners, border 6.35mm. Vector/fonts embedded.
- All per-household files, base, keepsake also re-rendered with the 6.35mm border. Temp cleaned. README updated (printer file listed as THE file for the printer).
- Open: #00 keepsake stays separate (confirmed by Jonathan). Handoff-ready.
- 2026-08-03 21:01 -- `print/named/README.md` via Write
- 2026-08-03 21:21 -- `add_cropmarks.py` via Edit
- 2026-08-03 21:21 -- `add_cropmarks.py` via Edit
- 2026-08-03 21:23 -- `print/named/README.md` via Write

## 2026-08-03 — Swap self-addressed #01 → name-free in the print grouping
- Jonathan: don't want the copy addressed to themselves (#01 "Wan Ting Lee and Jonathan Micklos") in the print run; want the NAME-FREE version instead.
- `add_cropmarks.py`: filter changed from exclude-00 to **exclude-01** (keeps name-free #00 + guests #02-72). Rebuilt `_PRINTER-fronts+back-cropmarks.pdf` → **page 1 = name-free** (verified: no guest name), pages 2-72 = guests #02-72, page 73 = back. Still 73 pages.
- Rebuilt `_all-invitations-combined.pdf` excluding #01 → 144p (name-free #00 + #02-72).
- Self-addressed `01_*.pdf` standalone left in place (durable across regen) but excluded from BOTH print groupings; noted in README + _INDEX guidance. Border 6.35mm + crop marks intact.

## 2026-08-04 — New Casino Español building (printer's 300dpi original)
- Printer flagged the building image as not 300dpi. Jonathan supplied the true original: `casino_español_drawing_real.png` (1500×1049) in project root — a softer PENCIL/graphite style (vs the prior crisp ink), shop signs "CASIMIRES LINARES / TEXTILES CORBALAN / CASIMIRES AMERICAIN / TAES CASIMIRES".
- Processed: cropped to ink bbox (pad 14) → 1494×986; **pure-white (255) bg** so detail-preserving transparency (opaque <248, transparent >=254) is clean — no off-white rectangle, all pencil shading kept. → `mockup/assets/building.png` (505 dpi at 5×7). Prev ink version backed up `building-inkstyle-prev.png`.
- Jonathan approved a preview → running full rebuild [bg b50kcmv8h]: re-render 8 base + 3 proofs + compare-all + 72 named fronts → rebuild base + keepsake → re-merge 2-page → combined (excl #01) → `add_cropmarks.py` (printer file: name-free p1 + guests 02-72 + back, crop marks).
