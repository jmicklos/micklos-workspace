#!/usr/bin/env python3
"""Extract product data from Young's Market Company PDF catalog."""

import json
import re
import subprocess
import sys

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using python or pdftotext."""
    try:
        # Try pdftotext first
        result = subprocess.run(['pdftotext', '-layout', pdf_path, '-'],
                              capture_output=True, text=True)
        if result.returncode == 0:
            return result.stdout
    except FileNotFoundError:
        pass

    # Try PyPDF2/pypdf
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass

    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass

    print("ERROR: Need pdftotext, pypdf, or PyPDF2 to extract text")
    sys.exit(1)

def parse_products(text):
    """Parse product entries from extracted text."""
    products = []
    current_brand = ""
    current_category = "wine"  # Default - catalog starts with wine

    lines = text.split('\n')

    # Category section markers
    category_markers = {
        'SAKE': 'sake',
        'NON-ALCOHOLIC WINE': 'non-alcoholic wine',
        'SPIRIT ALTERNATIVES': 'spirit alternatives',
        'SPIRITS': 'spirits',
        'BEER/CIDER': 'beer/cider',
        'BEER': 'beer',
        'CIDER': 'cider',
        'HARD SELTZER': 'hard seltzer',
        'NON-ALCOHOLIC': 'non-alcoholic',
        'MIXERS': 'mixers',
        'NON-ALCOHOLIC MISCELLANEOUS': 'non-alcoholic miscellaneous',
    }

    # Pattern for product lines: code (6 digits) followed by description, then size, pack, prices
    # Flexible pattern to catch various formats
    product_pattern = re.compile(
        r'^\s*(\d{6})\s+'  # 6-digit code
        r'(.+?)\s+'  # description (greedy but followed by size)
        r'(\d+(?:\.\d+)?(?:ML|LT|OZ|GL))\s+'  # size like 750ML, 1LT, 1.5LT, etc.
        r'(\d+)\s+'  # pack count
        r'([\d,]+\.\d{2})\s+'  # case price
        r'([\d,]+\.\d{2})\s*$'  # net price
    , re.IGNORECASE)

    # Alternative pattern where description wraps to next line
    code_only_pattern = re.compile(r'^\s*(\d{6})\s+(.+)$')
    continuation_pattern = re.compile(
        r'^\s+(.+?)\s+'
        r'(\d+(?:\.\d+)?(?:ML|LT|OZ|GL))\s+'
        r'(\d+)\s+'
        r'([\d,]+\.\d{2})\s+'
        r'([\d,]+\.\d{2})\s*$'
    , re.IGNORECASE)

    # Brand header pattern (bold/italic brand names, typically ALL CAPS on their own line)
    brand_pattern = re.compile(r'^\s*([A-Z][A-Z0-9\s&\'\-\./\(\)]+?)\s*$')

    pending_line = None

    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue

        # Skip page headers/footers
        if stripped == 'JUNE 2021' or stripped.startswith('Page ') or 'Young' in stripped and 'Market' in stripped:
            continue
        if stripped == 'Code' or stripped.startswith('Code ') and 'Brand/Description' in stripped:
            continue

        # Check for major category changes
        upper = stripped.upper().strip()

        # Check exact category headers
        if upper == 'WINE' and len(stripped) < 10:
            # Could be end of wine section or start
            continue
        if upper == 'SAKE' and len(stripped) < 10:
            current_category = 'sake'
            continue
        if upper in ('SPIRITS', 'SPIRIT ALTERNATIVES', 'NON-ALCOHOLIC WINE',
                      'BEER/CIDER', 'BEER', 'CIDER', 'HARD SELTZER',
                      'NON-ALCOHOLIC', 'MIXERS', 'NON-ALCOHOLIC MISCELLANEOUS'):
            current_category = category_markers.get(upper, current_category)
            continue

        # Try to match a full product line
        m = product_pattern.match(line)
        if m:
            if pending_line:
                pending_line = None  # discard incomplete pending

            code = m.group(1)
            desc = m.group(2).strip()
            size = m.group(3).upper()
            pack = int(m.group(4))
            case_price = float(m.group(5).replace(',', ''))
            net_price = float(m.group(6).replace(',', ''))

            brand = extract_brand(desc, current_brand)
            description = extract_description(desc, brand)

            products.append({
                "code": code,
                "brand": brand,
                "description": description,
                "full_description": desc,
                "category": current_category,
                "subcategory": "",
                "size": size,
                "pack": pack,
                "case_price": case_price,
                "net_price": net_price
            })
            continue

        # Check if this is a continuation of a previous line
        if pending_line:
            combined = pending_line + ' ' + stripped
            m = product_pattern.match('  ' + combined)
            if not m:
                # Try matching just the continuation for size/pack/prices
                m2 = continuation_pattern.match(line)
                if m2:
                    full_desc = pending_line.split(None, 1)
                    if len(full_desc) >= 2:
                        code = full_desc[0]
                        desc = (full_desc[1] + ' ' + m2.group(1)).strip()
                        size = m2.group(2).upper()
                        pack = int(m2.group(3))
                        case_price = float(m2.group(4).replace(',', ''))
                        net_price = float(m2.group(5).replace(',', ''))

                        brand = extract_brand(desc, current_brand)
                        description = extract_description(desc, brand)

                        products.append({
                            "code": code,
                            "brand": brand,
                            "description": description,
                            "full_description": desc,
                            "category": current_category,
                            "subcategory": "",
                            "size": size,
                            "pack": pack,
                            "case_price": case_price,
                            "net_price": net_price
                        })
                        pending_line = None
                        continue
            pending_line = None

        # Check if this looks like a brand header
        if brand_pattern.match(stripped) and not re.match(r'^\d', stripped):
            # It's likely a brand header, but filter out non-brand lines
            candidate = stripped.strip()
            # Remove (CONT.) suffix
            candidate = re.sub(r'\s*\(CONT\.\)\s*$', '', candidate).strip()
            if candidate and len(candidate) > 1 and candidate not in (
                'JUNE 2021', 'WINE', 'SAKE', 'SPIRITS', 'BEER', 'CIDER'
            ):
                current_brand = candidate
            continue

        # Check if this starts with a 6-digit code but doesn't have full data (wrapped line)
        m3 = re.match(r'^\s*(\d{6})\s+(.+)', line)
        if m3 and not product_pattern.match(line):
            pending_line = stripped
            continue

    return products

def extract_brand(full_desc, current_brand_header):
    """Extract brand name from the full description."""
    # The brand is typically everything before the first ' - '
    if ' - ' in full_desc:
        brand = full_desc.split(' - ')[0].strip()
        return brand
    return current_brand_header

def extract_description(full_desc, brand):
    """Extract product description (everything after brand name and dash)."""
    if ' - ' in full_desc:
        parts = full_desc.split(' - ', 1)
        if len(parts) > 1:
            return parts[1].strip()
    return full_desc

def normalize_size(size):
    """Normalize size strings."""
    size = size.upper().strip()
    # Common normalizations
    size = re.sub(r'(\d)ML', r'\1ML', size)
    size = re.sub(r'(\d)LT', r'\1LT', size)
    return size

def main():
    pdf_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/raw/2022 Washington Full Catalog.pdf"
    output_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/youngs_full_catalog.json"

    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    print(f"Extracted {len(text)} characters")

    # Debug: save raw text
    debug_path = "/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data/youngs_raw_text.txt"
    with open(debug_path, 'w') as f:
        f.write(text)
    print(f"Saved raw text to {debug_path}")

    print("Parsing products...")
    products = parse_products(text)
    print(f"Found {len(products)} products")

    # Build output
    output = {
        "source": "Young's Market Company",
        "source_file": "2022 Washington Full Catalog.pdf",
        "extracted_date": "2026-04-06",
        "catalog_date": "2021-06",
        "distributor": "Young's Market Company (now RNDC)",
        "note": "Historical data from 2021. Young's Market was acquired by RNDC in November 2022. 147-page catalog covering wine, sake, spirits, and spirit alternatives.",
        "total_products": len(products),
        "products": products
    }

    with open(output_path, 'w') as f:
        json.dump(output, f, indent=2)

    print(f"Wrote {len(products)} products to {output_path}")

    # Print category breakdown
    categories = {}
    for p in products:
        cat = p['category']
        categories[cat] = categories.get(cat, 0) + 1
    print("\nCategory breakdown:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    main()
