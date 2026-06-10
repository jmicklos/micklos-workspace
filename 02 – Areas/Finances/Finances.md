---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-14
---

# Finances

## Standards
-

## Recurring Responsibilities
- Audit monthly subscriptions | cadence: monthly | on: last-weekend | last-done: 2026-06-06
	- Review all recurring subscriptions, evaluate keep/cancel/downgrade
- Document goodwill donations | cadence: monthly | on: last-weekend | last-done:
	- Log any goodwill donations made during the month for tax records

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Finances"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Finances"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Finances"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Someday Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Finances"
AND status = "someday"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Finances"
AND status = "done"
SORT file.mtime DESC
```