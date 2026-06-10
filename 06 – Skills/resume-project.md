You are resuming work on a PARA project. Your goal is to reconstruct full working context so you can continue seamlessly — as if the previous session never ended.

The user will specify a project name (or you can infer it from context). Find the matching project folder under `01 – Projects/`.

## Step 1 — Locate the project

Search `01 – Projects/` for a folder matching the project name. If ambiguous, list matches and ask.

Set `PROJECT_DIR` to the full path of the project folder.

## Step 2 — Read context.md (primary briefing)

Read `${PROJECT_DIR}/context.md` if it exists. This is the most important file — it contains the compressed current state of the project as of the last checkpoint.

If `context.md` does not exist, note this and rely more heavily on the worklog and project note.

## Step 3 — Read the project note

Read `${PROJECT_DIR}/[Project Name].md` (the main project note, same name as the folder). Extract:
- Frontmatter: status, area, due date, energy, next-review
- Current state of todos (checked and unchecked)
- Any key content or decisions documented in the note body

## Step 4 — Read the worklog

Read `${PROJECT_DIR}/worklog.md` if it exists. Focus on:
- The **most recent entry** — what was the last session about?
- The **Next Steps** section of the most recent entry — what was queued up?
- The **Open Threads** section — what was unresolved?
- The **What Jonathan Said** section — what preferences or opinions shaped the direction?

If the worklog is long (more than ~200 lines), read only the last 2-3 entries.

## Step 5 — Check recent daily notes for mentions

Read the 3 most recent daily notes in `05 – Daily/` (sorted by filename descending). Search for any mention of the project name. This catches informal context like "need to follow up on X" or checked-off tasks that haven't been reflected in the project files.

## Step 6 — Check for supporting files

List all files in `${PROJECT_DIR}/` beyond the project note, worklog, and context file. Note what exists (specs, photos, data files, subfolders) so you know what resources are available without having to discover them mid-session.

## Step 7 — Synthesize and brief

Output a structured briefing:

```
## Resuming: [Project Name]

### Status
[Active/waiting/paused] | Area: [area] | Due: [date or "none"] | Energy: [level]

### Where we left off
[2-3 sentences synthesizing the most recent worklog entry + context.md. What was happening? What was the last meaningful action?]

### Key decisions & preferences
[Bullet list of Jonathan's stated opinions, corrections, or preferences from the worklog's "What Jonathan Said" sections and context.md. These guide all future work.]

### Open threads
[Unresolved questions or decisions from the last session]

### Available resources
[List of supporting files in the project folder]

### Next steps
[Ordered list from the most recent worklog/context.md. Specific enough to act on immediately.]
```

## Step 8 — Rename the session

Rename the current session to the project name using `/rename [Project Name]`. This makes it easy to identify which project each session is working on in the claude.ai/code sidebar.

## Step 9 — Confirm with the user

After presenting the briefing, ask: "Does this match where you want to pick up, or should we adjust direction?"

Do NOT start working on next steps until the user confirms or redirects.
