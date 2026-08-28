---
type: project
area: Finances
status: active
due:
energy: high
created: 2026-04-06
todoist-project-id: 6h5CQ46w7623gm55
next-review: 2026-04-13
---

# Business – Booze Clues

Building a centralized, searchable platform that answers: **who distributes this product in Washington State?** Collaboration with [[Chris Cvetkovich]].

## Definition of Done
A launched MVP that allows Washington State bar/restaurant professionals to search for a product and identify its likely distributor, with a confidence score and community validation system.

## MVP Scope (Phase 1)
- Search bar → product results → distributor info page
- Product records: name, category/type (spirit, wine, beer), brand
- Distributor records: name, contact info, rep name (optional)
- Product↔Distributor link with confidence score + last verified date
- Simple vote: "this is correct" / "this is wrong" (anonymous, no accounts needed)
- Submit a correction / new entry form
- Admin CSV import tool for bulk seeding

### Cut from MVP (Phase 2+)
- User accounts and reputation system
- Forum/comments per product
- Alerts and saved searches
- Distributor self-service portal
- Ordering integration

## Data Sourcing Strategy

### Priority Order (by automation potential)

| Source | Acquisition | Processing | Frequency | Priority |
|---|---|---|---|---|
| WA LCB public data | Automated download | Scripted import | Quarterly or as published | **1** |
| TTB COLA database | Automated download | Scripted import | Periodic bulk refresh | **1** |
| Industry contacts (Chris + network) | Manual (spreadsheet) | CSV import | One-time seed + ad hoc | **2** |
| Distributor portfolio books | Manual (PDF from reps) | LLM-assisted extraction | As received (~quarterly) | **3** |
| Total Wine partnership | Business deal | Bulk import | Post-launch | **4** |

### Processing Pipelines to Build

**Pipeline 1 — Public Data Importer (LCB + TTB)**
Structured/CSV data from government sources. Scripted, repeatable. Forms the bulk baseline dataset.
- LCB: WA is a control state for spirits — publishes price lists with product names, suppliers, pricing. Also: licensed distributor/importer lists.
- TTB COLA: Federal label approval database — every approved US label with importer/producer of record. Importer often maps 1:1 to WA distributor.

**Pipeline 2 — PDF Extractor (Distributor Portfolios)**
Manual acquisition, automated processing. Chris or industry contacts receive portfolio PDFs from reps (Southern Glazer's, RNDC, Young's, Liberator, etc.) at tastings or via email. Workflow:
1. Upload PDF to platform (or email to intake address)
2. LLM-assisted parsing extracts product names, categories, maps to distributor
3. Admin reviews/approves before data hits the database

Portfolio books tend to follow consistent formats (brand, product, size, sometimes price) — LLM extraction handles variability across distributors' formats.

**Pipeline 3 — Spreadsheet Importer (Manual Contributions)**
CSV upload for human-sourced data. Used for initial seed (Chris + 3–5 contacts, target 200–500 products) and ongoing ad hoc contributions.

### Confidence Scoring by Source
Automated public sources (LCB, TTB) provide a baseline confidence score. Human confirmation from industry insiders (Chris's network, portfolio books) bumps it up. Multiple confirming sources = high confidence.

### Total Wine — The Ace Card (Post-Launch)
**Context:** Total Wine is the industry's informal oracle. When nobody knows who distributes a product, the answer is always "call Total Wine." They have a complete product-to-distributor mapping and are willing to look things up, but it's inefficient and ad-hoc — exactly the problem Booze Clues solves at scale.

**Proposed trade:** Access to their distributor database in exchange for free advertising/visibility on the platform (which bar/restaurant buyers use daily).

**Timing:** Approach after MVP launch with demonstrated traction. "We have X hundred industry buyers using this daily — here's what your ad placement looks like."

**Risk:** They may view their data as competitive advantage. Stronger negotiating position with proven user base.

### Competitive Reference
- **SevenFifty** — existing B2B platform where distributors list portfolios. Not WA-specific, variable coverage. Study as both data reference and competitor.

## Tasks
- [ ] Define exact MVP scope with Chris <!-- todoist:6hP8H5QgMXW8x2RX -->
- [ ] Decide on tech stack <!-- todoist:6hP8H5XfRxrxm5m5 -->
- [ ] Research WA LCB public data availability (price lists, distributor licenses) <!-- todoist:6hP8H5VXwJG7Q6v5 -->
- [ ] Research TTB COLA database for importable data <!-- todoist:6hP8H5gXRrjw5m25 -->
- [ ] Build Pipeline 1: public data importer (LCB + TTB) <!-- todoist:6hP8H5fVC69PhVQX -->
- [ ] Build Pipeline 2: PDF extractor for distributor portfolio books <!-- todoist:6hP8H5hc9C4PWMf5 -->
- [ ] Build Pipeline 3: spreadsheet/CSV importer <!-- todoist:6hP8H5hRQ22HQQCX -->
- [ ] Build spreadsheet template for Chris to seed initial data <!-- todoist:6hP8H5ph79JXFXwX -->
- [ ] Study SevenFifty for competitive analysis <!-- todoist:6hP8H5rHpQQXcHhX -->
- [ ] Build search + product/distributor database (Phase 1) <!-- todoist:6hP8H5w5CvM3GxmX -->
- [ ] After MVP launch: approach Total Wine with advertising trade proposal <!-- todoist:6hP8H5xF7g9xvf75 -->

## Waiting On
- [ ]

## Log
- 2026-04-06: Project created. Background research and strategy docs compiled.
- 2026-04-06: MVP scope defined. Data sourcing strategy documented across 5 tiers — industry contacts, LCB, distributor books, TTB, and potential Total Wine partnership. Total Wine identified as the industry's existing informal oracle for distributor lookups.
- 2026-04-06: Product positioning strategy defined (4 stages: Phone Book → Directory → Platform → Marketplace). Key insight: position as "discovery not disruption" — help distributors get found, don't threaten rep relationships. No pricing data in MVP.
- 2026-04-06: ERD designed (8 entities). Product_Distributor is time-bounded (started_at/ended_at) for full history. Future: manufacturer data pipeline + mechanistic ranker.
- 2026-04-06: Downloaded LCB distributor list (605 WA distributors), TTB permittee data (552 WA importers, 1,897 wholesalers). Data freshness tracker created.
- 2026-04-06: Discovered Odom Corp publishes full brand catalog as downloadable PDF. Also: Columbia/Coldist, Winebow, Olympic Eagle have public portfolios.
- 2026-04-06: **STEEL THREAD COMPLETE.** Next.js app with SQLite + FTS5 search. 297 products (Odom Corp catalog), 1,418 distributors (TTB data). Search works end-to-end. App at `app/booze-clues/`.
- 2026-04-07: **MASSIVE DATA BUILD.** One session: 0 → 8,888 brands, 7,954 products, 1,568 distributors. 30 distributor sources scraped (Playwright, WebFetch, PDF extraction, APIs). Brand/Product split ERD. wa_availability enum (wa_confirmed/wa_likely/wa_self_distributed/wa_unknown/community_verified/disputed). Contact info with websites, order URLs, phones. OLCC cross-reference (3,645 OR spirits products).
- 2026-04-07: **GAP ANALYSIS COMPLETE.** Downloaded LCB lists for all WA wineries (985), craft distilleries (124), distiller/rectifiers (66), breweries (498 via Open Brewery DB). Cross-referenced against brand DB: 1,114 WA producers missing, 1,760 OLCC spirits brands with no known WA distributor. TTB COLA reverse lookup attempted but ttbonline.gov connection refused — needs COLA Cloud API or retry later.
- 2026-04-07: Gap data saved in `data/olcc_wa_gaps.json`, `data/wa_breweries.json`, `data/wa_wineries.json`, `data/wa_craft_distilleries.json`, `data/wa_distiller_rectifiers.json`. Full distributor research in `data/remaining_distributors_research.json` and `data/DISTRIBUTOR_ACQUISITION_LOG.md`.
