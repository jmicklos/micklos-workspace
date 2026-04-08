import { chromium } from 'playwright';
import { writeFileSync, readFileSync } from 'fs';

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

// Load WA importer permits
const csv = readFileSync(`${DATA_DIR}/raw/ttb_alcohol_importers_2025-04.csv`, 'utf-8');
const permits = [];
for (const line of csv.split('\n')) {
  if (!line.startsWith('WA-I-')) continue;
  const match = line.match(/^(WA-I-\d+)/);
  if (match) permits.push(match[1]);
}

console.log(`Total WA importer permits: ${permits.length}`);

// Only query top 50 to start (test run)
const testPermits = permits.slice(0, 50);
console.log(`Testing with first ${testPermits.length} permits...`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const allProducts = [];
let queriedCount = 0;

for (const permit of testPermits) {
  queriedCount++;
  if (queriedCount % 10 === 0) console.log(`  Progress: ${queriedCount}/${testPermits.length}`);
  
  try {
    // Go to advanced search
    await page.goto('https://www.ttbonline.gov/colasonline/publicSearchColasAdvanced.do', { timeout: 15000 });
    await page.waitForTimeout(1000);
    
    // Fill in permit number
    await page.fill('input[name="permitNo"]', permit);
    
    // Set date range wide (from 2020 to now)
    await page.fill('input[name="dateCompletedFrom"]', '01/01/2020');
    await page.fill('input[name="dateCompletedTo"]', '04/07/2026');
    
    // Submit search
    await page.click('input[type="submit"][value="Search"]');
    await page.waitForTimeout(2000);
    
    // Check for results
    const resultText = await page.textContent('body');
    
    if (resultText.includes('No records found')) {
      continue;
    }
    
    // Try to get results count
    const countMatch = resultText.match(/(\d+)\s+record/i);
    const count = countMatch ? parseInt(countMatch[1]) : 0;
    
    if (count > 0) {
      // Extract product data from table
      const rows = await page.$$eval('table tr', trs => {
        return trs.slice(1).map(tr => {
          const tds = tr.querySelectorAll('td');
          if (tds.length >= 5) {
            return {
              ttb_id: tds[0]?.textContent?.trim(),
              brand_name: tds[1]?.textContent?.trim(),
              fanciful_name: tds[2]?.textContent?.trim(),
              class_type: tds[3]?.textContent?.trim(),
              approval_date: tds[4]?.textContent?.trim(),
            };
          }
          return null;
        }).filter(Boolean);
      });
      
      for (const row of rows) {
        row.permit = permit;
        allProducts.push(row);
      }
      
      if (rows.length > 0) {
        console.log(`  ${permit}: ${rows.length} products (e.g., ${rows[0].brand_name})`);
      }
    }
  } catch (e) {
    // Skip errors, continue with next permit
  }
}

await browser.close();

console.log(`\nTotal products found: ${allProducts.length}`);
console.log(`From ${queriedCount} permits queried`);

writeFileSync(`${DATA_DIR}/ttb_cola_wa_products.json`, JSON.stringify({
  source: 'TTB COLA Registry',
  source_url: 'https://www.ttbonline.gov/colasonline/publicSearchColasAdvanced.do',
  extracted_date: '2026-04-07',
  note: 'Products approved under WA importer permits. First 50 permits queried.',
  permits_queried: queriedCount,
  total_products: allProducts.length,
  products: allProducts,
}, null, 2));

console.log('Wrote ttb_cola_wa_products.json');
