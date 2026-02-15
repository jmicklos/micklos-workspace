---
title: "Configuring Obsidian PARA"
source: "https://chatgpt.com/c/698f9b53-2e3c-832c-8c47-426e8d8d8aff"
author:
  - "[[ChatGPT]]"
published:
created: 2026-02-13
description: "ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI to explore ideas, solve problems, and learn faster."
tags:
  - "clippings"
---

# Configuring Obsidian for PARA

## Goal

## Definition of Done

## Next Actions
- [ ]Here’s a clean, practical “new vault → PARA-ready” setup in Obsidian, with a few defaults that keep things fast on both Mac + Android.

## 1) Create the vault (file system first)

1. **Obsidian → Create new vault**
2. Name it something tool-agnostic (your earlier instinct is good):  
	**`micklos-workspace`** (or `micklos-life-tracker` if it’s purely personal)
3. Choose a location that will be synced (later) by your method (Syncthing / Dropbox / etc.).

## 2) Create the PARA folder skeleton

In the left file pane, create these **top-level folders** (exact casing doesn’t matter; consistency does):

- **`00 - Inbox`**
- **`01 - Projects`**
- **`02 - Areas`**
- **`03 - Resources`**
- **`04 - Archive`**
- *(optional but useful)* **`99 - Templates`**
- *(optional)* **`90 - Attachments`** (or keep attachments next to notes—your call)

Why the numbers: keeps PARA pinned in order everywhere (including mobile).

## 3) Decide what a “Project” and an “Area” means (one sentence each)

Before you write notes, set your rules:

- **Projects** = has a *deadline* + *done state* (“Finish X”, “Plan trip Y”, “Remodel kitchen lighting”)
- **Areas** = ongoing responsibility with a standard to maintain (“Health”, “Finances”, “Home”, “Relationship”, “Work”)
- **Resources** = reference/library (“Mezcal notes”, “Singapore restaurants”, “Obsidian tips”)
- **Archive** = inactive projects + old areas/resources you don’t want in your face

If you keep these definitions tight, PARA stays clean forever.

## 4) Set up Daily Notes + an Inbox flow

### Enable Daily Notes

- **Settings → Core plugins → Daily notes → ON**
- **Settings → Daily notes**
	- Location: **`02 - Areas/Daily`** (or `00 - Inbox/Daily` if you want it messier/temporary)
	- Format: `YYYY-MM-DD`

### Create a simple Daily template (optional, but huge)

Put this in **`99 - Templates/Daily.md`**:

- Top 3
- Tasks
- Notes / log
- PARA triage (what gets moved where)

Then:

- **Settings → Core plugins → Templates → ON**
- Templates folder: **`99 - Templates`**

## 5) Add a lightweight Project note pattern (so projects don’t sprawl)

Inside `01 - Projects`, each project gets:

- a **folder** (optional, only if it has many notes/files), and
- a **Project Home note** at the root of that folder.

Example:

- `01 - Projects/2026 Wedding/`
	- `2026 Wedding - Project Home.md`
	- `Vendors.md`
	- `Budget.md`

Project Home note template idea:

- Goal
- Definition of done
- Next actions
- Links to key notes

*(No need to over-engineer. You just want every project to have a “home”.)*

## 6) Configure attachments (important for sync sanity)

**Settings → Files & Links**

- **Default location for new attachments**: choose one:
	- **“In the same folder as current file”** (best for portability)
	- or **“In a subfolder under current folder”** named `Attachments`
- **New link format**: “Relative path to file” (usually safest for vault moves)

If you plan to sync via Syncthing, **avoid huge, centralized attachments folders** unless you really want them.

## 7) Turn on the few plugins that matter for PARA

**Core plugins to consider ON:**

- **Backlinks** (great for “resource becomes project” moments)
- **Tag pane** (optional)
- **Templates** (if you’ll use them)
- **Daily notes**

**Community plugins (optional, but common in PARA):**

- A simple task manager plugin if you want tasks beyond checkboxes
- A quick-switcher enhancement if you’re note-heavy  
	(If you tell me “I want tasks in Obsidian” vs “tasks in Todoist,” I’ll recommend a clean setup.)

## 8) Add 5 “Areas” up front (don’t boil the ocean)

Create only a few area folders/notes now. Examples:

- `02 - Areas/Health`
- `02 - Areas/Finances`
- `02 - Areas/Home`
- `02 - Areas/Relationship`
- `02 - Areas/Work`

You can keep them as **single notes** at first (Area Home notes), and only create subfolders if it grows.

## 9) Make triage dead simple (the rule that keeps PARA usable)

Whenever something lands in `00 - Inbox` (quick capture, random thought, meeting note), do this daily or every other day:

1. Is it actionable with a deadline and done state? → **Project**
2. Is it ongoing responsibility? → **Area**
3. Is it reference material? → **Resource**
4. Not needed anymore? → **Archive**
5. Not sure? Leave in **Inbox** but add a note at top “Triage later” with a date.

## 10) Quick “starter structure” example (copy/paste mental model)

- Projects
	- Wedding planning
	- “Syncthing vault sync”
	- “Kitchen sconces sourcing”
- Areas
	- Home (standards, maintenance logs, recurring lists)
	- Relationship (shared plans, gift ideas, travel)
	- Health (labs, routines)
- Resources
	- Mezcal tasting notes
	- Singapore (food, shopping, itinerary)
	- Obsidian (how-tos, snippets)

# Using Daily
Your Daily note is not a task manager.  
It’s a **control surface** for your projects and areas.

I’ll assume your Daily template looks roughly like this:

	# {{date}} 
	## Focus Today  
	## Projects to Move  
	## Notes

Here’s how to use each section — practically.

---

# 🧭 1️⃣ Focus Today

This is not a giant task list.

It’s 1–3 outcomes that matter today.

Example:

	## Focus Today
	- Move on [[Design Claude context architecture]]
	- Call shops re: [[Replace 4Runner timing belt and cam seals]]
	- Follow up on chimney install in [[Complete 2026 Home Remodel]]

Notice:

- These are PROJECT references.
    
- Not micro tasks.
    
- Not 17 bullets.
    

If you finish these, the day was productive.

---

# 🚀 2️⃣ Projects to Move

This is your activation list.

Ask:

> What project(s) need forward motion today?

You list the projects here before opening them.

Example:

	## Projects to Move
	- [[Complete 2026 Home Remodel]]
	- [[Design AI daily workflow]]
	- [[Update Schwab autopay structure]]

Then you click into each and work inside the project note.

Daily notes never hold the real tasks.  
They point you to where the work lives.

---

# 🧠 3️⃣ Notes

This is your RAM dump.

Use it for:

- Thinking
    
- Decisions
    
- Quick logs
    
- Observations
    
- Capturing new ideas
    

Example:

	## Notes
	GC said chimney liner delayed 1 week.
	Claude context seems to degrade past 40k tokens.
	Mushroom coffee A felt jittery.

If something becomes real:

- Promote it to a project.
    
- Or add it to an existing project’s task list.
    
- Or move it to a Resource.
    

Daily notes are staging areas.