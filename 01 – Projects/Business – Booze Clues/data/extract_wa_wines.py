#!/usr/bin/env python3
"""Extract product data from Young's Market Company Washington Wine PDF catalog."""

import json
import re
import sys


def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using pypdf."""
    from pypdf import PdfReader
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n\n"
    return text


def parse_products(text):
    """Parse product entries from extracted text."""
    products = []
    current_subcategory = ""
    current_region = ""

    lines = text.split('\n')

    # Varietal (subcategory) headers - these appear as large bold headers
    varietal_names = [
        'CABERNET', 'CHARDONNAY', 'FORTIFIED', 'MALBEC', 'MERLOT',
        'MOSCATO', 'OTHER DESSERT', 'OTHER RED VARIETAL', 'OTHER WHITE VARIETAL',
        'PINOT GRIGIO', 'PINOT NOIR', 'RED BLEND', 'RIESLING', 'ROSE',
        'SAUVIGNON BLANC', 'SPARKLING', 'SYRAH/SHIRAZ', 'WHITE BLEND', 'ZINFANDEL'
    ]

    # Region headers
    region_names = [
        'COLUMBIA VALLEY', 'WASHINGTON', 'YAKIMA VALLEY',
        'WALLA WALLA VALLEY', 'WILLAMETTE VALLEY'
    ]

    # Pattern for product lines: 6-digit code + description + size + pack + case_price + net_price
    product_pattern = re.compile(
        r'^\s*(\d{6})\s+'           # 6-digit code
        r'(.+?)\s+'                 # description
        r'(\d+(?:\.\d+)?(?:ML|LT))\s+'  # size like 750ML, 1.5LT, 375ML, 3LT, 1LT
        r'(\d+)\s+'                 # pack count
        r'([\d,]+\.\d{2})\s+'      # case price
        r'([\d,]+\.\d{2})\s*$'     # net price
    , re.IGNORECASE)

    pending_code = None
    pending_desc = None

    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue

        # Skip page headers/footers/TOC
        if stripped == 'JULY 2021' or stripped.startswith('Page '):
            continue
        if 'Young' in stripped and 'Market' in stripped and 'Company' in stripped:
            continue
        if stripped.startswith('Code') and 'Brand' in stripped:
            continue
        if stripped in ('NORTH AMERICA', 'UNITED STATES', 'TABLE OF CONTENTS'):
            continue
        # Skip TOC-style lines (varietal.....page)
        if re.match(r'^[A-Z /]+\.{2,}\s*\d+$', stripped):
            continue

        upper = stripped.upper().strip()

        # Remove (CONT.) for matching
        upper_clean = re.sub(r'\s*\(CONT\.\)\s*$', '', upper).strip()

        # Check for varietal headers
        if upper_clean in varietal_names:
            current_subcategory = upper_clean.title()
            # Normalize some names
            if current_subcategory == 'Rose':
                current_subcategory = 'Rose'
            elif current_subcategory == 'Syrah/Shiraz':
                current_subcategory = 'Syrah/Shiraz'
            continue

        # Check for region headers
        if upper_clean in region_names or upper_clean in [r + ' (CONT.)' for r in region_names]:
            region_clean = re.sub(r'\s*\(CONT\.\)\s*$', '', upper_clean).strip()
            if region_clean in region_names:
                current_region = region_clean.title()
            continue

        # Try to match a full product line
        m = product_pattern.match(line)
        if m:
            # If we had a pending incomplete line, discard it
            pending_code = None
            pending_desc = None

            code = m.group(1)
            desc = m.group(2).strip()
            size = m.group(3).upper()
            pack = int(m.group(4))
            case_price = float(m.group(5).replace(',', ''))
            net_price = float(m.group(6).replace(',', ''))

            brand, description = extract_brand_desc(desc)

            products.append({
                "code": code,
                "brand": brand,
                "description": description,
                "full_description": desc,
                "category": "wine",
                "subcategory": current_subcategory,
                "region": current_region,
                "size": size,
                "pack": pack,
                "case_price": case_price,
                "net_price": net_price
            })
            continue

        # Check if this starts with a 6-digit code but doesn't match full pattern (wrapped line)
        code_match = re.match(r'^\s*(\d{6})\s+(.+)$', line)
        if code_match and not product_pattern.match(line):
            # Save as pending - the next line might have the size/pack/prices
            # or the description continues
            pending_code = code_match.group(1)
            pending_desc = code_match.group(2).strip()
            continue

        # Check if this is a continuation of a pending line
        if pending_code:
            # Try combining pending + this line
            combined = pending_desc + ' ' + stripped
            # Check if this line has the trailing size/pack/prices
            tail_match = re.match(
                r'^(.+?)\s+(\d+(?:\.\d+)?(?:ML|LT))\s+(\d+)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s*$',
                combined, re.IGNORECASE
            )
            if tail_match:
                desc = tail_match.group(1).strip()
                size = tail_match.group(2).upper()
                pack = int(tail_match.group(3))
                case_price = float(tail_match.group(4).replace(',', ''))
                net_price = float(tail_match.group(5).replace(',', ''))

                brand, description = extract_brand_desc(desc)

                products.append({
                    "code": pending_code,
                    "brand": brand,
                    "description": description,
                    "full_description": desc,
                    "category": "wine",
                    "subcategory": current_subcategory,
                    "region": current_region,
                    "size": size,
                    "pack": pack,
                    "case_price": case_price,
                    "net_price": net_price
                })
                pending_code = None
                pending_desc = None
                continue
            else:
                # Maybe the description just continues - append it
                # Check if there's size/pack/prices on just this line
                tail_only = re.match(
                    r'^(.+?)\s+(\d+(?:\.\d+)?(?:ML|LT))\s+(\d+)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})\s*$',
                    stripped, re.IGNORECASE
                )
                if tail_only:
                    desc = (pending_desc + ' ' + tail_only.group(1)).strip()
                    size = tail_only.group(2).upper()
                    pack = int(tail_only.group(3))
                    case_price = float(tail_only.group(4).replace(',', ''))
                    net_price = float(tail_only.group(5).replace(',', ''))

                    brand, description = extract_brand_desc(desc)

                    products.append({
                        "code": pending_code,
                        "brand": brand,
                        "description": description,
                        "full_description": desc,
                        "category": "wine",
                        "subcategory": current_subcategory,
                        "region": current_region,
                        "size": size,
                        "pack": pack,
                        "case_price": case_price,
                        "net_price": net_price
                    })
                    pending_code = None
                    pending_desc = None
                    continue
                else:
                    # Just more description text, keep accumulating
                    pending_desc = combined
                    continue

        # If we get here, it's some other line (brand header, etc.) - skip
        pending_code = None
        pending_desc = None

    return products


def extract_brand_desc(full_desc):
    """Extract brand name and description from the full description.

    Format is typically: BRAND - description details
    """
    if ' - ' in full_desc:
        parts = full_desc.split(' - ', 1)
        brand = parts[0].strip()
        description = parts[1].strip()
        return brand, description
    return full_desc, full_desc


def main():
    pdf_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/raw/Local Washington Wine Presentation.pdf"
    output_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/youngs_wa_wines.json"

    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    print(f"Extracted {len(text)} characters")

    # Debug: save raw text
    debug_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/youngs_wa_wines_raw_text.txt"
    with open(debug_path, 'w') as f:
        f.write(text)
    print(f"Saved raw text to {debug_path}")

    print("Parsing products...")
    products = parse_products(text)
    print(f"Found {len(products)} products")

    # Build output
    output = {
        "source": "Young's Market Company",
        "source_file": "Local Washington Wine Presentation.pdf",
        "extracted_date": "2026-04-06",
        "catalog_date": "2021-07",
        "distributor": "Young's Market Company (now RNDC)",
        "note": "Historical data from July 2021. Washington State local wines only.",
        "total_products": len(products),
        "products": products
    }

    with open(output_path, 'w') as f:
        json.dump(output, f, indent=2)

    print(f"\nWrote {len(products)} products to {output_path}")

    # Print subcategory breakdown
    subcats = {}
    for p in products:
        key = f"{p['subcategory']} / {p['region']}"
        subcats[key] = subcats.get(key, 0) + 1
    print("\nSubcategory / Region breakdown:")
    for key, count in sorted(subcats.items()):
        print(f"  {key}: {count}")

    # Print some sample products for verification
    print("\nFirst 3 products:")
    for p in products[:3]:
        print(f"  {p['code']} | {p['brand']} | {p['description'][:50]} | {p['subcategory']} | {p['region']} | {p['size']} | {p['pack']} | ${p['case_price']} | ${p['net_price']}")

    print("\nLast 3 products:")
    for p in products[-3:]:
        print(f"  {p['code']} | {p['brand']} | {p['description'][:50]} | {p['subcategory']} | {p['region']} | {p['size']} | {p['pack']} | ${p['case_price']} | ${p['net_price']}")


if __name__ == '__main__':
    main()
