import { writeFileSync } from 'fs';

const DATA_DIR = '/Users/micklos/repositories/micklos-workspace/01 – Projects/Business – Booze Clues/data';

// JFC via WooCommerce API
async function scrapeJFC() {
  console.log('=== JFC International (Sake Expert) ===');
  const brands = new Map();
  let page = 1;
  
  while (page <= 20) {
    const url = `https://sakeexpert.jfc.com/wp-json/wp/v2/product?per_page=100&page=${page}`;
    console.log(`  Page ${page}...`);
    try {
      const resp = await fetch(url);
      if (!resp.ok) break;
      const products = await resp.json();
      if (products.length === 0) break;
      
      for (const p of products) {
        const name = p.title?.rendered?.replace(/<[^>]*>/g, '').trim();
        if (name && name.length > 2) {
          // Extract brand from first word(s) or use product name
          const brand = name.split(' ').slice(0, 2).join(' ');
          brands.set(name, { name, category: 'sake' });
        }
      }
      page++;
    } catch (e) {
      console.log(`  Error: ${e.message}`);
      break;
    }
  }
  
  const result = [...brands.values()];
  console.log(`  Total: ${result.length} products`);
  
  writeFileSync(`${DATA_DIR}/jfc_brands.json`, JSON.stringify({
    source: 'JFC International',
    source_url: 'https://sakeexpert.jfc.com/products/',
    extracted_date: '2026-04-07',
    distributor: 'JFC International',
    brands: result,
  }, null, 2));
}

// MTC via Squarespace JSON API
async function scrapeMTC() {
  console.log('\n=== Seattle Mutual Trading (MTC Sake) ===');
  const brands = new Map();
  let offset = 0;
  
  while (true) {
    const url = `https://www.mtcsake.com/products?format=json&offset=${offset}`;
    console.log(`  Offset ${offset}...`);
    try {
      const resp = await fetch(url);
      if (!resp.ok) break;
      const data = await resp.json();
      const items = data.items || [];
      if (items.length === 0) break;
      
      for (const item of items) {
        const name = item.title?.trim();
        if (name && name.length > 2) {
          brands.set(name, { name, category: 'sake' });
        }
      }
      offset += items.length;
      if (items.length < 20) break; // Less than a full page = last page
    } catch (e) {
      console.log(`  Error: ${e.message}`);
      break;
    }
  }
  
  const result = [...brands.values()];
  console.log(`  Total: ${result.length} products`);
  
  writeFileSync(`${DATA_DIR}/mtc_sake_brands.json`, JSON.stringify({
    source: 'Seattle Mutual Trading',
    source_url: 'https://www.mtcsake.com/catalog',
    extracted_date: '2026-04-07',
    distributor: 'Seattle Mutual Trading',
    brands: result,
  }, null, 2));
}

await scrapeJFC();
await scrapeMTC();
console.log('\nDone!');
