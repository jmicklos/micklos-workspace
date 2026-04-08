#!/usr/bin/env node
import { writeFileSync } from 'fs';

const DATA_DIR = new URL('./', import.meta.url).pathname;

async function fetchJSON(url) {
  const res = await fetch(url);
  return res.json();
}

async function scrapeJFC() {
  console.log('--- Scraping JFC via WooCommerce API ---');

  // The WP REST API endpoint for products
  const brands = new Map(); // brand -> category
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 20) {
    console.log(`Fetching JFC page ${page}...`);
    try {
      const url = `https://sakeexpert.jfc.com/wp-json/wp/v2/product?per_page=100&page=${page}`;
      const res = await fetch(url);

      if (!res.ok) {
        console.log(`Page ${page} returned ${res.status}, stopping.`);
        hasMore = false;
        break;
      }

      const data = await res.json();
      if (!data.length) {
        hasMore = false;
        break;
      }

      for (const item of data) {
        const title = item.title?.rendered || '';
        if (title) {
          // Extract brand name (first part before specific product descriptor)
          // e.g. "Hakutsuru Draft Sake" -> brand "Hakutsuru"
          // We'll collect all titles and deduplicate brands later
          const content = item.content?.rendered || '';
          const excerpt = item.excerpt?.rendered || '';

          // Try to extract brewery/brand from the content
          const breweryMatch = content.match(/(?:Brewery|Producer|Brand|Brewer)[:\s]*([^<\n]+)/i);
          const brandName = breweryMatch ? breweryMatch[1].trim() : title.split(/\s+/).slice(0, 2).join(' ');

          // Try to determine category from content/tags
          let category = 'sake'; // default
          const lowerTitle = title.toLowerCase();
          const lowerContent = (content + excerpt).toLowerCase();

          if (lowerTitle.includes('shochu') || lowerContent.includes('shochu')) category = 'shochu';
          else if (lowerTitle.includes('beer') || lowerContent.includes('beer') || lowerContent.includes('lager') || lowerContent.includes('ale')) category = 'beer';
          else if (lowerTitle.includes('whisky') || lowerTitle.includes('whiskey') || lowerContent.includes('whisky')) category = 'spirits';
          else if (lowerTitle.includes('gin') || lowerContent.includes('gin ')) category = 'spirits';
          else if (lowerTitle.includes('soju') || lowerContent.includes('soju')) category = 'soju';
          else if (lowerTitle.includes('plum') || lowerContent.includes('plum wine') || lowerContent.includes('umeshu')) category = 'plum wine';
          else if (lowerTitle.includes('yuzu') || lowerContent.includes('yuzu')) category = 'yuzu';

          console.log(`  ${title} -> ${category}`);

          if (!brands.has(title)) {
            brands.set(title, category);
          }
        }
      }

      page++;
    } catch (e) {
      console.log(`Error on page ${page}:`, e.message);
      hasMore = false;
    }
  }

  // Now also try the taxonomy endpoint for breweries
  try {
    console.log('Fetching brewery taxonomy...');
    for (let p = 1; p <= 10; p++) {
      const url = `https://sakeexpert.jfc.com/wp-json/wp/v2/brewery?per_page=100&page=${p}`;
      const res = await fetch(url);
      if (!res.ok) break;
      const data = await res.json();
      if (!data.length) break;
      for (const item of data) {
        console.log(`  Brewery: ${item.title?.rendered || item.name || 'unknown'}`);
      }
    }
  } catch (e) {
    console.log('Brewery taxonomy not available:', e.message);
  }

  // Try product categories
  try {
    console.log('Fetching product categories...');
    const url = `https://sakeexpert.jfc.com/wp-json/wp/v2/product_cat?per_page=100`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      for (const cat of data) {
        console.log(`  Category: ${cat.name} (${cat.count} products)`);
      }
    }
  } catch (e) {
    console.log('Product categories not available:', e.message);
  }

  // Deduplicate into brand names
  const brandMap = new Map();
  for (const [title, cat] of brands) {
    // Extract brand from product title - typically the first 1-2 words
    const words = title.replace(/&#8217;/g, "'").replace(/&#8211;/g, '-').replace(/&amp;/g, '&').split(/\s+/);
    let brandName;

    // Common patterns: "Brand Product Descriptor"
    // Try to match known brewery patterns
    const fullTitle = title.replace(/&#\d+;/g, '').trim();

    // Use first word as brand, unless it's a common descriptor
    brandName = words[0];
    if (words.length > 1 && !['Junmai', 'Tokubetsu', 'Daiginjo', 'Ginjo', 'Honjozo', 'Nigori', 'Nama', 'Sparkling'].includes(words[1])) {
      // Check if second word is part of brand
    }

    if (!brandMap.has(brandName)) {
      brandMap.set(brandName, cat);
    }
  }

  // Convert to brand list with all product titles for reference
  const brandList = [];
  const seen = new Set();
  for (const [title, cat] of brands) {
    const brandEntry = { name: title, category: cat };
    brandList.push(brandEntry);
  }

  return {
    source: "JFC International (Sake Expert)",
    source_url: "https://sakeexpert.jfc.com/products/",
    extracted_date: "2026-04-07",
    distributor: "JFC International",
    products: brandList,
    brands: [...brandMap.entries()].map(([name, cat]) => ({ name, category: cat }))
  };
}

async function scrapeMTC() {
  console.log('\n--- Scraping MTC Sake via Squarespace API ---');

  // Squarespace sites often have a JSON endpoint
  const products = [];
  const brands = new Map();

  // Try the Squarespace API
  const urls = [
    'https://www.mtcsake.com/products?format=json',
    'https://www.mtcsake.com/sake?format=json',
    'https://www.mtcsake.com/shochu?format=json',
    'https://www.mtcsake.com/spirits?format=json',
    'https://www.mtcsake.com/catalog?format=json',
  ];

  for (const url of urls) {
    try {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`  ${res.status}`);
        continue;
      }
      const data = await res.json();

      // Squarespace JSON structure
      const items = data.items || data.collection?.items || [];
      console.log(`  Found ${items.length} items`);

      for (const item of items) {
        const title = item.title || item.name || '';
        if (title) {
          let category = 'sake';
          const lower = title.toLowerCase();
          const body = (item.body || '').toLowerCase();
          const tags = (item.tags || []).join(' ').toLowerCase();
          const allText = lower + ' ' + body + ' ' + tags;

          if (allText.includes('shochu')) category = 'shochu';
          else if (allText.includes('beer') || allText.includes('lager') || allText.includes('ale')) category = 'beer';
          else if (allText.includes('whisky') || allText.includes('whiskey')) category = 'spirits';
          else if (allText.includes('gin')) category = 'spirits';
          else if (allText.includes('spirits')) category = 'spirits';
          else if (allText.includes('umeshu') || allText.includes('plum')) category = 'plum wine';
          else if (allText.includes('liqueur')) category = 'liqueur';

          // Determine category from the URL
          if (url.includes('/shochu')) category = 'shochu';
          else if (url.includes('/spirits')) category = 'spirits';

          products.push({ name: title, category });

          // Extract brand (first word typically)
          const brandName = title.split(/\s+/)[0];
          if (!brands.has(brandName)) {
            brands.set(brandName, category);
          }
        }
      }

      // Check for pagination
      if (data.pagination) {
        let nextPage = data.pagination.nextPageUrl;
        let pageCount = 0;
        while (nextPage && pageCount < 20) {
          pageCount++;
          const fullUrl = nextPage.startsWith('http') ? nextPage : `https://www.mtcsake.com${nextPage}`;
          const appendFormat = fullUrl.includes('format=json') ? fullUrl : `${fullUrl}&format=json`;
          console.log(`  Fetching next page: ${appendFormat}...`);
          try {
            const res2 = await fetch(appendFormat);
            if (!res2.ok) break;
            const data2 = await res2.json();
            const items2 = data2.items || [];
            console.log(`  Found ${items2.length} more items`);
            for (const item of items2) {
              const title = item.title || item.name || '';
              if (title) {
                let category = 'sake';
                const lower = title.toLowerCase();
                const body = (item.body || '').toLowerCase();
                if (body.includes('shochu') || lower.includes('shochu')) category = 'shochu';
                else if (body.includes('beer') || lower.includes('beer')) category = 'beer';
                else if (body.includes('whisky') || lower.includes('whisky')) category = 'spirits';
                else if (body.includes('spirits') || lower.includes('spirit')) category = 'spirits';

                if (url.includes('/shochu')) category = 'shochu';
                else if (url.includes('/spirits')) category = 'spirits';

                products.push({ name: title, category });
                const brandName = title.split(/\s+/)[0];
                if (!brands.has(brandName)) {
                  brands.set(brandName, category);
                }
              }
            }
            nextPage = data2.pagination?.nextPageUrl;
          } catch (e) {
            console.log(`  Pagination error: ${e.message}`);
            break;
          }
        }
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }

  return {
    source: "MTC Sake (Seattle Mutual Trading)",
    source_url: "https://www.mtcsake.com/catalog",
    extracted_date: "2026-04-07",
    distributor: "MTC Sake / Mutual Trading Co.",
    products,
    brands: [...brands.entries()].map(([name, cat]) => ({ name, category: cat }))
  };
}

async function main() {
  const jfcData = await scrapeJFC();
  const mtcData = await scrapeMTC();

  // Also write beauchamp from known data
  const beauchampData = {
    source: "Beauchamp Imports",
    source_url: "https://frenchcider.com/pages/discover",
    extracted_date: "2026-04-07",
    distributor: "Beauchamp Imports",
    brands: [
      { name: "Pierre Huet", category: "calvados" },
      { name: "Marquis de Saint Loup", category: "calvados" },
      { name: "Deau", category: "cognac" },
      { name: "Maison Royale", category: "brandy" },
      { name: "Nelcius", category: "whisky" },
      { name: "Labiette Castille", category: "armagnac" },
      { name: "Bear Brother's", category: "gin" },
      { name: "Herout", category: "cider" },
      { name: "Kystin", category: "cider" },
      { name: "Wignac", category: "cider" },
      { name: "Bolee", category: "cider" },
      { name: "DSC (Distillerie et Domaines de Provence)", category: "cider" },
      { name: "Prince de Didonne", category: "cider" },
      { name: "Distillerie des Moisans", category: "spirits" },
      { name: "Distillerie des Pyrenees", category: "armagnac" }
    ]
  };

  // Process JFC into clean brand list
  const jfcBrands = new Map();
  for (const p of jfcData.products) {
    // Extract brand from product name
    const name = p.name.replace(/&#\d+;/g, "'").replace(/&amp;/g, '&');
    const brand = name.split(/\s+/)[0];
    if (!jfcBrands.has(brand)) {
      jfcBrands.set(brand, p.category);
    }
  }

  const jfcOutput = {
    source: "JFC International (Sake Expert)",
    source_url: "https://sakeexpert.jfc.com/products/",
    extracted_date: "2026-04-07",
    distributor: "JFC International",
    brands: [...jfcBrands.entries()].map(([name, cat]) => ({ name, category: cat })),
    products_detail: jfcData.products
  };

  // Process MTC into clean brand list
  const mtcBrands = new Map();
  for (const p of mtcData.products) {
    const brand = p.name.split(/\s+/)[0];
    if (!mtcBrands.has(brand)) {
      mtcBrands.set(brand, p.category);
    }
  }

  const mtcOutput = {
    source: "MTC Sake (Seattle Mutual Trading)",
    source_url: "https://www.mtcsake.com/catalog",
    extracted_date: "2026-04-07",
    distributor: "MTC Sake / Mutual Trading Co.",
    brands: [...mtcBrands.entries()].map(([name, cat]) => ({ name, category: cat })),
    products_detail: mtcData.products
  };

  writeFileSync(DATA_DIR + 'beauchamp_brands.json', JSON.stringify(beauchampData, null, 2));
  console.log(`\nSaved beauchamp_brands.json (${beauchampData.brands.length} brands)`);

  writeFileSync(DATA_DIR + 'jfc_brands.json', JSON.stringify(jfcOutput, null, 2));
  console.log(`Saved jfc_brands.json (${jfcOutput.brands.length} brands, ${jfcOutput.products_detail.length} products)`);

  writeFileSync(DATA_DIR + 'mtc_sake_brands.json', JSON.stringify(mtcOutput, null, 2));
  console.log(`Saved mtc_sake_brands.json (${mtcOutput.brands.length} brands, ${mtcOutput.products_detail.length} products)`);
}

main().catch(console.error);
