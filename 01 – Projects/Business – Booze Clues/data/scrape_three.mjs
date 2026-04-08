#!/usr/bin/env node
// Scrape brand data from Beauchamp, JFC, and MTC Sake
// Uses Playwright for JS-rendered pages, falls back to fetch for static

import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const DATA_DIR = new URL('./', import.meta.url).pathname;

async function scrapeBeauchamp(browser) {
  console.log('--- Scraping Beauchamp Imports ---');
  const page = await browser.newPage();

  // First get collection slugs to understand categories
  await page.goto('https://frenchcider.com/collections', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  const collectionsContent = await page.content();

  // Also get the discover page for brand details
  await page.goto('https://frenchcider.com/pages/discover', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  const discoverContent = await page.content();

  // Extract brand info from discover page
  const brands = await page.evaluate(() => {
    const results = [];
    // Look for section titles and brand names
    const allHeaders = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const allText = [];
    allHeaders.forEach(h => {
      const text = h.textContent.trim();
      if (text && text.length > 1 && text.length < 100) {
        allText.push(text);
      }
    });

    // Look for collection links with titles
    const collLinks = document.querySelectorAll('a[href*="/collections/"]');
    collLinks.forEach(a => {
      const text = a.textContent.trim();
      const href = a.getAttribute('href');
      if (text && text.length > 1) {
        results.push({ text, href });
      }
    });

    // Get image alt texts for brand identification
    const imgs = document.querySelectorAll('img[alt]');
    const alts = [];
    imgs.forEach(img => {
      const alt = img.alt.trim();
      if (alt && alt.length > 1 && !alt.includes('logo') && !alt.includes('icon')) {
        alts.push(alt);
      }
    });

    return { headers: allText, links: results, alts };
  });

  console.log('Beauchamp headers:', brands.headers);
  console.log('Beauchamp links:', brands.links.map(l => `${l.text} -> ${l.href}`));
  console.log('Beauchamp alts:', brands.alts);

  await page.close();

  // Based on the collections page and meta descriptions we already have:
  // The meta description lists: Pierre Huet Calvados, Marquis de Saint Loup Calvados,
  // Deau Cognac, Maison Royale Brandy, Nelcius Whisky, Labiette Castille Armagnac, Bear Brother's Gin
  // Plus cider brands from collections: Herout, Kystin, Wignac, Bolée, DSC, Prince de Didonne
  // And: Distillerie des Moisans, Distillerie des Pyrénées

  const brandList = [
    { name: "Pierre Huet", category: "calvados" },
    { name: "Marquis de Saint Loup", category: "calvados" },
    { name: "Deau Cognac", category: "cognac" },
    { name: "Maison Royale", category: "brandy" },
    { name: "Nelcius", category: "whisky" },
    { name: "Labiette Castille", category: "armagnac" },
    { name: "Bear Brother's Gin", category: "gin" },
    { name: "Hérout", category: "cider" },
    { name: "Kystin", category: "cider" },
    { name: "Wignac", category: "cider" },
    { name: "Bolée", category: "cider" },
    { name: "DSC (Distillerie et Domaines de Provence)", category: "cider" },
    { name: "Prince de Didonne", category: "cider" },
    { name: "Distillerie des Moisans", category: "spirits" },
    { name: "Distillerie des Pyrénées", category: "spirits" },
  ];

  // Augment with any additional brands found on the page
  const additionalBrands = new Set();
  for (const link of brands.links) {
    const href = link.href || '';
    if (href.includes('/collections/') && link.text) {
      const slug = href.split('/collections/').pop()?.split('?')[0];
      // Check if it's a brand we haven't captured
      const knownSlugs = ['all', 'frontpage', 'production', 'promotions', '330-ml-bottles', '750-ml-bottles',
        'aoc-cidres-appellation-dorigine-controlee', 'armagnac', 'calvados', 'cognac', 'gin', 'whisky',
        'fortified-and-un-fortified-ciders-and-wines', 'fruit-juice-non-alcoholic', 'glassware-accessories',
        'herout-header', '202302-'];
      if (!knownSlugs.includes(slug)) {
        additionalBrands.add(link.text);
      }
    }
  }

  console.log('Additional brands found:', [...additionalBrands]);

  return {
    source: "Beauchamp Imports",
    source_url: "https://frenchcider.com/pages/discover",
    extracted_date: "2026-04-07",
    distributor: "Beauchamp Imports",
    brands: brandList
  };
}

async function scrapeJFC(browser) {
  console.log('\n--- Scraping JFC International ---');
  const page = await browser.newPage();
  await page.goto('https://sakeexpert.jfc.com/products/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Extract product/brand information
  const data = await page.evaluate(() => {
    const results = [];

    // Get all headers
    const headers = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      const text = h.textContent.trim();
      if (text) headers.push(text);
    });

    // Get all image alt texts
    const alts = [];
    document.querySelectorAll('img[alt]').forEach(img => {
      const alt = img.alt.trim();
      if (alt && alt.length > 1) alts.push(alt);
    });

    // Get all links
    const links = [];
    document.querySelectorAll('a').forEach(a => {
      const text = a.textContent.trim();
      const href = a.getAttribute('href') || '';
      if (text && href) links.push({ text, href });
    });

    // Look for product cards, divs with product info
    const productTexts = [];
    document.querySelectorAll('[class*="product"], [class*="brand"], [class*="item"], [class*="card"]').forEach(el => {
      productTexts.push(el.textContent.trim().substring(0, 200));
    });

    return { headers, alts, links, productTexts };
  });

  console.log('JFC headers:', data.headers);
  console.log('JFC alts:', data.alts);
  console.log('JFC product texts (first 10):', data.productTexts.slice(0, 10));

  // Try to navigate to sub-pages for more products
  const subPages = ['sake', 'shochu', 'beer', 'spirits', 'plum-wine'];
  for (const sub of subPages) {
    try {
      await page.goto(`https://sakeexpert.jfc.com/products/${sub}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      const subData = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
          items.push(h.textContent.trim());
        });
        document.querySelectorAll('img[alt]').forEach(img => {
          if (img.alt.trim()) items.push('IMG: ' + img.alt.trim());
        });
        return items;
      });
      console.log(`JFC /${sub}/ content:`, subData);
    } catch (e) {
      console.log(`JFC /${sub}/ failed:`, e.message);
    }
  }

  // Also try the product category links found on the main page
  const categoryLinks = data.links.filter(l =>
    l.href.includes('/products/') || l.href.includes('/category/')
  ).map(l => ({ text: l.text, href: l.href }));
  console.log('JFC category links:', categoryLinks);

  await page.close();
  return data;
}

async function scrapeMTC(browser) {
  console.log('\n--- Scraping MTC Sake ---');
  const page = await browser.newPage();
  await page.goto('https://www.mtcsake.com/catalog', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const headers = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      headers.push(h.textContent.trim());
    });

    const alts = [];
    document.querySelectorAll('img[alt]').forEach(img => {
      const alt = img.alt.trim();
      if (alt) alts.push(alt);
    });

    const links = [];
    document.querySelectorAll('a').forEach(a => {
      const text = a.textContent.trim();
      const href = a.getAttribute('href') || '';
      if (text && href) links.push({ text: text.substring(0, 100), href });
    });

    // Look for product/brand cards
    const productTexts = [];
    document.querySelectorAll('[class*="product"], [class*="brand"], [class*="item"], [class*="card"], [class*="summary"]').forEach(el => {
      productTexts.push(el.textContent.trim().substring(0, 300));
    });

    return { headers, alts, links, productTexts };
  });

  console.log('MTC headers:', data.headers);
  console.log('MTC alts:', data.alts);
  console.log('MTC links (first 20):', data.links.slice(0, 20));
  console.log('MTC product texts (first 10):', data.productTexts.slice(0, 10));

  // Try sub-pages
  const subPages = ['/sake', '/shochu', '/beer', '/spirits'];
  for (const sub of subPages) {
    try {
      await page.goto(`https://www.mtcsake.com/catalog${sub}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000);
      const subData = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, [class*="product"], [class*="title"]').forEach(el => {
          const text = el.textContent.trim();
          if (text && text.length < 200) items.push(text);
        });
        document.querySelectorAll('img[alt]').forEach(img => {
          if (img.alt.trim()) items.push('IMG: ' + img.alt.trim());
        });
        return items;
      });
      console.log(`MTC ${sub} content:`, subData);
    } catch(e) {
      console.log(`MTC ${sub} failed:`, e.message);
    }
  }

  await page.close();
  return data;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const beauchampData = await scrapeBeauchamp(browser);
    const jfcRaw = await scrapeJFC(browser);
    const mtcRaw = await scrapeMTC(browser);

    // Save Beauchamp (already structured)
    writeFileSync(DATA_DIR + 'beauchamp_brands.json', JSON.stringify(beauchampData, null, 2));
    console.log('\nSaved beauchamp_brands.json');

    // Save raw data for manual review
    writeFileSync(DATA_DIR + 'jfc_raw.json', JSON.stringify(jfcRaw, null, 2));
    writeFileSync(DATA_DIR + 'mtc_raw.json', JSON.stringify(mtcRaw, null, 2));
    console.log('Saved raw data files for JFC and MTC');

  } finally {
    await browser.close();
  }
}

main().catch(console.error);
