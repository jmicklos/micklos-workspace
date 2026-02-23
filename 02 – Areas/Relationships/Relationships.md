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
-

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
