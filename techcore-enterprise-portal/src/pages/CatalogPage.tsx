import { useEffect } from 'react';
import { useCatalogStore, PRODUCTS } from '../store/catalog';
import ProductCard from '../components/pages/ProductCard';

export default function CatalogPage() {
  const { category, vendor, search, sortBy, setCategory, setVendor, setSearch, setSortBy, filtered } =
    useCatalogStore();
  const products = filtered();

  // Sync with URL on mount
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get('category');
    const vid = new URLSearchParams(window.location.search).get('vendor');
    const srch = new URLSearchParams(window.location.search).get('search');
    const srt = new URLSearchParams(window.location.search).get('sort');
    if (cat) setCategory(cat);
    if (vid) setVendor(vid);
    if (srch) setSearch(srch);
    if (srt) setSortBy(srt as 'price-asc' | 'price-desc' | 'availability');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const vendors = [...new Set(PRODUCTS.map((p) => p.vendor))].sort();
  const categories = [...new Set(PRODUCTS.map((p) => p.category))].sort();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Product Catalog</h1>
        <p className="text-sm text-text-muted">
          {products.length} of {PRODUCTS.length} products shown
        </p>
      </div>

      {/* Filtering Toolbar */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, SKU, or vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-base border border-border text-sm text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-base border border-border text-sm text-text-primary focus:border-accent transition-colors"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-base border border-border text-sm text-text-primary focus:border-accent transition-colors"
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'availability')}
          className="px-3 py-2 rounded-lg bg-bg-base border border-border text-sm text-text-primary focus:border-accent transition-colors"
        >
          <option value="availability">Availability</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>

        {(category || vendor || search) && (
          <button
            onClick={() => { setCategory(''); setVendor(''); setSearch(''); }}
            className="px-3 py-2 rounded-lg border border-danger/30 text-danger text-xs font-mono hover:bg-danger/10 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-text-muted/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No products match your filters</h3>
          <p className="text-sm text-text-muted mb-6">Try adjusting your search criteria or clearing filters to see all products.</p>
          <button
            onClick={() => { setCategory(''); setVendor(''); setSearch(''); }}
            className="px-5 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
