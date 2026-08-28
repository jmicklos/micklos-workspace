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

Read all project `.md` files in `01 – Projects/` (not backlog). For each, extract:
- `todoist-project-id` from frontmatter
- `todoist-section-id` from frontmatter (if present)
- All items under `## Tasks` section, parsing:
  - `- [ ] task text <!-- todoist:TASK_ID -->` → open task, synced
  - `- [x] task text <!-- todoist:TASK_ID -->` → completed task, synced
  - `- [ ] task text` (no todoist comment) → open task, NOT yet synced
  - `- [x] task text` (no todoist comment) → completed task, NOT synced (ignore)

## Step 3 — Sync: Todoist → PARA

For each Todoist task:
1. Find the PARA project that matches the task's `project_id` (and `section_id` if applicable).
   - If the task has a `section_id`, find the PARA project with matching `todoist-section-id`.
   - If the task has no `section_id` and the `project_id` maps to multiple PARA projects (shared project), use the default:
     - `6fRX8hm4h996v6FH` ([WT&J] Wedding Planning) → `Wedding – CDMX Wedding`
     - `6c75RX2frVPFrV46` ([WT&J] House Remodel) → `Home – Remodel – Finish`
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
- `Wan Ting and Jonathan` (6X34CC5hFg7X47HF) — parent container
- `Personal` (6CrfHx3FWhxR4GWX) — parent container
- `Relationships (Personal)` (6CrfHx3FQcWfRpv4) — parent container
- All relationship sub-projects (Athul, Evelyn, Gabe, etc.)
- `Entertaining` (6fR75mPvRmrH69cC)
- `Travel` (6cV26vw52cfV2gJx)
- `Wedding Places to Consider` (6fRX9F8M4H37gjfG)
- `Work` (6fq76Wh8xfx8rcCh)
- `Backyard` (6fJrv5w5qJG7h7fh) — child of House Remodel, tasks go to V1 Landscaping section

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
```

If called from `/morning`, return this report for inclusion in the morning output. If called standalone, output it directly.
