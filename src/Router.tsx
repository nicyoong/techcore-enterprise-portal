import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Navbar';
import { Homepage } from './components/pages/Homepage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparePage } from './pages/ComparePage';
import { SupportPage } from './pages/SupportPage';
import { QuoteSuccess } from './pages/QuoteSuccess';
import { ScrollToTop } from './components/ScrollToTop';

export function Router() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/quote-success" element={<QuoteSuccess />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
