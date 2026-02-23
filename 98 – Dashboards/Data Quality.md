## Author Problems
#### ❌ No Author

```dataview
TABLE author
FROM "03 – Resources"
WHERE author = null
OR author = ""
sort author ASC
```

#### ❌ Author Not Me

```dataview
TABLE author
FROM "03 – Resources"
WHERE !contains(author, "Jonathan D. Micklos")
sort author ASC
```