# Worklog — Digital Infrastructure – Todoist Integration
- 2026-07-12 14:40 -- `Digital Infrastructure – Todoist Integration.md` via Write

## 2026-07-07 — Project inception and approach decision

### Situation
- Jonathan uses a PARA vault in Obsidian as his personal productivity system. He moved here from Todoist originally.
- Three friction points emerged that Obsidian can't solve well:
  1. No quick mobile task view
  2. Can't share task lists with fiancé Wan Ting
  3. Wan Ting can't assign tasks to Jonathan without touching Obsidian
- Jonathan proposed syncing Todoist as a task layer on top of PARA projects

### Approach & Rationale
- **Decided: Direct Todoist REST API v2 via curl** — simplest, most private, no external dependencies
- **Rejected: Todoist MCP server (official, by Doist)**
  - Remote mode (`ai.todoist.net/mcp`) routes task data through Doist's servers — privacy concern
  - Local mode (`npx @doist/todoist-mcp`) adds an npx dependency for no real gain over curl
  - Jonathan asked "how do I know I can trust it?" — legitimate concern. Even though it's official Doist, direct API is strictly simpler
  - We actually installed the MCP server briefly (`claude mcp add --transport http todoist https://ai.todoist.net/mcp`) then removed it after deciding on direct API
- **Decided: Todoist personal API token** — doesn't expire unless revoked or password changed. Set-and-forget. Store at `~/.config/todoist/token`
- **Decided: No bidirectional sync** — Claude reads both systems during `/morning` and surfaces deltas for Jonathan to act on
- **Decided: Responsibility split** — Todoist owns actionable tasks + shared lists + mobile; Obsidian owns context + worklogs + research + recurring responsibilities

### What Jonathan Said
- "The friction is: 1. A quick mobile view, 2. Tasks/projects with todo items I can share with my fiancé, 3. Tasks she can share with me and I can do something with"
- "Before we do this, we should make this a PARA project, ya? And include backing up all the context in the same way we would otherwise with other PARA projects, ya?"
- "This MCP server, how do I know I can trust it?" — drove the decision to evaluate alternatives
- "Are there other non-MCP ways to approach this? Doesn't todoist have an API?" — led to the direct API approach
- "If we go with option 3, how often will we need to rotate the token?" — confirmed tokens don't expire

### Design (agreed but not yet implemented)

**`/morning` skill Todoist sync step will:**
1. Pull all Todoist projects and tasks via REST API
2. Match to PARA projects via `todoist-project` frontmatter field
3. Surface new shared tasks (e.g., "Wan Ting added 3 tasks to Wedding")
4. Flag orphans — Todoist tasks with no PARA match, or PARA projects with no Todoist project
5. Add a "Todoist sync" section to the morning report

**Linking convention:**
- PARA project files get `todoist-project: <project_name_or_id>` in frontmatter
- Todoist project descriptions contain a pointer back: "PARA: `01 – Projects/...`"

**Todoist project structure:**
- One Todoist project per active PARA project that has tasks
- Shared projects for joint stuff with Wan Ting (wedding, house, groceries)
- A "Capture" project for mobile inbox items

### Outputs & State
- `Digital Infrastructure – Todoist Integration.md` — project file, complete
- `worklog.md` — this file, complete
- MCP server removed from Claude config

### Open Threads
- ~~Need Jonathan to generate his Todoist API token and store it~~ DONE
- ~~Haven't yet mapped which PARA projects need Todoist counterparts~~ DONE
- ~~Haven't designed the exact `/morning` skill additions yet~~ DONE
- ~~Haven't decided if `todoist-project` frontmatter should use Todoist project name or numeric ID~~ DECIDED: ID

### Next Steps
1. ~~Jonathan generates Todoist API token~~ DONE
2. ~~Design the exact API calls needed for `/morning` sync~~ DONE
3. ~~Map active PARA projects to planned Todoist projects~~ DONE
4. ~~Update `/morning` skill with the Todoist sync step~~ DONE
5. Test end-to-end with real Todoist data ← **START HERE**

---

## 2026-07-12 — Implementation session

### Situation
- Continuing from design session. Jonathan provided Todoist API token for storage.
- REST API v2 turned out to be deprecated (410 Gone). Switched to API v1 (`/api/v1/`).

### Approach & Rationale
- **Design evolved from "read-only morning report" to full bidirectional sync**
  - Jonathan wants tasks synced between both systems, not just surfaced
  - Key driver: "This will allow me to prioritize my deliverables in Todoist WITHOUT having to go through the entire PARA process"
  - Sharing with Wan Ting is the primary motivator
- **Wan Ting is on Todoist free plan (5 project limit, includes child projects)**
  - She can currently see 3 shared projects: Wedding Planning, House Remodel, Rental
  - Multiple PARA projects map to single shared Todoist projects via **sections**
  - Personal PARA projects get 1:1 Todoist projects (doesn't affect her limit)
- **Todoist hierarchy is UX, not structural** — Jonathan's key insight
  - `todoist-project-id` in frontmatter is the actual link
  - Hierarchy helps humans and gives Claude classification hints for new projects
  - No need to mirror PARA structure in Todoist
- **Every active PARA project gets a Todoist project** — Jonathan's preference over selective mapping
  - "What's the downside?" — basically none on paid plan (300 project limit)
  - Simpler mental model: any PARA project can accept tasks from Todoist anytime
- **Task identity via inline HTML comments** — `<!-- todoist:TASK_ID -->`
  - Invisible in Obsidian rendered view
  - Required for reliable completion sync (fuzzy matching would break)

### What Jonathan Said
- "I think the best thing to do would be to have a 1:1 map structure of todo items and folder structure"
- "If a todoist task is added somewhere, it should then be reflected in PARA and the morning command should identify it and do something about it. If it's closed in todoist, ditto in PARA and vice versa"
- "A key important thing that I am trying to accomplish here is sharing task tracking with my fiancée"
- "Wan Ting only has the free version (5 projects at a time ... sigh) ... and that includes child projects (another big sigh)"
- On shared projects: "let's use those three and we can have a many PARA project to one Todoist project structure wherein there is a default PARA project for new items added to todoist"
- On hierarchy: "If we are going with project IDs for mapping in the MD files, then we really don't actually care about the hierarchy programmatically speaking, yes?"
- "I see you put the bachelor party under the wan ting shared wedding project ... let's not do that" — Bachelor Party moved to personal
- On 1:1 mapping: "what's the downside of taking my approach for at least the projects?" — convinced me to just do it

### Source Material Used
- Todoist API v1 responses: projects, tasks, sections
- Existing Todoist structure: Inbox, Wan Ting and Jonathan (shared parent), Personal, Work, Relationships sub-projects
- All 27 PARA project files — frontmatter extracted for status, area, due dates

### Outputs & State
- `~/.config/todoist/token` — API token stored, chmod 600
- `CLAUDE.md` — updated with Todoist integration section and `todoist-project-id`/`todoist-section-id` in frontmatter schema
- `06 – Skills/todoist-sync.md` — full sync skill, created
- `06 – Skills/morning.md` — updated with Step 3.7 (Todoist sync) and report section
- 24 PARA project files — `todoist-project-id` (and `todoist-section-id` where applicable) added to frontmatter
- Todoist sections created in shared projects:
  - Wedding Planning: Singapore (existed), CDMX Wedding, Seattle Civil Ceremony, Bachelor Party (deleted — moved to personal), Wedding Bands
  - House Remodel: Remodel – Finish, ADU Readiness, Living Room TV, Backyard Cleanup, Mount Dining Room Light, Granite Dining Table, V1 Landscaping
- 17 new personal Todoist projects created under Personal
- 5 duplicate personal projects deleted (Home ones that map to shared sections)
- Orphaned [WT&J] projects renamed: Entertaining, Travel, Wedding Places to Consider

### Todoist → PARA mapping (complete)

**Shared (via sections):**
| Todoist Project | Section | PARA Project |
|---|---|---|
| [WT&J] Wedding Planning (6fRX8hm4h996v6FH) | CDMX Wedding (6h5CPv6pcFWH78XH) | Wedding – CDMX Wedding |
| [WT&J] Wedding Planning | Seattle Civil Ceremony (6h5CPv5GMFQC8jCH) | Wedding – Seattle Civil Ceremony |
| [WT&J] Wedding Planning | Singapore (6fVP8rPc699793JH) | Wedding – Singapore Tea Ceremony |
| [WT&J] Wedding Planning | Wedding Bands (6h5CPv8wqVx3H88q) | Wedding – Wedding Bands |
| [WT&J] House Remodel (6c75RX2frVPFrV46) | Remodel – Finish (6h5CPv8FjrQcQwg6) | Home – Remodel – Finish |
| [WT&J] House Remodel | ADU Readiness (6h5CPv8JH7CfxpHc) | Home – Remodel – ADU Readiness |
| [WT&J] House Remodel | Living Room TV (6h5CPvF6m6X5rwW6) | Home – Remodel – Living Room TV |
| [WT&J] House Remodel | Backyard Cleanup (6h5CPvGfx6XHR6W6) | Home – Backyard Cleanup |
| [WT&J] House Remodel | Mount Dining Room Light (6h5CPvG8vG3h8HJ6) | Home – Mount Dining Room Light |
| [WT&J] House Remodel | Granite Dining Table (6h5CPvGqJ9fv24V6) | Home – Granite Dining Table |
| [WT&J] House Remodel | V1 Landscaping (6h5CPvMQHG23f98c) | Home – V1 Landscaping |

**1:1 Personal:**
| Todoist Project (ID) | PARA Project |
|---|---|
| Wedding – Bachelor Party (6h5CQ75X5wrfwMQJ) | Wedding – Bachelor Party |
| 4Runner – Replace Roof Rack and Ladder (6h5CQ43mm6Hg4vR6) | 4Runner – Replace Roof Rack and Ladder |
| Business – Booze Clues (6h5CQ46w7623gm55) | Business – Booze Clues |
| Digital Infrastructure – Todoist Integration (6h5CQ46R97pqrcfw) | Digital Infrastructure – Todoist Integration |
| Emergency Prep – Replace Backblaze (6h5CQ4C9XVhxJ8Q8) | Emergency Prep – Replace Backblaze |
| Home – Resolve Block Encampment (6h5CQ4RFqVX4H4j3) | Home – Resolve Block Encampment |
| Relationships – Awesome Year Plan (6h5CQ4RGMCvPH392) | Relationships – Awesome Year Plan |
| Stuff – Sell Ampeg Cab (6h5CQ4XjpCpxFG6j) | Stuff – Sell Ampeg Cab |
| Stuff – Statuettes (6h5CQ4hHvFrj9QVx) | Stuff – Statuettes |
| Travel – Alaska Fishing (6h5CQ4fRcpRvCR4Q) | Travel – Alaska Fishing |
| Travel – North Cascades Camping (6h5CQ4pMcVFgGpwc) | Travel – North Cascades Camping |
| Vehicles – Fix Android Auto Crash (6h5CQ4mrRGhRPP4W) | Vehicles – Fix Android Auto Crash |
| Career – Find Next Role (6h5CQ4qgQ87vgjXG) | Career – Find Next Role |

### Open Threads
- Existing Todoist tasks (from before this integration) are NOT yet synced into PARA `## Tasks` sections — first `/sync` run will pull them in
- Several Todoist tasks have overdue dates from Feb/Mar 2026 — will surface during first sync
- Todoist Inbox has stale items (Plaud, nasi lemak, laksa, Croatian citizenship) — need triage
- Backlog PARA projects don't have Todoist counterparts yet (by design — can add later)
- `4Runner – Improve Fuel Efficiency` is paused, has no Todoist project (intentional)
- `Backyard` Todoist project (6fJrv5w5qJG7h7fh) is a child of House Remodel but separate from sections — tasks there should probably route to V1 Landscaping
- Relationship sub-projects in Todoist (Athul, Evelyn, Gabe, etc.) are not mapped to PARA projects — they're more like relationship resource context

### Next Steps
1. Run `/todoist-sync` for the first time to pull existing Todoist tasks into PARA `## Tasks` sections
2. Triage Todoist Inbox items
3. Verify the full round-trip: add a test task in Todoist, run sync, confirm it appears in PARA, check it off in PARA, run sync, confirm it's completed in Todoist
4. Consider what to do with existing Todoist tasks that have no `## Tasks` section in their PARA project yet
- 2026-08-10 13:01 -- `Digital Infrastructure – Todoist Integration.md` via Edit
- 2026-08-10 13:01 -- `Digital Infrastructure – Todoist Integration.md` via Edit
