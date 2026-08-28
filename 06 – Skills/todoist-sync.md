You are syncing tasks between Jonathan Micklos's PARA vault and Todoist. This is a bidirectional sync — changes in either system should be reflected in the other.

## Prerequisites
- Todoist API token is at `~/.config/todoist/token`
- API base: `https://api.todoist.com/api/v1/`
- Auth header: `Authorization: Bearer <token>`

## Step 1 — Load Todoist state

Run these curl commands to get the current Todoist state:

```bash
TOKEN=$(cat ~/.config/todoist/token)

# Get all projects
curl -s -H "Authorization: Bearer $TOKEN" "https://api.todoist.com/api/v1/projects" > /tmp/todoist_projects.json

# Get all active tasks
curl -s -H "Authorization: Bearer $TOKEN" "https://api.todoist.com/api/v1/tasks" > /tmp/todoist_tasks.json

# Get all sections
curl -s -H "Authorization: Bearer $TOKEN" "https://api.todoist.com/api/v1/sections" > /tmp/todoist_sections.json
```

Parse the results. For each task, note: `id`, `content`, `project_id`, `section_id`, `due`, `is_completed`, `assignee_uid`.

## Step 2 — Load PARA state

Read all project `.md` files in `01 – Projects/` **including `00_backlog/`** — a backlog project can still carry a valid `todoist-project-id` (e.g. `Emergency Prep – Secondary Citizenship`), and excluding them made their Todoist projects look like orphans. Also read **all area `.md` files in `02 – Areas/` that have a `todoist-project-id`**. Areas are first-class sync targets — an Area with a `todoist-project-id` behaves exactly like a project. Skipping them was a real bug: Area-file tasks drifted out of date for months because nothing reconciled them.

For each, extract:
- `todoist-project-id` from frontmatter
- `todoist-section-id` from frontmatter (if present)
**Reconciliation reads the WHOLE file; pushing reads only `## Tasks`.** These are deliberately different scopes:

| Direction | Scope | Why |
|---|---|---|
| Reconcile existing links (completions both ways, content drift) | **Every `- [ ]` / `- [x]` line in the file that carries a `<!-- todoist:ID -->` marker**, under any heading | `Home – Remodel – Finish` keeps 121 linked tasks under room headings (`### Primary Bath`, `### Kitchen`). Reading only `## Tasks` would silently strand them — completions would never sync in either direction. |
| Push NEW tasks PARA → Todoist | **Only unmarked `- [ ]` inside `## Tasks`** | Opt-in by placement. Stops every stray checkbox (wish lists, waiting-on notes, cancelled items) from auto-creating Todoist tasks. |
| Land NEW tasks Todoist → PARA | Append to `## Tasks` | Single predictable destination. |

Match headings that merely **start with** `## Tasks` — a descriptive suffix like `## Tasks (Todoist-synced — section: Grounds …)` or `## Tasks — Plan` is valid and must not be treated as a missing section.

Parsing rules for task lines:
  - `- [ ] task text <!-- todoist:TASK_ID -->` → open task, synced
  - `- [x] task text <!-- todoist:TASK_ID -->` → completed task, synced
  - `- [ ] task text` (no todoist comment) → open task, NOT yet synced
  - `- [x] task text` (no todoist comment) → completed task, NOT synced (ignore)

## Step 2.5 — Skip what must not sync

Before reconciling, exclude these. They are intentionally Todoist-only and must never be flagged as orphans or synced into PARA:

1. **Recurring tasks** (`due.is_recurring == true`). These are phone-native nudges that roll forward on completion; they have no PARA equivalent. Syncing one would create a `- [ ]` that can never legitimately be checked.
   - To judge whether Jonathan is keeping up with one, **read its due date** — if it has advanced past today, it's being completed. The `tasks/completed/by_completion_date` endpoint does **not** log recurring completions, so an empty result there means nothing.
2. **Relationship sub-projects** under `Relationships (Personal)` (`6CrfHx3FQcWfRpv4`) — one per person, treated as per-person areas mirroring `03 – Resources/Relationships/`.
3. **Container/parent projects**: `Shared` (`6h5ChMwW9Rf2X5hX`), `Personal` (`6CrfHx3FWhxR4GWX`), `Relationships (Personal)`, `Inbox`.
4. **The `Ops` subtree** (`6hP8FRwggqmGmJmf`) — Jonathan's PARA-free zone for cheap action tracking. Resolve children **dynamically** by `parent_id == Ops` so new buckets are exempt automatically; do not hardcode the child IDs. Never sync, never orphan-flag, never triage.

Also: **compare content, not just IDs.** A PARA line's text can drift from its Todoist task (e.g. `Rental policy` in PARA vs. `Rental research: set up account for travel nurses` in Todoist). Todoist wins for task content — update the PARA text to match and note it in the report.

## Step 3 — Sync: Todoist → PARA

For each Todoist task:
1. Find the PARA project that matches the task's `project_id` (and `section_id` if applicable).
   - If the task has a `section_id`, find the PARA project with matching `todoist-section-id`.
   - If the task has no `section_id` and the `project_id` maps to multiple PARA projects (shared project), use the default:
     - `6fRX8hm4h996v6FH` ([WT&J] Wedding Planning) → `Wedding – CDMX Wedding`
     - `6c75RX2frVPFrV46` ([WT&J] House Remodel) → `Home – Remodel – Finish`
     - `6fR75W7pvJMhwQ3x` ([WT&J] Rental – 1120 19th Unit B) → the AREA `02 – Areas/Rental – 1120 19th Unit B/`
     - `6X34CC5hFg7X47HF` ([WT&J] Common) → NO default; flag unsectioned tasks for triage
   - If the `project_id` matches a 1:1 PARA project, use that directly.
2. Check if the task ID already exists in the PARA project's `## Tasks` section (look for `<!-- todoist:TASK_ID -->`).
3. If NOT found → **new task from Todoist**. Add `- [ ] task content <!-- todoist:TASK_ID -->` to the `## Tasks` section.
   - If no `## Tasks` section exists in the project file, create one after the frontmatter and any existing header content, before any other `##` section.
4. If found and the PARA item is `- [ ]` but the Todoist task is completed → mark `- [x]` in PARA.
5. If found and the PARA item is `- [x]` but the Todoist task is still open → this means it was completed in PARA. Handle in Step 4.

Track new tasks added and completions synced for the report.

## Step 4 — Sync: PARA → Todoist

For each PARA project with a `todoist-project-id`:
1. Read items in `## Tasks` section.
2. For items with `- [ ] text` and NO `<!-- todoist:ID -->` comment → **new task from PARA**:
   - **Skip cancelled items.** If the task text is wholly struck through (`~~…~~`) or annotated as dropped/not-doing, do NOT push it — and never push the leftover annotation. Stripping `~~…~~` from `- [ ] ~~Find a sound bar~~ — **dropped, TV has built-in audio**` once created a Todoist task named `**dropped, TV has built-in audio**`. Skip the whole line; flag it for Jonathan to close in the vault instead.
   - Create in Todoist via POST:
     ```bash
     curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
       -d '{"content": "task text", "project_id": "PROJECT_ID", "section_id": "SECTION_ID"}' \
       "https://api.todoist.com/api/v1/tasks"
     ```
   - Add the returned task ID as `<!-- todoist:RETURNED_ID -->` to the PARA line.
   - Omit `section_id` from the payload if the PARA project doesn't have `todoist-section-id`.
3. For items with `- [x] text <!-- todoist:ID -->` → **completed in PARA**:
   - Check if the Todoist task is still open (from Step 1 data).
   - If still open, complete it via POST:
     ```bash
     curl -s -X POST -H "Authorization: Bearer $TOKEN" "https://api.todoist.com/api/v1/tasks/TASK_ID/close"
     ```

Track tasks created and completed for the report.

## Step 5 — Handle Todoist Inbox

Check for tasks in the Todoist Inbox project (ID: `6CrfHx3FC87p9Grq`). These have no PARA mapping.

Do NOT auto-assign them. Instead, collect them for the sync report so Jonathan can triage manually.

## Step 6 — Handle orphan Todoist projects

Check for Todoist projects that have NO matching PARA project (no PARA file has their `todoist-project-id`). Collect these for the report.

Known non-PARA Todoist projects to ignore (don't flag as orphans):
- `Inbox` (6CrfHx3FC87p9Grq)
- `Shared` (6h5ChMwW9Rf2X5hX) — parent container
- `Personal` (6CrfHx3FWhxR4GWX) — parent container
- `Relationships (Personal)` (6CrfHx3FQcWfRpv4) — parent container
- All relationship sub-projects (Athul, Evelyn, Gabe, etc.)
- `Entertaining` (6fR75mPvRmrH69cC)
- `Travel` (6cV26vw52cfV2gJx)
- `Wedding Places to Consider` (6fRX9F8M4H37gjfG)
- `Work` (6fq76Wh8xfx8rcCh)
- `Backyard` (6fJrv5w5qJG7h7fh) — child of House Remodel, tasks go to V1 Landscaping section
- `Ops` (6hP8FRwggqmGmJmf) **and every child of it** — PARA-free zone, see Step 2.5

NOTE: `[WT&J] Common` (6X34CC5hFg7X47HF) is **no longer a container** — it is a real mapped project with sections (Legal Name Change, Post-Marriage Setup, Honeymoon, Joint Bank Accounts).

## Step 6.5 — Coverage check (MANDATORY — do not skip)

Run:

```bash
python3 "06 – Skills/sync-coverage.py"
```

This reports how many open tasks the sync can actually *see*. Exit code 1 means coverage is below 90%.

**Always include the coverage line in the report, even when it's bad — especially when it's bad.** The sync reads only `## Tasks` sections; most projects keep real work under other headings (`## Next Actions`, `### Kitchen`, …). Reporting "N tasks synced, all healthy" while silently ignoring hundreds of others is the single most misleading thing this skill can do. It has already caused real damage: duplicate tasks were captured on mobile for work the vault already tracked, because the sync couldn't see it and never said so.

Never describe the vault as healthy or "in good shape" on the basis of synced tasks alone. Coverage first, then the sync numbers.

## Step 7 — Output sync report

Format the output as follows:

```
### Todoist sync

**Todoist → PARA:**
- [N] new tasks synced from Todoist
  [list each: "→ [project]: [task content]"]
- [N] completions synced from Todoist

**PARA → Todoist:**
- [N] new tasks pushed to Todoist
  [list each: "→ [project]: [task content]"]
- [N] completions pushed to Todoist

**Inbox triage needed:**
- [list each inbox task, or "Inbox clear"]

**Orphan Todoist projects (no PARA match):**
- [list each, or "None"]

**Sync coverage:** [N]/[M] open tasks visible ([P]%) — [K] invisible
- [list projects with invisible tasks, worst first]
- [call out any project with NO ## Tasks section — nothing in it can ever sync]
```

If called from `/morning`, return this report for inclusion in the morning output. If called standalone, output it directly.
