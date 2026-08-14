import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cart';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Servers & Compute',
    description: 'Rack, tower, and workstations from Dell, HPE, Lenovo',
    skus: ['DELL-PE-R760-001', 'HPE-PL-DL380-002', 'LENOVO-PS-T1700-003', 'DELL-R660-010'],
  },
  {
    name: 'Networking',
    description: 'Switches, routers, WiFi, and SD-WAN appliances',
    skus: ['CISCO-C9300-004', 'ARISTA-7060-005', 'CISCO-C9400-009', 'UBNT-UDM-PRO-012'],
  },
  {
    name: 'Storage',
    description: 'All-flash arrays, NAS, and object storage',
    skus: ['PURE-FA-X90-006'],
  },
  {
    name: 'Endpoints',
    description: 'Laptops, workstations, and thin clients',
    skus: ['LENOVO-PS-T1700-003', 'LENOVO-X1C11-011'],
  },
  {
    name: 'Security Appliances',
    description: 'Next-gen firewalls and threat prevention',
    skus: ['PALO-PA5280-007', 'FORTI-FG200F-008'],
  },
];

export default function Navbar() {
  const { totalItems } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProductsHover = () => setMenuOpen(true);
  const handleProductsLeave = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-bg-base/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-bg-base" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-text-primary tracking-tight">
                Tech<span className="text-accent">Core</span>
              </span>
              <span className="text-xs font-mono text-text-muted hidden sm:block">ENTERPRISE</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1" ref={menuRef}>
              {/* Products mega-menu */}
              <div className="relative" onMouseEnter={handleProductsHover} onMouseLeave={handleProductsLeave}>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                  Products
                  <svg className={`w-3 h-3 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-surface border border-border rounded-xl shadow-2xl shadow-black/50 p-4">
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => (
                        <a
                          key={cat.name}
                          href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-base transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{cat.name}</p>
                            <p className="text-xs text-text-muted mt-0.5">{cat.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <a href="/catalog" className="text-xs font-mono text-accent hover:text-cyan-300 transition-colors">
                        View all 12+ SKUs →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/catalog" className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Solutions
              </Link>
              <Link to="/catalog" className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Support
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SKUs..."
                      className="w-48 md:w-64 px-3 py-1.5 rounded-lg bg-bg-base border border-border text-sm text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      autoFocus
                      onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                    aria-label="Search"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              <a href="#sign-in" className="hidden sm:inline-flex px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                Sign In
              </a>

              {/* RFQ Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                aria-label={`RFQ Cart (${totalItems()} items)`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {totalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-bg-base text-xs font-bold flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-border space-y-1">
              <Link to="/catalog" className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Products
              </Link>
              <Link to="/catalog" className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Solutions
              </Link>
              <Link to="/catalog" className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Support
              </Link>
              <a href="#sign-in" className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                Sign In
              </a>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onSubmit={() => { setCartOpen(false); navigate('/quote-success'); }}
      />
    </>
  );
}
