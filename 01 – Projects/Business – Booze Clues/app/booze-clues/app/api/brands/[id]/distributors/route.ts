import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const brandId = parseInt(id, 10);
  if (isNaN(brandId)) {
    return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
  }

  const db = getDb();

  const distributors = db.prepare(`
    SELECT
      d.id as distributor_id, d.name as distributor_name,
      d.website as distributor_website, d.order_url as distributor_order_url, d.phone as distributor_phone,
      bd.wa_availability, bd.source, bd.source_date,
      CASE bd.wa_availability
        WHEN 'community_verified' THEN 1
        WHEN 'wa_confirmed' THEN 2
        WHEN 'wa_self_distributed' THEN 3
        WHEN 'wa_likely' THEN 4
        WHEN 'wa_historical' THEN 5
        WHEN 'wa_unknown' THEN 6
        ELSE 7 END as rank
    FROM brand_distributor bd
    JOIN distributor d ON d.id = bd.distributor_id
    WHERE bd.brand_id = ? AND bd.ended_at IS NULL AND bd.wa_availability != 'wa_unknown'
    ORDER BY rank, bd.source_date DESC
  `).all(brandId);

  return NextResponse.json({ brand_id: brandId, count: distributors.length, distributors });
}
