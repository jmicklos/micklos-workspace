<%* 
const title = await tp.system.prompt("Project name");
await tp.file.rename(title);
%>---
type: project
area:
status: active
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