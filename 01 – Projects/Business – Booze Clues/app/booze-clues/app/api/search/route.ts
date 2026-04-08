import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50', 10);
  const includeUnconfirmed = request.nextUrl.searchParams.get('include_unconfirmed') === 'true';

  const results = searchProducts(query, Math.min(limit, 100), includeUnconfirmed);

  const brands = results.filter(r => r.type === 'brand');
  const products = results.filter(r => r.type === 'product');

  return NextResponse.json({
    query,
    brands: { count: brands.length, results: brands },
    products: { count: products.length, results: products },
    total: results.length,
  });
}
