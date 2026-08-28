#!/usr/bin/env python3
"""Generate personalized front-invite HTML per household from guest-list.csv.
Rules: names never split (nbsp within each person), balanced lines (text-wrap:balance),
Oxford commas as provided, and 'Evening reception to follow' auto-dropped when the guest
name wraps to >1 line (done in-browser via JS + --virtual-time-budget at render time).
Usage: python3 generate-named-invites.py [SN1 SN2 ...]   (no args = all)
Writes temp HTML into mockup/_gen_<SN>.html and prints a manifest (SN|filename|names)."""
import csv, re, unicodedata, os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
MOCKUP = os.path.join(BASE, "mockup")

def fmt_guest(names):
    s = names
    s = s.replace(", and ", "\x00OX\x00").replace(" and ", "\x00A\x00").replace(", ", "\x00C\x00")
    out = []
    for p in re.split(r"(\x00[A-Z]+\x00)", s):
        if p == "\x00OX\x00": out.append(", and ")
        elif p == "\x00A\x00": out.append(" and ")
        elif p == "\x00C\x00": out.append(", ")
        elif p: out.append(p.replace(" ", "&nbsp;"))
    return "".join(out)

def slugname(sn, names):
    s = names.replace(",", "")
    s = re.sub(r"\s+", "_", s.strip())
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return f"{int(sn):02d}_{s}"

TPL = open(os.path.join(BASE, "_named_template.html"), encoding="utf-8").read()

want = set(sys.argv[1:])
with open(os.path.join(BASE, "guest-list.csv"), encoding="utf-8") as f:
    for row in csv.DictReader(f):
        sn, names = row["S/N"].strip(), row["Names"].strip()
        if want and sn not in want:
            continue
        html = TPL.replace("{{GUEST}}", fmt_guest(names))
        open(os.path.join(MOCKUP, f"_gen_{int(sn):02d}.html"), "w", encoding="utf-8").write(html)
        print(f"{int(sn):02d}|{slugname(sn, names)}|{names}")
