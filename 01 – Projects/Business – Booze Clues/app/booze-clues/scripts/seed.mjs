import Database from 'better-sqlite3';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'booze-clues.db');
const DATA_DIR = join(__dirname, '..', '..', '..', 'data');

// Delete existing DB to rebuild fresh
import { unlinkSync } from 'fs';
try { unlinkSync(DB_PATH); } catch {}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// ============================================================
// Schema
// ============================================================
db.exec(`
  CREATE TABLE brand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL REFERENCES brand(id),
    name TEXT NOT NULL,
    description TEXT,
    subcategory TEXT,
    region TEXT,
    vintage TEXT,
    size TEXT,
    pack INTEGER,
    sku_code TEXT,
    case_price REAL,
    net_price REAL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE distributor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tradename TEXT,
    license_number TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    order_url TEXT,
    address TEXT,
    city TEXT,
    state TEXT DEFAULT 'WA',
    zip TEXT,
    county TEXT,
    source TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE brand_distributor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL REFERENCES brand(id),
    distributor_id INTEGER NOT NULL REFERENCES distributor(id),
    wa_availability TEXT DEFAULT 'wa_unknown',
    status TEXT DEFAULT 'active',
    source TEXT,
    source_date TEXT,
    started_at TEXT DEFAULT (datetime('now')),
    ended_at TEXT,
    last_verified TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE product_distributor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES product(id),
    distributor_id INTEGER NOT NULL REFERENCES distributor(id),
    wa_availability TEXT DEFAULT 'wa_unknown',
    status TEXT DEFAULT 'active',
    source TEXT,
    source_date TEXT,
    started_at TEXT DEFAULT (datetime('now')),
    ended_at TEXT,
    last_verified TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE data_import (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    filename TEXT,
    records_imported INTEGER DEFAULT 0,
    records_skipped INTEGER DEFAULT 0,
    status TEXT DEFAULT 'complete',
    imported_at TEXT DEFAULT (datetime('now'))
  );

  -- FTS on brands
  CREATE VIRTUAL TABLE brand_fts USING fts5(
    name, category,
    content='brand',
    content_rowid='id'
  );
  CREATE TRIGGER brand_ai AFTER INSERT ON brand BEGIN
    INSERT INTO brand_fts(rowid, name, category) VALUES (new.id, new.name, new.category);
  END;
  CREATE TRIGGER brand_ad AFTER DELETE ON brand BEGIN
    INSERT INTO brand_fts(brand_fts, rowid, name, category) VALUES ('delete', old.id, old.name, old.category);
  END;

  -- FTS on products
  CREATE VIRTUAL TABLE product_fts USING fts5(
    name, description, subcategory, region,
    content='product',
    content_rowid='id'
  );
  CREATE TRIGGER product_ai AFTER INSERT ON product BEGIN
    INSERT INTO product_fts(rowid, name, description, subcategory, region)
    VALUES (new.id, new.name, new.description, new.subcategory, new.region);
  END;
  CREATE TRIGGER product_ad AFTER DELETE ON product BEGIN
    INSERT INTO product_fts(product_fts, rowid, name, description, subcategory, region)
    VALUES ('delete', old.id, old.name, old.description, old.subcategory, old.region);
  END;
`);

// ============================================================
// Prepared statements
// ============================================================
const insertDist = db.prepare(`INSERT INTO distributor (name, tradename, source) VALUES (?, ?, ?)`);
const insertBrand = db.prepare(`INSERT OR IGNORE INTO brand (name, category) VALUES (?, ?)`);
const findBrand = db.prepare(`SELECT id FROM brand WHERE name = ?`);
const insertBD = db.prepare(`INSERT INTO brand_distributor (brand_id, distributor_id, wa_availability, source, source_date, status) VALUES (?, ?, ?, ?, ?, ?)`);
const insertProduct = db.prepare(`INSERT INTO product (brand_id, name, description, subcategory, region, vintage, size, pack, sku_code, case_price, net_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertPD = db.prepare(`INSERT INTO product_distributor (product_id, distributor_id, wa_availability, source, source_date, status) VALUES (?, ?, ?, ?, ?, ?)`);
const insertImport = db.prepare(`INSERT INTO data_import (source, filename, records_imported, records_skipped, status) VALUES (?, ?, ?, ?, ?)`);

function getOrCreateBrand(name, category) {
  insertBrand.run(name, category);
  return findBrand.get(name).id;
}

// ============================================================
// 1. Odom Corp — brand-level data
// ============================================================
console.log('Loading Odom Corp brands...');
const odomData = JSON.parse(readFileSync(join(DATA_DIR, 'odom_brands.json'), 'utf-8'));
const odomDist = insertDist.run('The Odom Corporation', 'The Odom Corporation', 'odom_pdf');
const odomDistId = odomDist.lastInsertRowid;

const categoryMap = { 'beer_and_cider': 'beer', 'wine_and_spirits': 'wine & spirits' };
let odomCount = 0;

for (const [catKey, brands] of Object.entries(odomData.categories)) {
  const category = categoryMap[catKey] || catKey;
  for (const brandName of brands) {
    const brandId = getOrCreateBrand(brandName, category);
    insertBD.run(brandId, odomDistId, 'wa_likely', 'odom_pdf', '2026-04', 'active');
    odomCount++;
  }
}
insertImport.run('odom_pdf', 'All-Brands-The-Odom-Corporation.pdf', odomCount, 0, 'complete');
console.log(`  ${odomCount} brands`);

// ============================================================
// 2. Winebow — brand-level data
// ============================================================
console.log('Loading Winebow WA brands...');
const winebowFile = join(DATA_DIR, 'winebow_wa_brands.json');
if (existsSync(winebowFile)) {
  const winebowData = JSON.parse(readFileSync(winebowFile, 'utf-8'));
  const winebowDist = insertDist.run('Winebow', 'Winebow', 'winebow_web');
  const winebowDistId = winebowDist.lastInsertRowid;
  let wbCount = 0;

  for (const brandName of winebowData.brands) {
    const brandId = getOrCreateBrand(brandName, winebowData.category || 'wine & spirits');
    insertBD.run(brandId, winebowDistId, 'wa_confirmed', 'winebow_web', '2026-04', 'active');
    wbCount++;
  }
  insertImport.run('winebow_web', 'winebow_wa_brands.json', wbCount, 0, 'complete');
  console.log(`  ${wbCount} brands`);
} else {
  console.log('  (skipped — file not found)');
}

// ============================================================
// 3. Young's Market — SKU-level data
// ============================================================
function loadYoungsCatalog(filename, label, waAvailability = 'wa_likely', sourceDate = '2021-06') {
  const filepath = join(DATA_DIR, filename);
  if (!existsSync(filepath)) {
    console.log(`  (skipped ${label} — file not found)`);
    return;
  }
  console.log(`Loading ${label}...`);
  const data = JSON.parse(readFileSync(filepath, 'utf-8'));

  // Young's Market / RNDC as distributor
  let youngsDist = db.prepare('SELECT id FROM distributor WHERE name = ?').get("Young's Market Company (now RNDC)");
  let youngsDistId;
  if (!youngsDist) {
    const result = insertDist.run("Young's Market Company (now RNDC)", "Young's Market Company", 'youngs_catalog');
    youngsDistId = result.lastInsertRowid;
  } else {
    youngsDistId = youngsDist.id;
  }

  let prodCount = 0;
  let brandCount = 0;

  for (const p of data.products) {
    const brandName = p.brand || 'Unknown';
    const category = p.category || 'wine';
    const brandId = getOrCreateBrand(brandName, category);

    // Check if we already have a brand_distributor link
    const existingBD = db.prepare('SELECT id FROM brand_distributor WHERE brand_id = ? AND distributor_id = ?').get(brandId, youngsDistId);
    if (!existingBD) {
      insertBD.run(brandId, youngsDistId, waAvailability, 'youngs_catalog', sourceDate, 'active');
      brandCount++;
    }

    // Insert product
    const prodResult = insertProduct.run(
      brandId,
      p.full_description || p.description || p.name || brandName,
      p.description || '',
      p.subcategory || '',
      p.region || '',
      p.vintage || '',
      p.size || '',
      p.pack || null,
      p.code || '',
      p.case_price || null,
      p.net_price || null
    );
    insertPD.run(prodResult.lastInsertRowid, youngsDistId, waAvailability, 'youngs_catalog', sourceDate, 'active');
    prodCount++;
  }

  insertImport.run('youngs_catalog', filename, prodCount, 0, 'complete');
  console.log(`  ${prodCount} products across ${brandCount} new brands`);
}

loadYoungsCatalog('youngs_full_catalog.json', "Young's Full Catalog", 'wa_historical', '2021-06');
loadYoungsCatalog('youngs_wa_wines.json', "Young's WA Wines", 'wa_historical', '2021-07');

// ============================================================
// 3b. Generic brand-level loaders (Coldist, Olympic Eagle, NW Wine & Spirits, Dickerson)
// ============================================================
function loadBrandFile(filename, distName, source, defaultCategory, waAvailability = 'wa_likely', sourceDate = '2026-04') {
  const filepath = join(DATA_DIR, filename);
  if (!existsSync(filepath)) {
    console.log(`  (skipped ${distName} — ${filename} not found)`);
    return;
  }
  console.log(`Loading ${distName}...`);
  const data = JSON.parse(readFileSync(filepath, 'utf-8'));
  const distResult = insertDist.run(distName, distName, source);
  const distId = distResult.lastInsertRowid;

  const brands = data.brands || [];
  let count = 0;
  for (const entry of brands) {
    const name = typeof entry === 'string' ? entry : entry.name;
    const category = (typeof entry === 'object' && entry.category && entry.category !== 'all')
      ? entry.category : defaultCategory;
    if (!name || name.length < 2) continue;
    const brandId = getOrCreateBrand(name, category);
    insertBD.run(brandId, distId, waAvailability, source, sourceDate, 'active');
    count++;
  }
  insertImport.run(source, filename, count, 0, 'complete');
  console.log(`  ${count} brands`);
}

loadBrandFile('coldist_brands.json', 'Columbia Distributing', 'coldist_vtinfo', 'beer', 'wa_likely');
loadBrandFile('olympic_eagle_brands.json', 'Olympic Eagle Distributing', 'olympic_eagle_vtinfo', 'beer', 'wa_likely');
loadBrandFile('nw_wine_spirits_brands.json', 'Northwest Wine & Spirits', 'nw_wine_spirits_web', 'wine & spirits', 'wa_confirmed');
loadBrandFile('dickerson_brands.json', 'Dickerson Distributors', 'dickerson_web', 'spirits', 'wa_confirmed');
loadBrandFile('river_barrel_brands.json', 'River Barrel Distributing', 'river_barrel_web', 'beer', 'wa_confirmed');
loadBrandFile('global_spirits_brands.json', 'Global Spirits and Wine', 'global_spirits_web', 'spirits', 'wa_confirmed');
loadBrandFile('beauchamp_brands.json', 'Beauchamp Imports', 'beauchamp_web', 'spirits', 'wa_confirmed');
loadBrandFile('jfc_brands.json', 'JFC International', 'jfc_web', 'sake', 'wa_likely');
loadBrandFile('mtc_sake_brands.json', 'Seattle Mutual Trading', 'mtc_sake_web', 'sake', 'wa_likely');
loadBrandFile('elliott_bay_brands.json', 'Elliott Bay Distributing Company', 'elliott_bay_web', 'wine', 'wa_likely');
loadBrandFile('grape_expectations_brands.json', 'Grape Expectations', 'grape_expectations_web', 'wine', 'wa_confirmed');
loadBrandFile('orcas_brands.json', 'Orcas Distributing', 'orcas_web', 'beer', 'wa_confirmed');
loadBrandFile('vehrs_brands.json', 'Vehrs Distributing Company', 'vehrs_web', 'wine', 'wa_likely');
loadBrandFile('free_run_brands.json', 'Free Run Wine Merchants', 'free_run_web', 'wine', 'wa_likely');

loadBrandFile('fosco_brands.json', 'FOSCO', 'fosco_web', 'spirits', 'wa_confirmed');
loadBrandFile('coho_brands.json', 'Co-Ho Imports', 'coho_web', 'sake', 'wa_likely');
loadBrandFile('owen_kotler_brands.json', 'Owen Kotler Selections', 'owen_kotler_web', 'wine', 'wa_likely');
loadBrandFile('ste_michelle_brands.json', 'Chateau Ste. Michelle', 'ste_michelle_manual', 'wine', 'wa_confirmed');
loadBrandFile('fort_george_brands.json', 'Fort George Distribution', 'fort_george_web', 'beer', 'wa_confirmed');
loadBrandFile('maletis_brands.json', 'Maletis Beverage', 'maletis_web', 'beer', 'wa_likely');
loadBrandFile('walton_brands.json', 'Walton Beverage Co.', 'walton_web', 'beer', 'wa_confirmed');
loadBrandFile('alluvial_brands.json', 'Alluvial Beverage Company', 'alluvial_web', 'wine', 'wa_confirmed');
loadBrandFile('block15_brands.json', 'Block 15 Distribution', 'block15_web', 'beer', 'wa_confirmed');
loadBrandFile('cherry_hill_brands.json', 'Cherry Hill Wine & Spirits', 'cherry_hill_web', 'wine', 'wa_confirmed');
loadBrandFile('misa_brands.json', 'MISA Washington', 'misa_web', 'spirits', 'wa_likely');
loadBrandFile('tequilas_usa_brands.json', 'Tequilas USA', 'tequilas_usa_web', 'spirits', 'wa_confirmed');

// ============================================================
// 3c. Self-distributing brands (inferred from LCB distributor names)
// ============================================================
const selfDistFile = join(DATA_DIR, 'self_distributed_brands.json');
if (existsSync(selfDistFile)) {
  console.log('Loading self-distributing brands...');
  const selfData = JSON.parse(readFileSync(selfDistFile, 'utf-8'));
  let sdCount = 0;
  for (const entry of selfData.brands) {
    const brandName = entry.name;
    const category = entry.category || 'wine';
    if (!brandName || brandName.length < 2) continue;
    const brandId = getOrCreateBrand(brandName, category);
    // Create distributor record for the self-distributing entity
    const distResult = insertDist.run(entry.distributor_name, entry.distributor_name, 'lcb_self_dist');
    const distId = distResult.lastInsertRowid;
    // Update with phone if available
    if (entry.phone) {
      db.prepare('UPDATE distributor SET phone = ? WHERE id = ?').run(entry.phone, distId);
    }
    if (entry.city) {
      db.prepare('UPDATE distributor SET city = ? WHERE id = ?').run(entry.city, distId);
    }
    insertBD.run(brandId, distId, 'wa_self_distributed', 'lcb_self_dist', '2026-03', 'active');
    sdCount++;
  }
  insertImport.run('lcb_self_dist', 'self_distributed_brands.json', sdCount, 0, 'complete');
  console.log(`  ${sdCount} self-distributing brands`);
}

// ============================================================
// 3d. Oregon OLCC Spirits (cross-reference data)
// ============================================================
const olccFile = join(DATA_DIR, 'olcc_spirits.json');
if (existsSync(olccFile)) {
  console.log('Loading Oregon OLCC spirits (cross-reference)...');
  const olccData = JSON.parse(readFileSync(olccFile, 'utf-8'));

  if (olccData.products && olccData.products.length > 0) {
    // OLCC is not a WA distributor — it's OR cross-reference data
    const olccDist = insertDist.run('Oregon OLCC (cross-reference)', 'Oregon OLCC', 'olcc_price_list');
    const olccDistId = olccDist.lastInsertRowid;

    let olccBrandCount = 0;
    let olccProdCount = 0;

    for (const p of olccData.products) {
      const desc = p.description || '';
      if (!desc || desc.length < 3) continue;
      // Use description as brand (OLCC doesn't have separate brand field)
      const brandName = desc.split(/\s{2,}/)[0]?.trim() || desc.trim();
      const brandId = getOrCreateBrand(brandName, 'spirits');

      const existingBD = db.prepare('SELECT id FROM brand_distributor WHERE brand_id = ? AND distributor_id = ?').get(brandId, olccDistId);
      if (!existingBD) {
        insertBD.run(brandId, olccDistId, 'wa_unknown', 'olcc_price_list', '2026-04', 'active');
        olccBrandCount++;
      }

      // Insert as product too (has pricing)
      const prodResult = insertProduct.run(
        brandId, desc, desc, p.subcategory || '', '', '',
        p.size || '', null, p.code || '', p.case_price || null, p.unit_price || null
      );
      insertPD.run(prodResult.lastInsertRowid, olccDistId, 'wa_unknown', 'olcc_price_list', '2026-04', 'active');
      olccProdCount++;
    }
    insertImport.run('olcc_price_list', 'olcc_spirits.json', olccProdCount, 0, 'complete');
    console.log(`  ${olccProdCount} products, ${olccBrandCount} new brands (wa_unknown — OR data)`);
  }
} else {
  console.log('  (skipped OLCC — file not found)');
}

// ============================================================
// 3e. TTB COLA Cross-Reference (WA importer → brands)
// ============================================================
const colaXrefFile = join(DATA_DIR, 'ttb_cola_wa_crossref.json');
if (existsSync(colaXrefFile)) {
  console.log('Loading TTB COLA cross-reference...');
  const colaXref = JSON.parse(readFileSync(colaXrefFile, 'utf-8'));

  let colaBrandCount = 0;
  let colaNewBrands = 0;

  for (const imp of colaXref.importers) {
    // Get or create distributor for this importer
    let dist = db.prepare('SELECT id FROM distributor WHERE name = ? OR tradename = ?').get(imp.importer, imp.owner);
    let distId;
    if (!dist) {
      const result = insertDist.run(imp.importer, imp.owner, 'ttb_cola');
      distId = result.lastInsertRowid;
      // Add permit as phone placeholder for now
      db.prepare('UPDATE distributor SET license_number = ? WHERE id = ?').run(imp.permit, distId);
    } else {
      distId = dist.id;
    }

    for (const brandName of imp.brands) {
      if (!brandName || brandName.length < 2) continue;
      const brandId = getOrCreateBrand(brandName, 'wine');

      // Check if we already have a brand_distributor link for this brand+dist
      const existing = db.prepare('SELECT id FROM brand_distributor WHERE brand_id = ? AND distributor_id = ?').get(brandId, distId);
      if (!existing) {
        insertBD.run(brandId, distId, 'wa_likely', 'ttb_cola', '2024-2026', 'active');
        colaNewBrands++;
      }
      colaBrandCount++;
    }
  }

  insertImport.run('ttb_cola', 'ttb_cola_wa_crossref.json', colaBrandCount, 0, 'complete');
  console.log(`  ${colaBrandCount} brand-importer links, ${colaNewBrands} new brands`);
} else {
  console.log('  (skipped — ttb_cola_wa_crossref.json not found)');
}

// ============================================================
// 4. TTB Distributors
// ============================================================
console.log('Loading WA distributors from TTB data...');

function parseCsvLine(line) {
  return line.match(/(".*?"|[^,]*),?/g)?.map(f => f.replace(/,$/, '').replace(/^"|"$/g, '').trim()) || [];
}

const importerCsv = readFileSync(join(DATA_DIR, 'raw', 'ttb_alcohol_importers_2025-04.csv'), 'utf-8');
let ttbCount = 0;
for (const line of importerCsv.split('\n').slice(1)) {
  if (!line.startsWith('WA-')) continue;
  const fields = parseCsvLine(line);
  if (fields.length < 6) continue;
  const displayName = fields[2] || fields[1];
  insertDist.run(displayName, fields[1], 'ttb_importers');
  ttbCount++;
}
insertImport.run('ttb_importers', 'ttb_alcohol_importers_2025-04.csv', ttbCount, 0, 'complete');
console.log(`  ${ttbCount} WA importers`);

const wholesalerCsv = readFileSync(join(DATA_DIR, 'raw', 'ttb_alcohol_wholesalers_2025-04.csv'), 'utf-8');
let wCount = 0;
for (const line of wholesalerCsv.split('\n').slice(1)) {
  if (!line.startsWith('WA-')) continue;
  const fields = parseCsvLine(line);
  if (fields.length < 6) continue;
  const displayName = fields[2] || fields[1];
  const existing = db.prepare('SELECT id FROM distributor WHERE name = ? OR tradename = ?').get(displayName, fields[1]);
  if (!existing) {
    insertDist.run(displayName, fields[1], 'ttb_wholesalers');
    wCount++;
  }
}
insertImport.run('ttb_wholesalers', 'ttb_alcohol_wholesalers_2025-04.csv', wCount, 0, 'complete');
console.log(`  ${wCount} WA wholesalers (deduped)`);

// ============================================================
// 5. Enrich distributors with contact info
// ============================================================
console.log('Enriching distributor contact info...');
const contactsFile = join(DATA_DIR, 'distributor_contacts.json');
if (existsSync(contactsFile)) {
  const contacts = JSON.parse(readFileSync(contactsFile, 'utf-8'));
  const updateContact = db.prepare(`
    UPDATE distributor SET
      website = COALESCE(?, website),
      order_url = COALESCE(?, order_url),
      phone = COALESCE(?, phone),
      email = COALESCE(?, email)
    WHERE name = ? OR tradename = ?
  `);
  let enriched = 0;
  for (const c of contacts.distributors) {
    const result = updateContact.run(
      c.website || null, c.order_url || null, c.phone || null, c.email || null,
      c.name, c.name
    );
    if (result.changes > 0) enriched++;
  }
  console.log(`  Enriched ${enriched} distributors with contact info`);
} else {
  console.log('  (skipped — distributor_contacts.json not found)');
}

// ============================================================
// Summary
// ============================================================
const brandTotal = db.prepare('SELECT COUNT(*) as c FROM brand').get().c;
const productTotal = db.prepare('SELECT COUNT(*) as c FROM product').get().c;
const distTotal = db.prepare('SELECT COUNT(*) as c FROM distributor').get().c;
const bdTotal = db.prepare('SELECT COUNT(*) as c FROM brand_distributor WHERE ended_at IS NULL').get().c;
const pdTotal = db.prepare('SELECT COUNT(*) as c FROM product_distributor WHERE ended_at IS NULL').get().c;

console.log(`\nDatabase ready at: ${DB_PATH}`);
console.log(`  Brands: ${brandTotal}`);
console.log(`  Products: ${productTotal}`);
console.log(`  Distributors: ${distTotal}`);
console.log(`  Brand-Distributor links: ${bdTotal}`);
console.log(`  Product-Distributor links: ${pdTotal}`);

db.close();
