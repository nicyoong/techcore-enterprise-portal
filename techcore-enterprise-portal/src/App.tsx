import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import CompareBar from './components/layout/CompareBar';
import UpsellPanel from './components/layout/UpsellPanel';
import HeroSection from './components/pages/HeroSection';
import VendorMarquee from './components/pages/VendorMarquee';
import EnterpriseServicesStrip from './components/pages/EnterpriseServicesStrip';
import { SectionHeading } from './components/ui/SectionHeading';
import ProductCard from './components/pages/ProductCard';
import { CATEGORIES, PRODUCTS } from './store/catalog';
import { SkeletonHero, SkeletonGrid } from './components/Skeletons';

const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const QuoteSuccess = lazy(() => import('./pages/QuoteSuccess'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));

const FEATURED_PRODUCTS = [
  PRODUCTS[0],
  PRODUCTS[1],
  PRODUCTS[3],
  PRODUCTS[5],
  PRODUCTS[7],
  PRODUCTS[10],
];

function HomePage() {
  return (
    <>
      <HeroSection />
      <VendorMarquee />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          label="Browse by Category"
          title="Enterprise Hardware Catalog"
          subtitle="Authorized distributor for the world's leading infrastructure vendors"
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-surface border border-border hover:border-accent/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.12)] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-text-primary text-center leading-tight">
                {cat.name}
              </span>
              <span className="text-xs font-mono text-text-muted">{cat.count} SKUs</span>
            </a>
          ))}
        </div>
      </div>
      <hr className="border-border" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          label="Featured Products"
          title="Recommended for Enterprise Deployment"
          subtitle="High-availability infrastructure with volume pricing available"
          align="center"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-accent text-bg-base font-semibold text-sm hover:shadow-[0_0_24px_rgba(56,189,248,0.45)] transition-all duration-200 btn-press"
          >
            View Full Catalog
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
      <hr className="border-border" />
      <EnterpriseServicesStrip />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary font-sans">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={
            <Suspense fallback={<SkeletonGrid count={12} />}>
              <CatalogPage />
            </Suspense>
          } />
          <Route path="/product/:sku" element={
            <Suspense fallback={<SkeletonHero />}>
              <ProductDetailPage />
            </Suspense>
          } />
          <Route path="/compare" element={
            <Suspense fallback={<SkeletonGrid count={4} />}>
              <ComparePage />
            </Suspense>
          } />
          <Route path="/quote-success" element={
            <Suspense fallback={null}>
              <QuoteSuccess />
            </Suspense>
          } />
          <Route path="/support" element={
            <Suspense fallback={<SkeletonGrid count={4} />}>
              <SupportPage />
            </Suspense>
          } />
        </Routes>
      </main>
      <CompareBar />
      <UpsellPanel />
      <Footer />
    </div>
  );
}

export default App;
