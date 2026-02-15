---
author: mwn
type: note
status: draft
url:
tags:
  - obsidian
aliases:
created: 2026-02-13T08:47:46-08:00
created_year: 2026
created_weeknum: 7
priority:
---
## Some random thoughts


- iCloud works great for a single person across devices, as long as they are all Apple
- I think of note organization like database normalization - if there is a shared concept, extract it to a note and link to it (people go pretty crazy here reinventing the wheel with Zettlekasten etc.)
- The main thing that is useful for me is remembering to use it regularly.
    - set a recurring calendar invite for yourself so you start your day by opening Obsidian, creating a daily note, and writing down your agenda.
    - I usually start by carrying over items from the previous day that are unfinished
    - train yourself to check your agenda during the day to stay focused. cross things off as you complete them, add to them as necessary
    - stop at the end of the day and write your wrapup thoughts at the end of the daily note
    - there are task/todo plugins but I wrote my own inside Obsidian - I don't necessarily recommend you do that though
- Also recommended - use weekly notes to set a weekly agenda for yourself, and then at the end of the week review it and take notes (while you are also creating the next week's agenda)


## Suggested Folder structure:

```
.
├── Art
├── Clippings
├── Daily
│   ├── 2024
│   ├── 2025
│   │   ├── Q1
│   │   ├── Q2
    ...
│   ├── 2026-02-06 Fri.md
│   ├── 2026-02-09 Mon.md
│   ├── 2026-02-11 Wed.md
│   ├── 2026-02-12 Thu.md
│   └── Weekly
│       ├── 2025-W49.md
│       ├── 2025-W50.md
│       ├── 2025-W51.md
├── Family
├── Fishing
├── Food & Drink
│   ├── Food & Drink Home.md
│   ├── Recipes
├── Health & Fitness
│   ├── Example Workouts
│   ├── Exercises
│   ├── Fitness Home.md
│   ├── Health Metrics, Goals, & PRs.md
│   └── Workouts
│       ├── 2025
│       │   ├─...
│       │   ├── 2025-12-23 Tue Workout.md
│       │   ├── 2025-12-24 Wed Workout.md
│       │   ├── 2025-12-26 Fri Workout.md
│       │   └── 2025-12-27 Sat Workout.md
│       │...
│       ├── 2026-02-05 Thu Workout.md
│       ├── 2026-02-06 Fri Workout.md
│       └── 2026-02-09 Mon Workout.md
├── Music
├── Home Note.md
├── Outdoors
│   └── Hiking
├── Pers
├── Politics
├── Programming
├── Reading List.md
├── Tasks
├── Templates
│   ├── Daily Template.md
│   ├── DefaultNoteTemplate.md
│   ├── Task Template.md
│   ├── Weekly Template.md
│   └── Workout Template.md
├── Travel
└── Untitled.base


```


## Example template

```
---
author: mwn
type: note
status: draft
url: 
tags:
  - anote
aliases: 
created: <% tp.file.creation_date("yyyy-MM-DDTHH:mm:ssZ") %>
created_year: <% tp.date.now("YYYY") %>
created_weeknum: <% moment(tp.date.now()).week() %>
priority:
---

# Overview


# References

Notes that reference this note, but aren't linked from this note
```dataview
LIST
FROM 
  [[]]
  AND !outgoing([[]])
  AND !#daily
WHERE 
  !startswith(file.path, "2025-")
SORT ASC
\```

Notes tagged with **!!TODO EDIT TAG NAME!!**
```dataview
LIST FROM #mytag
SORT file.name ASC
\```



```

## Essential tools

Obsidian Web Clipper
- 'clip' a web page into Obsidian (as .md)
- allows you to store, take notes on, and then refer back to an item

## Essential Plugins


### Core Plugins

Daily notes
- use this with Templater to create your daily agenda

### Community Plugins

Templater
- use a template for creating new pages
- add consistent properties to each page (100% essential)
Dataview
- use scripts to assemble views on data
- prefer Bases (built-in tool) to Dataview now that it exists, but Dataview is more powerful
Calendar
- essential for daily notes and periodic reviews

## Also useful

Periodic Notes
- for weekly/monthly/quarterly etc reviews (which is essential)
Creases
- automatically fold sections when pages open (like properties)
Homepage
- I pin a useful starting homepage as a starting point. This and my daily note really help me stay organized



# References

Notes that reference this note, but aren't linked from this note
```dataview
LIST
FROM 
  [[]]
  AND !outgoing([[]])
  AND !#daily
WHERE 
  !startswith(file.path, "2025-")
SORT ASC
```

Notes tagged with **!!TODO EDIT TAG NAME!!**
```dataview
LIST FROM #mytag
SORT file.name ASC
```

