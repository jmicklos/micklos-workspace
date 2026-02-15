---
type: area
review: monthly
owner: me
created: 2026-02-14
---

# Vehicles

## Standards
-

## Recurring Responsibilities
-

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
