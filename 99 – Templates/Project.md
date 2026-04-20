<%*
const title = await tp.system.prompt("Project name");
// Create project folder and move the note into it
const folder = "01 – Projects/" + title;
await app.vault.createFolder(folder);
await tp.file.move(folder + "/" + title);
%>---
type: project
area:
status: active
next-review: <% tp.date.now("YYYY-MM-DD", 14) %>
due:
energy:
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% title %>

## Definition of Done
(What must be true for this to be archived?)

## Next Actions
- [ ]

## Waiting On
- [ ]

## Notes
