#!/usr/bin/env python3
"""Build the printer's file: 72 FRONTS (pages 1-72) + the shared BACK (page 73),
each imposed on a slightly oversized page with crop/trim marks at the 5x7in trim.
Fronts = the name-free #00 (page 1) as the couple's own copy, then guests #02-#72.
The self-addressed #01 ("Wan Ting Lee and Jonathan Micklos") is EXCLUDED (couple didn't
want an invitation addressed to themselves; the name-free one takes its place).
Front = page 1 of each 2-page file. Back = _details-card-shared.pdf.
Vector-preserving (show_pdf_page keeps text/fonts). Output: print/named/_PRINTER-fronts+back-cropmarks.pdf
"""
import fitz, glob, os

BASE = os.path.dirname(os.path.abspath(__file__))
NAMED = os.path.join(BASE, "print", "named")

PT = 72.0
MM = PT / 25.4
TRIM_W, TRIM_H = 5 * PT, 7 * PT          # 5x7 in trim
MARG = 9 * MM                             # 9mm margin around trim (room for marks)
PAGE_W, PAGE_H = TRIM_W + 2 * MARG, TRIM_H + 2 * MARG
GAP = 3 * MM                              # marks start 3mm out from trim
LEN = 4 * MM                              # mark length 4mm
LW = 0.4                                  # mark line width (pt)

def add(out, src_path, pageno=0):
    src = fitz.open(src_path)
    pg = out.new_page(width=PAGE_W, height=PAGE_H)
    trim = fitz.Rect(MARG, MARG, MARG + TRIM_W, MARG + TRIM_H)
    pg.show_pdf_page(trim, src, pageno)   # place the source page inside the trim box (vector)
    for cx, cy, sx, sy in [(trim.x0, trim.y0, -1, -1), (trim.x1, trim.y0, 1, -1),
                           (trim.x0, trim.y1, -1, 1), (trim.x1, trim.y1, 1, 1)]:
        pg.draw_line((cx + sx * GAP, cy), (cx + sx * (GAP + LEN), cy), color=(0, 0, 0), width=LW)  # horizontal mark
        pg.draw_line((cx, cy + sy * GAP), (cx, cy + sy * (GAP + LEN)), color=(0, 0, 0), width=LW)  # vertical mark
    src.close()

fronts = sorted(f for f in glob.glob(os.path.join(NAMED, "[0-9][0-9]_*.pdf"))
                if not os.path.basename(f).startswith("01_"))   # exclude self-addressed #01; keep name-free #00 + guests 02-72
out = fitz.open()
for f in fronts:
    add(out, f, 0)                        # page 1 = personalized front
add(out, os.path.join(NAMED, "_details-card-shared.pdf"), 0)   # back = last page
outpath = os.path.join(NAMED, "_PRINTER-fronts+back-cropmarks.pdf")
out.save(outpath, garbage=3, deflate=True)
print(f"wrote {outpath}: {out.page_count} pages ({len(fronts)} fronts + 1 back), "
      f"page {PAGE_W/PT*25.4:.1f}x{PAGE_H/PT*25.4:.1f}mm, trim {TRIM_W/PT}x{TRIM_H/PT}in")
