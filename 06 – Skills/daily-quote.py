#!/usr/bin/env python3
"""
Surface one quote per day from `03 – Resources/Quotes/Recurring/Current.md`.

WHY THIS EXISTS
---------------
The Quotes folder is literally named "Recurring" — ~100 quotes Jonathan collected
as operating principles — but nothing ever surfaced them. A collection with no
review loop is a graveyard. `/morning` now drops one into the daily note.

Selection is DETERMINISTIC on the date: re-running /morning the same day gives
the same quote (so it doesn't churn the note), and it walks the whole collection
before repeating.

Usage:
    python3 "06 – Skills/daily-quote.py"            # today's quote
    python3 "06 – Skills/daily-quote.py" 2026-09-01 # a specific date
    python3 "06 – Skills/daily-quote.py" --count    # how many are in rotation
"""
import datetime
import re
import sys

SRC = "03 – Resources/Quotes/Recurring/Current.md"


def load():
    """Bullet lines from Current.md, minus frontmatter and headings."""
    text = open(SRC).read()
    text = re.sub(r"^---\n.*?\n---\n", "", text, flags=re.S)
    out = []
    for line in text.splitlines():
        s = line.strip()
        if not s.startswith("* "):
            continue
        s = s[2:].strip()
        if len(s) > 3:
            out.append(s)
    return out


def pick(quotes, day):
    """Deterministic per-date, and cycles the full list before repeating."""
    return quotes[day.toordinal() % len(quotes)]


def main():
    args = [a for a in sys.argv[1:]]
    quotes = load()
    if "--count" in args:
        print(f"{len(quotes)} quotes in rotation "
              f"({len(quotes)} days to cycle through all of them)")
        return 0
    day = (datetime.date.fromisoformat(args[0]) if args
           else datetime.date.today())
    print(pick(quotes, day))
    return 0


if __name__ == "__main__":
    sys.exit(main())
