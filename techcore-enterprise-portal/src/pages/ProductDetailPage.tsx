import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../store';
import { useCartStore } from '../store';
import { useCompareStore } from '../store';
import { useToast } from '../components/ToastProvider';
import { Tag } from '../components/ui/Tag';
import type { Product } from '../store';

export default function ProductDetailPage() {
  const { sku } = useParams<{ sku: string }>();
  const product = PRODUCTS.find((p: Product) => p.sku === sku);
  const { addItem } = useCartStore();
  const { toggle, isSelected } = useCompareStore();
  const { addToast } = useToast();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <svg className="w-16 h-16 text-text-muted/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-text-primary mb-2">Product Not Found</h2>
        <p className="text-sm text-text-muted mb-6">The SKU {sku} does not exist in our catalog.</p>
        <Link to="/catalog" className="inline-flex px-5 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const stockTagVariant = product.stockStatus === 'ok' ? 'stock-ok' : product.stockStatus === 'low' ? 'stock-low' : 'stock-out';

  const tieredPricing = [
    { min: 1, max: 9, discount: 0, price: product.price },
    { min: 10, max: 49, discount: 8, price: Math.round(product.price * 0.92) },
    { min: 50, max: Infinity, discount: 15, price: Math.round(product.price * 0.85) },
  ];

  const warehouses = [
    { name: 'Dallas, TX (DED)', qty: Math.floor(product.stockQty! * 0.5) },
    { name: 'Chicago, IL (CH1)', qty: Math.floor(product.stockQty! * 0.3) },
    { name: 'Newark, NJ (NRK)', qty: product.stockQty! - Math.floor(product.stockQty! * 0.5) - Math.floor(product.stockQty! * 0.3) },
  ];

  const relatedProducts = PRODUCTS.filter((p: Product) => p.category === product.category && p.sku !== product.sku).slice(0, 3);

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, vendor: product.vendor, price: product.price, stockStatus: product.stockStatus });
    addToast(`${product.name} added to RFQ cart`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/catalog" className="hover:text-accent transition-colors">Catalog</Link>
        <span aria-hidden="true">/</span>
        <span className="text-text-primary">{product.sku}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-xl bg-surface border border-border flex items-center justify-center mb-4 overflow-hidden">
            <svg className="w-32 h-32 text-text-muted/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-surface border border-border flex items-center justify-center cursor-pointer hover:border-accent/40 transition-colors">
                <span className="text-xs text-text-muted font-mono">{i}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Tag variant="vendor">{product.vendor}</Tag>
            <Tag variant={stockTagVariant}>
              {product.stockStatus === 'ok' ? `In Stock (${product.stockQty} units)` : product.stockStatus === 'low' ? `Low Stock (${product.stockQty} units)` : 'Out of Stock'}
            </Tag>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 leading-tight">{product.name}</h1>
          <p className="text-sm font-mono text-text-muted mb-4">{product.sku}</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-mono font-bold text-accent">${product.price.toLocaleString()}</span>
            <span className="text-xs text-text-muted">USD · Net-30 available</span>
          </div>

          <div className="flex gap-3 mb-8">
            <button onClick={handleAdd} disabled={product.stockStatus === 'out'}
              className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 btn-press ${
                product.stockStatus === 'out' ? 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border' :
                'bg-accent text-bg-base hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]'
              }`}>
              {product.stockStatus === 'out' ? 'Out of Stock' : 'Add to RFQ'}
            </button>
            <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-xs text-text-muted cursor-pointer hover:text-text-primary transition-colors">
              <input type="checkbox" checked={isSelected(product.sku)} onChange={() => toggle(product)} className="rounded border-border bg-bg-base text-accent" />
              Compare
            </label>
            <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border text-xs text-text-muted hover:text-accent hover:border-accent/40 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Datasheet (PDF)
            </button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 mb-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Volume Pricing</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-mono text-text-muted border-b border-border">
                  <th className="text-left pb-2 font-medium">Quantity</th>
                  <th className="text-right pb-2 font-medium">Unit Price</th>
                  <th className="text-right pb-2 font-medium">Discount</th>
                </tr>
              </thead>
              <tbody>
                {tieredPricing.map((tier) => (
                  <tr key={tier.min} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 font-mono text-text-secondary">{tier.min === 1 ? '1 – 9' : tier.min === 10 ? '10 – 49' : '50+'} units</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-text-primary">${tier.price.toLocaleString()}</td>
                    <td className="py-2.5 text-right">{tier.discount > 0 ? <span className="text-success font-mono text-xs">−{tier.discount}%</span> : <span className="text-text-muted font-mono text-xs">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 mb-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Stock by Warehouse</h2>
            <div className="space-y-2">
              {warehouses.map((wh) => (
                <div key={wh.name} className="flex items-center justify-between text-xs">
                  <span className="font-mono text-text-secondary">{wh.name}</span>
                  <span className={`font-mono ${wh.qty > 10 ? 'text-success' : wh.qty > 0 ? 'text-warning' : 'text-danger'}`}>{wh.qty} units</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Technical Specifications</h2>
            <div className="space-y-2">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="text-text-muted font-mono">{key}</span>
                  <span className="text-text-primary font-mono text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProducts.map((p: Product) => (
              <Link key={p.sku} to={`/product/${p.sku}`} className="group block rounded-xl bg-surface border border-border hover:border-accent/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all duration-200 p-4">
                <div className="h-28 rounded-lg bg-bg-base border border-border flex items-center justify-center mb-3">
                  <svg className="w-10 h-10 text-text-muted/30 group-hover:text-accent/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <p className="text-xs font-mono text-text-muted mb-1">{p.sku}</p>
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-1">{p.name}</p>
                <p className="text-sm font-mono font-bold text-accent mt-1">${p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
