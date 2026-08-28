You are managing Jonathan Micklos's personal PARA vault. Run a morning planning session for today.

## Step 1 — Get today's date
Run `date +%Y-%m-%d` to get today's date. Also compute the date 30 days from now.

## Step 2 — Scan for upcoming events (next 30 days)

### Birthdays
Read every `.md` file recursively under `03 – Resources/Relationships/`. For each file, extract the `birthdate` frontmatter field. Parse these formats:
- `YYYY-MM-DD` → use month and day, ignore year (annual recurrence)
- `Mon DD` (e.g. `Jan 21`) → parse month name and day
- `~Mon DD` → strip the `~`, treat as approximate

Find all people whose birthday month/day falls within today through today+30 days. For each match, also check for a `deceased: true` frontmatter field and note it separately.

**Also check `todoist-project-id`.** If the person has one AND their Todoist person-project holds a recurring birthday-prep task, Todoist already pings Jonathan on his phone — do **not** add a duplicate todo to the daily note. Instead list them in the report under a "Todoist has these" line, showing the recurring task's next due date.

This is the intended division of labour, not a workaround:
- **Todoist** covers the handful of people who need real lead time to shop or plan (as of 2026-08-28: Mom, Dad, Lauren, Peter Brown). Phone ping, no vault upkeep.
- **`/morning`** covers *everyone else* by deriving birthdays from `birthdate` frontmatter — ~30 people, zero maintenance, no drift.

Neither system duplicates the other, and nobody falls through the gap.

### Relationship anniversaries
Read `03 – Resources/Relationships/Wan Ting Lee.md`. Extract the `important-dates` list. For each entry with `recurs: annually`, check if the month/day of the `date` field falls within the next 30 days. Note the `label` for each match.

For the wedding date `2026-12-12`, do not treat as a recurring anniversary — instead use it for the countdown in Step 5.

## Step 3 — Update today's daily note

Today's daily note is at `05 – Daily/YYYY-MM-DD.md` (use today's actual date).

If it doesn't exist, create it using this template:
```
# YYYY-MM-DD

## Focus Today
#### Quick Next Steps

#### Less Quick Next Steps

## Projects to Move
-

## Recurring
- [ ] Remember Wan Ting's Number [+13322075154](tel:+13322075154)

## Quote
>

## Notes
-
```

For each birthday or anniversary found in Step 2:
- If the person has `deceased: true` — do NOT add a todo. Instead, collect them for the remembrance section in the report only.
- If the person is covered by a recurring Todoist birthday task (see Step 2) — do NOT add a todo. Report only.
- Otherwise, add a todo under `#### Quick Next Steps` if one doesn't already exist:
  - Birthday: `- [ ] Tend to [Name]'s birthday ([Month Day])`
  - Anniversary: `- [ ] Tend to [label] with Wan Ting ([Month Day])`

Do not add duplicate todos. Check for the person's name before inserting.

## Step 3.5 — Check recurring responsibilities

Read all Area files in `02 – Areas/` that have a `## Recurring Responsibilities` section. Each recurring item follows this format:

```
- [item name] | cadence: [daily|weekly|monthly|quarterly|annual] | on: [schedule] | last-done: YYYY-MM-DD
```

The `on` field is optional and adds specificity to when the item surfaces.

For each recurring responsibility:

1. Parse `cadence`, `on` (if present), and `last-done`.
2. Determine if the item should surface today:

   **If `on` is present — use schedule matching:**
   - `on: saturday` → surface only on Saturdays (if last-done is before this Saturday)
   - `on: last-weekend` → surface on the last Saturday and Sunday of the month (if last-done is before this occurrence)
   - `on: 15` → surface on the 15th of each month (if last-done is before this occurrence)
   - `on: first-week` → surface during days 1–7 of the quarter start month (Jan/Apr/Jul/Oct)
   - `on: MM-DD` (e.g. `06-20`) → surface starting 30 days before that date annually (like birthdays)

   **If `on` is absent — use interval math from `last-done`:**
   - **daily**: overdue if last-done is before yesterday
   - **weekly**: overdue if last-done is 7+ days ago
   - **monthly**: overdue if last-done is 30+ days ago
   - **quarterly**: overdue if last-done is 90+ days ago
   - **annual**: overdue if last-done is 365+ days ago

   **If `last-done` is empty or missing, treat as overdue.**

3. If the item should surface, add a todo to the daily note under `## Recurring`:
   - `- [ ] [Area]: [Item name] (last done: [last-done date or "never"])`
4. Do not add duplicates — check if a todo for this item already exists in today's note.

### When a recurring item is completed

When the user tells you a recurring responsibility has been completed (or you observe it checked off in a daily note), update the corresponding Area file's `last-done` date to today's date. This resets the clock for the next occurrence.

Example area file format:
```
## Recurring Responsibilities
- Internet Presence Audit | cadence: quarterly | on: first-week | last-done: 2026-01-05
- Weekly outing with Wan Ting | cadence: weekly | on: saturday | last-done: 2026-03-28
- Car tabs renewal | cadence: annual | on: 06-20 | last-done: 2025-06-18
- Pay bills + financial check | cadence: monthly | on: last-weekend | last-done: 2026-03-29
```

## Step 3.6 — Daily quote

Run:

```bash
python3 "06 – Skills/daily-quote.py"
```

Insert the result into today's note under a `## Quote` section (create it above `## Notes`). Deterministic per date — re-running `/morning` the same day yields the same quote, so it won't churn the note.

`03 – Resources/Quotes/Recurring/` holds ~75 quotes Jonathan collected as operating principles. The folder was named "Recurring" but nothing ever surfaced them. One a day cycles the whole collection in ~2.5 months. When he reacts to one — wants it gone, or reworded — move it to `Old.md` rather than deleting.

## Step 3.7 — Todoist sync

Run the `/todoist-sync` skill. This will:
1. Pull all Todoist projects, sections, and tasks via API
2. Sync new Todoist tasks into PARA project `## Tasks` sections
3. Sync PARA task completions back to Todoist
4. Surface Todoist Inbox items for triage
5. Flag orphan Todoist projects

Capture the sync report output for inclusion in Step 6.

## Step 4 — Build today's focus stack

Read all `.md` files in `01 – Projects/` (not the backlog subfolder). Extract `status`, `due`, `next-review`, `energy`, and `area` frontmatter fields.

Rank active projects for today's focus using this priority order:
1. `status: active` with a `due` date that is today or overdue
2. `status: active` with a `next-review` date that is today or overdue
3. `status: active` with a `due` date within 14 days
4. `status: waiting` (flag as blocked)

Pick the top 5. For each, note the project name, area, due/review date, and status.

## Step 5 — PARA health

- Count files in `00 – Inbox/` (excluding `Recurring.md`)
- Count projects in `01 – Projects/` (not backlog) with `status: active`
- Count projects where `next-review` date has passed
- Calculate days until the wedding: 2026-12-12

## Step 6 — Output the morning report

Format the output as follows. Be concise — this is a quick brief, not an essay.

```
## Good morning, Jonathan — [Weekday], [Month Day Year]

### Added to today's note
[List each todo added, or "Nothing due in the next 30 days" if none]
[If any deceased people have birthdays in the window, add a quiet line: "Remembering: [Name] ([Month Day])"]

### Wedding — [N] days out
[List any active wedding projects that are stale (next-review overdue) or have no due date. If all look healthy, say so in one line.]

### Today's focus
[Numbered list of top 3–5 projects with area tag and why they're prioritized]

### Recurring responsibilities
[List any area recurring responsibilities that are due this period, or "All clear" if none]

### Quote of the day
[The quote from Step 3.6]

### Todoist sync
[Include the sync report from Step 3.7. Show new tasks synced in each direction, completions, inbox items to triage, and any orphan projects.]
[ALWAYS include the coverage line. If coverage is under 90%, lead the section with it — a sync summary without coverage overstates how much is actually tracked.]

### PARA health
- Sync coverage: [N]/[M] tasks visible to Todoist ([P]%) — flag if under 90%
- Inbox: [N] items to process
- [N] projects need review
- [N] active projects total
```

Keep the report tight. If there's nothing to flag in a section, say so in one line and move on.

## Step 7 — List active projects

After the morning report, run the `/list-projects` skill to output all active project names. This gives Jonathan a ready-to-paste list for the PARA Session Launcher (Tampermonkey script on claude.ai/code).
