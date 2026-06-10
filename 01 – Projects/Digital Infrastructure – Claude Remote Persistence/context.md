# Context — Digital Infrastructure – Claude Remote Persistence
*Last updated: 2026-06-10*

## What this project is
Build a persistent, crash-resilient Claude Code remote-control server on Jonathan's Mac Mini, with session continuity tools so work on PARA projects survives crashes and reboots. Due 2026-06-15.

## Current state
**DONE.** All 9 done-state items validated and checked off. `status: done` in frontmatter.

- **Remote session**: launchd service installed and running; session `[Jonathans-Mini.localdomain] PARA Vault` connects from claude.ai/code. ✅
- **Reboot test**: Passed — service auto-starts after login. ✅
- **Auto-permissions**: All tool use auto-approved via `--permission-mode auto`. ✅
- **Breadcrumb hook**: Fires on Edit/Write in project folders, appends timestamped entries to worklog.md. Confirmed live this session. ✅
- **`/resume-project`** and **`/checkpoint`**: Both validated end-to-end. ✅
- **`para-session-launcher.user.js`**: Documented. Batch-launch userscript companion (see below). ✅

Key files across 3 repos:
- **micklos-home** `scripts/bin/claude-remote-persist` — launchd service wrapper (install/uninstall/status/logs/test). Uses `--permission-mode auto`.
- **micklos-home** `scripts/bin/claude-worklog-breadcrumb` — PostToolUse hook, appends breadcrumbs to project worklog.md
- **micklos-home** `claude/settings.json` — global settings with hook config, symlinked to `~/.claude/settings.json`
- **micklos-workspace** `06 – Skills/checkpoint.md` and `resume-project.md` — session continuity skills
- **micklos-workspace** project folder `para-session-launcher.user.js` — Tampermonkey/Greasemonkey v2.0 userscript: floating "P" button on claude.ai/code; paste project names from `/list-projects`, "Launch All" batch-opens one session per project running hi → `/rename` → `/resume-project`
- **micklos-bootstrap** `OSX/setup-claude.sh` — setup script with `--personal` flag

## Key decisions & rationale
- **`--permission-mode auto` replaces settings files**: The `--settings` flag doesn't exist on `claude remote-control`. `claude-remote-settings.json` was deleted as unnecessary. Workspace `settings.local.json` kept for local interactive sessions.
- **launchd over while-true loop**: survives reboots via `RunAtLoad` + `KeepAlive`.
- **context.md (rewrite) + worklog.md (append)**: "save game / load game" mental model.

## Jonathan's preferences
- "save game / load game" mental model for checkpoint/resume
- Session name: "[Jonathans-Mini.localdomain] PARA Vault"
- Prefers hardware he owns (Mac Mini) over cloud-hosted
- Wants to understand where things go before deleting anything

## Open threads
- None blocking. Follow-on (not part of this project): 9 of 20 active projects still lack context.md.
- Optional: archive this project after the 2026-06-15 due date passes (per CLAUDE.md, ask before archiving).
