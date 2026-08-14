import { useEffect, useState } from 'react';
import { useUpsellStore } from '../../store/upsell';
import { useCartStore } from '../../store/cart';
import { useToast } from '../../components/ToastProvider';
import type { Product } from '../../store/catalog';
import { PRODUCTS } from '../../store/catalog';

export default function UpsellPanel() {
  const { shownForSku, dismissUpsell, selectedAccessories, toggleAccessory, getActiveRule } = useUpsellStore();
  const { addItem } = useCartStore();
  const { addToast } = useToast();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (shownForSku) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [shownForSku]);

  const rule = shownForSku ? getActiveRule(shownForSku) : null;
  const parentProduct: Product | null = shownForSku
    ? (PRODUCTS.find((p: Product) => p.sku === shownForSku) ?? null)
    : null;

  if (!shownForSku || !rule) return null;

  const required = rule.items.filter((i) => i.required);
  const optional = rule.items.filter((i) => !i.required);
  const selectedCount = rule.items.filter((i) => selectedAccessories.has(i.sku)).length;
  const selectedTotal = rule.items
    .filter((i) => selectedAccessories.has(i.sku))
    .reduce<number>((sum, i) => sum + i.price, 0);

  const handleAddSelected = () => {
    rule.items
      .filter((i) => selectedAccessories.has(i.sku))
      .forEach((item) => {
        addItem({
          sku: item.sku,
          name: item.name,
          vendor: 'TechCore Accessories',
          price: item.price,
          stockStatus: 'ok' as const,
          availableStock: 999,
          qty: 1,
        });
      });
    addToast(`Added ${selectedCount} deployment accessory${selectedCount > 1 ? 's' : ''} to RFQ cart`, 'success');
    dismissUpsell();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${animating ? 'opacity-100' : 'opacity-0'}`}
        onClick={dismissUpsell}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-bg-base border-l border-accent/30 z-50 flex flex-col shadow-2xl shadow-black/70 transition-transform duration-200 ease-out ${
          animating ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Deployment accessories recommendation"
      >
        <div className="flex items-start gap-3 px-5 py-4 border-b border-accent/20 bg-accent/5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-accent uppercase tracking-wider mb-0.5">Deployment Accessories</p>
            <h2 className="text-sm font-semibold text-text-primary leading-snug">
              {parentProduct?.name ?? 'Server'} — don&apos;t ship incomplete
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Rack mount, power, and cabling typically required for deployment
            </p>
          </div>
          <button
            onClick={dismissUpsell}
            className="p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {required.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                <p className="text-xs font-mono text-warning uppercase tracking-wider">Required</p>
              </div>
              <div className="space-y-2">
                {required.map((item) => (
                  <UpsellRow key={item.sku} item={item} checked={selectedAccessories.has(item.sku)} onToggle={() => toggleAccessory(item.sku)} />
                ))}
              </div>
            </div>
          )}
          {optional.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Optional</p>
              </div>
              <div className="space-y-2">
                {optional.map((item) => (
                  <UpsellRow key={item.sku} item={item} checked={selectedAccessories.has(item.sku)} onToggle={() => toggleAccessory(item.sku)} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border px-5 py-4 bg-surface/50 flex-shrink-0">
          <div className="flex justify-between items-center mb-3 text-xs">
            <span className="text-text-muted">
              {selectedCount > 0
                ? `${selectedCount} accessory${selectedCount > 1 ? 's' : ''} selected`
                : 'No accessories selected'}
            </span>
            {selectedTotal > 0 && (
              <span className="font-mono font-semibold text-accent">+${selectedTotal.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={handleAddSelected}
            disabled={selectedCount === 0}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 btn-press disabled:opacity-40 disabled:cursor-not-allowed bg-accent text-bg-base hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]"
          >
            Add Selected to RFQ Cart
          </button>
          <p className="text-xs text-text-muted/60 text-center mt-2">
            Accessories add as individual line items with their own quantities
          </p>
        </div>
      </div>
    </>
  );
}

function UpsellRow({
  item,
  checked,
  onToggle,
}: {
  item: { sku: string; name: string; price: number; reason: string; required: boolean };
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
        checked
          ? 'border-accent/50 bg-accent/5 shadow-[0_0_12px_rgba(56,189,248,0.08)]'
          : 'border-border bg-surface hover:border-accent/30'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
        aria-label={`${item.name}${item.required ? ' (required)' : ''}`}
      />
      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
        checked ? 'bg-accent border-accent' : 'border-border bg-bg-base'
      }`}>
        {checked && (
          <svg className="w-3 h-3 text-bg-base" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-mono text-text-muted">{item.sku}</p>
          {item.required && (
            <span className="text-xs font-mono text-warning/90 px-1.5 py-0.5 rounded bg-warning/10">REQ</span>
          )}
        </div>
        <p className="text-sm font-medium text-text-primary mt-0.5 leading-snug">{item.name}</p>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">{item.reason}</p>
      </div>
      <p className="text-sm font-mono font-bold text-accent flex-shrink-0">${item.price.toLocaleString()}</p>
    </label>
  );
}
