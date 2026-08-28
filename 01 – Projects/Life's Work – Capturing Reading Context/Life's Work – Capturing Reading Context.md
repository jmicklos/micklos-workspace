---
type: project
area: Life's Work
status: active
next-review: 2026-08-15
due: 2026-08-31
energy: medium
created: 2026-08-01
---

# Life's Work – Capturing Reading Context

## Goal
Give Claude durable, decision-relevant context from the books Jonathan has read, so his reading actually informs advice (career, home, wedding, life) **automatically** — not just sitting inert as a list of titles.

## Why this matters
A list of titles is weak signal. What's useful for decisions is the *distillation* — the ideas that stick and the mental models Jonathan now reaches for — **weighted by how he actually rated each book**, and sharpened by his own written reviews. Jonathan explicitly does **not** want to hand-write book summaries; Claude performs the analysis, personalized by his ratings and reviews. His star ratings are what make the analysis *his* rather than generic.

## Done state
- [ ] Canonical Reading Library built at [[Reading Library]] covering all **38 finished books**
- [ ] Each finished book has: rating, date, thesis, ideas worth carrying, decision-relevance note
- [ ] The ~15 load-bearing books' principles promoted to Claude **persistent memory** (the mechanism that surfaces them during advice)
- [ ] Reader-profile memory written (the "mechanism-over-rhetoric" trait) — DONE 2026-08-01
- [ ] Fragmented reading files reconciled (this Library + the two older backlog files)
- [ ] Ongoing-capture handoff defined: newly finished books flow into the Library via the Reading recurring responsibility

## Scope
- **In:** 38 finished books (backfill) — full analysis
- **Stubs:** 5 currently-reading — placeholder rows, analyze on finish
- **Out:** ~47 to-read — stays as wishlist/queue, analyzed only when finished
- **Add-ins:** books not on Goodreads, as Jonathan names them

## Approach & confidence
Claude analyzes each book from its own knowledge, **weighted by Jonathan's rating** and (where present) his written review. Honest confidence policy: strong for well-known titles; flag obscure ones rather than fabricate. The two written reviews are the highest-signal inputs in the whole dataset:
- **The Color of Law (5★)** — "71 pages of notes… at times reinforcing and at times upending" → values evidentiary completeness; wants his mind changed by rigor.
- **Fight Oligarchy (2★)** — "as an engineer… it fails to provide mechanisms" → agrees with values yet rejects arguments that lack rigor.

## Key deliverables
- [[Reading Library]] — canonical resource at `03 – Resources/Reading/`
- Persistent memories — surface reading context automatically during advice
- `goodreads_library_export.csv` — source data (in this folder)

## Status
See `worklog.md`. As of 2026-08-01: scaffolding built; Library backbone (all 38 rows) + 2 exemplar analyses done; reader-profile memory written. **Remaining: analyze the other 36 finished books + promote ~15 to memory.**

## Tasks
- [ ] Analyze remaining 36 finished books into [[Reading Library]]
- [ ] Promote ~15 load-bearing books' principles to persistent memory
- [ ] Reconcile older reading files ([[Reading Backlog]] wishlist + Fucks Given [[reading-backlog]])
- [ ] Define ongoing-capture handoff in the Reading recurring responsibility
