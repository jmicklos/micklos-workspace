import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

const sites = [
  { name: 'Fort George Distribution', url: 'https://fortgeorgedistribution.com/brands/', file: 'fort_george_brands.json', cat: 'beer' },
  { name: 'Maletis Beverage', url: 'https://www.maletis.com/products/', file: 'maletis_brands.json', cat: 'beer' },
  { name: 'Walton Beverage Co.', url: 'https://www.waltonbeverage.com/alcohol/', file: 'walton_brands.json', cat: 'beer' },
  { name: 'Walden Selections', url: 'https://www.waldenselections.com', file: 'walden_brands.json', cat: 'wine' },
  { name: 'Bianco-Rosso Imports', url: 'https://biancorossoimports.com', file: 'bianco_rosso_brands.json', cat: 'wine' },
  { name: 'Alluvial Beverage Company', url: 'http://www.alluvialbeveragecompany.com/our-winery-brands.html', file: 'alluvial_brands.json', cat: 'wine' },
];

const browser = await chromium.launch({ headless: true });

for (const site of sites) {
  console.log(`\nScraping ${site.name}...`);
  const page = await browser.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch { console.log('  timeout, continuing...'); }
  await page.waitForTimeout(3000);

  const items = await page.evaluate(() => {
    const results = new Set();
    // Get from img alt
    document.querySelectorAll('img[alt]').forEach(img => {
      const alt = img.alt.trim();
      if (alt.length > 2 && alt.length < 80) results.add(alt);
    });
    // Get from headings
    document.querySelectorAll('h2, h3, h4, h5').forEach(h => {
      const t = h.textContent.trim();
      if (t.length > 2 && t.length < 80) results.add(t);
    });
    // Get from links with meaningful text
    document.querySelectorAll('a').forEach(a => {
      const t = a.textContent.trim();
      if (t.length > 2 && t.length < 60 && !t.includes('\n')) results.add(t);
    });
    return [...results];
  });

  const skip = /^(home|about|contact|menu|story|brands|values|login|sign|cart|search|privacy|terms|close|open|back|next|prev|page|\d+|©|all rights|cookie)$/i;
  const brands = items.filter(b => !skip.test(b) && !b.includes('©') && !b.includes('http'));

  console.log(`  ${brands.length} items`);
  if (brands.length > 0) {
    writeFileSync(`${DATA_DIR}/${site.file}`, JSON.stringify({
      source: site.name,
      source_url: site.url,
      extracted_date: '2026-04-07',
      distributor: site.name,
      brands: brands.map(name => ({ name, category: site.cat })),
    }, null, 2));
  }
  await page.close();
}

await browser.close();
console.log('\nDone!');
