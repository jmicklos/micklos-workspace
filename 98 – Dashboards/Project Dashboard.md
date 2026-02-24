## Daily Morning Projects List

```dataview
// TABLE area, file.mtime AS "Last Updated"
LIST file.link
FROM "01 – Projects"
WHERE type = "project"
AND status = "active"
SORT area ASC
```

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
TABLE area, next-review as "Next Review", file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "waiting"
SORT area ASC
```

## 🟠 Paused Projects

```dataview
TABLE area, next-review as "Next Review", file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status = "paused"
SORT area ASC
```

## 🔵 Someday Projects

```dataview
TABLE area, next-review as "Next Review", file.mtime AS "Last Updated"
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

## ❌ Null or Bad Status

```dataview
TABLE area, status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND status != "active"
AND status != "waiting"
AND status != "paused"
AND status != "someday"
AND status != "done"
SORT area ASC
```

## ❌ Null Area

```dataview
TABLE area, status, file.mtime AS "Last Updated"
FROM "01 – Projects"
WHERE type = "project"
AND (area = "" or area = null)
SORT file ASC
```

