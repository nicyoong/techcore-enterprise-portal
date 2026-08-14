import { HeroSection } from './HeroSection';
import { VendorMarquee } from './VendorMarquee';
import { ProductCard } from './ProductCard';

const PRODUCTS = [
  {
    id: '1',
    sku: 'SKU001',
    name: 'Enterprise CRM Pro',
    description: 'Full-featured CRM solution for enterprise teams with AI-powered insights.',
    price: 12000,
    image: 'https://picsum.photos/seed/crm/400/300',
    category: 'CRM',
    badge: 'Best Seller',
    stock: 'in-stock',
  },
];

export function Homepage() {
  return (
    <main>
      <HeroSection />
      <VendorMarquee />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                badge={product.badge}
                sku={product.sku}
                description={product.description}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
