---
type: project
area: Digital Infrastructure
status: done
next-review: 2026-06-12
last-checkpoint: 2026-06-10
due: 2026-06-15
energy: medium
created: 2026-06-07
---

# Digital Infrastructure – Claude Remote Persistence

## Goal
Persistent, crash-resilient Claude Code remote sessions running on Mac Mini, with session continuity across crashes and reboots.

## Done state
- [x] `claude-remote-persist install` succeeds
- [x] `claude-remote-persist test` passes all checks
- [x] Reboot Mac Mini — service comes back automatically after login
- [x] Connect from claude.ai/code — see "[Jonathans-Mini.localdomain] PARA Vault"
- [x] Auto-permissions work (no prompts for file writes, web search, playwright)
- [x] Breadcrumb hook fires on live file edits in `01 – Projects/`
- [x] `/checkpoint` on a project writes context.md + worklog entry
- [x] `/resume-project` on a checkpointed project produces a usable briefing
- [x] Full cycle: work on project → checkpoint → reboot → resume-project → continue seamlessly

## Components built

### micklos-home (scripts/bin/)
- `claude-remote-persist` — launchd service wrapper with install/uninstall/status/logs/test subcommands. Uses `--permission-mode auto` (no separate settings file needed).
- `claude-worklog-breadcrumb` — PostToolUse hook, appends breadcrumbs to project worklog.md on every Edit/Write

### micklos-home (claude/)
- `settings.json` — global Claude settings with breadcrumb hook config, symlinked to `~/.claude/settings.json`

### micklos-workspace (06 – Skills/)
- `resume-project.md` — reads context.md + worklog + project note + recent dailies, synthesizes briefing
- `checkpoint.md` — rewrites context.md (living snapshot), appends to worklog.md (history)

### micklos-workspace (.claude/commands/)
- Symlinks to all skills in `06 – Skills/`

### micklos-bootstrap (OSX/)
- `setup-claude.sh` — sets up Claude config; `--personal` flag adds vault clone + launchd service

### micklos-workspace (project folder)
- `para-session-launcher.user.js` — Tampermonkey/Greasemonkey userscript (v2.0) for claude.ai/code. Adds a floating "P" button; paste project names (from `/list-projects`), click "Launch All", and it batch-opens one session per project, sends "hi", then `/rename`, then `/resume-project`. The batch-launch companion to the persistence system.

## Risks (resolved)
- ~~Auth may not work under launchd context~~ — works; service runs and connects after reboot.
- ~~Hook command may not resolve on PATH in launchd environment~~ — breadcrumb hook fires live.
- ~~`--permission-mode auto` + `--settings` flag interaction~~ — `--settings` flag doesn't exist on `claude remote-control`; `--permission-mode auto` handles all approvals.
