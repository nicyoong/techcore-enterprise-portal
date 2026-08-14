import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCatalogStore } from '../store/catalog';
import { useCartStore } from '../store/cart';
import { useCompareStore } from '../store/compare';
import { useToast } from '../components/ToastProvider';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error, fetchProduct } = useCatalogStore();
  const { addToCart } = useCartStore();
  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();
  const addToast = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  const product = products.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">
            {error || 'Product not found'}
          </p>
          <Link to="/catalog" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const inCompare = isInCompare(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link to="/catalog" className="hover:text-gray-700">Catalog</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          {product.badge && (
            <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>
          <p className="text-3xl font-bold text-gray-900 mt-4">${product.price.toLocaleString()}</p>
          <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                addToCart(product.id);
                addToast({ message: `${product.name} added to cart`, type: 'success' });
              }}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (inCompare) {
                  removeFromCompare(product.id);
                  addToast({ message: `Removed from comparison`, type: 'info' });
                } else {
                  addToCompare(product.id);
                  addToast({ message: `${product.name} added to compare`, type: 'info' });
                }
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                inCompare
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {inCompare ? 'Remove from Compare' : 'Add to Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
