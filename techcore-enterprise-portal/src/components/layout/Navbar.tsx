import { useState, useRef, useEffect } from 'react';

const CATEGORIES = [
  { name: 'Servers & Compute', desc: 'Rack, tower, and blade servers from 1U to 4U. Intel Xeon and AMD EPYC platforms.', sku: 'SRV' },
  { name: 'Networking', desc: 'Switches, routers, and WAN optimizers. 10GbE through 400GbE.', sku: 'NET' },
  { name: 'Storage', desc: 'NAS, SAN, and hyperconverged arrays. NVMe and hybrid tiers.', sku: 'STR' },
  { name: 'Endpoints', desc: 'Workstations, thin clients, and KVM extenders for enterprise desks.', sku: 'EPT' },
  { name: 'Security Appliances', desc: 'NGFW, SSL/TLS inspection, and Zero Trust network access gateways.', sku: 'SEC' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(3);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-bg-base">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.9" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-text-primary font-bold text-lg tracking-tight">TechCore</span>
                <span className="text-text-muted text-xs font-mono block -mt-1">ENTERPRISE</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    menuOpen ? 'text-accent bg-accent/10' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Products
                  <svg className={`w-4 h-4 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[560px] bg-bg-surface border border-border rounded-xl shadow-2xl shadow-black/50 p-4 grid grid-cols-2 gap-3">
                    {CATEGORIES.map((cat) => (
                      <a
                        key={cat.name}
                        href="#"
                        className="flex gap-3 p-3 rounded-lg border border-transparent hover:border-border hover:bg-bg-base transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                          <span className="text-xs font-mono text-accent">{cat.sku}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{cat.desc}</p>
                        </div>
                      </a>
                    ))}
                    <div className="col-span-2 mt-1 pt-3 border-t border-border flex justify-between items-center">
                      <span className="text-xs text-text-muted">View all {CATEGORIES.length} categories</span>
                      <a href="#" className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                        Browse catalog →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {['Solutions', 'Support'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-48">
                <input
                  type="text"
                  placeholder="Search SKUs, products…"
                  className="w-full bg-bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                />
              </div>

              <a
                href="#"
                className="hidden sm:inline-flex px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface"
              >
                Sign In
              </a>

              <a
                href="#"
                className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="hidden sm:inline">RFQ Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-bg-base text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-surface transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-bg-surface">
            <div className="px-4 py-4 space-y-1">
              <input
                type="text"
                placeholder="Search SKUs, products…"
                className="w-full bg-bg-base border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted mb-3 focus:border-accent outline-none"
              />
              {CATEGORIES.map((cat) => (
                <a key={cat.name} href="#" className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-base rounded-lg">
                  {cat.name}
                </a>
              ))}
              {['Solutions', 'Support'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-base rounded-lg">
                  {item}
                </a>
              ))}
              <div className="pt-3 border-t border-border flex gap-2">
                <a href="#" className="flex-1 text-center px-3 py-2 text-sm text-text-secondary border border-border rounded-lg hover:text-text-primary">
                  Sign In
                </a>
                <a href="#" className="flex-1 text-center px-3 py-2 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/10">
                  RFQ Cart ({cartCount})
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
