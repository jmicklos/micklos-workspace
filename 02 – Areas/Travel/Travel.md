---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-23
---

# Travel

## Standards
-

## Recurring Responsibilities
- Plan winter getaway | cadence: annual | on: 09-01 | last-done:
	- Start planning in September for winter travel

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Travel"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Travel"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Travel"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Planned Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Travel"
AND status = "planned"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Travel"
AND status = "done"
SORT file.mtime DESC
```