import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const db = getDb();
  const by = request.nextUrl.searchParams.get('by') || 'category';
  const filter = request.nextUrl.searchParams.get('filter') || '';
  const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '100', 10), 500);
  const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0', 10);

  if (by === 'categories') {
    // Return category summary
    const categories = db.prepare(`
      SELECT b.category, COUNT(DISTINCT b.id) as brand_count,
        COUNT(DISTINCT bd.distributor_id) as distributor_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL
      GROUP BY b.category
      ORDER BY brand_count DESC
    `).all();
    return NextResponse.json({ categories });
  }

  if (by === 'distributors') {
    const distributors = db.prepare(`
      SELECT d.id, d.name, d.website, d.order_url, d.phone, d.city,
        COUNT(DISTINCT bd.brand_id) as brand_count,
        (SELECT COUNT(*) FROM product_distributor pd WHERE pd.distributor_id = d.id AND pd.ended_at IS NULL) as product_count
      FROM distributor d
      JOIN brand_distributor bd ON bd.distributor_id = d.id AND bd.ended_at IS NULL
      GROUP BY d.id
      HAVING brand_count > 0
      ORDER BY brand_count DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);
    return NextResponse.json({ distributors });
  }

  if (by === 'category') {
    // Browse brands in a category
    if (!filter) return NextResponse.json({ error: 'filter param required' }, { status: 400 });

    const total = (db.prepare(`
      SELECT COUNT(DISTINCT b.id) as c FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL
      WHERE b.category = ?
    `).get(filter) as { c: number }).c;

    const brands = db.prepare(`
      SELECT b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name,
        d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        bd.wa_availability, bd.source,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL
      JOIN distributor d ON d.id = bd.distributor_id
      WHERE b.category = ?
      ORDER BY b.name
      LIMIT ? OFFSET ?
    `).all(filter, limit, offset);

    return NextResponse.json({ category: filter, total, brands });
  }

  if (by === 'distributor') {
    // Browse brands for a specific distributor
    if (!filter) return NextResponse.json({ error: 'filter param required' }, { status: 400 });
    const distId = parseInt(filter, 10);

    const distributor = db.prepare(`
      SELECT id, name, website, order_url, phone, email, city
      FROM distributor WHERE id = ?
    `).get(distId) as { id: number; name: string; website: string; order_url: string; phone: string; email: string; city: string } | undefined;

    if (!distributor) return NextResponse.json({ error: 'Distributor not found' }, { status: 404 });

    const total = (db.prepare(`
      SELECT COUNT(DISTINCT bd.brand_id) as c FROM brand_distributor bd
      WHERE bd.distributor_id = ? AND bd.ended_at IS NULL
    `).get(distId) as { c: number }).c;

    const brands = db.prepare(`
      SELECT b.id as brand_id, b.name as brand_name, b.category,
        bd.wa_availability, bd.source,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL
      WHERE bd.distributor_id = ?
      ORDER BY b.name
      LIMIT ? OFFSET ?
    `).all(distId, limit, offset);

    return NextResponse.json({ distributor, total, brands });
  }

  if (by === 'availability') {
    // Browse by WA availability level
    if (!filter) return NextResponse.json({ error: 'filter param required' }, { status: 400 });

    const brands = db.prepare(`
      SELECT b.id as brand_id, b.name as brand_name, b.category,
        d.id as distributor_id, d.name as distributor_name,
        d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
        bd.wa_availability, bd.source,
        (SELECT COUNT(*) FROM product WHERE brand_id = b.id) as product_count
      FROM brand b
      JOIN brand_distributor bd ON bd.brand_id = b.id AND bd.ended_at IS NULL
      JOIN distributor d ON d.id = bd.distributor_id
      WHERE bd.wa_availability = ?
      ORDER BY b.name
      LIMIT ? OFFSET ?
    `).all(filter, limit, offset);

    return NextResponse.json({ availability: filter, brands });
  }

  return NextResponse.json({ error: 'Invalid by param. Use: categories, distributors, category, distributor, availability' }, { status: 400 });
}
