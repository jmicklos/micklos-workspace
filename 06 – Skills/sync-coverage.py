#!/usr/bin/env python3
"""
Report how much of the vault's tracked work the Todoist sync can actually see.

WHY THIS EXISTS
---------------
The sync only reads checkboxes inside a `## Tasks` section. Most PARA projects
keep their real work under other headings (`## Next Actions`, `### Kitchen`, …).
Those checkboxes are invisible to the sync, so `/morning` was reporting "21 tasks
synced, all healthy" while covering ~13% of actual tracked work. Silent
undercounting is worse than a loud gap: it caused duplicate tasks to be captured
on mobile for work the vault already had.

Run from the vault root:  python3 "06 – Skills/sync-coverage.py"
Flags: --verbose  list every invisible task
"""
import glob
import os
import re
import sys

VERBOSE = "--verbose" in sys.argv

# Files that can carry a todoist-project-id. Backlog IS included — a paused
# project can still hold a valid link (e.g. Emergency Prep – Secondary Citizenship).
GLOBS = [
    "01 – Projects/*/*.md",
    "01 – Projects/00_backlog/*/*.md",
    "02 – Areas/*/*.md",
    "03 – Resources/Relationships/**/*.md",
]


def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    return m.group(1) if m else ""


def tasks_zone(text):
    """The `## Tasks` section body — the only region the sync currently reads."""
    # Tolerant: the heading may carry a descriptive suffix, e.g.
    # "## Tasks (Todoist-synced — section: Grounds under [WT&J] House Remodel)".
    # Requiring a bare "## Tasks" made Home – Grounds look 100% unsynced when
    # 11 of its tasks were already linked.
    # NOTE: the heading-line portion must be [^\n]* — a plain `.*` combined with
    # re.S matches across newlines and swallows the entire document.
    m = re.search(r"^## Tasks\b[^\n]*\n(.*?)(?=^## |\Z)", text, re.S | re.M)
    return m.group(1) if m else ""


# Headings whose checkboxes are deliberately NOT tasks. A `- [ ]` here is a
# research finding, an open question, or a wish-list candidate — pushing it to
# Todoist would be noise. Counting it as a coverage gap is equally wrong: the
# warning could never clear, and a warning that never clears gets ignored.
NON_TASK_HEADINGS = (
    "Open Questions",
    "Open verification items",
    "Candidates",
    "Risks",
    "Notes",
)


def scan():
    rows = []
    seen = set()
    for pattern in GLOBS:
        for f in glob.glob(pattern, recursive=True):
            if os.path.basename(f) == "worklog.md" or f in seen:
                continue
            seen.add(f)
            text = open(f).read()
            fm = frontmatter(text)
            m = re.search(r"^todoist-project-id:\s*(\S+)\s*$", fm, re.M)
            if not m:
                continue

            # Dormant projects are excluded from the coverage denominator.
            # A paused/someday/done project SHOULD have unsynced tasks —
            # counting them as a gap would pressure us into pushing dead work
            # onto the phone. They're listed separately instead.
            status = (re.search(r"^status:\s*(\S+)", fm, re.M) or [None, "active"])[1]
            dormant = status in ("paused", "someday", "done")

            zone = tasks_zone(text)
            outside = text.replace(zone, "") if zone else text

            # A task is VISIBLE to the sync if it carries a todoist marker —
            # regardless of which heading it sits under. Measuring by location
            # (inside `## Tasks` or not) was wrong: Home – Remodel – Finish has
            # 121 fully-linked tasks organised under room headings, and the
            # location-based metric reported every one of them as a gap.
            #
            # Only top-level open boxes count. Indented ones are sub-detail;
            # empty `- [ ]` placeholders are not tasks at all.
            def real(line):
                return re.match(r"^- \[ \]", line) and line[5:].strip()

            invisible, visible, excused = [], [], []
            heading = ""
            for line in text.splitlines():
                if re.match(r"^#{2,3} ", line):
                    heading = line.strip("# ").strip()
                if not real(line):
                    continue
                body = line[5:].strip()
                if "todoist:" in line:
                    visible.append(body)
                elif (any(heading.startswith(h) for h in NON_TASK_HEADINGS)
                      or "no-sync" in line):
                    excused.append(body)
                else:
                    invisible.append(body)
            linked = len(re.findall(r"<!--\s*todoist:\w+\s*-->", zone))

            rows.append({
                "file": f,
                "name": os.path.basename(f)[:-3],
                "status": status,
                "dormant": dormant,
                "has_zone": bool(zone),
                "visible": len(visible),
                "linked": linked,
                "invisible": invisible,
                "excused": excused,
            })
    return rows


def main():
    allrows = scan()
    rows = [r for r in allrows if not r["dormant"]]
    dormant = [r for r in allrows if r["dormant"] and r["invisible"]]
    tracked = sum(r["visible"] + len(r["invisible"]) for r in rows)
    excused = sum(len(r["excused"]) for r in rows)
    seen_by_sync = sum(r["visible"] for r in rows)
    blind = tracked - seen_by_sync
    pct = (seen_by_sync / tracked * 100) if tracked else 100.0

    flag = "OK" if pct >= 90 else "WARNING"
    print(f"[{flag}] Sync coverage: {seen_by_sync}/{tracked} open tasks visible "
          f"({pct:.0f}%) — {blind} invisible to Todoist")

    offenders = sorted((r for r in rows if r["invisible"]),
                       key=lambda r: -len(r["invisible"]))
    if offenders:
        print(f"\n{'invis':>6} {'insync':>7}  {'##Tasks?':<9} project")
        for r in offenders:
            print(f"{len(r['invisible']):>6} {r['visible']:>7}  "
                  f"{('yes' if r['has_zone'] else 'NO'):<9} {r['name']}")
        no_zone = [r for r in offenders if not r["has_zone"]]
        if no_zone:
            print(f"\n  {len(no_zone)} project(s) have NO ## Tasks section at all — "
                  f"nothing in them can ever sync:")
            for r in no_zone:
                print(f"    - {r['name']} ({len(r['invisible'])} tasks)")

    if excused:
        print(f"\n  {excused} checkbox(es) excused — under Open Questions / Candidates /"
              f" Risks / Notes headings, or marked <!-- no-sync -->. Not tasks.")

    if dormant:
        n = sum(len(r["invisible"]) for r in dormant)
        print(f"\n  excluded from the denominator — {n} task(s) in dormant projects "
              f"(paused/someday/done), which SHOULD stay unsynced:")
        for r in dormant:
            print(f"    - {r['name']} [{r['status']}] ({len(r['invisible'])} tasks)")

    if VERBOSE:
        for r in offenders:
            print(f"\n=== {r['name']} ===")
            for t in r["invisible"]:
                print("   ", t[:100])

    # Non-zero exit when coverage is poor, so /morning can't quietly ignore it.
    return 0 if pct >= 90 else 1


if __name__ == "__main__":
    sys.exit(main())
