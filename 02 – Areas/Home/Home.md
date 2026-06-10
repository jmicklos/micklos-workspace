---
type: area
review: monthly
owner: Jonathan D. Micklos
created: 2026-02-14
---

# Home

## Standards
- Systems reduce friction and cost
- Preventive maintenance over reactive fixes
- Automation should reduce cognitive load

## Recurring Responsibilities
- HVAC filter change | cadence: quarterly | on: first-week | last-done: 2026-03-31
- Pay bills + financial check | cadence: monthly | on: last-weekend | last-done: 2026-06-06
	- Seattle Utilities
	- Puget Sound Energy
	- Credit card bill
- Seattle RRIO permit check | cadence: monthly | on: last-weekend | last-done: 2026-06-06
	- https://cosaccela.seattle.gov/portal/


## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Home"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Home"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Home"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Someday Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Home"
AND status = "someday"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "Home"
AND status = "done"
SORT file.mtime DESC
```
