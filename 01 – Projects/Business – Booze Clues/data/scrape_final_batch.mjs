import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

const sites = [
  { name: 'Block 15 Distribution', url: 'https://www.block15distribution.com/brands', file: 'block15_brands.json', cat: 'beer' },
  { name: 'Cherry Hill Wine & Spirits', url: 'https://www.cherryhillwine.com/suppliers', file: 'cherry_hill_brands.json', cat: 'wine' },
  { name: 'MISA Washington', url: 'https://www.misaimports.com/spirits', file: 'misa_brands.json', cat: 'spirits' },
  { name: 'Tequilas USA', url: 'https://tequilasusa.com/tequilas/', file: 'tequilas_usa_brands.json', cat: 'spirits' },
  { name: 'Fort George Distribution', url: 'https://fortgeorgedistribution.com/brands/', file: 'fort_george_brands.json', cat: 'beer' },
];

const browser = await chromium.launch({ headless: true });

for (const site of sites) {
  console.log(`\n=== ${site.name} ===`);
  const page = await browser.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 25000 });
  } catch { console.log('  timeout, continuing...'); }
  await page.waitForTimeout(4000);
  
  // Scroll to trigger lazy loading
  await page.evaluate(async () => {
    for (let i = 0; i < 10; i++) {
      window.scrollBy(0, 500);
      await new Promise(r => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  const items = await page.evaluate(() => {
    const results = new Set();
    // Images alt text (common for brand logos)
    document.querySelectorAll('img[alt]').forEach(img => {
      const alt = img.alt.trim();
      if (alt.length > 2 && alt.length < 80 && !alt.match(/logo|icon|banner|arrow|close|menu|hero|placeholder/i)) 
        results.add(alt);
    });
    // Headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      const t = h.textContent.trim();
      if (t.length > 2 && t.length < 80) results.add(t);
    });
    // Links with meaningful text
    document.querySelectorAll('a').forEach(a => {
      const t = a.textContent.trim();
      if (t.length > 2 && t.length < 60 && !t.includes('\n') && !a.href.includes('mailto'))
        results.add(t);
    });
    // List items
    document.querySelectorAll('li').forEach(li => {
      const t = li.textContent.trim();
      if (t.length > 2 && t.length < 60 && !t.includes('\n'))
        results.add(t);
    });
    // Paragraphs that look like brand names (short, no periods)
    document.querySelectorAll('p').forEach(p => {
      const t = p.textContent.trim();
      if (t.length > 2 && t.length < 40 && !t.includes('.') && !t.includes('\n'))
        results.add(t);
    });
    return [...results];
  });

  const skip = /^(home|about|contact|menu|story|brands|values|login|sign|cart|search|privacy|terms|close|open|back|next|prev|page|\d+|©|all rights|cookie|our|the|and|for|with|more|view|read|see|show|hide|load|cider|craft beer|wine|spirits|beer|all|categories|sort|filter|search)$/i;
  const brands = items.filter(b => !skip.test(b) && !b.includes('©') && !b.includes('http') && !b.includes('cookie'));

  console.log(`  Found ${brands.length} items`);
  for (const b of brands.slice(0, 10)) console.log(`    ${b}`);
  if (brands.length > 10) console.log(`    ... and ${brands.length - 10} more`);

  writeFileSync(`${DATA_DIR}/${site.file}`, JSON.stringify({
    source: site.name,
    source_url: site.url,
    extracted_date: '2026-04-07',
    distributor: site.name,
    brands: brands.map(name => ({ name, category: site.cat })),
  }, null, 2));
  
  await page.close();
}

await browser.close();
console.log('\nDone!');
