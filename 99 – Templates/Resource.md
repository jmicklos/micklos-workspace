<%*
const title = await tp.system.prompt("Resource name");
await tp.file.rename(title);
%>---
type: resource
area:
status: evergreen
created: <% tp.date.now("YYYY-MM-DD") %>

# Web metadata (if applicable)
source:
author:
published:

tags:
---

# <% title %>