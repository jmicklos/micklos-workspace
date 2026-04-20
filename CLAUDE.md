# CLAUDE.md — Personal PARA Vault
*AI context file for vault management*
*Last updated: 2026-04-03*

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

## File naming conventions

- **Projects are folders.** Each project is a folder containing:
  - `[Project Name]/[Project Name].md` — the main project note (same name as folder)
  - Supporting files: photos, PDFs, specs, etc. live alongside the main note
  - Example: `Home – Finish Home Automation/Home – Finish Home Automation.md` + `hvac-spec.md` + `photos/`
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

AI, Career, Digital Infrastructure, Emergency Preparedness, Finances, Health, Home, Life's Work, Photography, Relationships, Travel, Vehicles, Wedding, Work, Reading

---

## How to help

- **Creating a project**: Use the Project frontmatter schema. Ask for area, status, due date, and energy if not provided. Check if a backlog entry already exists first.
- **Daily notes**: Create in `05 – Daily/` using the daily template. Surface any upcoming recurring events or birthdays when creating today's note.
- **Surfacing todos**: Read the most recent daily note(s) and any relevant project files. Aggregate incomplete `- [ ]` items by project.
- **Moving to archive**: Always ask before archiving. Move to `04 – Archive/Archived Projects/`.
- **Adding to Inbox**: Drop to `00 – Inbox/` with a brief title. Do not auto-categorize.
- **Relationship files**: Always include `birthdate` and `relationship` fields. Use the Relationship frontmatter schema.
