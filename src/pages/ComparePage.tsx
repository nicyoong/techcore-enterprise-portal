import { useCompareStore } from '../store/compare';
import { useCatalogStore } from '../store/catalog';
import { SectionHeading } from '../components/ui/SectionHeading';

export function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const { products } = useCatalogStore();

  const compareProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeading
        title="Compare Products"
        subtitle={`${items.length} product${items.length !== 1 ? 's' : ''} selected`}
        action={
          items.length > 0 ? (
            <button
              onClick={clearCompare}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          ) : undefined
        }
      />

      {compareProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products in your comparison.{' '}
            <a href="/catalog" className="text-indigo-600 hover:text-indigo-700">
              Browse catalog
            </a>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Feature</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="py-3 px-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      <span className="font-semibold text-gray-900 text-sm">{product.name}</span>
                      <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="text-xs text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm font-medium text-gray-500">Category</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center text-sm text-gray-700">{p.category}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm font-medium text-gray-500">Description</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-sm text-gray-700">{p.description}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
