---
type: project
area: Digital Infrastructure
status: done
next-review: 2026-07-19
due: 2026-08-01
energy: medium
created: 2026-07-07
completed: 2026-08-10
todoist-project-id: 6h5CQ46R97pqrcfw
---

# Digital Infrastructure – Todoist Integration

## Goal
Integrate Todoist with the PARA vault so that Todoist becomes the shared, mobile-friendly task interface while Obsidian remains the project knowledge/context layer.

## Motivation
Three specific friction points drove this:
1. **Mobile quick view** — Obsidian is not a good mobile task interface
2. **Shared tasks with Wan Ting** — need joint task lists she can see and contribute to
3. **Tasks from Wan Ting** — she can assign tasks to Jonathan without touching Obsidian

## Approach
- **Direct Todoist REST API v2** via curl calls (no MCP server dependency)
- Personal API token stored locally (tokens don't expire unless revoked or password changed)
- `/morning` skill enhanced with a Todoist sync step
- Each PARA project optionally links to a Todoist project via `todoist-project` frontmatter field
- Todoist project descriptions contain a pointer back to the PARA path

## Responsibilities split

| System | Owns |
|---|---|
| **Todoist** | Actionable tasks, shared lists with Wan Ting, mobile capture, due dates, reminders |
| **Obsidian** | Project context, decisions, worklogs, research, reference, recurring responsibilities, Claude session continuity |

## Design decisions
- No bidirectional sync — Claude reads both systems during `/morning` and surfaces the delta
- No MCP server — direct API calls are simpler, more private, fewer moving parts
- Todoist personal API token (doesn't expire, set-and-forget)
- Evaluated and rejected: official Todoist MCP server (remote mode routes data through Doist servers; local npx mode adds unnecessary dependency)

## Token setup
1. Generate at https://app.todoist.com/app/settings/integrations/developer
2. Store at `~/.config/todoist/token` (file contains only the token, no newline)
3. `/morning` skill reads this file to authenticate API calls

## Status — DONE 2026-08-10
Shipped and in daily use. The `/morning` sync runs every session, shared `[WT&J]` projects and the section-mapping pattern are live, and PARA projects carry `todoist-*` frontmatter. Closing as done; ongoing sync is now business-as-usual, not project work.
- [x] Store API token locally
- [x] Design Todoist project structure (which PARA projects get Todoist counterparts)
- [x] Create Todoist projects and share relevant ones with Wan Ting
- [x] Add `todoist-project` frontmatter to PARA project files
- [x] Update `/morning` skill with Todoist sync step
- [x] Create optional `todoist-sync` skill for ad-hoc normalization
- [x] Test end-to-end
