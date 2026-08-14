import { useRef, useEffect } from 'react';

const LIVE_STOCK_ITEMS = [
  { sku: 'DELL-PE-R760-001', name: 'PowerEdge R760', qty: 47, price: '$8,499' },
  { sku: 'CISCO-C9300-004', name: 'Catalyst 9300-48T', qty: 8, price: '$4,250' },
  { sku: 'PURE-FA-X90-006', name: 'FlashArray//X90', qty: 3, price: '$89,500' },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 0.5;
      const step = 40;
      const offset = (frame * 0.1) % step;
      for (let x = -step + offset; x < w + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -step + offset; y < h + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      frame++;
      requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#060A10] via-[#0A0E14] to-[#0D1520]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-base/60 via-transparent to-bg-base/40" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Q3 Volume Pricing Live — Up to 22% off MSRP
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-text-primary">
              Enterprise hardware,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                procured
              </span>
              {' '}at machine speed.
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mb-8 leading-relaxed">
              Authorized distributor for Dell, Cisco, HPE, Palo Alto, and 12+ enterprise
              vendors. PO-based ordering, Net-30 terms, and white-glove deployment
              support for Fortune 500 infrastructure teams.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-accent text-bg-base font-semibold text-sm hover:shadow-[0_0_24px_rgba(56,189,248,0.45)] transition-all duration-200"
              >
                Browse Catalog
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border text-text-primary font-medium text-sm hover:border-accent/50 hover:text-accent transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Talk to Sales
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ISO 27001 Certified
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                SOC 2 Type II Audited
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ITAR Compliant
              </div>
            </div>
          </div>

          {/* Live Stock Panel */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-cyan-500/20 rounded-2xl blur-xl opacity-60" />
            <div className="relative rounded-2xl border border-border bg-surface/80 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-text-primary">Live Stock Feed</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Updated 30s ago
                </div>
              </div>
              <div className="space-y-3">
                {LIVE_STOCK_ITEMS.map((item) => (
                  <div
                    key={item.sku}
                    className="flex items-center justify-between p-3 rounded-lg bg-bg-base/60 border border-border/60"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.qty <= 5 ? 'bg-warning' : 'bg-success'
                        }`}
                      />
                      <div>
                        <p className="text-xs font-mono text-text-primary">{item.sku}</p>
                        <p className="text-xs text-text-muted mt-0.5">{item.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-semibold text-text-primary">
                        {item.price}
                      </p>
                      <p className="text-xs font-mono text-text-muted">
                        {item.qty} units
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/catalog"
                className="mt-5 block w-full text-center py-2.5 rounded-lg border border-border text-xs font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
              >
                View Full Inventory →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
