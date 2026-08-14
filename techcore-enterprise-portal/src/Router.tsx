import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CatalogPage from './pages/CatalogPage';
import ComparePage from './pages/ComparePage';
import QuoteSuccess from './pages/QuoteSuccess';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/quote-success" element={<QuoteSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
