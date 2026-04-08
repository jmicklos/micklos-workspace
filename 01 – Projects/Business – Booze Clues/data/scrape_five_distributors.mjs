#!/usr/bin/env node
// Scrape brand data from 5 WA distributors:
// 1. Elliott Bay Distributing (Wix - needs JS)
// 2. Grape Expectations (WordPress - WA portfolio)
// 3. Orcas Distributing (Squarespace - needs JS)
// 4. Vehrs Distributing (Next.js - needs JS)
// 5. Free Run Wine Merchants (WordPress - static HTML)

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const DATA_DIR = new URL('./', import.meta.url).pathname;
const TODAY = '2026-04-07';

function makeOutput(source, url, distributor, brands) {
  return {
    source,
    source_url: url,
    extracted_date: TODAY,
    distributor,
    brands,
  };
}

// ─── 1. Elliott Bay Distributing ───
async function scrapeElliottBay(browser) {
  console.log('--- Scraping Elliott Bay Distributing ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://www.elliottbaywines.com/portfolio', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);

    // Scroll to load all content
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const brands = await page.evaluate(() => {
      const results = [];
      const seen = new Set();

      // Look for brand/producer names in various selectors
      // Wix sites often use data-testid or specific classes
      const allText = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [data-testid*="richTextElement"] p, [data-testid*="mesh"] span, .font_2, .font_3, .font_4, .font_5, .font_7, .font_8');
      allText.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          // Filter out navigation, footer, generic text
          const lower = text.toLowerCase();
          if (!lower.includes('portfolio') && !lower.includes('contact') && !lower.includes('about') &&
              !lower.includes('home') && !lower.includes('©') && !lower.includes('copyright') &&
              !lower.includes('log in') && !lower.includes('sign up') && !lower.includes('menu') &&
              !lower.includes('elliott bay') && !lower.includes('phone') && !lower.includes('email') &&
              !lower.includes('address') && !lower.includes('follow us') && !lower.includes('all rights') &&
              !lower.includes('cookie') && !lower.includes('privacy') && text !== 'Wine' && text !== 'Spirits' &&
              text !== 'Beer' && text !== 'Cider' && text !== 'Sake') {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });

      // Also look for image alt texts which often contain brand names
      const imgs = document.querySelectorAll('img[alt]');
      imgs.forEach(img => {
        const alt = img.alt.trim();
        if (alt && alt.length > 2 && alt.length < 80 && !seen.has(alt.toLowerCase()) &&
            !alt.toLowerCase().includes('logo') && !alt.toLowerCase().includes('icon') &&
            !alt.toLowerCase().includes('elliott')) {
          seen.add(alt.toLowerCase());
          results.push(alt);
        }
      });

      return results;
    });

    console.log(`  Found ${brands.length} potential brand names`);

    // Take screenshot for debugging
    await page.screenshot({ path: DATA_DIR + 'elliott_bay_screenshot.png', fullPage: true });

    // Also grab the full text content for manual review
    const bodyText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'elliott_bay_raw_text.txt', bodyText);

    return brands;
  } finally {
    await page.close();
  }
}

// ─── 2. Grape Expectations (WA portfolio) ───
async function scrapeGrapeExpectations(browser) {
  console.log('--- Scraping Grape Expectations (WA) ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://www.grapex.com/grape-washington/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const brands = await page.evaluate(() => {
      const results = [];
      const seen = new Set();

      // Grape Expectations uses Avada theme - look for brand headings and list items
      // Brand names are typically in h2, h3, h4, or strong tags
      const headings = document.querySelectorAll('h2, h3, h4, h5, .fusion-title-heading, .fusion-text h2, .fusion-text h3');
      headings.forEach(h => {
        const text = h.textContent.trim();
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          const lower = text.toLowerCase();
          if (!lower.includes('grape washington') && !lower.includes('grape expectations') &&
              !lower.includes('contact') && !lower.includes('menu') && !lower.includes('search') &&
              !lower.includes('©') && !lower.includes('go to...') && !lower.includes('page')) {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });

      // Also look for portfolio items, cards, or linked brand names
      const links = document.querySelectorAll('a');
      links.forEach(a => {
        const text = a.textContent.trim();
        const href = a.href || '';
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          // Check if this links to a brand/producer page
          if (href.includes('/producer/') || href.includes('/brand/') || href.includes('/portfolio/') ||
              href.includes('/winery/') || href.includes('/supplier/')) {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });

      // Also check for image alt texts
      const imgs = document.querySelectorAll('.fusion-imageframe img, .fusion-image-wrapper img, img[alt]');
      imgs.forEach(img => {
        const alt = (img.alt || '').trim();
        if (alt && alt.length > 2 && alt.length < 80 && !seen.has(alt.toLowerCase()) &&
            !alt.toLowerCase().includes('logo') && !alt.toLowerCase().includes('grape')) {
          seen.add(alt.toLowerCase());
          results.push(alt);
        }
      });

      return results;
    });

    console.log(`  Found ${brands.length} potential brand names`);
    await page.screenshot({ path: DATA_DIR + 'grape_expectations_screenshot.png', fullPage: true });
    const bodyText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'grape_expectations_raw_text.txt', bodyText);
    return brands;
  } finally {
    await page.close();
  }
}

// ─── 3. Orcas Distributing ───
async function scrapeOrcas(browser) {
  console.log('--- Scraping Orcas Distributing ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://www.orcasdistributing.com/shop', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const brands = await page.evaluate(() => {
      const results = [];
      const seen = new Set();

      // Squarespace shop - look for product/category titles
      const items = document.querySelectorAll('.ProductList-item, .product-title, .grid-item, .summary-title, .collection-item, .category-item, h2, h3, .sqs-block-content h2, .sqs-block-content h3');
      items.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          const lower = text.toLowerCase();
          if (!lower.includes('shop') && !lower.includes('orcas distrib') && !lower.includes('contact') &&
              !lower.includes('about') && !lower.includes('home') && !lower.includes('©') &&
              !lower.includes('all rights') && !lower.includes('cart') && !lower.includes('menu') &&
              !lower.includes('account') && !lower.includes('select your')) {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });

      // Check for category/filter links
      const categoryLinks = document.querySelectorAll('a[href*="/shop/"], a[href*="category="], .filter-item, .category-list a');
      categoryLinks.forEach(a => {
        const text = a.textContent.trim();
        if (text && text.length > 1 && text.length < 80 && !seen.has(text.toLowerCase())) {
          const lower = text.toLowerCase();
          if (lower !== 'shop' && lower !== 'all' && !lower.includes('orcas')) {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });

      // Also look at product item names
      const productNames = document.querySelectorAll('.ProductList-title, .product-title a, .sqs-product-title, [data-product-title]');
      productNames.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 1 && !seen.has(text.toLowerCase())) {
          seen.add(text.toLowerCase());
          results.push(text);
        }
      });

      return results;
    });

    console.log(`  Found ${brands.length} potential brand names`);
    await page.screenshot({ path: DATA_DIR + 'orcas_screenshot.png', fullPage: true });
    const bodyText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'orcas_raw_text.txt', bodyText);
    return brands;
  } finally {
    await page.close();
  }
}

// ─── 4. Vehrs Distributing ───
async function scrapeVehrs(browser) {
  console.log('--- Scraping Vehrs Distributing ---');
  const page = await browser.newPage();
  const allBrands = [];
  const seen = new Set();

  try {
    // Wines page
    console.log('  Fetching wines page...');
    await page.goto('https://vehrsdistributing.com/wines', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const wineBrands = await page.evaluate(() => {
      const results = [];
      // Next.js site - content likely in standard HTML elements
      const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, [class*="brand"], [class*="producer"], [class*="winery"], .card-title, .item-title, p strong');
      const seen = new Set();
      els.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          const lower = text.toLowerCase();
          if (!lower.includes('vehrs') && !lower.includes('distribut') && !lower.includes('contact') &&
              !lower.includes('about') && !lower.includes('home') && !lower.includes('©') &&
              !lower.includes('log in') && !lower.includes('wines') && !lower.includes('spirits') &&
              !lower.includes('menu') && !lower.includes('cart') && !lower.includes('navigation') &&
              lower !== 'wine' && lower !== 'spirit' && lower !== 'beer') {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });
      return results;
    });

    await page.screenshot({ path: DATA_DIR + 'vehrs_wines_screenshot.png', fullPage: true });
    const wineText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'vehrs_wines_raw_text.txt', wineText);

    wineBrands.forEach(b => {
      if (!seen.has(b.toLowerCase())) {
        seen.add(b.toLowerCase());
        allBrands.push({ name: b, category: 'wine' });
      }
    });

    // Spirits page
    console.log('  Fetching spirits page...');
    await page.goto('https://vehrsdistributing.com/spirits', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const spiritBrands = await page.evaluate(() => {
      const results = [];
      const seen = new Set();
      const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, [class*="brand"], [class*="producer"], .card-title, .item-title, p strong');
      els.forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 1 && text.length < 120 && !seen.has(text.toLowerCase())) {
          const lower = text.toLowerCase();
          if (!lower.includes('vehrs') && !lower.includes('distribut') && !lower.includes('contact') &&
              !lower.includes('about') && !lower.includes('home') && !lower.includes('©') &&
              !lower.includes('log in') && !lower.includes('wines') && !lower.includes('spirits') &&
              !lower.includes('menu') && !lower.includes('cart') && !lower.includes('navigation') &&
              lower !== 'wine' && lower !== 'spirit' && lower !== 'beer') {
            seen.add(text.toLowerCase());
            results.push(text);
          }
        }
      });
      return results;
    });

    await page.screenshot({ path: DATA_DIR + 'vehrs_spirits_screenshot.png', fullPage: true });
    const spiritsText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'vehrs_spirits_raw_text.txt', spiritsText);

    spiritBrands.forEach(b => {
      if (!seen.has(b.toLowerCase())) {
        seen.add(b.toLowerCase());
        allBrands.push({ name: b, category: 'spirits' });
      }
    });

    console.log(`  Found ${allBrands.length} total Vehrs brands`);
    return allBrands;
  } finally {
    await page.close();
  }
}

// ─── 5. Free Run Wine Merchants ───
async function scrapeFreeRun(browser) {
  console.log('--- Scraping Free Run Wine Merchants ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://freerunwinemerchants.com/explore-by-producer/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const data = await page.evaluate(() => {
      const results = [];
      const seen = new Set();

      // This is a well-structured WordPress page with producer links
      const producerLinks = document.querySelectorAll('a[href*="/producer/"]');
      producerLinks.forEach(a => {
        const text = a.textContent.trim();
        if (text && text.length > 1 && !seen.has(text.toLowerCase())) {
          seen.add(text.toLowerCase());
          results.push(text);
        }
      });

      return results;
    });

    console.log(`  Found ${data.length} producer names`);
    await page.screenshot({ path: DATA_DIR + 'free_run_screenshot.png', fullPage: true });
    const bodyText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'free_run_raw_text.txt', bodyText);
    return data;
  } finally {
    await page.close();
  }
}

// Helper: scroll down page to trigger lazy-loading
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
      // Safety timeout
      setTimeout(() => { clearInterval(timer); resolve(); }, 30000);
    });
  });
}

// ─── Main ───
async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Elliott Bay
    const elliottBayBrands = await scrapeElliottBay(browser);
    const elliottBayOutput = makeOutput(
      'Elliott Bay Distributing', 'https://www.elliottbaywines.com/portfolio',
      'Elliott Bay Distributing',
      elliottBayBrands.map(b => ({ name: b, category: 'wine', wa_likely: true }))
    );
    writeFileSync(DATA_DIR + 'elliott_bay_brands.json', JSON.stringify(elliottBayOutput, null, 2));
    console.log(`  Saved ${elliottBayBrands.length} brands to elliott_bay_brands.json\n`);

    // 2. Grape Expectations
    const grapexBrands = await scrapeGrapeExpectations(browser);
    const grapexOutput = makeOutput(
      'Grape Expectations', 'https://www.grapex.com/grape-washington/',
      'Grape Expectations',
      grapexBrands.map(b => ({ name: b, category: 'wine', wa_confirmed: true }))
    );
    writeFileSync(DATA_DIR + 'grape_expectations_brands.json', JSON.stringify(grapexOutput, null, 2));
    console.log(`  Saved ${grapexBrands.length} brands to grape_expectations_brands.json\n`);

    // 3. Orcas
    const orcasBrands = await scrapeOrcas(browser);
    const orcasOutput = makeOutput(
      'Orcas Distributing', 'https://www.orcasdistributing.com/shop',
      'Orcas Distributing',
      orcasBrands.map(b => ({ name: b, category: 'wine', wa_likely: true }))
    );
    writeFileSync(DATA_DIR + 'orcas_brands.json', JSON.stringify(orcasOutput, null, 2));
    console.log(`  Saved ${orcasBrands.length} brands to orcas_brands.json\n`);

    // 4. Vehrs (already has category from scraping)
    const vehrsBrands = await scrapeVehrs(browser);
    const vehrsOutput = makeOutput(
      'Vehrs Distributing', 'https://vehrsdistributing.com/wines',
      'Vehrs Distributing',
      vehrsBrands.map(b => ({ name: b.name, category: b.category, wa_likely: true }))
    );
    writeFileSync(DATA_DIR + 'vehrs_brands.json', JSON.stringify(vehrsOutput, null, 2));
    console.log(`  Saved ${vehrsBrands.length} brands to vehrs_brands.json\n`);

    // 5. Free Run
    const freeRunBrands = await scrapeFreeRun(browser);
    const freeRunOutput = makeOutput(
      'Free Run Wine Merchants', 'https://freerunwinemerchants.com/explore-by-producer/',
      'Free Run Wine Merchants',
      freeRunBrands.map(b => ({ name: b, category: 'wine', wa_likely: true }))
    );
    writeFileSync(DATA_DIR + 'free_run_brands.json', JSON.stringify(freeRunOutput, null, 2));
    console.log(`  Saved ${freeRunBrands.length} brands to free_run_brands.json\n`);

    console.log('=== All done! ===');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
