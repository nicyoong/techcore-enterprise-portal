import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Enterprise Software
            <span className="block text-indigo-400">Made Simple</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Compare, evaluate, and procure leading enterprise solutions from trusted vendors.
            Get quotes from top providers in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Request a Quote
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-slate-400 text-sm">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50+</p>
              <p className="text-slate-400 text-sm">Vendors</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24h</p>
              <p className="text-slate-400 text-sm">Quote Response</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
    </section>
  );
}
