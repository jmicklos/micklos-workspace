# CLAUDE.md — Personal PARA Vault
*AI context file for vault management*
*Last updated: 2026-08-21*

---

## About this vault

This is Jonathan D. Micklos's **personal** PARA vault, managed in Obsidian. It is entirely separate from his work PARA system — keep them distinct. Jonathan moved here from Todoist.

**Jonathan's role:** Engineering Manager who codes. Lives in Capitol Hill, Seattle, WA.
**Fiancé:** Wan Ting Lee (from Singapore). Wedding is actively being planned.

Claude's job here: manage this vault. Create, update, and organize notes per PARA conventions. Surface todos. Track recurring events. Do not reorganize the structure or suggest structural overhauls unless asked.

---

## PARA definitions (Jonathan's rules)

| Category | Rule |
|---|---|
| **Projects** | Has a *deadline* + a *done state*. Action-oriented, short-term. Must have a goal and deadline. |
| **Areas** | Ongoing responsibility with a standard to maintain. Never complete. No deadline. |
| **Resources** | Reference/library. No action required. Catch-all for everything useful but not project-specific. |
| **Archive** | Cold storage. Inactive projects, old areas, old resources. Archive, don't delete. |

### Project sizing
- **Micro** (1–2 weeks): "Replace 4Runner brakes", "Buy engagement ring"
- **Standard** (2–8 weeks): "Source kitchen lighting", "Launch Obsidian workflow"
- **Mega** (3+ months): Split into an Area containing multiple smaller Projects. "Wedding Planning" is an Area. "Book venue" is a Project.

---

## Vault structure

```
00 – Inbox/         Capture zone. Process regularly.
01 – Projects/      Active projects (15–20 max). backlog/ subfolder for someday/maybe.
02 – Areas/         Ongoing responsibilities.
03 – Resources/     Reference material, relationships, how-tos, etc.
04 – Archive/       Inactive everything.
05 – Daily/         Daily notes. Format: YYYY-MM-DD.md
06 – Skills/        Reusable Claude utility skills. Treated as equivalent to .claude/commands/.
98 – Dashboards/    Dataview dashboards (auto-generated views).
99 – Templates/     Templater templates. Do not modify without asking.
```

---

## Skills (`06 – Skills/`)

The `06 – Skills/` directory contains reusable Claude utility skills (`.md` files). **Treat these identically to `.claude/commands/`** — they are first-class skills that Claude should discover, list, and execute the same way.

- When a user invokes a skill by name (e.g., "use fetch-url" or "run fetch-url on this URL"), check `06 – Skills/` for a matching `.md` file and follow its instructions.
- Skills in this directory should appear in any skill/command listing alongside `.claude/commands/` entries.
- Each skill file contains its own usage instructions, parameters, and execution steps.
- This directory is version-controlled with the vault so skills travel with the project.

---

## Todoist integration

This vault syncs tasks with Todoist. Todoist is the mobile/shared task interface; Obsidian is the project knowledge layer.

### Architecture
- **API:** Direct Todoist REST API v1 (`https://api.todoist.com/api/v1/`) via curl. No MCP server.
- **Auth:** Personal API token at `~/.config/todoist/token`. Tokens don't expire unless revoked.
- **Linking:** PARA projects have `todoist-project-id` in frontmatter. Some share a Todoist project via sections (`todoist-section-id`).
- **Task identity:** Synced tasks carry `<!-- todoist:TASK_ID -->` inline comments in the PARA project's `## Tasks` section.
- **Sync engine:** `/sync` skill reads both systems and reconciles. `/morning` calls `/sync` as a step.

### Todoist structure
- **3 shared projects** (Wan Ting can see — she's on free plan, 5-project limit):
  - `[WT&J] Wedding Planning` (ID: `6fRX8hm4h996v6FH`) — sections per wedding PARA project
  - `[WT&J] House Remodel` (ID: `6c75RX2frVPFrV46`) — sections per home PARA project
  - `Rental` (ID: `6fR75W7pvJMhwQ3x`)
- **Personal projects** under `Personal` (ID: `6CrfHx3FWhxR4GWX`) — 1:1 with PARA projects
- **Inbox** (ID: `6CrfHx3FC87p9Grq`) — maps to `00 – Inbox/`

### Sync rules
- New Todoist task → create `- [ ] task text <!-- todoist:ID -->` in PARA project's `## Tasks` section
- Completed Todoist task → mark `- [x]` in PARA
- New `- [ ]` in PARA `## Tasks` (no todoist comment) → create Todoist task via API, add ID comment
- Checked `- [x]` in PARA (has todoist comment) → complete task in Todoist via API
- Todoist Inbox items → surface in `/morning` report for triage
- **Todoist wins** for task content; **PARA wins** for context

### Shared project → PARA mapping
When multiple PARA projects share one Todoist project (via sections), the mapping works as:
- Tasks in a section → mapped to the PARA project with that `todoist-section-id`
- Tasks with no section → mapped to the **default** PARA project for that Todoist project:
  - `[WT&J] Wedding Planning` default → `Wedding – CDMX Wedding`
  - `[WT&J] House Remodel` default → `Home – Remodel – Finish`

---

## Frontmatter schemas

### Project
```yaml
type: project
area: [AI | Career | Digital Infrastructure | Emergency Preparedness | Finances | Health | Home | Life's Work | Photography | Relationships | Travel | Vehicles | Wedding | Work]
status: [active | waiting | paused | someday | done]
next-review: YYYY-MM-DD
due: YYYY-MM-DD
energy: [low | medium | high]
created: YYYY-MM-DD
todoist-project-id: [Todoist project ID — links this PARA project to a Todoist project]
todoist-section-id: [Todoist section ID — optional, for PARA projects that share a Todoist project via sections (e.g., multiple wedding projects in one shared Todoist project)]
```

### Area
```yaml
type: area
review: [weekly | monthly | quarterly]
owner: Jonathan D. Micklos
created: YYYY-MM-DD
```

### Resource (general)
```yaml
type: resource
area: [area name]
status: evergreen
created: YYYY-MM-DD
source:
author:
  - Jonathan D. Micklos
published:
tags:
```

### Resource (Relationship)
```yaml
type: resource
area: Relationships
status: evergreen
name: [Full Name]
birthdate: YYYY-MM-DD
relationship: [fiancé | mother | father | friend | colleague | etc.]
created: YYYY-MM-DD
author: Jonathan D. Micklos
tags:
```

---

## Daily note template

```markdown
# YYYY-MM-DD

## Focus Today
#### Quick Next Steps
*

#### Less Quick Next Steps
*

#### Weekend
*

## Projects to Move
-

## Recurring
- [ ] Remember Wan Ting's Number [+13322075154](tel:+13322075154)

## Notes
-
```

---

## Recurring responsibilities format

Area files track recurring responsibilities using this format under `## Recurring Responsibilities`:

```
- [item name] | cadence: [cadence] | on: [schedule] | last-done: YYYY-MM-DD
```

### Cadence + `on` scheduling

| Cadence | `on` field | Example | Surfaces when |
|---|---|---|---|
| daily | (omit) | `cadence: daily` | Every day |
| weekly | day of week | `cadence: weekly \| on: saturday` | Every Saturday |
| monthly | day or position | `cadence: monthly \| on: last-weekend` | Last Sat/Sun of month |
| monthly | specific day | `cadence: monthly \| on: 15` | 15th of every month |
| quarterly | month-week | `cadence: quarterly \| on: first-week` | First week of Jan/Apr/Jul/Oct |
| annual | MM-DD | `cadence: annual \| on: 06-20` | 30 days before Jun 20 |
| annual | (omit) | `cadence: annual` | Based on last-done + 365 days |

- **`on` is optional.** If omitted, falls back to interval math from `last-done`.
- **`last-done`**: date the responsibility was last completed. Empty = never done.
- The `/morning` skill checks all area files and surfaces overdue items in the daily note.
- **When a recurring item is completed**: update `last-done` in the area file to today's date. This resets the clock.
- **Annual items with `on` dates**: surface as a todo 30 days before the date (same as birthdays).
- Sub-bullets below the item line are notes/context (not parsed by the skill).

---

## Project worklog — session continuity

Every project folder must contain a `worklog.md` that Claude maintains automatically. The goal: a fresh Claude instance can read this file and continue the work at the same level as the session that wrote it. Think of it as a **session handoff doc**, not a status report.

### Rules
1. **Create on first touch.** When Claude begins substantive work on a project, create `worklog.md` in the project folder if it doesn't exist.
2. **Update as you go.** After each meaningful exchange — a decision, a correction, a piece of context, a produced output — append to the worklog immediately. Don't batch. If the session dies mid-conversation, the worklog should reflect everything up to that point.
3. **Write for a cold reader.** A new Claude instance has zero context. The worklog must contain enough detail that it can understand: what the project is about, what approach was chosen and why, what Jonathan said that shaped the direction, what was produced, what state everything is in, and exactly what to do next.
4. **Read on resume.** When the user says "pick up where we left off" on a project, read the worklog first. It's the source of truth for session continuity.

### Format

```markdown
# Worklog — [Project Name]

## YYYY-MM-DD — [brief theme]

### Situation
- What's going on, why we're working on this, what the user cares about
- Enough context that a fresh session understands the motivation, not just the task

### Approach & Rationale
- What plan/strategy was agreed on and WHY
- Alternatives that were considered and rejected, and why
- Framing or sequencing decisions (e.g., "LinkedIn before resume because...")

### What Jonathan Said
- Direct quotes or close paraphrases of key user input — preferences, corrections, opinions, reframings
- These are the most important things to capture — they shaped every decision
- Example: "I wasn't convinced that what was being said was actually work that I should take credit for"
- Example: "I want a playback of what would be necessary to gain the same context to reboot the last session"

### Source Material Used
- What files were read, what data was gathered
- Key findings or conclusions drawn from source material
- Enough detail that the next session doesn't need to re-read everything

### Outputs & State
- [filename] — what it contains, what state it's in (draft / validated / needs review)
- What was written vs. what still needs to be written

### Open Threads
- Unresolved questions or decisions
- Things we were about to do when the session ended
- Context that was loaded in working memory (e.g., "had just finished reading all Meta reviews")

### Next Steps
- Exactly what to do next, in order, with enough detail to act immediately
- Not just "write Amazon sections" but "go through Era 3 claims one by one, ask Jonathan to confirm/cut/reframe each, starting with the Almanac/routing plane claims"

---
(repeat for each session/work block)
```

### Guiding principle
Capture anything that, if lost, would require the user to repeat themselves or re-explain context. The user's words, preferences, and corrections are the highest-value content. A worklog that only tracks tasks is nearly useless — a worklog that captures *how Jonathan thinks about this project* is what makes session continuity actually work.

---

## File naming conventions

- **Projects are folders.** Each project is a folder containing:
  - `[Project Name]/[Project Name].md` — the main project note (same name as folder)
  - `worklog.md` — Claude session continuity log (see above)
  - Supporting files: photos, PDFs, specs, etc. live alongside the main note
  - Example: `Home – Finish Home Automation/Home – Finish Home Automation.md` + `worklog.md` + `hvac-spec.md` + `photos/`
- Daily notes: `YYYY-MM-DD.md`
- Relationships: `[Full Name].md`
- No emojis in filenames.
- `[[Project Name]]` links still work in Obsidian (resolves to the .md inside the folder).

---

## Safety rules — CRITICAL

1. **Never delete content** from existing notes without explicit instruction. If something seems outdated, ask.
2. **Never remove todo items** (`- [ ]` or `- [x]`) unless explicitly told to. Checked items are still record-keeping.
3. **Never move a file to Archive** without confirmation. Ask first.
4. **Preserve all frontmatter fields** when editing. Do not remove fields even if empty.
5. **Inbox is sacred** — never auto-process or clean it without being asked.
6. When in doubt about destructive operations: ask, don't act.

---

## Current major life contexts (as of 2026-03-30)

### Wedding — Wan Ting Lee
- Singapore venue being explored (Monti: 150 person floorplan, starts 9am, needs own DJ/MC)
- Active projects: DJ, Florist, Hotel Blocks, Our Lodging, Color Palette, Program, Coordinator, Singapore Venue and Date, Invite Groomsmen, Send P1 Save the Dates, Schedule Photographer/Videographer, Skincare Plan, Ask Sister to Officiate
- Guest priority tiers: 1 (must), 2 (priority), 3 (want), 4 (unlimited budget), No (not invited)

### House — Tudor Revival, Capitol Hill, Seattle
- Studs-out remodel finishing up
- Active: Finish Basement (blinds, sconces), Finalize Wire Closet, V1 Landscaping, V1 House Decor, HA Dashboard, Install Smart Floor Thermostats, Water Leak Sensor Plan, Safe Plan, Jellyfin, Weather-based HVAC
- HVAC system: 7 Daikin mini-splits via Faikin adapters on Home Assistant (see `01 – Projects/hvac_para_project/claude.md` for full spec)
- Network: Ubiquiti Unifi, local MQTT, Zigbee2MQTT

### Emergency Prep
- Croatian secondary citizenship in progress
- Multiple backlog items (earthquake kit, state failure plan, Dashlane emergency access, internet presence, property protection)

---

## Key relationships

| Person | Relationship | Birthdate |
|---|---|---|
| Jonathan D. Micklos | Self | Apr 2 |
| Wan Ting Lee | Fiancé | 1990-10-25 (Oct 25) |
| Janet Hobe Micklos | Mother | 1957-02-27 (Feb 27) |
| Daniel L. Micklos | Father | 1957-05-24 (May 24) |
| Gabe Brown | Friend / Groomsman | 1982-11-18 (Nov 18) |
| Chris Cvetkovich | Friend / Groomsman | 1971-03-02 (Mar 2) |
| Ian Peters | Friend / Groomsman | 1990-06-26 (Jun 26) |
| Sergio Paolantonio | Friend | Jun 18 |
| Athul Acharya | Friend | 1990-10-30 (Oct 30) |
| Lauren Hobe Richter | Sister | 1988-12-07 (Dec 7) |
| Andrew Richter | Brother-in-law | 1987-01-29 (Jan 29) |
| Olivia Joanne Richter | Niece | 2024-05-28 (May 28) |
| Evelyn Richter | Niece | 2019-10-05 (Oct 5) |
| Sam Lau Boon Siang | Wan Ting's family | — |
| Eng Lee Lee | Fiancé's father | 1958-11-20 (Nov 20) |
| Jin Rui Lee | Fiancé's brother | 1988-07-07 (Jul 7) |
| Jeeihn Won | Fiancé's sister-in-law | 1993-02-04 (Feb 4) |
| Jestina Woon | Fiancé's mother | 1961-11-14 (Nov 14) |
| Diana Shi Yeon Lee | Fiancé's niece | 2018-05-12 (May 12) |
| Damien Tae Min Lee | Fiancé's nephew | 2021-10-14 (Oct 14) |

**Additional birthdays in Google Calendar (no relationship files yet):**
Jean Yang (Jul 15), Corina Peters (Mar 28), Leah Carver (1989-03-19), Michelle Liechty (Dec 17), Kenneth Shaw (1984-10-09), Kristen Lovin (1986-04-19), Tonima Chaudhury (May 1), Tom Osborne (1985-11-20), Paige Phillips (Jun 26), Carolyn (Jun 11), Lisa Gutermuth (1990-03-06), Miranda Campbell (Feb 19), Matthew Holbrook (Nov 21), Olivia Joanne Richter (May 28), Evelyn Richter (Oct 5)

| Kirti Rege | Friend | Jan 21 |
| Michael Nail | Friend | ~Sep 28 (approximate) |

---

## Recurring events to track

| Event | Cadence | Notes |
|---|---|---|
| Wan Ting Lee birthday | Annual | Oct 25 |
| Janet Micklos birthday | Annual | Feb 27 — flowers sent 2026 ✓ |
| Daniel Micklos birthday | Annual | May 24 |
| Weekly outing w/ Wan Ting | Weekly | |
| Car tabs | Annual | Due Jun 20 |
| 4Runner maintenance | Per log | Google Sheets log linked in Recurring.md |
| Seattle rrio check | Recurring | Permits/licenses — Seattle Services Portal |
| Seattle Utilities / PSE | Monthly | |
| Derm appointment | ~6 months | Next: TBD (last Oct 1, 2025) |
| Prescription | Recurring | |
| Internet presence cleanup | Annual | |
| Reading backlog review | Recurring | |
| Restaurants backlog | Recurring | |
| Music backlog | Recurring | |
| Winter getaway planning | Annual | |

**Advance notice rule:** Surface birthdays and anniversaries at least 2 weeks before. Car tabs, derm, and other annual items at least 1 month before.

---

## Areas

AI, Career, Digital Infrastructure, Emergency Preparedness, Finances, Fucks Given, Health, Home, Life's Work, Photography, Relationships, Rental Property, Travel, Vehicles, Wedding, Work

---

## Resource backlogs

Several resource files serve as "to-do" backlogs — lists of things to try, watch, read, cook, etc. These are NOT Todoist-synced (they're not actionable tasks, they're wish lists). When triaging Todoist inbox items or closing tasks that are really "things to try someday," move them to the appropriate backlog:

| Backlog | File | What goes here |
|---|---|---|
| Recipes to try | `03 – Resources/Food and Drink/Cooking.md` → `## Recipes to Try` | Dishes to cook, recipe ideas |
| Restaurants to try | `02 – Areas/Fucks Given/data/want-to-try.csv` | Restaurants on the radar |
| Movies/shows to watch | `03 – Resources/Entertainment/To Watch.md` | Movies, TV shows, documentaries |
| Reading backlog | `02 – Areas/Fucks Given/resources/reading-backlog.md` | Books, essays, long reads |
| Travel backlog | `02 – Areas/Fucks Given/data/travel-backlog.csv` | Travel destinations |
| Ghost towns (photography) | `02 – Areas/Fucks Given/data/ghost-towns-backlog.csv` | Photography/exploration destinations |
| Music discovery | `02 – Areas/Fucks Given/resources/music.md` | Artists, albums, playlists to explore |

**During `/morning` or Todoist triage:** If an item isn't a concrete task with a deliverable, it probably belongs in a backlog, not in Todoist. Move it to the right resource file and close/delete the Todoist task.

---

## Fucks Given

The `02 – Areas/Fucks Given/` area is Jonathan's personal culture advisor system. It maintains taste profiles, dining intelligence, music DNA, photography backlog, and travel frameworks for Jonathan and Wan Ting.

**Rule Zero:** "Does someone give a fuck?" — this is the filter for every recommendation. No padding, no hedging, no recommending things just because they're highly rated.

**Structure:**
- `resources/` — Living narrative files (philosophy, style, frameworks). Edit freely.
- `data/` — Structured CSV data (ratings, lists, backlogs). **Append-only. Never delete rows.**
- `planning/` — Active plans (anniversary, honeymoon).
- `source-archive/` — Immutable raw exports.

**Key files:** `resources/identity.md` (Rule Zero), `resources/system.md` (routing), `resources/dining-jonathan.md`, `resources/dining-wan-ting.md`, `resources/music.md`, `resources/travel.md`, `resources/experiences.md`, `resources/photography.md`, `resources/reading-backlog.md`.

Use the `/fucks-given` skill to load full context when working in this domain.

---

## How to help

- **Creating a project**: Use the Project frontmatter schema. Ask for area, status, due date, and energy if not provided. Check if a backlog entry already exists first.
- **Daily notes**: Create in `05 – Daily/` using the daily template. Surface any upcoming recurring events or birthdays when creating today's note.
- **Surfacing todos**: Read the most recent daily note(s) and any relevant project files. Aggregate incomplete `- [ ]` items by project.
- **Moving to archive**: Always ask before archiving. Move to `04 – Archive/Archived Projects/`.
- **Adding to Inbox**: Drop to `00 – Inbox/` with a brief title. Do not auto-categorize.
- **Relationship files**: Always include `birthdate` and `relationship` fields. Use the Relationship frontmatter schema.
- **Triaging items**: If an item is a "thing to try someday" rather than a concrete task, route it to the appropriate resource backlog (see table above), not Todoist.

---

## Model & Search Economy

- **Search/gather phases → cheapest capable tier.** For research, fact-finding, or file/vault scanning tasks, default to the lowest-cost model tier available that can reliably use tools and follow instructions. Don't default to the flagship/reasoning-tier model for this phase.
- **Checkpoint at ~10-15 searches.** If a task passes roughly 10-15 web searches without resolving, stop and report back: what's been found so far, what's still open, and why more searches are needed. Wait for confirmation before continuing. Don't self-censor scope — just surface the decision instead of silently running it up.
- **Synthesis/analysis/architecture phases → highest-capability tier, deliberate opt-in.** Reserve the flagship/reasoning-tier model (and extended thinking) for the step where results actually get reasoned over, not the step where they get collected. Highest-capability ≠ newest/most expensive available — match tier to task difficulty, not novelty.
- **Two-phase tasks: split explicitly.** If a task involves both gathering and analyzing, treat it as two sub-steps with an explicit tier switch between them, not one continuous flagship-tier session.
- **Vault reads: targeted, not blanket.** Prefer reading specific files/sections over `view`-ing large directory trees or whole vault chunks when only a subset is relevant.
- **Re-check tier mapping periodically.** Model names and relative cost/capability tiers change over time — don't assume prior tier mappings still hold. If unsure which currently-available model is cheap vs. flagship tier, ask or check before defaulting.

### Model choice must be surfaced, not silent

Before starting a gather or analyze phase (or switching between them), state:

1. **Which model tier** is proposed and why it fits this phase (gather = cheap/fast; analyze = high-capability).
2. **Relative cost estimate** — rough order of magnitude vs. the last known session cost (e.g. "similar scope to the $43 session, likely $X-Y" or "small task, <$1").
3. **Remaining capacity check** — if `/usage` has been checked recently in this session, weigh the proposal against remaining 5-hour/weekly headroom (e.g. "5-hour limit is near 100% — recommend Sonnet-only until reset" or "weekly at 8%, headroom to use Opus here").

If capacity is tight and the proposed model/approach would meaningfully eat into it, flag the cheaper alternative and let me choose, rather than proceeding on the expensive path by default.
