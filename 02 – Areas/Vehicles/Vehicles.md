---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-14
---

# Vehicles

## Standards
-

## Recurring Responsibilities
- Car tabs renewal | cadence: annual | on: 06-20 | last-done:
	- Due Jun 20 each year — surfaces 30 days before
- 4Runner maintenance check | cadence: quarterly | on: first-week | last-done: 2026-03-31
	- Review 4Runner Health Tracker for overdue intervals
	- Google Sheets maintenance log: see Recurring.md link

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Vehicles"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Vehicles"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Vehicles"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Someday Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Vehicles"
AND status = "someday"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Vehicles"
AND status = "done"
SORT file.mtime DESC
```
