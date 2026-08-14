import { useEffect, useMemo } from 'react';
import { useCatalogStore } from '../store/catalog';
import { ProductCard } from '../components/pages/ProductCard';
import { SkeletonCard } from '../components/Skeletons';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

const categories = ['All', 'CRM', 'ERP', 'Analytics', 'Collaboration', 'Security'];

export function CatalogPage() {
  const { products, loading, error, fetchProducts, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } =
    useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <p className="font-medium">Failed to load catalog</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeading title="Product Catalog" subtitle="Browse and compare enterprise solutions" />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              badge={product.badge}
            />
          ))}
        </div>
      )}
    </div>
  );
}
