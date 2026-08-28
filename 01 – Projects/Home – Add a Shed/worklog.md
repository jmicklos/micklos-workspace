# Worklog — Home – Add a Shed

## 2026-08-17 — Project kickoff + storage-condition decision

### Situation
- Jonathan wants to add a shed to the Capitol Hill property. Objectives in stated priority order: (1) store outdoor implements, (2) store indoor tools, (3) store camping gear.
- His actual *question* driving the project: "how bad is it to store the latter two [tools + camping] in a shed exposed to differences of temperature and humidity?" — this was the real decision he needed answered before committing.

### Approach & Rationale
- Answered the storage-condition question first (it's the design driver), then created the project.
- Confirmed no existing shed project in the vault (grep across vault — only incidental "shed" word hits). Clean slate.
- Chose to make this a standalone **Home** project rather than folding it into `Home – Grounds`, but flagged the dependency: siting must coordinate with the grounds plan / future front fence line.

### What Jonathan decided (via question prompts)
- **Due date:** End of 2026 (2026-12-31) — comfortable pace, done before it becomes urgent.
- **Shed type:** Prefab kit, DIY-assembled (cheapest/fastest; likely under Seattle's 200 sq ft permit-exempt threshold).

### Storage-condition analysis (the core deliverable)
Framed for Seattle marine climate. **Bottom line: humidity/condensation is the enemy, not temperature.** Not bad enough to require a conditioned outbuilding; bad enough that plain shelving underserves objectives 2 and 3.
- **Obj 1 (implements):** zero concern — open shelving.
- **Obj 2 (tools):** bare steel rusts in a season; Li-ion batteries + power-tool electronics degrade in cold/damp. Fix: gasketed totes/chest + desiccant, **batteries stay indoors**, VCI/light oil. Optional: insulated cabinet + Golden Rod rod (~$40).
- **Obj 3 (camping):** mostly fine in sealed bins (also rodent-proof); **down and leather/organic items stay indoors**.
- **Most important design lever:** ventilation (soffit/ridge) + raised sealed floor over a ground vapor barrier. Beats conditioning the structure.

Full strategy is captured in the project note under `## Storage Strategy` so it survives independent of this log.

### Outputs & State
- `Home – Add a Shed.md` — created, complete with Definition of Done, prioritized objectives, storage strategy, context (incl. Seattle ≤200 sq ft permit note), task list, open threads.
- `worklog.md` — this file.

### Open Threads
- **Todoist not linked.** Left `todoist-project-id`/`todoist-section-id` blank on purpose: this probably belongs as a new *section* under shared `[WT&J] House Remodel` (`6c75RX2frVPFrV46`), but creating a section needs the API, and setting the project ID without a section would misroute tasks to the default `Home – Remodel – Finish`. Resolve on next `/sync`.
- Shed footprint/material undecided — gates base prep and cost.

### Next Steps
1. Verify Seattle permit-exempt size + rear-yard setback / lot-coverage before buying.
2. Pick location in coordination with `Home – Grounds` (avoid rear planting zones + future fence line).
3. Select the kit (material, footprint, **ventilation + floor system** are the specs that matter for the humidity problem).
4. On next `/sync`, decide Todoist section vs. standalone.
