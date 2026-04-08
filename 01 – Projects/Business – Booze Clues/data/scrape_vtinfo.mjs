import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const DISTRIBUTORS = [
  { name: 'Columbia Distributing', url: 'https://products.vtinfo.com/brandbuilder/01191/brands/tab/1', outputFile: 'coldist_brands.json' },
  { name: 'Olympic Eagle Distributing', url: 'https://products.vtinfo.com/brandbuilder/01778/brands/tab/1', outputFile: 'olympic_eagle_brands.json' },
];

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

async function scrapeVTinfo(browser, dist) {
  console.log(`\nScraping ${dist.name}...`);
  const page = await browser.newPage();
  try { await page.goto(dist.url, { waitUntil: 'networkidle', timeout: 30000 }); } catch { console.log('  timeout, continuing...'); }
  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: `${DATA_DIR}/${dist.outputFile.replace('.json','_screenshot.png')}`, fullPage: true });
  
  // Try multiple selectors for brands
  let brands = [];
  const selectors = [
    'img[alt]', '.brand-card', '.card', 'h3', 'h4', 'h5', 'a[href*="brand"]',
    '[class*="brand"]', '.list-group-item', 'li a',
  ];
  
  for (const sel of selectors) {
    try {
      const found = sel === 'img[alt]' 
        ? await page.$$eval(sel, els => els.map(e => e.alt).filter(a => a && a.length > 2 && a.length < 80 && !a.includes('logo')))
        : await page.$$eval(sel, els => els.map(e => e.textContent.trim()).filter(t => t.length > 1 && t.length < 80 && !t.includes('\n')));
      if (found.length > 10) {
        console.log(`  Found ${found.length} items via "${sel}"`);
        brands = found;
        break;
      }
    } catch {}
  }
  
  // Save HTML for debugging
  writeFileSync(`${DATA_DIR}/${dist.outputFile.replace('.json','_page.html')}`, await page.content());
  
  await page.close();
  
  const unique = [...new Set(brands)].filter(n => !n.match(/^(Home|About|Contact|Login|Search|\d+|Tab|Menu|Close|Filter)$/i)).sort();
  console.log(`  Unique brands: ${unique.length}`);
  
  return { source: dist.name, source_url: dist.url, extracted_date: '2026-04-06', distributor: dist.name, total_brands: unique.length, brands: unique.map(name => ({ name, category: 'all' })) };
}

const browser = await chromium.launch({ headless: true });
for (const dist of DISTRIBUTORS) {
  try {
    const data = await scrapeVTinfo(browser, dist);
    writeFileSync(`${DATA_DIR}/${dist.outputFile}`, JSON.stringify(data, null, 2));
    console.log(`  Wrote ${dist.outputFile}`);
  } catch (e) { console.error(`  ERROR: ${e.message}`); }
}
await browser.close();
console.log('\nDone!');
