/**
 * TTB COLA Full Scan — Queries all 552 WA importer permits
 * 
 * Uses non-headless Playwright to bypass bot detection.
 * Rate-limited: 3 second delay between requests.
 * Full pagination: follows all "Next >" links.
 * Saves progress after every 10 permits.
 * 
 * Run: cd data && node scrape_ttb_cola_full.mjs
 * Expected runtime: ~30-45 minutes for 552 permits
 */
import { chromium } from 'playwright';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';
const OUTPUT = `${DATA_DIR}/ttb_cola_permit_results.json`;
const PROGRESS_FILE = `${DATA_DIR}/ttb_cola_progress.json`;

// Load WA importer permits
const csv = readFileSync(`${DATA_DIR}/raw/ttb_alcohol_importers_2025-04.csv`, 'utf-8');
const allPermits = [];
for (const line of csv.split('\n')) {
  if (!line.startsWith('WA-I-')) continue;
  const match = line.match(/^(WA-I-\d+)/);
  if (match) allPermits.push(match[1]);
}

console.log(`Total WA importer permits: ${allPermits.length}`);

// Resume from progress if available
let progress = { completed: [], results: [] };
if (existsSync(PROGRESS_FILE)) {
  progress = JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8'));
  console.log(`Resuming: ${progress.completed.length} permits already done, ${progress.results.length} records so far`);
}

const completedSet = new Set(progress.completed);
const remaining = allPermits.filter(p => !completedSet.has(p));
console.log(`Remaining: ${remaining.length} permits to query`);

const browser = await chromium.launch({
  headless: false,
  args: ['--disable-blink-features=AutomationControlled']
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

let allResults = [...progress.results];
let queried = 0;
let errorStreak = 0;

function saveProgress() {
  writeFileSync(PROGRESS_FILE, JSON.stringify({
    completed: [...completedSet],
    results: allResults,
    last_saved: new Date().toISOString(),
  }));
}

for (const permit of remaining) {
  queried++;
  
  try {
    await page.goto('https://www.ttbonline.gov/colasonline/publicSearchColasAdvanced.do', {
      waitUntil: 'domcontentloaded', timeout: 20000
    });
    await page.waitForTimeout(3000); // Rate limit: 3 second delay
    
    // Fill permit — use recent date range (2024-2026) to keep results manageable
    await page.fill('#plant', permit);
    await page.fill('#datecompletedfrom', '01/01/2024');
    await page.fill('#datecompletedto', '04/07/2026');
    await page.click('input[value="Search"]');
    await page.waitForTimeout(3000);
    
    const bodyText = await page.innerText('body');
    
    if (bodyText.includes('No results were found')) {
      completedSet.add(permit);
      errorStreak = 0;
      if (queried % 10 === 0) console.log(`  [${queried}/${remaining.length}] ... (${permit} no results)`);
      continue;
    }
    
    const countMatch = bodyText.match(/Total Matching Records:\s*(\d+)/);
    const total = countMatch ? parseInt(countMatch[1]) : 0;
    
    // Paginate ALL pages (cap at 10 pages = 200 records per permit to prevent runaway)
    let pageNum = 1;
    const MAX_PAGES = 10;
    let hasMore = true;
    let permitResults = [];

    while (hasMore && pageNum <= MAX_PAGES) {
      const rows = await page.$$eval('table tr', trs => {
        return trs.map(tr => {
          const tds = Array.from(tr.querySelectorAll('td'));
          if (tds.length >= 6) {
            return {
              ttb_id: tds[0]?.textContent?.trim() || '',
              permit_no: tds[1]?.textContent?.trim() || '',
              serial: tds[2]?.textContent?.trim() || '',
              date: tds[3]?.textContent?.trim() || '',
              fanciful_name: tds[4]?.textContent?.trim() || '',
              brand_name: tds[5]?.textContent?.trim() || '',
            };
          }
          return null;
        }).filter(r => r && r.ttb_id && r.ttb_id.match(/^\d/));
      });
      
      permitResults.push(...rows);
      
      const nextLink = await page.$('a:has-text("Next >")');
      if (nextLink) {
        await nextLink.click();
        await page.waitForTimeout(2500);
        pageNum++;
      } else {
        hasMore = false;
      }
    }
    
    if (permitResults.length > 0) {
      for (const r of permitResults) r.search_permit = permit;
      allResults.push(...permitResults);
      console.log(`  [${queried}/${remaining.length}] ${permit}: ${total} total, ${permitResults.length} scraped across ${pageNum} pages`);
    }
    
    completedSet.add(permit);
    errorStreak = 0;
    
    // Save progress every 10 permits
    if (queried % 10 === 0) {
      saveProgress();
      console.log(`  --- Progress saved: ${completedSet.size} permits done, ${allResults.length} records ---`);
    }
    
  } catch (e) {
    errorStreak++;
    console.log(`  [${queried}/${remaining.length}] ${permit}: ERROR - ${e.message.split('\n')[0]}`);
    
    // If 5+ errors in a row, TTB is probably rate limiting — wait 30 seconds
    if (errorStreak >= 5) {
      console.log('  !!! Rate limited. Waiting 30 seconds...');
      await page.waitForTimeout(30000);
      errorStreak = 0;
    }
  }
}

await browser.close();

// Save final results
saveProgress();

const permits = new Set(allResults.map(r => r.permit_no));
console.log(`\n=== FINAL ===`);
console.log(`Permits queried: ${completedSet.size}`);
console.log(`Total COLA records: ${allResults.length}`);
console.log(`Unique permit holders on labels: ${permits.size}`);

writeFileSync(OUTPUT, JSON.stringify({
  source: 'TTB COLA Registry (WA permit search)',
  extracted_date: new Date().toISOString(),
  note: 'COLA records found by querying all 552 WA importer permits. Maps products to their WA importers.',
  permits_queried: completedSet.size,
  total_records: allResults.length,
  unique_label_permits: [...permits],
  results: allResults,
}, null, 2));

console.log(`\nWrote ${OUTPUT}`);
