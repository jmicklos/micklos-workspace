import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

const browser = await chromium.launch({ headless: true });
const allBrands = [];
const seenNames = new Set();

// --- Scrape /brands page ---
console.log('Scraping /brands ...');
const brandsPage = await browser.newPage();
try {
  await brandsPage.goto('https://www.riverbarrel.com/brands', { waitUntil: 'networkidle', timeout: 30000 });
} catch (e) {
  console.log('  timeout on /brands, continuing...');
}
await brandsPage.waitForTimeout(5000);

// Scroll to load lazy content
await brandsPage.evaluate(async () => {
  for (let i = 0; i < 20; i++) {
    window.scrollBy(0, 500);
    await new Promise(r => setTimeout(r, 300));
  }
  window.scrollTo(0, 0);
});
await brandsPage.waitForTimeout(2000);

await brandsPage.screenshot({ path: `${DATA_DIR}/river_barrel_brands_screenshot.png`, fullPage: true });

// Extract text from various elements
const brandsTexts = await brandsPage.evaluate(() => {
  const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a, div[data-testid]');
  return Array.from(els).map(e => ({
    tag: e.tagName,
    text: e.textContent.trim(),
    classes: e.className || '',
    parent: e.parentElement?.className || '',
  })).filter(e => e.text.length > 1 && e.text.length < 100 && !e.text.includes('\n'));
});

// Also try to get alt text from images (brand logos)
const imgAlts = await brandsPage.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  return Array.from(imgs).map(i => ({
    alt: i.alt?.trim(),
    title: i.title?.trim(),
    src: i.src,
  })).filter(i => i.alt && i.alt.length > 1 && i.alt.length < 80);
});

console.log(`  Found ${brandsTexts.length} text elements and ${imgAlts.length} image alts on /brands`);

// Dump raw data for inspection
writeFileSync(`${DATA_DIR}/raw/river_barrel_brands_raw.json`, JSON.stringify({ texts: brandsTexts, images: imgAlts }, null, 2));

await brandsPage.close();

// --- Scrape /freshsheet page ---
console.log('Scraping /freshsheet ...');
const freshPage = await browser.newPage();
try {
  await freshPage.goto('https://www.riverbarrel.com/freshsheet', { waitUntil: 'networkidle', timeout: 30000 });
} catch (e) {
  console.log('  timeout on /freshsheet, continuing...');
}
await freshPage.waitForTimeout(5000);

// Scroll to load lazy content
await freshPage.evaluate(async () => {
  for (let i = 0; i < 30; i++) {
    window.scrollBy(0, 500);
    await new Promise(r => setTimeout(r, 300));
  }
  window.scrollTo(0, 0);
});
await freshPage.waitForTimeout(2000);

await freshPage.screenshot({ path: `${DATA_DIR}/river_barrel_freshsheet_screenshot.png`, fullPage: true });

const freshTexts = await freshPage.evaluate(() => {
  const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, a, div, td, th');
  return Array.from(els).map(e => ({
    tag: e.tagName,
    text: e.textContent.trim(),
    classes: e.className || '',
  })).filter(e => e.text.length > 1 && e.text.length < 200 && !e.text.includes('\n'));
});

const freshImgAlts = await freshPage.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  return Array.from(imgs).map(i => ({
    alt: i.alt?.trim(),
    title: i.title?.trim(),
    src: i.src,
  })).filter(i => i.alt && i.alt.length > 1 && i.alt.length < 80);
});

console.log(`  Found ${freshTexts.length} text elements and ${freshImgAlts.length} image alts on /freshsheet`);

writeFileSync(`${DATA_DIR}/raw/river_barrel_freshsheet_raw.json`, JSON.stringify({ texts: freshTexts, images: freshImgAlts }, null, 2));

await freshPage.close();
await browser.close();

// --- Process and deduplicate brands ---
// Navigation / boilerplate to skip
const skipPatterns = /^(Home|About|Contact|Brands|Fresh Sheet|Our Story|Menu|More|Tel|Email|Fax|Address|Phone|Hours|Copyright|©|\d{3}|Log In|Sign Up|Subscribe|Follow|Facebook|Instagram|Twitter|LinkedIn|Pinterest|YouTube|All Rights|Privacy|Terms|Site Map|Powered by|River Barrel|Distributing|Search|Cart|Shop|Order|My Account|Welcome|Loading|Page not found|404)/i;
const tooGeneric = /^(Beer|Wine|Spirits|Cider|Seltzer|Sake|Mead|Kombucha|Non-Alcoholic|NA|RTD|Ready to Drink|Hard Seltzer|Craft|Import|Domestic|view|click|read more|learn more|see all|show more)$/i;

function addBrand(name, category) {
  const clean = name.replace(/\s+/g, ' ').trim();
  if (clean.length < 2 || clean.length > 60) return;
  if (skipPatterns.test(clean)) return;
  if (tooGeneric.test(clean)) return;
  const key = clean.toLowerCase();
  if (seenNames.has(key)) return;
  seenNames.add(key);
  allBrands.push({ name: clean, category: category || 'unknown' });
}

// Process image alts from brands page (most reliable for brand names)
for (const img of imgAlts) {
  addBrand(img.alt, 'unknown');
}

// Process text elements from brands page
for (const t of brandsTexts) {
  if (['H2', 'H3', 'H4', 'H5', 'H6'].includes(t.tag)) {
    addBrand(t.text, 'unknown');
  }
}

// Process freshsheet data
for (const img of freshImgAlts) {
  addBrand(img.alt, 'unknown');
}

for (const t of freshTexts) {
  if (['H2', 'H3', 'H4', 'H5', 'H6'].includes(t.tag)) {
    addBrand(t.text, 'unknown');
  }
}

console.log(`\nTotal unique brands extracted: ${allBrands.length}`);

const output = {
  source: 'River Barrel Distributing',
  source_url: 'https://www.riverbarrel.com/brands',
  extracted_date: '2026-04-07',
  distributor: 'River Barrel Distributing',
  coverage: 'King, Pierce, Thurston, Lewis, Snohomish, Kitsap, Grays Harbor counties',
  total_brands: allBrands.length,
  brands: allBrands,
};

writeFileSync(`${DATA_DIR}/river_barrel_brands.json`, JSON.stringify(output, null, 2));
console.log(`Saved to river_barrel_brands.json`);
