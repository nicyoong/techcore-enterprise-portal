import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cart';
import { useCompareStore } from '../../store/compare';
import { CartDrawer } from './CartDrawer';
import { CompareBar } from './CompareBar';
import { AnnouncementBar } from './AnnouncementBar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const cartCount = useCartStore((state) => state.items.length);
  const compareCount = useCompareStore((state) => state.items.length);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnnouncementBar />
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-xl font-bold text-gray-900">TechCore</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/catalog" className="text-gray-600 hover:text-gray-900 font-medium">
                Catalog
              </Link>
              <Link to="/compare" className="text-gray-600 hover:text-gray-900 font-medium relative">
                Compare
                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-gray-900 font-medium">
                Support
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
                aria-label={`Cart (${cartCount} items)`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/catalog"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catalog
                </Link>
                <Link
                  to="/compare"
                  className="text-gray-600 hover:text-gray-900 font-medium relative inline-flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare
                  {compareCount > 0 && (
                    <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {compareCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/support"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CompareBar />
      <Footer />
    </div>
  );
}
