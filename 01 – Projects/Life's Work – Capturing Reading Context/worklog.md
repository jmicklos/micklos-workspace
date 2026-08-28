# Worklog — Capturing Reading Context

## 2026-08-01 — Project kickoff, scaffolding, and first analysis pass

### Situation
- Jonathan wants Claude to have the context of the books he reads when making decisions — so his reading informs advice automatically, rather than being a dead list of titles.
- He asked whether Claude already had this (it didn't — three fragmented, near-empty reading files) and whether he could feed the books in some form.
- Decision: seed from a **Goodreads export** (Jonathan provided the CSV), and Claude does the analysis so Jonathan doesn't have to write summaries.
- He then asked to formalize this as a project. Chose **Life's Work** area, **no Todoist sync**.

### Approach & Rationale
- **Titles are weak signal; distillations weighted by his ratings are strong signal.** So the core method is: Claude analyzes each book from its own knowledge, weighted by Jonathan's star rating and (crucially) his written reviews.
- Two-layer design: (1) a durable **Reading Library** resource file = the archive; (2) **persistent memories** for the load-bearing books = the mechanism that actually reaches Claude at decision time. The library alone wouldn't get pulled into decisions; memory auto-loads each session.
- Filed the library as a **Resource** (evergreen reference) at `03 – Resources/Reading/Reading Library.md`; the **project** drives the effort of building it + writing memories.
- Rejected: loading full book text (impractical, and not the point — his synthesis/ratings are the gold). Rejected: having Jonathan write summaries (he explicitly declined — too time-intensive).

### What Jonathan Said
- "I want you to be able to have the context of the books that I read when making decisions."
- On depth: "I do actually want you to perform the analysis for me so that I don't necessarily need to go ahead and write a summary of the book. that feels unnecessarily time intensive for me."
- "I really want to make sure you have the right context from these books, you'll give me it?" — he wants *proof* the analysis captures the right thing, not just a promise. Responded by demonstrating deep analysis on his two reviewed books + the emergent ratings profile before scaling.
- "let's make this a new project – capturing reading context"

### Source Material Used
- `goodreads_library_export.csv` (copied into project folder). Contents: **38 finished**, **5 currently-reading**, ~47 to-read.
- **Highest-signal finding — the two written reviews:**
  - *The Color of Law* (5★): praises "71 pages of notes and bibliography," says it "substantially impacted my understanding of US history — at times reinforcing and at times upending." His stated go-to book recommendation.
  - *Fight Oligarchy* (2★): "as an engineer… it fails to provide explanations or mechanisms on the sustainability of those recommendations." Agrees with values, rejects the argument for lack of rigor. Felt like "an extended collage of brief campaign clips."
- **Ratings pattern:** 5★ cluster on (a) democratic health/authoritarianism, (b) evidence-dense big-history/systems, (c) meaning & stoic agency, (d) self-authorship / "not giving a f*ck", (e) relationships-as-systems. **Pop-management books rate LOW** (Radical Candor 3, First 90 Days 3, Purple Cow 3) — the one 5★ management book, *Built to Last*, is the research-dense one. → He distrusts framework-of-the-week; wants mechanism + evidence.

### Outputs & State
- `Life's Work – Capturing Reading Context.md` — project note, done-state checklist. Created.
- `worklog.md` — this file. Created.
- `goodreads_library_export.csv` — source, copied in. Done.
- `03 – Resources/Reading/Reading Library.md` — canonical library. **Backbone (all 38 rows w/ rating+date) + full analysis of the 2 reviewed books.** Other 36 marked "analysis pending."
- Memory `user_reading_profile.md` — the mechanism-over-rhetoric reader trait. Written + indexed in MEMORY.md.

### Open Threads
- 36 finished books still need analysis.
- ~15 load-bearing books still need promotion to persistent memory (candidates: Man's Search for Meaning, Why Nations Fail, How Democracies Die, Tyranny of the Minority, The Color of Law, Attached, How to Not Die Alone, Never Split the Difference, both "Not Giving a F*ck" books, Living Forward, The Art of Impossible, Built to Last, Guns Germs and Steel, The Myth of Sisyphus).
- Older reading files not yet reconciled (kept intact per safety rules — nothing deleted).
- **Offered but not yet chosen:** grind the 36 in steady in-session batches, OR fan out a parallel Workflow to analyze them all at once (needs Jonathan's explicit opt-in — would spend meaningful tokens).

### Next Steps
1. Get Jonathan's read on the exemplar analysis depth (Color of Law + Fight Oligarchy) — is that the right altitude?
2. Decide grind method: steady batches vs. parallel workflow.
3. Analyze remaining 36, highest-signal first (5★ then 4★ then rest).
4. As each load-bearing book is analyzed, write its principle memory + add MEMORY.md pointer.
5. Reconcile old reading files; define ongoing-capture handoff.
