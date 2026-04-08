import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';
const pages = [
  { url: 'https://www.dickersondistributors.com/spirits', category: 'spirits' },
  { url: 'https://www.dickersondistributors.com/wine', category: 'wine' },
  { url: 'https://www.dickersondistributors.com/beer-cider-seltzer', category: 'beer' },
];

const browser = await chromium.launch({ headless: true });
const allBrands = [];

for (const pg of pages) {
  console.log(`Scraping ${pg.category}...`);
  const page = await browser.newPage();
  try { await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 20000 }); } catch { console.log('  timeout'); }
  await page.waitForTimeout(3000);

  const texts = await page.evaluate(() => {
    const els = document.querySelectorAll('h2, h3, h4, h5, h6, p, li, span, a');
    return Array.from(els).map(e => e.textContent.trim()).filter(t => t.length > 2 && t.length < 80 && !t.includes('\n'));
  });
  
  await page.screenshot({ path: `${DATA_DIR}/dickerson_${pg.category}_screenshot.png`, fullPage: true });
  
  // Filter to likely brand names (skip navigation, headers, etc)
  const skip = /^(Home|About|Contact|Spirits|Wine|Beer|Cider|Seltzer|Menu|More|Tel|Email|Fax|Address|Phone|Hours|Copyright|©|\d{3})/i;
  const brands = [...new Set(texts)].filter(t => !skip.test(t) && t.length > 2);
  
  for (const name of brands) {
    allBrands.push({ name, category: pg.category });
  }
  console.log(`  ${brands.length} items from ${pg.category}`);
  await page.close();
}

await browser.close();

const data = {
  source: 'Dickerson Distributors',
  source_url: 'https://www.dickersondistributors.com/',
  extracted_date: '2026-04-06',
  distributor: 'Dickerson Distributors',
  coverage: 'Whatcom, Skagit, Island, San Juan counties',
  total_brands: allBrands.length,
  brands: allBrands,
};

writeFileSync(`${DATA_DIR}/dickerson_brands.json`, JSON.stringify(data, null, 2));
console.log(`\nTotal: ${allBrands.length} brands. Wrote dickerson_brands.json`);
