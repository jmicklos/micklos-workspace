# Worklog — Digital Infrastructure – Claude Remote Persistence

## 2026-06-07 through 2026-06-09 — Build session continuity system

### Situation
- Jonathan runs Claude Code remote-control on a Mac Mini for his personal PARA vault
- Existing setup: bare `while true` loop running `claude remote-control`, no persistence, no auto-permissions, no crash recovery
- Two problems: (1) sessions don't survive crashes/reboots, (2) project context doesn't persist across sessions
- Also wanted: work/personal config separation (bootstrap runs on work mac too), auto-permissions for vault writes and web tools

### Approach & Rationale
- Researched existing community solutions — found this is a known gap (GitHub issues #29748, #28752, #28402, #60790). No session reconnection after restart. Community workaround is restart loops + artifact-based recovery.
- Decided on 3-layer crash recovery: (1) automatic breadcrumb hook (crash-safe), (2) /checkpoint skill (explicit deep capture), (3) /resume-project skill (session-start reconstruction)
- Key insight: `context.md` (rewritten each checkpoint, ~500 words briefing) separate from `worklog.md` (append-only history). New Claude reads context.md to get oriented — doesn't need to do archaeology through 10 sessions of worklog.
- Config organized in micklos-home (version-controlled), symlinked to ~/.claude/. Bootstrap gets `--personal` flag instead of branches.

### What Jonathan Said
- "if things crash as the top priority. Crashes by their nature rarely allow cleanup"
- "should it not create the worklog if none exists?" — led to auto-create on first touch
- On context.md/worklog split: "So I run the checkpoint and resume project. Goooooot it"
- Mental model that resonated: "save game" (checkpoint) / "load game" (resume-project)
- "if after resume, shit is still broken, I need to pickup manually and at least I'll have the context.md"
- Session name preference: "[Jonathans-Mini.localdomain] PARA Vault"

### Config changes made
- Created `micklos-home/claude/settings.json` with PostToolUse hook config → symlinked to `~/.claude/settings.json` (was empty `{}`)
- Created `micklos-home/scripts/bin/claude-remote-settings.json` — broad auto-permissions for remote sessions (replaces the 386-line accumulated `settings.local.json` crud in the workspace)
- The workspace `.claude/settings.local.json` still exists with all its accumulated one-off permissions — now redundant but not yet cleaned up
- Rewrote `micklos-home/scripts/bin/claude-remote-persist` — added launchd install/uninstall/status/logs/test subcommands, `--permission-mode auto`, `--settings` flag, `--name` flag
- Created `micklos-bootstrap/OSX/setup-claude.sh` — shared config (all machines) vs personal (`--personal` flag adds vault clone + launchd service + pmset)

### Source Material Used
- `claude remote-control --help`, `claude --help` — mapped available flags
- Research agent: Anthropic docs, GitHub issues, community projects (claude-always-on, claude-code-hermit, hatchpod)
- Research agent: Claude Code config architecture — full settings precedence, authored vs runtime state in ~/.claude/
- Existing `06 – Skills/morning.md` — format reference for skills
- Existing `.claude/settings.local.json` — understood what accumulated permissions look like
- Existing `micklos-bootstrap/OSX/go.sh` — understood bootstrap pattern

### Outputs & State
- `claude-remote-persist` — **complete**, not yet installed as launchd service
- `claude-remote-settings.json` — **complete**
- `claude-worklog-breadcrumb` — **complete**, tested with simulated input, AND confirmed live (see breadcrumbs above)
- `claude/settings.json` — **complete**, symlinked to ~/.claude/
- `06 – Skills/resume-project.md` — **complete**, not yet tested in a live session
- `06 – Skills/checkpoint.md` — **complete**, used by other sessions already (Career project)
- `.claude/commands/` symlinks — **complete** for all 4 skills
- `setup-claude.sh` — **complete**, not yet tested on a clean machine

### Open Threads
- Integration test hasn't happened — need to run test → install → reboot → validate
- Auth under launchd is the biggest unknown
- 386-line settings.local.json in workspace is redundant but not cleaned up
- 9 of 20 active projects still lack context.md

### Next Steps
1. Run `claude-remote-persist test`
2. If passes: `claude-remote-persist install`
3. Verify from claude.ai/code
4. Test hook + skills in a live session
5. Reboot Mac Mini and confirm auto-recovery
6. Clean up workspace settings.local.json

---

## 2026-06-09 — Fix install bugs, get service running

### Situation
- Jonathan tried `claude-remote-persist install` and it failed on restart. Manually running the script hit `Error: Unknown argument: --settings`. He commented out the flag, ran manually, and got two sessions instead of one.

### Approach & Rationale
- Diagnosed two bugs: (1) `--settings` is not a valid flag for `claude remote-control` — the flag simply doesn't exist. `--permission-mode auto` already handles all permissions, making the separate `claude-remote-settings.json` unnecessary. (2) The `#` comment on the `--settings` line broke bash line continuation, so `--name` was never passed to claude. The "two sessions" was from the launchd instance + manual run both being active.
- Also fixed the smoke test: `claude -p "say ok" --max-budget-usd 0.01` returns exit 1 on budget exceeded (not auth failure). Changed to check stderr for auth keywords instead.

### What Jonathan Said
- "I then commented the --settings flag and ran it manually and it worked ... but it created two sessions instead of one, please fix this" — clear signal to just fix it, not redesign

### Source Material Used
- `claude remote-control --help` — confirmed `--settings` is not a valid flag, mapped all available flags
- Live error output from Jonathan's manual run

### Outputs & State
- `claude-remote-persist` — **fixed and installed as launchd service**, running live
- Removed: `SETTINGS_FILE` variable, broken `--settings` line, settings validity check from smoke test
- Auth smoke test: now checks for auth-related error keywords instead of exit code
- Service confirmed running: session `[Jonathans-Mini.localdomain] PARA Vault` visible, capacity 1/32

### Open Threads
- Reboot test not done yet
- Live remote session validation (auto-permissions, hook, skills) not done yet
- `claude-remote-settings.json` and workspace `settings.local.json` cleanup pending

### Next Steps
1. Connect from claude.ai/code and test the live session
2. Test auto-permissions, breadcrumb hook, /checkpoint, /resume-project in remote
3. Reboot Mac Mini — verify auto-start
4. Delete unnecessary `claude-remote-settings.json`
5. Clean up workspace `settings.local.json`

---
- 2026-06-09 08:28 -- `Digital Infrastructure – Claude Remote Persistence.md` via Write
- 2026-06-09 08:28 -- `context.md` via Write
- 2026-06-09 09:01 -- `context.md` via Write
- 2026-06-09 09:02 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit
- 2026-06-09 09:46 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit
- 2026-06-09 09:47 -- `context.md` via Write
- 2026-06-09 09:47 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit

---

## 2026-06-09 — Live validation session from claude.ai/code

### Situation
- Service was installed and running from previous session, but nothing had been validated in a live remote session
- Needed to confirm: auto-permissions, breadcrumb hook, /checkpoint, /resume-project all work end-to-end from claude.ai/code

### Approach & Rationale
- Used `/resume-project` to start this session — validated it produces a full structured briefing from context.md + worklog + project note + daily notes
- Checked off done-state items as they were validated
- Deleted `claude-remote-settings.json` (confirmed unnecessary — `--permission-mode auto` handles everything)
- Kept `settings.local.json` — still serves local interactive sessions, not redundant for that use case
- Running `/checkpoint` to validate the other half of the save/load cycle

### What Jonathan Said
- "yes, this is one :P" — when asked if he'd connected from claude.ai/code. We were already in the remote session.
- Asked "so what happened to those settings? Did they go elsewhere?" — wanted to understand the full picture before deleting, not just trust that they're unused
- "I've already performed the reboot test btw" — reboot validation done separately

### Source Material Used
- Launchd plist at `~/Library/LaunchAgents/com.jonathanmicklos.claude-remote-persist.plist`
- `claude-remote-persist` script — confirmed `--permission-mode auto`, no `--settings`
- `~/.claude/settings.json` — hook config only
- `.claude/settings.local.json` — 427 lines of accumulated per-tool allows from interactive sessions

### Outputs & State
- `claude-remote-settings.json` — **deleted** (was in micklos-home/scripts/bin/)
- Project note — checked off "Connect from claude.ai/code" and "Auto-permissions work"
- context.md — **rewritten** with current state
- worklog.md — **this entry**

### Open Threads
- Reboot test — Jonathan says it's done, need to confirm and check off
- Project note still references deleted settings file and has outdated risks
- Done-state checklist needs remaining items checked off

### Next Steps
1. Confirm reboot test results with Jonathan — check off remaining done-state items
2. Update project note: remove references to deleted settings file, update risks
3. Mark project done if all checklist items pass
- 2026-06-09 10:23 -- `para-session-launcher.user.js` via Write
- 2026-06-09 10:34 -- `para-session-launcher.user.js` via Write
- 2026-06-09 10:35 -- `para-session-launcher.user.js` via Edit
- 2026-06-09 10:40 -- `para-session-launcher.user.js` via Edit
- 2026-06-10 07:50 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit
- 2026-06-10 07:50 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit
- 2026-06-10 07:50 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit
- 2026-06-10 07:50 -- `Digital Infrastructure – Claude Remote Persistence.md` via Edit

---

## 2026-06-10 — Closeout

### Situation
- Resumed via `/resume-project`. Everything from the prior session held up; reboot test confirmed done by Jonathan. Last loose end was the undocumented `para-session-launcher.user.js`.

### What Jonathan Said
- "this all sounds correct. we had created a grease monkey script to easily open the projects" — confirmed the userscript's purpose and that the project state matched reality.

### Outputs & State
- `para-session-launcher.user.js` — documented in the project note. v2.0 Tampermonkey/Greasemonkey userscript for claude.ai/code: floating "P" button, paste project names from `/list-projects`, "Launch All" batch-opens a session per project and runs hi → `/rename` → `/resume-project`.
- Project note — all 9 done-state items checked off; removed reference to deleted `claude-remote-settings.json`; Risks section marked resolved; userscript added to Components.
- Frontmatter `status: active` → `done`.

### Open Threads
- None for this project. Follow-on (not blocking): 9 of 20 active projects still lack context.md.

### Next Steps
- Project complete. Consider archiving after the 2026-06-15 due date passes.
- 2026-06-10 07:51 -- `context.md` via Write
