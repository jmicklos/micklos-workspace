#!/usr/bin/env python3
"""Parse downloaded HTML files to extract brand data from WA distributors."""
import re
import json
import html as html_mod
import os
import subprocess
import sys

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
    """Decode HTML entities and clean up."""
    text = html_mod.unescape(text).strip()
    # Remove zero-width spaces, nbsps, etc
    text = re.sub(r'[\u200b\u200c\u200d\ufeff]', '', text)
    text = text.replace('\xa0', ' ')
    return text.strip()


def save_json(filename, data):
    outpath = os.path.join(DATA_DIR, filename)
    with open(outpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f'  Saved {len(data["brands"])} brands to {filename}')


# ─── 1. Free Run Wine Merchants (Static HTML - good data) ───
def parse_free_run():
    print('--- Free Run Wine Merchants ---')
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
    save_json('free_run_brands.json', output)


# ─── 2. Grape Expectations WA (Static HTML with brand links) ───
def parse_grape_expectations():
    print('--- Grape Expectations (WA) ---')
    with open(os.path.join(DATA_DIR, 'grapex_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Brand names are in <a> tags linking to grapex.com/national-portfolio/ or product pages
    # Also some names appear as plain text (e.g., "Vincent Dauvissat, Chablis")
    for m in re.finditer(r'<a[^>]+href="https?://(?:www\.)?grapex\.com/(?:national-portfolio/[^"]*|[^"]*)"[^>]*>([^<]+)</a>', content):
        name = decode(m.group(1))
        lower = name.lower()
        if not name or lower in seen or len(name) < 3:
            continue
        # Skip navigation and non-brand links
        if any(skip in lower for skip in [
            'subscribe', 'price book', 'grape washington', 'grape expectations',
            'grape national', 'grape oregon', 'grape california',
            'contact', 'about', 'home', 'team', 'blog', 'news',
            'read more', 'click here', 'learn more', 'view',
            'jeff miller', 'posts by',
        ]):
            continue
        seen.add(lower)
        brands.append({'name': name, 'category': 'wine', 'wa_confirmed': True})

    # Also catch plain-text brand names that aren't linked
    # These appear as "Producer Name, Location" patterns in <p> tags
    for m in re.finditer(r'<p[^>]*>([^<]*?(?:Domaine|Château|Chateau|Bodega|Tenuta|Cantina|Casa|Finca|Quinta|Maison|Clos|Cave|Vignoble)[^<,]*)', content):
        name = decode(m.group(1)).strip().rstrip(',')
        lower = name.lower()
        if name and lower not in seen and len(name) > 3 and len(name) < 80:
            seen.add(lower)
            brands.append({'name': name, 'category': 'wine', 'wa_confirmed': True})

    output = make_output(
        'Grape Expectations',
        'https://www.grapex.com/grape-washington/',
        'Grape Expectations',
        brands
    )
    save_json('grape_expectations_brands.json', output)


# ─── 3. Elliott Bay (Wix - extract from JSON embedded in HTML) ───
def parse_elliott_bay():
    print('--- Elliott Bay Distributing ---')
    with open(os.path.join(DATA_DIR, 'elliott_bay_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Wix pages embed page data in JSON. Look for richtext content.
    # The portfolio page likely has brand names in structured data or richtext blocks

    # Try to find JSON data blocks
    # Wix uses various embedded JSON patterns

    # Extract text from "text" fields in Wix JSON that look like brand names
    # Brand names are typically short, capitalized, and don't contain common non-brand patterns
    noise_patterns = [
        'careers', "what's new", 'questionnaire', 'access catalog', 'storage',
        'our team', 'age disclaimer', 'search results', 'new customer',
        'hospitality', 'new supplier', 'home', 'portfolio', 'contact',
        'about', 'log in', 'sign up', 'copyright', '©', 'phone', 'email',
        'address', 'follow', 'cookie', 'privacy', 'terms', 'all rights',
        'menu', 'navigation', 'button', 'icon', 'arrow', 'close', 'open',
        'next', 'prev', 'back', 'skip', 'loading', 'error', 'success',
        'form', 'submit', 'cancel', 'reset', 'share', 'print', 'download',
        'select', 'choose', 'filter', 'sort', 'search', 'find', 'view',
        'click', 'tap', 'hover', 'toggle', 'expand', 'collapse',
        'no items', 'empty', 'cart', 'account', 'profile', 'settings',
        'subscribe', 'newsletter', 'update', 'notification',
        'elliott bay', 'distributor', 'distributing', 'distribution',
        'wine', 'spirits', 'beer', 'sake', 'cider',
        'washington', 'seattle', 'pacific northwest',
        'region', 'country', 'appellation', 'varietal',
    ]

    # Look for text entries in Wix JSON that could be brand names
    for m in re.finditer(r'"text"\s*:\s*"((?:[^"\\]|\\.){3,80})"', content):
        name = decode(m.group(1))
        # Decode any JSON unicode escapes
        try:
            name = name.encode('utf-8').decode('unicode_escape')
        except (UnicodeDecodeError, UnicodeError):
            pass
        name = name.strip()
        lower = name.lower()

        if not name or lower in seen or len(name) < 3:
            continue
        if any(skip in lower for skip in noise_patterns):
            continue
        # Skip anything that looks like code/HTML/CSS
        if re.search(r'[{}()<>\[\]=#;]|^\d+$|^[a-f0-9]+$|^\s+$', name):
            continue
        # Skip URL-like strings
        if '/' in name or '.' in name and ' ' not in name:
            continue

        seen.add(lower)
        brands.append(name)

    # Also try extracting from Wix richtext HTML content
    # Wix stores richtext as HTML strings in JSON
    for m in re.finditer(r'"html"\s*:\s*"((?:[^"\\]|\\.)+")', content):
        html_content = m.group(1)
        try:
            html_content = html_content.encode('utf-8').decode('unicode_escape')
        except (UnicodeDecodeError, UnicodeError):
            pass
        # Extract text from the HTML
        for text_match in re.finditer(r'>([^<]+)<', html_content):
            name = decode(text_match.group(1))
            lower = name.lower()
            if name and lower not in seen and len(name) > 2 and len(name) < 80:
                if not any(skip in lower for skip in noise_patterns):
                    if not re.search(r'[{}()<>\[\]=#;]|^\d+$', name):
                        seen.add(lower)
                        brands.append(name)

    output = make_output(
        'Elliott Bay Distributing',
        'https://www.elliottbaywines.com/portfolio',
        'Elliott Bay Distributing',
        [{'name': b, 'category': 'wine', 'wa_likely': True} for b in brands]
    )
    save_json('elliott_bay_brands.json', output)
    if len(brands) < 10:
        print('  WARNING: Few brands found from static HTML. Wix needs JS rendering.')
        print('  Will attempt Playwright fallback...')
        return False
    return True


# ─── 4. Orcas Distributing (Squarespace - needs JS) ───
def parse_orcas():
    print('--- Orcas Distributing ---')
    # Check if we have raw text from Playwright
    raw_text_path = os.path.join(DATA_DIR, 'orcas_raw_text.txt')
    if os.path.exists(raw_text_path):
        with open(raw_text_path, 'r') as f:
            text = f.read()
        if len(text) > 100:
            return parse_orcas_from_text(text)

    # Fall back to HTML parsing
    with open(os.path.join(DATA_DIR, 'orcas_page.html'), 'r') as f:
        content = f.read()

    brands = []
    seen = set()

    # Squarespace sometimes has data in JSON scripts
    for m in re.finditer(r'"title"\s*:\s*"([^"]{3,80})"', content):
        name = decode(m.group(1))
        lower = name.lower()
        if name and lower not in seen and len(name) > 2:
            if not any(skip in lower for skip in [
                'orcas', 'shop', 'distributor', 'contact', 'about', 'home',
                '©', 'cart', 'account', 'select', 'configuration',
                'squarespace', 'menu', 'nav', 'header', 'footer', 'page',
            ]):
                seen.add(lower)
                brands.append(name)

    output = make_output(
        'Orcas Distributing',
        'https://www.orcasdistributing.com/shop',
        'Orcas Distributing',
        [{'name': b, 'category': 'wine', 'wa_likely': True} for b in brands]
    )
    save_json('orcas_brands.json', output)
    if len(brands) < 5:
        print('  WARNING: Few brands found. Squarespace needs JS rendering.')
        return False
    return True


def parse_orcas_from_text(text):
    """Parse Orcas brands from raw page text (from Playwright)."""
    brands = []
    seen = set()
    lines = text.strip().split('\n')
    for line in lines:
        line = line.strip()
        if not line or len(line) < 3 or len(line) > 100:
            continue
        lower = line.lower()
        if any(skip in lower for skip in [
            'orcas', 'shop', 'distributor', 'contact', 'about', 'home',
            '©', 'cart', 'account', 'select your', 'all rights',
            'menu', 'navigation', 'follow', 'instagram', 'facebook',
        ]):
            continue
        if lower not in seen:
            seen.add(lower)
            brands.append(line)

    output = make_output(
        'Orcas Distributing',
        'https://www.orcasdistributing.com/shop',
        'Orcas Distributing',
        [{'name': b, 'category': 'wine', 'wa_likely': True} for b in brands]
    )
    save_json('orcas_brands.json', output)
    return True


# ─── 5. Vehrs Distributing (Next.js + Sanity - needs JS) ───
def parse_vehrs():
    print('--- Vehrs Distributing ---')
    brands = []
    seen = set()

    for category, filename in [('wine', 'vehrs_wine_raw_text.txt'), ('spirits', 'vehrs_spirits_raw_text.txt')]:
        raw_path = os.path.join(DATA_DIR, filename)
        if os.path.exists(raw_path):
            with open(raw_path, 'r') as f:
                text = f.read()
            if len(text) > 100:
                lines = text.strip().split('\n')
                for line in lines:
                    line = line.strip()
                    lower = line.lower()
                    if not line or len(line) < 3 or len(line) > 100:
                        continue
                    if any(skip in lower for skip in [
                        'vehrs', 'distribut', 'contact', 'about', 'home',
                        '©', 'wines', 'spirits', 'menu', 'cart', 'navigation',
                        'all rights', 'follow', 'office',
                    ]):
                        continue
                    if lower not in seen:
                        seen.add(lower)
                        brands.append({'name': line, 'category': category, 'wa_likely': True})
                continue

    # Fall back to HTML parsing
    if not brands:
        for page_file, category in [('vehrs_wines_page.html', 'wine'), ('vehrs_spirits_page.html', 'spirits')]:
            filepath = os.path.join(DATA_DIR, page_file)
            if not os.path.exists(filepath):
                continue
            with open(filepath, 'r') as f:
                content = f.read()

            # Look for brand data in embedded JSON or HTML
            for pattern in [
                r'"name"\s*:\s*"([^"]{3,80})"',
                r'"title"\s*:\s*"([^"]{3,80})"',
                r'"brand"\s*:\s*"([^"]{3,80})"',
            ]:
                for m in re.finditer(pattern, content):
                    name = decode(m.group(1))
                    lower = name.lower()
                    if name and lower not in seen and len(name) > 2:
                        if not any(skip in lower for skip in [
                            'vehrs', 'distribut', 'contact', 'about', 'home',
                            'wines', 'spirits', 'menu', 'page', 'section', 'office',
                        ]):
                            seen.add(lower)
                            brands.append({'name': name, 'category': category, 'wa_likely': True})

    output = make_output(
        'Vehrs Distributing',
        'https://vehrsdistributing.com/wines',
        'Vehrs Distributing',
        brands
    )
    save_json('vehrs_brands.json', output)
    if len(brands) < 5:
        print('  WARNING: Few brands found. Next.js/Sanity needs JS rendering.')
        return False
    return True


# ─── Playwright fallback for JS-rendered sites ───
def run_playwright_scraper():
    """Run Playwright to get raw text from JS-rendered sites."""
    print('\n--- Running Playwright for JS-rendered sites ---')
    script = os.path.join(DATA_DIR, 'scrape_js_distributors.mjs')
    if not os.path.exists(script):
        print('  Playwright script not found!')
        return False
    try:
        result = subprocess.run(
            ['node', script],
            capture_output=True, text=True, timeout=300,
            cwd=DATA_DIR
        )
        print(result.stdout)
        if result.stderr:
            print(f'  stderr: {result.stderr[:1000]}')
        return result.returncode == 0
    except subprocess.TimeoutExpired:
        print('  Playwright timed out after 300s')
        return False
    except Exception as e:
        print(f'  Playwright failed: {e}')
        return False


def parse_elliott_bay_from_text():
    """Parse Elliott Bay brands from Playwright-extracted raw text.

    The text structure is:
    - Country name (e.g., "Argentina", "France")
    - Brand name (e.g., "Altos Las Hormigas")
    - "Region: ..." line
    - Optional "Farming Type: ..." line
    - Description paragraph
    - Then next brand or country
    """
    print('--- Elliott Bay (from raw text) ---')
    raw_path = os.path.join(DATA_DIR, 'elliott_bay_raw_text.txt')
    if not os.path.exists(raw_path):
        print('  No raw text file found.')
        return False

    with open(raw_path, 'r') as f:
        text = f.read()

    if len(text) < 100:
        print(f'  Raw text too short ({len(text)} chars)')
        return False

    brands = []
    seen = set()
    lines = text.strip().split('\n')

    # Known section headers (countries/regions)
    countries = {
        'argentina', 'australia', 'england', 'france', 'germany', 'italy',
        'new zealand', 'portugal', 'south africa', 'spain', 'california',
        'oregon', 'washington', 'chile', 'austria', 'greece', 'lebanon',
        'georgia', 'hungary', 'japan', 'mexico', 'uruguay', 'canada',
        'switzerland', 'denmark', 'sweden',
    }
    # Also "Our Distributor Partners", "Ciders & Poirés", "Spirits", "Our Suppliers"
    section_headers = countries | {
        'our distributor partners', 'ciders & poirés', 'spirits', 'our suppliers',
        'ciders', 'spirits & liqueurs',
    }

    # Nav/header noise to skip entirely
    skip_exact = {
        'skip to main content', 'home', 'portfolio', "what's new", 'about',
        'contact us', 'our team', 'careers', 'log in', 'sign up',
        'access catalog', 'new customer', 'new supplier', 'questionnaire',
        'age disclaimer', 'search results', 'hospitality group & club wines',
        'storage for in progress',
    }

    current_section = 'wine'
    current_country = ''
    i = 0
    in_header = True  # skip initial nav

    while i < len(lines):
        line = lines[i].strip()
        i += 1

        if not line or line == '\u200b':
            continue

        lower = line.lower()

        # Skip header/footer content
        if lower in skip_exact:
            continue

        # Detect when we've passed the header (first country section)
        if lower in section_headers:
            in_header = False
            current_country = line
            # Determine category from section
            if lower in {'spirits', 'spirits & liqueurs'}:
                current_section = 'spirits'
            elif lower in {'ciders & poirés', 'ciders'}:
                current_section = 'cider'
            else:
                current_section = 'wine'
            continue

        if in_header:
            continue

        # Skip lines that are descriptions or metadata
        if lower.startswith('region:') or lower.startswith('farming type:') or lower.startswith('location:'):
            continue
        if lower.startswith('it\'s so much more') or lower.startswith('let us introduce'):
            continue
        if 'widget' in lower and ('load' in lower or 'didn' in lower):
            continue

        # Skip footer content
        if any(skip in lower for skip in [
            '©', 'http', 'www.', '.com', '@', 'tel:', 'fax:',
            'open from', 'industrial way', '(206)', 'privacy',
            'terms of use', 'all rights', 'cookie',
        ]):
            continue

        # Brand names are short-ish lines that appear before "Region:" lines
        # They're typically the brand/producer name
        if len(line) < 80 and lower not in seen:
            # Check if next non-empty line is "Region:" (strong indicator of a brand name)
            j = i
            while j < len(lines) and not lines[j].strip():
                j += 1
            next_line = lines[j].strip().lower() if j < len(lines) else ''

            is_brand = (
                next_line.startswith('region:') or
                next_line.startswith('farming type:') or
                # After the last brand in a country section, next line is another country
                next_line in section_headers or
                # Some entries just have a blank line then description
                (len(line) < 60 and not any(c in line for c in '.!?;') and line[0].isupper())
            )

            # Skip long description paragraphs
            if len(line) > 120:
                is_brand = False
            if re.match(r'^(The |With |Since |Founded |Family |Located |On |A |In |This |Our |Named |At |For |After )', line):
                is_brand = False

            if is_brand:
                seen.add(lower)
                brands.append({'name': line.rstrip(), 'category': current_section, 'wa_likely': True})

    output = make_output(
        'Elliott Bay Distributing',
        'https://www.elliottbaywines.com/portfolio',
        'Elliott Bay Distributing',
        brands
    )
    save_json('elliott_bay_brands.json', output)
    return len(brands) > 5


def parse_orcas_from_raw_text():
    """Parse Orcas brands from Playwright-extracted data.

    Orcas uses images for brand listings. We extract from:
    1. orcas_raw_data.json (image alt texts from category pages)
    2. orcas_raw_text.txt (fallback text content)
    """
    print('--- Orcas (from raw data) ---')

    brands = []
    seen = set()

    def clean_brand_name(raw):
        """Clean a filename-style string into a brand name."""
        # Remove file extensions
        name = re.sub(r'\.(png|jpg|jpeg|gif|webp|svg)$', '', raw, flags=re.IGNORECASE)
        # Remove trailing numbers (e.g., "Bombastic2" -> "Bombastic")
        name = re.sub(r'\s*\d+(\.\d+)?$', '', name)
        # Remove "2.0" style suffixes
        name = re.sub(r'\s*\d+\.\d+$', '', name)
        # Split CamelCase (e.g., "HeathenBrewingCompany" -> "Heathen Brewing Company")
        name = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', name)
        name = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', ' ', name)
        # Remove trailing hyphens/dashes
        name = name.rstrip('-').rstrip('_')
        # Clean up extra whitespace
        name = re.sub(r'\s+', ' ', name).strip()
        # Title case if all lowercase
        if name == name.lower():
            name = name.title()
        return name

    # Primary: parse from JSON image data
    json_path = os.path.join(DATA_DIR, 'orcas_raw_data.json')
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            raw_data = json.load(f)

        category_map = {
            'beer': 'beer', 'cider': 'cider', 'mead': 'mead',
            'spirits': 'spirits', 'sake': 'sake', 'wine': 'wine',
            'snacks': 'other',
        }

        for cat_data in raw_data:
            category = category_map.get(cat_data['category'], 'other')

            # Extract from image alt texts (which are often filenames)
            for img in cat_data.get('images', []):
                alt = img.get('alt', '').strip()

                if not alt or len(alt) < 3:
                    continue

                name = clean_brand_name(alt)

                if not name or len(name) < 3:
                    continue

                lower = name.lower()
                if lower in seen:
                    continue
                # Skip known non-brand entries
                if any(skip in lower for skip in [
                    'button', 'logo', 'icon', 'banner', 'header', 'footer',
                    'orcas distribut', 'beer | cider', 'contact', 'background',
                    'for product', 'click', 'image', 'canva', 'untitled',
                    'cider yo', 'snacks', 'null', 'blank', 'wine logo',
                    'mead +button', 'spirits button', 'sake button',
                    'beer button',
                ]) or lower in ('wine', 'beer', 'spirits', 'sake', 'cider', 'mead', 'lb', 'osb'):
                    continue

                seen.add(lower)
                brands.append({'name': name, 'category': category, 'wa_likely': True})

    if not brands:
        print('  No brands extracted from image data.')
        print('  NOTE: Orcas uses image-only brand listings.')
        print('  Manual extraction from screenshots may be needed.')

    output = make_output(
        'Orcas Distributing',
        'https://www.orcasdistributing.com/shop',
        'Orcas Distributing',
        brands
    )
    save_json('orcas_brands.json', output)
    return len(brands) > 5


def parse_vehrs_from_raw_text():
    """Parse Vehrs brands from Playwright-extracted raw text.

    The text structure per brand is:
    - Brand name (e.g., "Domaine la Domitienne")
    - Location line: "International > Europe > Languedoc/Roussillon" or "Domestic > Washington > ..."
    - Website URL
    - Then next brand

    Pages are separated by ---PAGE N--- markers.
    """
    print('--- Vehrs (from raw text) ---')
    brands = []
    seen = set()

    # Skip these exact lines
    skip_exact = {
        'vehrs distributing', 'why vehrs?', 'portfolio', 'portfolio▾',
        'wines', 'spirits', 'non-alcoholic', 'stemware', 'about us',
        'contact', 'craft spirits', 'all wines', 'all spirits',
        'show filters', 'sort by', 'a-z asc.', 'a-z desc.',
        'domestic', 'international', 'text us', 'why vehrs?',
        'contact form', 'send us a text', 'subscribe to our digital catalogs',
        'search', 'western office', 'eastern office',
        'terms & conditions', 'privacy policy', 'web design by transom',
    }

    for category, filename in [('wine', 'vehrs_wine_raw_text.txt'), ('spirits', 'vehrs_spirits_raw_text.txt')]:
        raw_path = os.path.join(DATA_DIR, filename)
        if not os.path.exists(raw_path):
            print(f'  No {category} raw text file found.')
            continue

        with open(raw_path, 'r') as f:
            text = f.read()

        if len(text) < 50:
            print(f'  {category} raw text too short ({len(text)} chars)')
            continue

        lines = text.strip().split('\n')
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            i += 1

            if not line:
                continue

            lower = line.lower()

            # Skip known noise
            if lower in skip_exact:
                continue
            if lower in seen:
                continue
            # Skip page markers
            if line.startswith('---PAGE'):
                continue
            # Skip pagination numbers
            if re.match(r'^\d+$', line):
                continue
            # Skip footer content
            if any(skip in lower for skip in [
                '©', 'vehrs', 'interested in growing', 'send us',
                'subscribe', 'phone:', 'toll free:', 'kent, wa',
                'spokane, wa', 'suite b', 'info@', '22640', '5221',
            ]):
                continue
            # Skip description text that starts with common patterns
            if lower.startswith(('vehrs distributing selects', )):
                continue

            # Check if next non-empty line is a location (International > ... or Domestic > ...) or a URL
            j = i
            while j < len(lines) and not lines[j].strip():
                j += 1
            next_line = lines[j].strip() if j < len(lines) else ''
            next_lower = next_line.lower()

            is_brand = (
                next_lower.startswith('international >') or
                next_lower.startswith('domestic >') or
                next_lower.startswith('http') or
                next_lower.startswith('www.') or
                # URL-like patterns
                re.match(r'^[a-z][a-z0-9-]*\.[a-z]', next_lower) is not None
            )

            # Also: URLs and location lines are NOT brands
            if lower.startswith(('international >', 'domestic >', 'http', 'www.')) or \
               re.match(r'^[a-z][a-z0-9-]*\.(com|net|org|fr|it|es|de|co)', lower):
                continue

            if is_brand and len(line) < 100:
                seen.add(lower)
                brands.append({'name': line, 'category': category, 'wa_likely': True})

    output = make_output(
        'Vehrs Distributing',
        'https://vehrsdistributing.com/wines',
        'Vehrs Distributing',
        brands
    )
    save_json('vehrs_brands.json', output)
    return len(brands) > 5


if __name__ == '__main__':
    # Always parse static sites first
    parse_free_run()
    parse_grape_expectations()

    # For JS-rendered sites, run Playwright first to get raw text
    print('\n--- Checking for existing raw text files ---')
    eb_raw = os.path.exists(os.path.join(DATA_DIR, 'elliott_bay_raw_text.txt'))
    orcas_raw = os.path.exists(os.path.join(DATA_DIR, 'orcas_raw_data.json'))
    vehrs_raw = os.path.exists(os.path.join(DATA_DIR, 'vehrs_wine_raw_text.txt'))

    if not (eb_raw and orcas_raw and vehrs_raw):
        print('  Missing raw text files, running Playwright...')
        run_playwright_scraper()
    else:
        print('  All raw text files exist, skipping Playwright.')

    # Parse JS-rendered sites from raw text
    eb_ok = parse_elliott_bay_from_text()
    orcas_ok = parse_orcas_from_raw_text()
    vehrs_ok = parse_vehrs_from_raw_text()

    # Report results
    print('\n=== Summary ===')
    for name, ok in [('Elliott Bay', eb_ok), ('Orcas', orcas_ok), ('Vehrs', vehrs_ok)]:
        status = 'OK' if ok else 'NEEDS ATTENTION'
        print(f'  {name}: {status}')
    print('=== Done ===')
