import { Link } from 'react-router-dom';
import { useCompareStore } from '../../store/compare';
import { useCatalogStore } from '../../store/catalog';

export function CompareBar() {
  const { items } = useCompareStore();
  const { products } = useCatalogStore();

  if (items.length === 0) return null;

  const compareProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Comparing {items.length} product{items.length !== 1 ? 's' : ''}
            </span>
            <div className="flex -space-x-2">
              {compareProducts.slice(0, 3).map((p) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt={p.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/compare"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Compare Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
