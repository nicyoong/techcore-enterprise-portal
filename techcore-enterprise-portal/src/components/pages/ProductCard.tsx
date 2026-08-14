import { useState } from 'react';
import type { Product } from '../../store/catalog';
import { useCartStore } from '../../store/cart';
import { useCompareStore } from '../../store/compare';
import { useUpsellStore } from '../../store/upsell';
import { useToast } from '../ToastProvider';
import { Tag } from '../ui/Tag';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggle, isSelected } = useCompareStore();
  const { showUpsell } = useUpsellStore();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const stockTagVariant = product.stockStatus === 'ok' ? 'stock-ok' : product.stockStatus === 'low' ? 'stock-low' : 'stock-out';

  const handleAdd = () => {
    if (product.stockStatus === 'out') return;
    addItem({ sku: product.sku, name: product.name, vendor: product.vendor, price: product.price, stockStatus: product.stockStatus });
    setAdded(true);
    addToast(`${product.name} added to RFQ cart`, 'success');
    setTimeout(() => setAdded(false), 1500);
    // Trigger upsell for rack servers
    if (product.category === 'Servers & Compute') {
      showUpsell(product.sku);
    }
  };

  return (
    <div className="group relative rounded-xl bg-surface border border-border hover:border-accent/40 hover:shadow-[0_0_24px_rgba(56,189,248,0.1)] transition-all duration-200 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Tag variant="vendor">{product.vendor}</Tag>
        <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer hover:text-text-primary transition-colors">
          <input type="checkbox" checked={isSelected(product.sku)} onChange={() => toggle(product)} className="rounded border-border bg-bg-base text-accent focus:ring-accent/50" />
          Compare
        </label>
      </div>
      <div className="mx-5 h-36 rounded-lg bg-bg-base border border-border flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.sku}`)}>
        <svg className="w-16 h-16 text-text-muted/30 group-hover:text-accent/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      </div>
      <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
        <p className="text-xs font-mono text-text-muted mb-1">{product.sku}</p>
        <h3 className="text-sm font-semibold text-text-primary leading-snug mb-3 line-clamp-2 cursor-pointer hover:text-accent transition-colors" onClick={() => navigate(`/product/${product.sku}`)}>
          {product.name}
        </h3>
        <div className="space-y-1.5 mb-4 flex-1">
          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
            <div key={key} className="flex justify-between text-xs">
              <span className="text-text-muted">{key}</span>
              <span className="text-text-secondary font-mono max-w-[60%] text-right truncate">{val}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <Tag variant={stockTagVariant}>
            {product.stockStatus === 'ok' ? `In Stock (${product.stockQty})` : product.stockStatus === 'low' ? `Low Stock (${product.stockQty})` : 'Out of Stock'}
          </Tag>
          <p className="text-sm font-mono font-bold text-accent">${product.price.toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAdd} disabled={product.stockStatus === 'out'}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 btn-press ${
              product.stockStatus === 'out' ? 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border' :
              added ? 'bg-success/20 text-success border border-success/40' :
              'bg-accent text-bg-base hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]'
            }`}>
            {product.stockStatus === 'out' ? 'Unavailable' : added ? '✓ Added' : 'Add to RFQ'}
          </button>
          <button onClick={() => navigate(`/product/${product.sku}`)}
            className="px-3 py-2 rounded-lg border border-border text-xs text-text-muted hover:text-accent hover:border-accent/40 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
