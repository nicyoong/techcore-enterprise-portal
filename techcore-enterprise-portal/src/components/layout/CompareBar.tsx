import { useCompareStore } from '../../store/compare';

export default function CompareBar() {
  const { selected, remove, clear } = useCompareStore();

  if (selected.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-accent/30 z-30 shadow-[0_-4px_24px_rgba(56,189,248,0.15)]"
      role="complementary"
      aria-label="Product comparison"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-text-muted">
              Comparing {selected.length} products
            </span>
            <button
              onClick={clear}
              className="text-xs text-text-muted hover:text-danger transition-colors"
            >
              Clear all
            </button>
          </div>
          <a
            href="/compare"
            className="px-4 py-2 rounded-lg bg-accent text-bg-base text-xs font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all"
          >
            View Comparison Table
          </a>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {selected.map((item) => (
            <div
              key={item.sku}
              className="flex items-center gap-3 min-w-[200px] px-4 py-2.5 rounded-lg bg-bg-base border border-border"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-text-muted truncate">{item.sku}</p>
                <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
                <p className="text-xs font-mono text-accent">${item.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => remove(item.sku)}
                className="p-1 rounded hover:bg-bg-elevated text-text-muted hover:text-danger transition-colors"
                aria-label={`Remove ${item.name} from comparison`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
