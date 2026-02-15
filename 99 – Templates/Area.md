<%*
const title = await tp.system.prompt("Area name");
await tp.file.rename(title);
%>---
type: area
review: monthly
owner: me
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% title %>

## Standards
-

## Recurring Responsibilities
-

## 🟢 Active Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "<% title %>"
AND status = "active"
SORT file.mtime DESC
```

## 🟡 Waiting Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "<% title %>"
AND status = "waiting"
SORT file.mtime DESC
```

## 🟠 Paused Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "<% title %>"
AND status = "paused"
SORT file.mtime DESC
```

## 🔵 Planned Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "<% title %>"
AND status = "planned"
SORT file.mtime DESC
```

## ⚫ Done Projects

```dataview
TABLE status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND area = "<% title %>"
AND status = "done"
SORT file.mtime DESC
```