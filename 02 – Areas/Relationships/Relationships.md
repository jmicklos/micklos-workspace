---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-14
---

# Relationship

## Standards
-

## Recurring Responsibilities
*(none tracked here — see note below)*

> **Recurring relationship nudges live in Todoist, not here.** Removed 2026-08-28: `Weekly outing with Wan Ting | cadence: weekly | on: saturday | last-done:`. It duplicated the Todoist recurring task **"Schedule datenight with Wan Ting"** (every Monday, under the `Wan Ting Lee` person-project). Its `last-done` was never filled in — because completions happen in Todoist — so `/morning` reported it overdue every single day while the commitment was actually being kept.
>
> Rule of thumb: a recurring item belongs **here** only if it has state worth tracking (`last-done` drives the cadence) and gets completed in the vault. If it's a phone nudge you tick off in Todoist, leave it in Todoist. See CLAUDE.md › *What does NOT sync*.

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Relationships"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Relationships"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Relationships"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Someday Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Relationships"
AND status = "someday"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Relationships"
AND status = "done"
SORT file.mtime DESC
```
