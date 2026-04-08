import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

async function scrapeWithScroll(browser, name, url, file, cat) {
  console.log(`\n=== ${name} ===`);
  const page = await browser.newPage();
  try { await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }); } catch {}
  
  // Aggressive scroll to trigger lazy loading
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(3000);
  
  // Get EVERYTHING from the page
  const data = await page.evaluate(() => {
    const items = new Set();
    // All img alt text
    document.querySelectorAll('img').forEach(img => {
      if (img.alt && img.alt.length > 2 && img.alt.length < 80) items.add(img.alt.trim());
      // Also check data attributes
      const title = img.getAttribute('data-title') || img.getAttribute('title') || '';
      if (title.length > 2 && title.length < 80) items.add(title.trim());
    });
    // All headings
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
      const t = h.textContent.trim();
      if (t.length > 2 && t.length < 80) items.add(t);
    });
    // All links
    document.querySelectorAll('a').forEach(a => {
      const t = a.textContent.trim();
      if (t.length > 2 && t.length < 60 && !t.includes('\n')) items.add(t);
      const title = a.getAttribute('title') || '';
      if (title.length > 2 && title.length < 80) items.add(title.trim());
    });
    // All spans and divs with short text (likely labels)
    document.querySelectorAll('span, div, p, li, td').forEach(el => {
      const t = el.textContent.trim();
      if (t.length > 2 && t.length < 50 && !t.includes('\n') && el.children.length === 0) items.add(t);
    });
    return [...items];
  });
  
  const skip = /^(home|about|contact|menu|story|brands|values|login|cart|search|privacy|terms|close|next|prev|page|\d+|©|cookie|all|filter|sort|show|hide|view|read|more|less|fort george|distribution|ready to drink|close menu)$/i;
  const brands = data.filter(b => !skip.test(b) && !b.includes('©') && !b.includes('http') && !b.includes('cookie') && !b.includes('@'));
  
  console.log(`  Found ${brands.length} items`);
  brands.slice(0, 15).forEach(b => console.log(`    ${b}`));
  if (brands.length > 15) console.log(`    ... and ${brands.length - 15} more`);
  
  if (brands.length > 0) {
    writeFileSync(`${DATA_DIR}/${file}`, JSON.stringify({
      source: name, source_url: url, extracted_date: '2026-04-07',
      distributor: name,
      brands: brands.map(n => ({ name: n, category: cat })),
    }, null, 2));
  }
  
  // Save screenshot
  await page.screenshot({ path: `${DATA_DIR}/${file.replace('.json','_screenshot.png')}`, fullPage: true });
  await page.close();
}

const browser = await chromium.launch({ headless: true });

await scrapeWithScroll(browser, 'Fort George Distribution', 'https://fortgeorgedistribution.com/brands/', 'fort_george_brands.json', 'beer');
await scrapeWithScroll(browser, 'Vehrs Distributing - Spirits', 'https://vehrsdistributing.com/spirits', 'vehrs_spirits_extra.json', 'spirits');
await scrapeWithScroll(browser, 'Bianco-Rosso Imports', 'https://biancorossoimports.com', 'bianco_rosso_brands.json', 'wine');
await scrapeWithScroll(browser, 'Walden Selections', 'https://www.waldenselections.com', 'walden_brands.json', 'wine');

await browser.close();
console.log('\nDone!');
