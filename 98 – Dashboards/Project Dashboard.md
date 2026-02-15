## 🟢 Active Projects

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "active"
SORT area ASC
```

## 🟡 Waiting Projects

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "waiting"
SORT area ASC
```

## 🟠 Paused Projects

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "paused"
SORT area ASC
```

## 🔵 Someday Projects

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "someday"
SORT area ASC
```

## ⚫ Done Projects

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "done"
SORT area ASC
```

## ❌ Null Status

```dataview
TABLE area, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = ""
SORT area ASC
```