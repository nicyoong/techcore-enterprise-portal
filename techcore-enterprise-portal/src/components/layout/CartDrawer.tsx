import { useRef, useEffect, useState, useCallback } from 'react';
import type { CartItem } from '../../store/cart';
import { useCartStore } from '../../store/cart';
import { useToast } from '../../components/ToastProvider';
import { parseBOMCSVWithQty } from '../../utils/bomParser';
import { PRODUCTS } from '../../store/catalog';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CartDrawer({ open, onClose, onSubmit }: CartDrawerProps) {
  const { items, addItem, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCartStore();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bomErrors, setBomErrors] = useState<string[]>([]);
  const [notFoundSkus, setNotFoundSkus] = useState<string[]>([]);
  const [lastImportCount, setLastImportCount] = useState<number | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const { added, notFound, errors } = parseBOMCSVWithQty(text);

      // Bulk-add to cart
      added.forEach(({ sku, qty }) => {
        const product = PRODUCTS.find((p) => p.sku === sku);
        if (product) {
          addItem({
            sku: product.sku,
            name: product.name,
            vendor: product.vendor,
            price: product.price,
            stockStatus: product.stockStatus,
            qty,
          });
        }
      });

      setNotFoundSkus(notFound);
      setBomErrors(errors);
      setLastImportCount(added.length);

      if (added.length > 0) {
        addToast(`Added ${added.length} items from BOM import`, 'success');
      }
      if (notFound.length > 0) {
        addToast(`${notFound.length} SKU(s) not found in catalog`, 'error');
      }
    };
    reader.readAsText(file);
    // Reset input so the same file can be re-imported
    e.target.value = '';
  }, [addItem, addToast]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-base border-l border-border z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-label="RFQ Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">RFQ Cart</h2>
            <p className="text-xs text-text-muted mt-0.5">
              {totalItems()} line items · ${totalPrice().toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* BOM Import Bar */}
        <div className="px-6 py-3 border-b border-border bg-surface/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs font-mono text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
              aria-label="Import BOM CSV file"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15l6-6m0 0l6 6m-6-6V21a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01-.293 1.414L12 14.586V21" />
              </svg>
              Import BOM (CSV)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload BOM CSV file with SKU and Qty columns"
            />
            {lastImportCount !== null && (
              <span className="text-xs font-mono text-success">
                +{lastImportCount} items imported
              </span>
            )}
          </div>
          {(notFoundSkus.length > 0 || bomErrors.length > 0) && (
            <div className="mt-2 text-xs text-danger font-mono">
              {notFoundSkus.length > 0 && (
                <p>Unknown SKUs: {notFoundSkus.join(', ')}</p>
              )}
              {bomErrors.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-text-muted/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-sm text-text-muted">Your RFQ cart is empty</p>
              <p className="text-xs text-text-muted/60 mt-1">
                Add products individually or import a BOM spreadsheet
              </p>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.sku} className="flex gap-4 p-4 rounded-lg bg-surface border border-border">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-text-muted mb-0.5">{item.sku}</p>
                  <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                  <p className="text-xs font-mono text-accent mt-1">
                    ${item.price.toLocaleString()} / unit
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.sku)}
                    className="p-1 rounded hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.sku, Math.max(1, item.qty - 1))}
                      className="w-7 h-7 rounded bg-bg-elevated border border-border text-text-secondary hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-mono text-text-primary">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.sku, item.qty + 1)}
                      className="w-7 h-7 rounded bg-bg-elevated border border-border text-text-secondary hover:border-accent/40 hover:text-accent transition-colors flex items-center justify-center text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs font-mono text-text-primary font-semibold">
                    ${(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Subtotal</span>
              <span className="text-sm font-mono font-semibold text-text-primary">
                ${totalPrice().toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Volume discounts apply at 10+ units per SKU. Net-30 terms available for qualified accounts.
            </p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-4 py-2.5 rounded-lg border border-border text-xs font-medium text-text-muted hover:text-danger hover:border-danger/40 transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={onSubmit}
                className="flex-1 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0-20px_rgba(56,189,248,0.4)] transition-all"
              >
                Submit RFQ
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
