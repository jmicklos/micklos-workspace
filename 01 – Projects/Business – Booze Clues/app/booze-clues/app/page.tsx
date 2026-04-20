"use client";

import { useState, useEffect, useCallback } from "react";

// ============================================================
// Types
// ============================================================

interface BrandResult {
  type: "brand";
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
  distributor_count: number;
}

interface ProductResult {
  type: "product";
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
}

interface Stats {
  brands: number;
  products: number;
  distributors: number;
  brandLinks: number;
  productLinks: number;
}

interface CategoryInfo {
  category: string;
  brand_count: number;
  distributor_count: number;
}

interface DistributorInfo {
  id: number;
  name: string;
  website: string | null;
  order_url: string | null;
  phone: string | null;
  city: string | null;
  brand_count: number;
  product_count: number;
}

// ============================================================
// Helpers
// ============================================================

function availabilityBadge(wa: string): { text: string; color: string } {
  switch (wa) {
    case "wa_confirmed": return { text: "Confirmed in WA", color: "bg-green-100 text-green-800" };
    case "wa_self_distributed": return { text: "Self-distributed in WA", color: "bg-green-100 text-green-800" };
    case "wa_likely": return { text: "Likely in WA", color: "bg-yellow-100 text-yellow-800" };
    case "wa_historical": return { text: "Historical (may be outdated)", color: "bg-orange-100 text-orange-800" };
    case "community_verified": return { text: "Verified by industry", color: "bg-blue-100 text-blue-800" };
    case "disputed": return { text: "Disputed", color: "bg-red-100 text-red-800" };
    default: return { text: "WA unconfirmed", color: "bg-gray-100 text-gray-500" };
  }
}

function categoryColor(category: string): string {
  if (category?.includes("beer") || category?.includes("cider")) return "bg-amber-100 text-amber-800";
  if (category?.includes("wine")) return "bg-purple-100 text-purple-800";
  if (category?.includes("spirit")) return "bg-red-100 text-red-800";
  if (category?.includes("sake")) return "bg-pink-100 text-pink-800";
  return "bg-gray-100 text-gray-800";
}

function categoryIcon(category: string): string {
  if (category?.includes("beer") || category?.includes("cider")) return "🍺";
  if (category?.includes("wine")) return "🍷";
  if (category?.includes("spirit")) return "🥃";
  if (category?.includes("sake")) return "🍶";
  return "🍾";
}

function freshnessLabel(sourceDate: string | null): { text: string; color: string } | null {
  if (!sourceDate) return null;
  const year = parseInt(sourceDate.substring(0, 4), 10);
  const currentYear = 2026;
  const age = currentYear - year;
  if (age <= 0) return { text: `Data from ${sourceDate}`, color: "text-green-600" };
  if (age === 1) return { text: `Data from ${sourceDate}`, color: "text-yellow-600" };
  return { text: `Data from ${sourceDate} (may be outdated)`, color: "text-orange-600" };
}

function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return phone;
}

// ============================================================
// Components
// ============================================================

function DistributorLinks({ website, orderUrl, phone }: {
  website: string | null;
  orderUrl: string | null;
  phone: string | null;
}) {
  if (!website && !orderUrl && !phone) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {orderUrl && (
        <a href={orderUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
          Order / Contact Rep
        </a>
      )}
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
          Website
        </a>
      )}
      {phone && (
        <a href={`tel:+1${phone.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
          {formatPhone(phone)}
        </a>
      )}
    </div>
  );
}

interface AltDistributor {
  distributor_id: number;
  distributor_name: string;
  distributor_website: string | null;
  distributor_order_url: string | null;
  distributor_phone: string | null;
  wa_availability: string;
  source: string;
  source_date: string | null;
}

function BrandCard({ brand }: { brand: BrandResult }) {
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showAltDists, setShowAltDists] = useState(false);
  const [altDists, setAltDists] = useState<AltDistributor[]>([]);
  const conf = availabilityBadge(brand.wa_availability);

  const loadProducts = async () => {
    if (products.length > 0) { setExpanded(!expanded); return; }
    setLoadingProducts(true);
    setExpanded(true);
    try {
      const res = await fetch(`/api/brands/${brand.brand_id}/products`);
      const data = await res.json();
      setProducts(data.products);
    } catch { /* ignore */ }
    setLoadingProducts(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg">{brand.brand_name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryColor(brand.category)}`}>
                {brand.category}
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${conf.color}`}>
                {conf.text}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Distributed by</p>
              <p className="font-medium text-gray-900">{brand.distributor_name}</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>Source: {brand.source?.replace(/_/g, " ")}</p>
              {(() => { const f = freshnessLabel(brand.source_date); return f ? <p className={f.color}>{f.text}</p> : null; })()}
            </div>
          </div>
          <DistributorLinks website={brand.distributor_website} orderUrl={brand.distributor_order_url} phone={brand.distributor_phone} />
          {brand.distributor_count > 1 && (
            <button
              onClick={async () => {
                if (altDists.length > 0) { setShowAltDists(!showAltDists); return; }
                const res = await fetch(`/api/brands/${brand.brand_id}/distributors`);
                const data = await res.json();
                setAltDists(data.distributors.filter((d: AltDistributor) => d.distributor_id !== brand.distributor_id));
                setShowAltDists(true);
              }}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700"
            >
              {showAltDists ? "Hide" : `Also carried by ${brand.distributor_count - 1} other distributor${brand.distributor_count - 1 !== 1 ? "s" : ""}`}
            </button>
          )}
          {showAltDists && altDists.length > 0 && (
            <div className="mt-2 space-y-2">
              {altDists.map((d) => {
                const altConf = availabilityBadge(d.wa_availability);
                const altFresh = freshnessLabel(d.source_date);
                return (
                  <div key={d.distributor_id} className="pl-3 border-l-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{d.distributor_name}</p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${altConf.color}`}>{altConf.text}</span>
                          {altFresh && <span className={`text-xs ${altFresh.color}`}>{altFresh.text}</span>}
                        </div>
                      </div>
                    </div>
                    <DistributorLinks website={d.distributor_website} orderUrl={d.distributor_order_url} phone={d.distributor_phone} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {brand.product_count > 0 && (
          <button onClick={loadProducts} className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
            {expanded ? "Hide" : "Show"} {brand.product_count} product{brand.product_count !== 1 ? "s" : ""}
          </button>
        )}
      </div>
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 rounded-b-xl">
          {loadingProducts ? (
            <p className="text-sm text-gray-400">Loading products...</p>
          ) : (
            <div className="space-y-2">
              {products.map((p) => (
                <div key={p.product_id} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 truncate">{p.description || p.product_name}</p>
                    <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
                      {p.region && <span>{p.region}</span>}
                      {p.vintage && <span>{p.vintage}</span>}
                      {p.subcategory && <span>{p.subcategory}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4 shrink-0 text-xs text-gray-500">
                    {p.size && <span>{p.size}</span>}
                    {p.pack && <span>{p.pack}pk</span>}
                    {p.net_price && <span className="font-medium text-gray-700">${p.net_price.toFixed(2)}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ProductResult }) {
  const conf = availabilityBadge(product.wa_availability);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 uppercase">{product.brand_name}</p>
          <h3 className="font-semibold text-gray-900">{product.description || product.product_name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryColor(product.category)}`}>{product.category}</span>
            {product.subcategory && <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">{product.subcategory}</span>}
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${conf.color}`}>{conf.text}</span>
          </div>
          <div className="flex gap-3 text-xs text-gray-400 mt-1">
            {product.region && <span>{product.region}</span>}
            {product.vintage && <span>{product.vintage}</span>}
            {product.size && <span>{product.size}</span>}
            {product.pack && <span>{product.pack}pk</span>}
            {product.net_price && <span className="font-medium text-gray-600">${product.net_price.toFixed(2)}/btl</span>}
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Distributed by</p>
            <p className="font-medium text-gray-900">{product.distributor_name}</p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p>Source: {product.source?.replace(/_/g, " ")}</p>
            {(() => { const f = freshnessLabel(product.source_date); return f ? <p className={f.color}>{f.text}</p> : null; })()}
          </div>
        </div>
        <DistributorLinks website={product.distributor_website} orderUrl={product.distributor_order_url} phone={product.distributor_phone} />
      </div>
    </div>
  );
}

// ============================================================
// Main App
// ============================================================

type ViewMode = "search" | "categories" | "distributors" | "browse-category" | "browse-distributor";

export default function Home() {
  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<BrandResult[]>([]);
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [view, setView] = useState<ViewMode>("search");

  // Browse state
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [distributors, setDistributors] = useState<DistributorInfo[]>([]);
  const [browseBrands, setBrowseBrands] = useState<BrandResult[]>([]);
  const [browseTitle, setBrowseTitle] = useState("");
  const [browseTotal, setBrowseTotal] = useState(0);
  const [browseOffset, setBrowseOffset] = useState(0);
  const [selectedDist, setSelectedDist] = useState<DistributorInfo | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  const search = useCallback(async (q: string) => {
    setLoading(true);
    setSearched(true);
    setView("search");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setBrands(data.brands.results);
      setProducts(data.products.results);
    } catch {
      setBrands([]);
      setProducts([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        search(query);
      } else if (query.trim().length === 0 && searched) {
        setBrands([]);
        setProducts([]);
        setSearched(false);
        setView("search");
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query, search, searched]);

  const loadCategories = async () => {
    setView("categories");
    setLoading(true);
    const res = await fetch("/api/browse?by=categories");
    const data = await res.json();
    setCategories(data.categories);
    setLoading(false);
  };

  const loadDistributors = async () => {
    setView("distributors");
    setLoading(true);
    const res = await fetch("/api/browse?by=distributors&limit=200");
    const data = await res.json();
    setDistributors(data.distributors);
    setLoading(false);
  };

  const browseCategory = async (cat: string, offset = 0) => {
    setView("browse-category");
    setLoading(true);
    setBrowseOffset(offset);
    setBrowseTitle(cat);
    const res = await fetch(`/api/browse?by=category&filter=${encodeURIComponent(cat)}&limit=50&offset=${offset}`);
    const data = await res.json();
    setBrowseBrands(data.brands.map((b: Omit<BrandResult, "type">) => ({ ...b, type: "brand" })));
    setBrowseTotal(data.total);
    setLoading(false);
  };

  const browseDistributor = async (dist: DistributorInfo, offset = 0) => {
    setView("browse-distributor");
    setLoading(true);
    setSelectedDist(dist);
    setBrowseOffset(offset);
    setBrowseTitle(dist.name);
    const res = await fetch(`/api/browse?by=distributor&filter=${dist.id}&limit=50&offset=${offset}`);
    const data = await res.json();
    setBrowseBrands(data.brands.map((b: Omit<BrandResult, "type"> & { brand_id: number }) => ({
      ...b,
      type: "brand",
      distributor_id: dist.id,
      distributor_name: dist.name,
      distributor_website: dist.website,
      distributor_order_url: dist.order_url,
      distributor_phone: dist.phone,
    })));
    setBrowseTotal(data.total);
    setLoading(false);
  };

  const goHome = () => {
    setView("search");
    setSearched(false);
    setQuery("");
    setBrands([]);
    setProducts([]);
  };

  const totalResults = brands.length + products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 cursor-pointer" onClick={goHome}>Booze Clues</h1>
          <p className="mt-1 text-gray-500">Who distributes this in Washington State?</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search bar — always visible */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (!searched) setView("search"); }}
            placeholder="Search for a brand or product..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white shadow-sm"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {/* Navigation tabs */}
        {!searched && view !== "browse-category" && view !== "browse-distributor" && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={loadCategories}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "categories" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              Browse by Category
            </button>
            <button
              onClick={loadDistributors}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "distributors" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              Browse by Distributor
            </button>
          </div>
        )}

        {/* Back button for browse views */}
        {(view === "browse-category" || view === "browse-distributor") && (
          <div className="mt-4">
            <button onClick={goHome} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              &larr; Back to browse
            </button>
          </div>
        )}

        {/* Stats */}
        {stats && view === "search" && !searched && (
          <div className="mt-4 flex gap-6 text-sm text-gray-500">
            <span>{stats.brands.toLocaleString()} brands</span>
            <span>{stats.products.toLocaleString()} products</span>
            <span>{stats.distributors.toLocaleString()} distributors</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* Categories view */}
        {/* ============================================================ */}
        {view === "categories" && !loading && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.filter(c => c.brand_count > 5).map((cat) => (
              <button
                key={cat.category}
                onClick={() => browseCategory(cat.category)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
              >
                <div className="text-2xl mb-1">{categoryIcon(cat.category)}</div>
                <p className="font-semibold text-gray-900 capitalize">{cat.category}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {cat.brand_count.toLocaleString()} brands &middot; {cat.distributor_count} distributors
                </p>
              </button>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* Distributors view */}
        {/* ============================================================ */}
        {view === "distributors" && !loading && (
          <div className="mt-6 space-y-2">
            {distributors.map((dist) => (
              <button
                key={dist.id}
                onClick={() => browseDistributor(dist)}
                className="w-full bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-left flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{dist.name}</p>
                  <p className="text-xs text-gray-500">
                    {dist.city && `${dist.city} · `}
                    {dist.brand_count} brands
                    {dist.product_count > 0 && ` · ${dist.product_count} products`}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  {dist.website && <span className="text-xs text-green-600">website</span>}
                  {dist.order_url && <span className="text-xs text-blue-600">order</span>}
                  {dist.phone && <span className="text-xs text-gray-400">phone</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* Browse category / distributor results */}
        {/* ============================================================ */}
        {(view === "browse-category" || view === "browse-distributor") && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 capitalize">{browseTitle}</h2>
                <p className="text-sm text-gray-500">{browseTotal.toLocaleString()} brands</p>
              </div>
              {view === "browse-distributor" && selectedDist && (
                <DistributorLinks
                  website={selectedDist.website}
                  orderUrl={selectedDist.order_url}
                  phone={selectedDist.phone}
                />
              )}
            </div>

            {!loading && (
              <>
                <div className="space-y-3">
                  {browseBrands.map((b) => (
                    <BrandCard key={`b-${b.brand_id}-${b.distributor_id}`} brand={b} />
                  ))}
                </div>

                {/* Pagination */}
                {browseTotal > 50 && (
                  <div className="mt-6 flex items-center justify-center gap-4">
                    {browseOffset > 0 && (
                      <button
                        onClick={() => view === "browse-category" ? browseCategory(browseTitle, browseOffset - 50) : selectedDist && browseDistributor(selectedDist, browseOffset - 50)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        &larr; Previous
                      </button>
                    )}
                    <span className="text-sm text-gray-500">
                      {browseOffset + 1}&ndash;{Math.min(browseOffset + 50, browseTotal)} of {browseTotal.toLocaleString()}
                    </span>
                    {browseOffset + 50 < browseTotal && (
                      <button
                        onClick={() => view === "browse-category" ? browseCategory(browseTitle, browseOffset + 50) : selectedDist && browseDistributor(selectedDist, browseOffset + 50)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next &rarr;
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* Search results */}
        {/* ============================================================ */}
        {searched && view === "search" && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-4">
              {totalResults} result{totalResults !== 1 ? "s" : ""}
              {query && ` for "${query}"`}
              {brands.length > 0 && products.length > 0 && (
                <span> ({brands.length} brand{brands.length !== 1 ? "s" : ""}, {products.length} product{products.length !== 1 ? "s" : ""})</span>
              )}
            </p>

            {totalResults === 0 && !loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No results found. Try a different search term.</p>
              </div>
            )}

            {brands.length > 0 && (
              <div className="space-y-3">
                {products.length > 0 && <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Brands</h2>}
                {brands.map((b) => (
                  <BrandCard key={`b-${b.brand_id}-${b.distributor_id}`} brand={b} />
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="space-y-3 mt-6">
                {brands.length > 0 && <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Products</h2>}
                {products.map((p) => (
                  <ProductCard key={`p-${p.product_id}`} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="max-w-4xl mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          Booze Clues MVP. Data sourced from public distributor catalogs, federal/state regulatory databases,
          and TTB COLA label approvals. Community validation coming soon.
        </p>
      </footer>
    </div>
  );
}
