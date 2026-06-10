# Worklog — Career – Find Next Role

## 2026-05-14 — Project kickoff, LinkedIn audit, Meta experience draft

### Situation
- Jonathan is M1 EM at Meta Reality Labs (Horizon OS Access Experience team), since Oct 2024
- Previously Senior SDM (L7) at Amazon leading a 25+ person org with managers reporting to him — under two years ago
- The Meta role is a massive scope reduction from Amazon. Not performance-driven — it was the company's decision due to political dynamics at Amazon (new director ousted surrounding teams, forced Jonathan out during a hiring freeze)
- The work at Meta has become "dehumanizing button-pushing for AI" — Jonathan described severe depression, questioning self-worth, working near-constantly. His words: "This needs to end."
- Comp floor: $750k/yr total comp
- Urgency: High. Not currently laid off but risk exists. Mental health impact is the primary driver.

### Approach & Rationale
- **LinkedIn first, then resume.** Rationale: LinkedIn is the passive recruiter magnet. Recruiters working $750k+ EM roles search LinkedIn daily — every day the profile is stale is a missed inbound. The LinkedIn rewrite also forces nailing the narrative first. Resume is just a reformatted version for targeted applications.
- **Phased plan:** (1) Foundation — LinkedIn + resume, (2) Strategy — target roles/companies/recruiters, (3) Outreach & applications

### What Jonathan Said
- "I need something that will give me at least $750k/yr total comp"
- "Back at Amazon (under two years ago) was leading other managers and had a 25+ person org. Now I'm slowly but surely getting marginalized into a fucking button pusher for AI at Meta"
- "It dehumanizes to an extreme degree and has me strongly depressed and questioning my self worth. I'm working near constantly. This needs to end."
- Energy level: "High for the moment"
- Scope: LinkedIn refresh, resume update, then attack plan — open to Claude recommending order

### Source Material Used
- Jonathan's LinkedIn profile at linkedin.com/in/jmicklos/ — audited for gaps
- Meta performance reviews (6 total: 2024H2 self+manager, 2025H1 self+manager, 2025H2 self+manager)
- Reviews were read in detail to extract accomplishments for the Meta experience section

### Outputs & State
- `Career – Find Next Role.md` — project note with phased plan. **Complete.**
- `linkedin-draft.md` — contains headline, About section, and Meta experience. **Meta section is drafted, Amazon sections not started.** State: draft, not yet posted to LinkedIn.
  - Headline: "Engineering Leader | Core Systems, Identity & Security at Scale"
  - About: positions Jonathan as core systems leader, mentions both Amazon routing infra and Meta VR auth, closes with "What I look for: hard problems in core systems, teams worth building, and organizations that value depth over theater"
  - Meta experience: 4 bullet sections (3P Login Program, Lockscreen Hardening & BiometricPrompt, AI Tooling, Credentials Manager)
- `meta-review-2024H2-self.md` and `-manager.md` — extracted, cleaned. **Complete.**
- `meta-review-2025H1-self.md` and `-manager.md` — extracted, cleaned. **Complete.**
- `meta-review-2025H2-self.md` and `-manager.md` — extracted, cleaned. **Complete.**

### Open Threads
- Amazon experience sections for LinkedIn not started
- Resume not started
- The Meta experience bullets in linkedin-draft.md reference internal tool names that may need obfuscation before posting

---

## 2026-05-27 — Amazon career map built from OLM archives

### Situation
- After completing the Meta sections, moved to building the Amazon narrative
- Jonathan has 3 OLM email archives from Amazon (8.4GB total, 167K+ emails) plus performance reviews, strategy docs, and other backup materials in `amazon_backup/`

### Approach & Rationale
- Scan OLM archives to mine career accomplishments rather than relying solely on Jonathan's memory
- OLM files are ZIP archives containing XML email files — listed contents first, then selectively extracted career-relevant emails (promotions, org changes, strategy, announcements)
- Also extracted and organized Amazon performance reviews into `Amazon Reviews/` folder
- Combined all sources into a single comprehensive career map document

### Source Material Used
- `amazon_backup/Email Archives/2020-08-25.olm` (1.7GB)
- `amazon_backup/Email Archives/2022-11-21.olm` (4.0GB)
- `amazon_backup/Email Archives/Outlook for Mac Archive.olm` (2.7GB)
- 10 annual Amazon performance reviews (2007-2018)
- 50+ strategy/promo/business docs from `amazon_backup/Documents/`
- Selectively extracted emails about: promotions, performance, reorgs, L7, routing, region flex, patents

### Outputs & State
- `amazon-career-map.md` — comprehensive career arc from 2007-2024, organized into 3 eras + departure. **Complete but UNVALIDATED.** This is a raw dump of everything the archives mentioned — it does not distinguish between "Jonathan drove this" vs "his org touched this" vs "he was adjacent to this." Jonathan is the only one who can make that distinction.
  - Era 1: Retail Website & Digital Devices (2007-2015) — intern through SDM, Kindle launches, Echo launch
  - Era 2: Amazon Pay / CommerceX (2016-2018) — return from Unii CTO role, physical-world shopping
  - Era 3: Buckeye / Region Flexibility Engineering (2018-2024) — the big one. Almanac, Axon, S-Team priority, L7 promo, 25+ person org
  - Departure (2024) — political ouster, hiring freeze, forced exit
- `Amazon Reviews/` — folder with extracted review documents. **Complete.**

### Open Threads
- Career map is raw/unvalidated — this is the critical gap
- Session crashed (host reboot) right after career map was built, before Amazon LinkedIn sections could be written

---

## 2026-06-06 — Session recovery, approach realignment, worklog system

### Situation
- Host rebooted, lost the May 27 session. Jonathan tried to resume by pasting chat history and sharing a session ID.
- Recovered full context by finding and reading the JSONL session transcripts stored locally at `~/.claude/projects/.../bbd13696*.jsonl` (8.9MB file)
- Jonathan flagged a critical issue: the career map contains claims he hasn't validated. He shouldn't be taking credit for things that were merely adjacent to his work.

### Approach & Rationale
- **Revised 3-step plan** (Jonathan's framing, which is better than the original):
  1. **Career narrative review** — "some sort of primary / larger overall review of my work." Go through the career map era by era. Jonathan confirms, cuts, or reframes each claim. Output: a validated "source of truth" doc.
  2. **LinkedIn update** — "a compression of #1 and also obfuscate privileged info." Public-facing copy, no proprietary details.
  3. **Resume update** — "a compression of #1 and also obfuscate privileged info." Further compressed to 1-2 pages.
- **Start with Era 3** (Buckeye/Region Flexibility, 2018-2024) since it's the most recent, most senior, and most important for positioning at the $750k+ level.
- Plan to present each claim and ask Jonathan: "yours, shared, or cut?"

### What Jonathan Said
- "I wasn't convinced that what was being said was actually work that I should take credit for"
- "I'd imagine what we actually want is (1) some sort of primary / larger overall review of my work (2) updates to linkedin that are a compression of #1 and also obfuscate privileged info (3) updates to my resume that are a compression of #1 and also obfuscate privileged info"
- Re: session persistence: "I'm at a point where I literally want the entire context / discussion with claude when we are manipulating a given project to be automatically stored in the project as we go so that we can easily just say 'go to this project and pick up where we last left off'"
- Re: worklog detail: "I want a playback of what would be necessary to gain the same context to reboot the last session"

### Outputs & State
- `worklog.md` (this file) — created and backfilled with all prior session context. **Active.**
- CLAUDE.md — updated with worklog convention for all PARA projects. **Complete.**
- Memory: `feedback_session_persistence.md` — saved preference for file-based persistence. **Complete.**

### Open Threads
- Career narrative review has not started yet
- Need to create `career-narrative-validated.md` as the output doc for step 1
- Era 3 is queued up first — the Almanac/routing plane claims, S-Team priority, org building, L7 promo basis

### Next Steps
1. Start Era 3 narrative review: read `amazon-career-map.md` Era 3 section, present each major claim to Jonathan
2. For each claim, ask: yours to claim? shared credit? cut entirely? How would you reframe it?
3. Capture validated narrative in `career-narrative-validated.md`
4. Then Era 2, then Era 1, then departure framing
5. Once narrative is validated, write Amazon LinkedIn sections (compress + obfuscate)
6. Then resume draft
---

## 2026-06-09 — Checkpoint: adversarial review of session continuity

### Situation
- Jonathan concerned that worklogs aren't detailed enough to reboot sessions. Asked for adversarial test.
- Spun up a fresh Claude agent with NO conversation context — only the worklog and project files — to probe comprehension and find gaps.

### Approach & Rationale
- Two-pass adversarial review: (1) structural comprehension test (can the agent understand the project, plan, emotional context, next steps?), (2) career detail knowledge probe (can it answer specific questions about Almanac, S-Team, patents, etc. from the worklog alone?)
- Goal: identify what a cold-start session would be UNCERTAIN about, so we can fix the persistence format.

### What Jonathan Said
- "I want a playback of what would be necessary to gain the same context to reboot the last session, does that make sense?"
- "I want you to confirm this by running an adversarial second session against this data and trying to poke holes in its understanding versus your own"
- "Please also probe it for smaller details of what my past work has been"

### Source Material Used
- Worklog (this file) — tested as standalone knowledge source
- `amazon-career-map.md`, `linkedin-draft.md`, Meta reviews — tested as supplementary sources

### Key Findings from Adversarial Review
- **Worklog scored HIGH confidence on only 1 of 15 career detail questions.** ZERO confidence on 8 of 15 (patents, tools like Axon/Disco/Replicator, S-Team priority, DUB→ZAZ migration, Meta review ratings, revenue impact).
- **The worklog tracks process well but stores almost zero career knowledge.** A fresh session knows where to look but must re-read everything.
- **Interaction format for the claim review is undefined** — biggest operational ambiguity.
- **Project note is stale** — still shows original plan, next-review past due.
- **Org size numbers contradictory** (25 vs 27 vs 69-74) — needs Jonathan's clarification.
- **Obfuscation rules undefined** — what's proprietary vs public-safe for LinkedIn.
- **Meta LinkedIn draft may also need validation pass** — written before Jonathan raised accuracy concerns.

### Decisions
- Created `context.md` as a rich snapshot (checkpoint skill format) that includes a career content digest — key claims, scale numbers, review ratings, departure timeline. This addresses the "zero career knowledge" gap.
- The context.md + worklog.md combo: context.md is the "brief a new Claude in 500 words" snapshot, worklog.md is the running history.

### Outputs & State
- `context.md` — **Created.** Rich snapshot with career digest, decisions, preferences, open threads, next steps. ~800 words. Should be sufficient for cold-start.
- `worklog.md` — **Updated** with this entry.
- CLAUDE.md — previously updated with worklog convention + checkpoint skill reference.

### Open Threads
- Career narrative validation still has NOT started — zero claims confirmed/cut/reframed
- Need to also update the stale project note after validation begins
- The checkpoint skill discovered at `06 – Skills/checkpoint.md` alongside `resume-project.md` — these are the canonical tools for session continuity going forward

### Next Steps
1. Start Era 3 narrative review (the actual work)
2. Present claims in themed blocks, ask Jonathan: yours / shared / cut
3. Capture in `career-narrative-validated.md`
- 2026-06-09 08:13 -- `Career – Find Next Role.md` via Edit
