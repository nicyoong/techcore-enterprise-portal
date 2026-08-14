import { useRef, useEffect } from 'react';
import type { CartItem } from '../../store/cart';
import { useCartStore } from '../../store/cart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function CartDrawer({ open, onClose, onSubmit }: CartDrawerProps) {
  const { items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
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

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-text-muted/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm text-text-muted">Your RFQ cart is empty</p>
              <p className="text-xs text-text-muted/60 mt-1">Add products to start a quote request</p>
            </div>
          ) : (
            items.map((item: CartItem) => (
              <div
                key={item.sku}
                className="flex gap-4 p-4 rounded-lg bg-surface border border-border"
              >
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
                className="flex-1 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all"
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
