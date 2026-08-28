# Worklog — Finances – Joint Bank Accounts

## 2026-08-20 — Project creation and scoping

### Situation
Jonathan opened the session with: *"new project – Joint Bank Accounts. Wan Ting and I will need a common account(s) for bill pay, for travel savings (honey moon as the next priority), etc.,. What will offer us the best return / ease of use?"*

Two things were being asked at once: create the PARA project, and answer the substantive question about which accounts to actually use. The honeymoon is named as the next priority for the travel-savings bucket, which sets the timeline.

### Approach & Rationale
- **Searched the vault before creating anything** (per the standing "check existing projects" guidance). Found real overlap: `Wedding – Post-Marriage Setup` already carries a task `Finance plan: bank accounts etc` (todoist `6h9rG8fPcPX4vcJm`). Decided to spin this out as its own project rather than work inside Post-Marriage Setup — the scope (structure decision + yield research + opening/funding/wiring multiple accounts + moving bills) is well past one checkbox. The parent task stays in place; it gets closed when this project completes. Nothing was deleted.
- **Asked three clarifying questions before researching**, because each one changes the answer materially rather than just adding detail:
  1. Wan Ting's US status — a non-resident spouse without an SSN/ITIN would have blocked most joint accounts outright and dragged in gift-tax and FBAR issues. Answer: **US citizen or green card**, so that entire branch is dead and any US institution is available.
  2. Steady-state balance — determines whether yield chasing is even worth the effort. Answer: **$25k–$100k**, which is the band where yield genuinely matters (roughly a few hundred to ~$2k/yr between a good and bad option) but doesn't yet trigger FDIC-limit engineering.
  3. Money model. Answer: **"yours / mine / ours"** (recommended option) — individual accounts preserved, both auto-contribute to joint.
- **Did not answer the rate question from memory.** APYs as of August 2026 are not something to guess at, and a stale number here costs real money. Launched the `deep-research` workflow instead.

### The Washington angle (the most important thing found so far)
Flagged unprompted, and explicitly written into the research brief as a hard constraint: **Washington State has no state income tax.** The single most common piece of advice for parking $25k–$100k of short-horizon cash — Treasury bills, T-bill ladders, or funds like SNSXX — leans heavily on the fact that Treasury income is exempt from *state* tax. In Seattle that exemption is worth **exactly zero**. So the usual Treasury recommendation loses most of its edge here, and options should be compared on pure after-federal-tax yield plus convenience. The research agents were instructed *not* to recommend Treasury ladders on state-tax grounds.

### What Jonathan Said
- "Wan Ting and I will need a common account(s) for bill pay, for travel savings (honey moon as the next priority), etc." — two buckets, explicitly. Bill pay and travel savings are separate jobs.
- "What will offer us the best return / ease of use?" — note the slash. He wants **both** optimized, not yield at the expense of usability. A 4.4% account with a miserable app that Wan Ting can't log into independently is a worse answer than a 4.1% account that works. Rank on both.
- Selected **"Yours / mine / ours"** over full merge — autonomy is preserved deliberately.

### Source Material Used
Read from the vault:
- `01 – Projects/Wedding – Post-Marriage Setup/` — the overlap. Confirms they're **already married** (civil ceremony done, project spun out 2026-08-01). Carries the seed task plus a "shared household information" task where account details should eventually be recorded.
- `01 – Projects/Travel – Honeymoon 2027/` — the deadline driver. **Booking deadline 2026-11-01**, trip window **Mar–Jun 2027**. Destination not locked: Patagonia / New Zealand / Namibia / Bhutan all live, and the cost spread between them is wide (Amankora and Explora are not cheap). Means the savings *target* is not yet knowable, but the ~6–10 month horizon is. That horizon is what makes this short-term cash, not investable money.
- `01 – Projects/Finances – Build FI Framework/` — establishes Schwab as the existing brokerage (Roth IRA, $7,500 in SWTSX), 100% equity allocation, and an unanswered "what's the real annual spend" question. Noted in the project file that routing shared bills through one joint account would make that question much easier to answer — a useful side benefit.
- `02 – Areas/Finances/Finances.md` — thin. Standards section is empty; the FI framework project is supposed to fill it.
- Confirmed no pre-existing joint-account project or backlog entry (grep for joint account / joint bank / joint checking / shared account returned nothing).

### Outputs & State
- `Finances – Joint Bank Accounts.md` — created. Context, decisions, constraints, cross-project mapping, task list, and open questions are written. The **Recommendation section is a placeholder** pending research.
- `worklog.md` — this file.
- Deep research workflow launched (run `wf_bf72f13e-5da`), covering: current joint-eligible HYSA APYs (Ally, Marcus, Capital One, Discover, Amex, SoFi, Wealthfront, Betterment, Synchrony), Schwab cash options and its international/ATM-rebate story, the Aug 2026 rate environment and direction, shared-usability features (buckets/vaults/separate logins), new-account bonuses, and joint-titling mechanics under Washington community property.

### Open Threads
- **Research results not yet in.** Recommendation section is empty until they land.
- **Frontmatter defaults were assumed, not confirmed:** `due: 2026-10-01` (chosen to sit a month ahead of the honeymoon booking deadline so the travel bucket is funded before deposits), `energy: medium`, `next-review: 2026-09-05`. Jonathan should confirm or adjust.
- **Todoist not wired.** No project or section created — deliberately held. This is shared work with Wan Ting, so it likely belongs as a section under `[WT&J] Common` (`6X34CC5hFg7X47HF`) rather than a Personal project, but that's Jonathan's call and involves API writes. Ask before acting.
- **Name-change sequencing is unresolved and it gates account opening.** `Wedding – Legal Name Change` owns name updates across US and SG accounts. If Wan Ting is changing her name, opening joint accounts under the old name means re-papering all of them. This needs an answer before anything is opened.

### Next Steps
1. When the research workflow returns, write the **Recommendation** section: specific institutions, which bucket lives where, estimated annual yield vs. leaving it in big-bank checking, and the ease-of-use tradeoffs. Flag volatile figures for verification at open time.
2. Confirm the assumed frontmatter (due date, energy) with Jonathan.
3. Resolve the name-change sequencing question — it blocks the "open accounts" tasks.
4. Ask whether to create the Todoist section under `[WT&J] Common`, and sync the task list if yes.
5. Once a honeymoon destination is chosen in `Travel – Honeymoon 2027`, come back and set the actual savings target and monthly contribution.
6. Add a cross-reference line in `Wedding – Post-Marriage Setup` pointing its finance task at this project (additive only — do not remove the task). — **done 2026-08-21**

---

## 2026-08-21 — Research landed; recommendation written

### Situation
The deep-research workflow finished overnight. It hit the session limit near the end: the **synthesis agent died**, along with three verifier agents assigned to the rate-environment claims. Jonathan asked "are you going again?" and noted "you reached the session limit last time."

**Decision: did not re-run.** The expensive part had already succeeded — 23 sources fetched, 115 claims extracted, 25 adversarially verified by 3-vote, 18 confirmed. Only the final merge step was missing, and that's synthesis over data already in hand. Re-running would have burned another ~3M subagent tokens to regenerate results sitting in the output file. Read the raw output and journal directly and synthesized by hand instead. Worth remembering as a general pattern: **a failed synthesis step is not a failed research run.**

### Findings that changed the answer

**1. The Washington thesis was confirmed by the numbers, not just theory.** SWVXX (prime) yields **3.50%** vs SNSXX (Treasury-only) **3.41%** as of 08/19/2026. SNSXX exists to deliver state-tax-exempt income; in WA that's worth $0, so it's strictly dominated here — lower yield, no compensating benefit. Same reasoning kills the T-bill-ladder advice the internet would give. This was worth flagging up front and it held.

**2. The Schwab trap — the most valuable finding.** Because Schwab is where Jonathan's brokerage lives, the path of least resistance is to open joint savings there too. That would be expensive: **Schwab Bank Investor Savings pays 0.15% APY** at every tier including $50k–$100k, and Interest Checking Plus pays 0.01%. Against a ~3.40% HYSA that's **~$1,600/yr forgone on $50k.** Also learned Schwab has **eliminated money funds as the automatic sweep**, so idle cash doesn't even earn the money-fund rate by default. Conclusion: use Schwab checking for its transactional features, never as a yield vehicle.

**3. Schwab checking is still the right joint checking** — unlimited *worldwide* ATM fee rebates and no foreign transaction fee. Given Singapore travel plus the honeymoon, that's the strongest travel-checking product available and the yield on a small float is irrelevant. Logistics gotcha found: **a joint Investor Checking linked to a joint brokerage cannot be opened online** — requires calling 888-403-9000 or a branch visit.

**4. Caught a sequencing error in my own reasoning.** A plain 9-month CD (Marcus, 4.10%, 70bp over its own savings rate) looked like the obvious home for honeymoon money given the known Mar–Jun 2027 spend date. But honeymoon *deposits start landing this fall* — the booking deadline is 2026-11-01 — so a locked CD would trap money needed in November. Resolved by recommending a **no-penalty/add-on CD** (Climate First Flex CD, 4.07–4.18%, add-on deposits, one penalty-free withdrawal of half principal) or splitting the bucket.

**5. Two priors overturned.** Amex **does** support joint accounts (JTWROS) on its online savings — contrary to the widely repeated claim, and contrary to what I'd assumed when writing the research brief. And the bonus-chasing angle is weaker than it looks: Capital One's $250 and SoFi's tiered bonus both require a *qualifying direct deposit*, which a recurring ACH push from your own outside bank frequently does **not** satisfy — and that's precisely how a yours/mine/ours structure funds a joint account.

**6. WA titling.** RCW 30A.22.100 makes **right of survivorship a distinct affirmative election** — "joint" alone doesn't mean survivorship, it has to be asked for. RCW 30A.22.030(5) says account form does *not* change the community/separate character of funds, so joint titling is a convenience/probate decision rather than a property-character one. A Community Property Survivorship Agreement is the broader instrument and belongs in the estate conversation under `Wedding – Legal Name Change`.

### Confidence caveats carried into the project file
- **Rate-environment claims are UNVERIFIED** — all three verifiers died on the session limit. Fed funds 3.50%–3.75%, no 2026 cuts, June SEP implying ~one cut. Three independent sources agree, so directionally sound, but it did not survive adversarial verification and is labeled as such.
- All APYs are dated Aug 19–21, 2026 and variable. The project file says re-verify every one on the day of opening.
- Motley Fool's competitor HYSA table is May 2026 data from a secondary source — flagged as verify-before-use.
- Wealthfront's advertised APY carried a stale as-of date; the "it's stale" claim was itself refuted 0-3, leaving the live rate genuinely unresolved. Marked re-verify.

### Outputs & State
- `Finances – Joint Bank Accounts.md` — **Recommendation section written and complete.** Three-account structure, the Schwab trap, the WA/SWVXX-vs-SNSXX analysis, rate environment with caveat, the deposit-sequencing wrinkle, a yield-delta table (~$1,700–$2,050/yr vs. big-bank checking on $60k), WA titling mechanics, and a pre-action verification checklist.
- Raw research output retained at `/private/tmp/claude-501/.../tasks/wwae1n3mb.output`; workflow run `wf_bf72f13e-5da`. **Note: that's a temp path and will be cleaned up** — everything load-bearing has been copied into the project file.

### Open Threads
Unchanged from 2026-08-20 and still blocking:
- **Name-change sequencing** — gates opening any account.
- **Todoist wiring** — not created, awaiting Jonathan's call on `[WT&J] Common` vs Personal.
- **Frontmatter defaults** (due 2026-10-01, energy medium) still unconfirmed.
- Honeymoon dollar target still unknown pending destination choice in `Travel – Honeymoon 2027`.

### Next Steps
1. Jonathan reviews the recommendation and confirms the three-account structure (or picks a different HYSA).
2. Resolve name-change sequencing before opening anything.
3. Decide CD approach: no-penalty Flex CD vs. split-the-bucket. Depends partly on the honeymoon deposit schedule, which isn't known yet.
4. On the day of opening: re-verify every APY, and explicitly request **joint with right of survivorship**.
5. Budget a phone call to Schwab (888-403-9000) for the joint checking.
6. Revisit once the honeymoon destination lands to set the monthly contribution.

---
- 2026-08-21 13:26 -- `Finances – Joint Bank Accounts.md` via Edit
