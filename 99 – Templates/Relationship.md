<%*
const title = await tp.system.prompt("Resource name");
await tp.file.rename(title);
%>---
type: resource
area: Relationships
status: evergreen
name: <% title %>
birthdate: 
relationship: 
created: <% tp.date.now("YYYY-MM-DD") %>
author: Jonathan D. Micklos

tags:
---

# <% title %>
