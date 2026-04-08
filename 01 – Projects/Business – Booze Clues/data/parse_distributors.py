#!/usr/bin/env python3
"""Parse downloaded HTML files to extract brand data from 5 WA distributors."""
import re
import json
import html
import os

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
TODAY = '2026-04-07'


def make_output(source, url, distributor, brands):
    return {
        'source': source,
        'source_url': url,
        'extracted_date': TODAY,
        'distributor': distributor,
        'brands': brands,
    }


def decode(text):
    """Decode HTML entities."""
    return html.unescape(text).strip()


# ─── 1. Free Run Wine Merchants ───
def parse_free_run():
    print('--- Parsing Free Run Wine Merchants ---')
    with open(os.path.join(DATA_DIR, 'free_run_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()
    for m in re.finditer(r'freerunwinemerchants\.com/producer/[^"]*">\s*([^<]+)', content):
        name = decode(m.group(1))
        if name and name.lower() not in seen and len(name) > 1:
            seen.add(name.lower())
            brands.append({'name': name, 'category': 'wine', 'wa_likely': True})

    output = make_output(
        'Free Run Wine Merchants',
        'https://freerunwinemerchants.com/explore-by-producer/',
        'Free Run Wine Merchants',
        brands
    )
    outpath = os.path.join(DATA_DIR, 'free_run_brands.json')
    with open(outpath, 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(brands)} brands to free_run_brands.json')


# ─── 2. Grape Expectations (WA) ───
def parse_grape_expectations():
    print('--- Parsing Grape Expectations (WA) ---')
    with open(os.path.join(DATA_DIR, 'grapex_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Look for brand names in headings (h2, h3, h4) and strong tags
    # The Avada/Fusion theme uses fusion-title or regular headings
    for pattern in [
        r'<h[23456][^>]*>\s*([^<]+?)\s*</h[23456]>',
        r'class="fusion-title-heading[^"]*"[^>]*>\s*([^<]+?)\s*</h',
        r'<strong>\s*([^<]+?)\s*</strong>',
    ]:
        for m in re.finditer(pattern, content):
            name = decode(m.group(1))
            if name and name.lower() not in seen and len(name) > 2 and len(name) < 120:
                lower = name.lower()
                if any(skip in lower for skip in [
                    'grape washington', 'grape expectations', 'contact', 'menu',
                    'search', '©', 'go to', 'page', 'privacy', 'login', 'portfolio',
                    'grape national', 'grape oregon', 'grape california', 'follow',
                    'instagram', 'facebook', 'twitter', 'our team', 'about us',
                    'toggle', 'open', 'close', 'submit', 'copyright',
                ]):
                    continue
                seen.add(lower)
                brands.append({'name': name, 'category': 'wine', 'wa_confirmed': True})

    # Also look for image alt texts which often have brand names
    for m in re.finditer(r'<img[^>]+alt="([^"]+)"', content):
        name = decode(m.group(1))
        if name and name.lower() not in seen and len(name) > 2 and len(name) < 80:
            lower = name.lower()
            if not any(skip in lower for skip in ['logo', 'grape', 'banner', 'icon', 'placeholder', 'default']):
                seen.add(lower)
                brands.append({'name': name, 'category': 'wine', 'wa_confirmed': True})

    output = make_output(
        'Grape Expectations',
        'https://www.grapex.com/grape-washington/',
        'Grape Expectations',
        brands
    )
    outpath = os.path.join(DATA_DIR, 'grape_expectations_brands.json')
    with open(outpath, 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(brands)} brands to grape_expectations_brands.json')


# ─── 3. Elliott Bay (Wix - JS rendered, may have limited static content) ───
def parse_elliott_bay():
    print('--- Parsing Elliott Bay Distributing ---')
    with open(os.path.join(DATA_DIR, 'elliott_bay_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Wix sites often embed data in JSON. Look for it.
    # Check for __EDITOR_DATA__ or masterPageData or other Wix data structures
    for pattern in [
        r'"text":"([^"]{3,80})"',
        r'"title":"([^"]{3,80})"',
        r'"label":"([^"]{3,80})"',
        r'"name":"([^"]{3,80})"',
        r'"alt":"([^"]{3,80})"',
    ]:
        for m in re.finditer(pattern, content):
            name = decode(m.group(1))
            lower = name.lower()
            if name and lower not in seen and len(name) > 2:
                if any(skip in lower for skip in [
                    'elliott', 'portfolio', 'contact', 'about', 'home', '©',
                    'log in', 'sign up', 'menu', 'phone', 'email', 'address',
                    'follow', 'cookie', 'privacy', 'http', 'www.', '.com',
                    'wix', 'script', 'function', 'return', 'null', 'true', 'false',
                    'undefined', '{', '}', '<', '>', 'class', 'style', 'font',
                    'color', 'size', 'width', 'height', 'margin', 'padding',
                    'display', 'position', 'background', 'border', 'pixel',
                    'image', 'container', 'section', 'header', 'footer', 'nav',
                    'page', 'comp-', 'data-', 'aria-', 'role=',
                ]):
                    continue
                seen.add(lower)
                brands.append(name)

    # Also check for readable text in richtext elements
    for m in re.finditer(r'<span[^>]*style="[^"]*font-size[^"]*"[^>]*>([^<]+)</span>', content):
        name = decode(m.group(1))
        if name and name.lower() not in seen and len(name) > 2 and len(name) < 80:
            lower = name.lower()
            if not any(skip in lower for skip in ['elliott', 'portfolio', 'contact', 'about', '©', 'phone', 'email']):
                seen.add(lower)
                brands.append(name)

    output = make_output(
        'Elliott Bay Distributing',
        'https://www.elliottbaywines.com/portfolio',
        'Elliott Bay Distributing',
        [{'name': b, 'category': 'wine', 'wa_likely': True} for b in brands]
    )
    outpath = os.path.join(DATA_DIR, 'elliott_bay_brands.json')
    with open(outpath, 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(brands)} brands to elliott_bay_brands.json')
    if len(brands) < 5:
        print('  WARNING: Very few brands found - Wix page likely needs JS rendering (Playwright)')


# ─── 4. Orcas Distributing (Squarespace) ───
def parse_orcas():
    print('--- Parsing Orcas Distributing ---')
    with open(os.path.join(DATA_DIR, 'orcas_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Squarespace embeds product data in JSON
    # Look for product titles in Squarespace JSON data
    for pattern in [
        r'"title"\s*:\s*"([^"]{3,80})"',
        r'"productName"\s*:\s*"([^"]{3,80})"',
        r'"fullUrl"\s*:\s*"/shop/([^"]{3,80})"',
    ]:
        for m in re.finditer(pattern, content):
            name = decode(m.group(1))
            lower = name.lower()
            if name and lower not in seen and len(name) > 2:
                if any(skip in lower for skip in [
                    'orcas', 'shop', 'distributors', 'distributor', 'contact', 'about',
                    'home', '©', 'cart', 'account', 'select', 'configuration',
                    'squarespace', 'script', 'style', 'http', 'www', '.com',
                    'null', 'true', 'false', 'undefined', 'page', 'section',
                    'header', 'footer', 'nav', 'menu',
                ]):
                    continue
                seen.add(lower)
                brands.append(name)

    # Also look for category links like /shop/wine, /shop/spirits etc.
    for m in re.finditer(r'href="/shop/([^"]+)"[^>]*>([^<]+)', content):
        slug = m.group(1)
        text = decode(m.group(2))
        if text and text.lower() not in seen and len(text) > 2 and '/' not in slug:
            seen.add(text.lower())
            brands.append(text)

    output = make_output(
        'Orcas Distributing',
        'https://www.orcasdistributing.com/shop',
        'Orcas Distributing',
        [{'name': b, 'category': 'wine', 'wa_likely': True} for b in brands]
    )
    outpath = os.path.join(DATA_DIR, 'orcas_brands.json')
    with open(outpath, 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(brands)} brands to orcas_brands.json')
    if len(brands) < 5:
        print('  WARNING: Very few brands found - Squarespace page likely needs JS rendering (Playwright)')


# ─── 5. Vehrs Distributing (Next.js) ───
def parse_vehrs():
    print('--- Parsing Vehrs Distributing ---')
    brands = []
    seen = set()

    for page_file, category in [('vehrs_wines_page.html', 'wine'), ('vehrs_spirits_page.html', 'spirits')]:
        filepath = os.path.join(DATA_DIR, page_file)
        with open(filepath, 'r') as f:
            content = f.read()

        # Next.js often has __NEXT_DATA__ JSON blob with all page data
        next_data_match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', content)
        if next_data_match:
            try:
                data = json.loads(next_data_match.group(1))
                # Recursively search for brand names in the JSON
                extract_from_json(data, brands, seen, category)
            except json.JSONDecodeError:
                pass

        # Also look for brand names in standard HTML patterns
        for pattern in [
            r'<h[23456][^>]*>\s*([^<]+?)\s*</h[23456]>',
            r'"name"\s*:\s*"([^"]{3,80})"',
            r'"title"\s*:\s*"([^"]{3,80})"',
            r'"brand"\s*:\s*"([^"]{3,80})"',
            r'"producer"\s*:\s*"([^"]{3,80})"',
        ]:
            for m in re.finditer(pattern, content):
                name = decode(m.group(1))
                lower = name.lower()
                if name and lower not in seen and len(name) > 2 and len(name) < 100:
                    if any(skip in lower for skip in [
                        'vehrs', 'distribut', 'contact', 'about', 'home', '©',
                        'wines', 'spirits', 'menu', 'cart', 'navigation', 'script',
                        'style', 'http', 'www', '.com', 'null', 'true', 'false',
                        'page', 'section', 'header', 'footer', 'next', 'image',
                    ]):
                        continue
                    seen.add(lower)
                    brands.append({'name': name, 'category': category, 'wa_likely': True})

    output = make_output(
        'Vehrs Distributing',
        'https://vehrsdistributing.com/wines',
        'Vehrs Distributing',
        brands
    )
    outpath = os.path.join(DATA_DIR, 'vehrs_brands.json')
    with open(outpath, 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(brands)} brands to vehrs_brands.json')
    if len(brands) < 5:
        print('  WARNING: Very few brands found - Next.js page likely needs JS rendering (Playwright)')


def extract_from_json(obj, brands, seen, category, depth=0):
    """Recursively extract brand-like names from JSON data."""
    if depth > 10:
        return
    if isinstance(obj, dict):
        # Look for keys that suggest brand/producer names
        for key in ['name', 'title', 'brand', 'producer', 'winery', 'distillery', 'label']:
            if key in obj and isinstance(obj[key], str):
                name = obj[key].strip()
                lower = name.lower()
                if name and lower not in seen and len(name) > 2 and len(name) < 100:
                    if not any(skip in lower for skip in [
                        'vehrs', 'distribut', 'contact', 'about', 'home',
                        'wines', 'spirits', 'menu', 'page', 'section',
                    ]):
                        seen.add(lower)
                        brands.append({'name': name, 'category': category, 'wa_likely': True})
        for v in obj.values():
            extract_from_json(v, brands, seen, category, depth + 1)
    elif isinstance(obj, list):
        for item in obj:
            extract_from_json(item, brands, seen, category, depth + 1)


if __name__ == '__main__':
    parse_free_run()
    parse_grape_expectations()
    parse_elliott_bay()
    parse_orcas()
    parse_vehrs()
    print('\n=== Done! ===')
