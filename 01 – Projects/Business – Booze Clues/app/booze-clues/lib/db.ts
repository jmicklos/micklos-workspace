import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data', 'booze-clues.db');
    db = new Database(dbPath, { readonly: true });
    db.pragma('journal_mode = WAL');
  }
  return db;
}

// ============================================================
// Types
// ============================================================

export interface BrandResult {
  type: 'brand';
  brand_id: number;
  brand_name: string;
  category: string;
  distributor_id: number;
  distributor_name: string;
  distributor_website: string | null;
  distributor_order_url: string | null;
  distributor_phone: string | null;
  wa_availability: string;
  source: string;
  source_date: string | null;
  last_verified: string;
  product_count: number;
}

export interface ProductResult {
  type: 'product';
  product_id: number;
  product_name: string;
  description: string;
  subcategory: string;
  region: string;
  vintage: string;
  size: string;
  pack: number | null;
  case_price: number | null;
  net_price: number | null;
  sku_code: string;
  brand_id: number;
  brand_name: string;
  category: string;
  distributor_id: number;
  distributor_name: string;
  distributor_website: string | null;
  distributor_order_url: string | null;
  distributor_phone: string | null;
  wa_availability: string;
  source: string;
  source_date: string | null;
  last_verified: string;
}

export type SearchResult = BrandResult | ProductResult;

// ============================================================
// Search
// ============================================================

export function searchProducts(query: string, limit = 50, includeUnconfirmed = false): SearchResult[] {
  const db = getDb();
  const results: SearchResult[] = [];
  // By default, exclude wa_unknown (OLCC cross-ref, out-of-state data)
  const waFilter = includeUnconfirmed ? '' : "AND bd.wa_availability != 'wa_unknown'";
  const waFilterPd = includeUnconfirmed ? '' : "AND pd.wa_availability != 'wa_unknown'";

  if (!query.trim()) {
    // No query — return all brands
    const brands = db.prepare(`
      SELECT
        b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        bd.wa_availability, bd.source, bd.source_date, bd.last_verified,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL ${waFilter}
      JOIN distributor d ON d.id = bd.distributor_id
      ORDER BY b.name
      LIMIT ?
    `).all(limit) as (Omit<BrandResult, 'type'>)[];

    return brands.map(b => ({ ...b, type: 'brand' as const }));
  }

  // Build FTS query
  const ftsQuery = query.replace(/['"]/g, '').split(/\s+/).filter(Boolean).map(t => `"${t}"*`).join(' ');

  // Search brands via FTS
  try {
    const brandResults = db.prepare(`
      SELECT
        b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        bd.wa_availability, bd.source, bd.source_date, bd.last_verified,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand_fts fts
      JOIN brand b ON b.id = fts.rowid
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL ${waFilter}
      JOIN distributor d ON d.id = bd.distributor_id
      ORDER BY fts.rank
      LIMIT ?
    `).all(ftsQuery, limit) as (Omit<BrandResult, 'type'>)[];

    results.push(...brandResults.map(b => ({ ...b, type: 'brand' as const })));
  } catch {
    // FTS failed, try LIKE
    const likeQuery = `%${query}%`;
    const brandResults = db.prepare(`
      SELECT
        b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        bd.wa_availability, bd.source, bd.source_date, bd.last_verified,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL ${waFilter}
      JOIN distributor d ON d.id = bd.distributor_id
      WHERE b.name LIKE ?
      ORDER BY b.name
      LIMIT ?
    `).all(likeQuery, limit) as (Omit<BrandResult, 'type'>)[];

    results.push(...brandResults.map(b => ({ ...b, type: 'brand' as const })));
  }

  // Search products via FTS
  try {
    const productResults = db.prepare(`
      SELECT
        p.id as product_id, p.name as product_name, p.description,
        p.subcategory, p.region, p.vintage, p.size, p.pack,
        p.case_price, p.net_price, p.sku_code,
        b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        pd.wa_availability, pd.source, pd.source_date, pd.last_verified
      FROM product_fts fts
      JOIN product p ON p.id = fts.rowid
      JOIN brand b ON b.id = p.brand_id
      JOIN product_distributor pd ON pd.product_id = p.id AND pd.ended_at IS NULL ${waFilterPd}
      JOIN distributor d ON d.id = pd.distributor_id
      ORDER BY fts.rank
      LIMIT ?
    `).all(ftsQuery, limit) as (Omit<ProductResult, 'type'>)[];

    results.push(...productResults.map(p => ({ ...p, type: 'product' as const })));
  } catch {
    const likeQuery = `%${query}%`;
    const productResults = db.prepare(`
      SELECT
        p.id as product_id, p.name as product_name, p.description,
        p.subcategory, p.region, p.vintage, p.size, p.pack,
        p.case_price, p.net_price, p.sku_code,
        b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        pd.wa_availability, pd.source, pd.source_date, pd.last_verified
      FROM product p
      JOIN brand b ON b.id = p.brand_id
      JOIN product_distributor pd ON pd.product_id = p.id AND pd.ended_at IS NULL ${waFilterPd}
      JOIN distributor d ON d.id = pd.distributor_id
      WHERE p.name LIKE ? OR p.description LIKE ? OR p.subcategory LIKE ?
      ORDER BY p.name
      LIMIT ?
    `).all(likeQuery, likeQuery, likeQuery, limit) as (Omit<ProductResult, 'type'>)[];

    results.push(...productResults.map(p => ({ ...p, type: 'product' as const })));
  }

  return results;
}

export function getProductsForBrand(brandId: number): ProductResult[] {
  const db = getDb();
  const products = db.prepare(`
    SELECT
      p.id as product_id, p.name as product_name, p.description,
      p.subcategory, p.region, p.vintage, p.size, p.pack,
      p.case_price, p.net_price, p.sku_code,
      b.id as brand_id, b.name as brand_name, b.category,
      d.id as distributor_id, d.name as distributor_name, d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
      pd.wa_availability, pd.source, pd.source_date, pd.last_verified
    FROM product p
    JOIN brand b ON b.id = p.brand_id
    JOIN product_distributor pd ON pd.product_id = p.id AND pd.ended_at IS NULL
    JOIN distributor d ON d.id = pd.distributor_id
    WHERE p.brand_id = ?
    ORDER BY p.name
  `).all(brandId) as (Omit<ProductResult, 'type'>)[];

  return products.map(p => ({ ...p, type: 'product' as const }));
}

export function getStats() {
  const db = getDb();
  return {
    brands: (db.prepare("SELECT COUNT(DISTINCT b.id) as c FROM brand b JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL AND bd.wa_availability != 'wa_unknown'").get() as { c: number }).c,
    products: (db.prepare("SELECT COUNT(DISTINCT p.id) as c FROM product p JOIN product_distributor pd ON pd.product_id = p.id AND pd.ended_at IS NULL AND pd.wa_availability != 'wa_unknown'").get() as { c: number }).c,
    distributors: (db.prepare("SELECT COUNT(DISTINCT bd.distributor_id) as c FROM brand_distributor bd WHERE bd.ended_at IS NULL AND bd.wa_availability != 'wa_unknown'").get() as { c: number }).c,
    brandLinks: (db.prepare("SELECT COUNT(*) as c FROM brand_distributor WHERE ended_at IS NULL AND wa_availability != 'wa_unknown'").get() as { c: number }).c,
    productLinks: (db.prepare("SELECT COUNT(*) as c FROM product_distributor WHERE ended_at IS NULL AND wa_availability != 'wa_unknown'").get() as { c: number }).c,
  };
}
