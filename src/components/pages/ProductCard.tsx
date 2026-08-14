import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cart';
import { useCompareStore } from '../../store/compare';
import { Button } from '../ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  sku?: string;
  description?: string;
  stock?: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export function ProductCard({ id, name, price, image, category, badge, sku, description, stock = 'in-stock' }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToCompare = useCompareStore((state) => state.addToCompare);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(id);
  };

  const stockLabel = stock === 'in-stock' ? 'In Stock' : stock === 'low-stock' ? 'Low Stock' : 'Out of Stock';
  const isOutOfStock = stock === 'out-of-stock';

  return (
    <article className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/product/${id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          {sku && <span className="text-xs text-gray-400">{sku}</span>}
          <span className="text-xs text-gray-500 uppercase tracking-wide">{category}</span>
          <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">{name}</h3>
          {description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>}
          <p className="text-lg font-bold text-gray-900 mt-2">${price.toLocaleString()}</p>
          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
            stock === 'in-stock' ? 'bg-green-100 text-green-700' :
            stock === 'low-stock' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {stockLabel}
          </span>
        </div>
      </Link>
      {badge && (
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleAddToCompare}
          aria-label="Add to compare"
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          disabled={isOutOfStock}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
