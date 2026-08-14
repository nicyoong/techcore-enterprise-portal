import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-xl font-bold text-white">TechCore</span>
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted partner for enterprise software procurement and comparison.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Catalog</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-white">All Products</Link></li>
              <li><Link to="/catalog" className="hover:text-white">CRM</Link></li>
              <li><Link to="/catalog" className="hover:text-white">ERP</Link></li>
              <li><Link to="/catalog" className="hover:text-white">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
              <li><Link to="/compare" className="hover:text-white">Compare</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>{`© ${new Date().getFullYear()} TechCore. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}
