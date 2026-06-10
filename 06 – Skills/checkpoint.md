You are checkpointing a PARA project session. Your goal is to capture the current state of understanding so a completely fresh Claude instance can resume this work at full depth.

The user will specify a project name (or you can infer it from the current conversation context). Find the matching project folder under `01 – Projects/`.

## Step 1 — Locate the project

Search `01 – Projects/` for a folder matching the project name. Set `PROJECT_DIR` to the full path.

## Step 2 — Rewrite context.md

Create or **overwrite** `${PROJECT_DIR}/context.md`. This is NOT an append — it's a fresh snapshot of current understanding. Think of it as: "If I had to brief a new Claude in 500 words, what would I say?"

Format:

```markdown
# Context — [Project Name]
*Last updated: YYYY-MM-DD*

## What this project is
[1-2 sentences: what's the goal, why does it matter, what's the deadline]

## Current state
[What's done, what's in progress, what's blocked. Be specific — name files, decisions, outputs.]

## Key decisions & rationale
[Bullet list of significant decisions and WHY they were made. Include alternatives that were rejected.]

## Jonathan's preferences
[Direct quotes or close paraphrases of things Jonathan said that shaped direction. These are the highest-value content — they prevent a new session from re-litigating settled questions.]

## Open threads
[Unresolved questions, things we were about to do, context that was loaded in working memory]

## Next steps
[Ordered list. Specific enough that a fresh Claude can act immediately without asking clarifying questions. Not "write the thing" but "write section 3 of the proposal using the data from competitor-analysis.md, focusing on the pricing angle Jonathan preferred"]
```

### Writing guidelines
- **Be concrete, not abstract.** "Edited Home.md to add sconce specs" not "Made progress on the project."
- **Name files and line numbers.** A fresh session needs to know WHERE things are.
- **Capture reasoning, not just outcomes.** Why was approach A chosen over B?
- **Jonathan's words are gold.** If he corrected you, expressed a preference, or reframed the problem — capture it verbatim.
- **500 words is the target.** Longer is fine for complex projects, but don't pad.

## Step 3 — Append to worklog.md

Append a new session entry to `${PROJECT_DIR}/worklog.md` (create the file if it doesn't exist). Use the worklog format from CLAUDE.md:

```markdown
---

## YYYY-MM-DD — [brief theme]

### Situation
[Why we worked on this, what the user cared about]

### Approach & Rationale
[What plan was chosen and why, what was rejected]

### What Jonathan Said
[Direct quotes or close paraphrases of key input]

### Source Material Used
[Files read, data gathered, key findings]

### Outputs & State
[Filename — what it contains, what state it's in]

### Open Threads
[Unresolved questions or decisions]

### Next Steps
[What to do next, in order, with detail]
```

## Step 4 — Update project frontmatter

Update the `next-review` field in the project note's frontmatter to an appropriate future date:
- If actively working: set to 3 days from now
- If pausing: set to 1 week from now
- If blocked/waiting: set to 1 week from now

## Step 5 — Confirm

Output a brief summary:
```
Checkpointed: [Project Name]
- context.md: [created/updated] ([word count] words)
- worklog.md: [appended session entry for YYYY-MM-DD]
- next-review: [updated to YYYY-MM-DD]
```
