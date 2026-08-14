import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import {
  HeroSection,
  CategorySection,
  FeaturedProducts,
  TrustSection,
} from './components/pages/Homepage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
