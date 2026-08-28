---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-16
---

# Life's Work

## Standards
-

## Recurring Responsibilities
- Quote collection review | cadence: quarterly | on: first-week | last-done:
	- Read through `03 – Resources/Quotes/Recurring/Current.md` (~75 quotes, surfaced one/day by `/morning`)
	- Retire anything that no longer lands → move to `Old.md` (never delete)
	- Promote anything from `Old.md` that's become relevant again

## Notes
- reach out to Dr. Bret Weinstein about internet management policy
* Make progress on Emp alliance / commission
* Reach out to Ron Emanuel about open primaries and ranked choice. How do we win back faith in the system with a more open system?
* Reach out to the Politics Industry Folks

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Life's Work"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Life's Work"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Life's Work"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Planned Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Life's Work"
AND status = "planned"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Life's Work"
AND status = "done"
SORT file.mtime DESC
```