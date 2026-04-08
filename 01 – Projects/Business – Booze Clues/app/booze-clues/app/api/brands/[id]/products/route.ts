import { NextRequest, NextResponse } from 'next/server';
import { getProductsForBrand } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const brandId = parseInt(id, 10);
  if (isNaN(brandId)) {
    return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
  }

  const products = getProductsForBrand(brandId);
  return NextResponse.json({ brand_id: brandId, count: products.length, products });
}
