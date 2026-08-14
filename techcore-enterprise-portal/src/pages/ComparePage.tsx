import { useCompareStore } from '../store/compare';

export default function ComparePage() {
  const { selected, remove, clear } = useCompareStore();

  if (selected.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <h2 className="text-xl font-bold text-text-primary mb-2">No products selected</h2>
        <p className="text-text-muted mb-6">Check products on the catalog page to compare specs side by side.</p>
        <a href="/catalog" className="inline-flex px-5 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all">
          Browse Catalog
        </a>
      </div>
    );
  }

  // Collect all unique spec keys
  const allKeys = Array.from(new Set(selected.flatMap((p) => Object.keys(p.specs))));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Spec Comparison</h1>
          <p className="text-sm text-text-muted mt-1">
            {selected.length} products · {allKeys.length} specifications
          </p>
        </div>
        <button
          onClick={clear}
          className="px-4 py-2 rounded-lg border border-border text-xs text-text-muted hover:text-danger hover:border-danger/40 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-mono text-text-muted w-48">Specification</th>
              {selected.map((p) => (
                <th key={p.sku} className="px-5 py-3 text-center min-w-[220px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-mono text-text-muted">{p.sku}</span>
                    <span className="text-sm font-semibold text-text-primary">{p.name}</span>
                    <span className="text-xs font-mono text-accent">${p.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => remove(p.sku)}
                    className="mt-2 text-xs text-text-muted hover:text-danger transition-colors"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key, idx) => (
              <tr
                key={key}
                className={`${idx % 2 === 0 ? 'bg-bg-base/30' : 'bg-surface'} hover:bg-accent/5 transition-colors`}
              >
                <td className="px-5 py-3 font-mono text-xs text-text-muted border-r border-border/50">
                  {key}
                </td>
                {selected.map((p) => (
                  <td key={p.sku} className="px-5 py-3 text-center text-text-primary font-mono text-xs">
                    {p.specs[key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <a
          href="/catalog"
          className="text-sm text-text-muted hover:text-accent transition-colors"
        >
          ← Back to Catalog
        </a>
      </div>
    </div>
  );
}
