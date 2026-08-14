import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  badge?: string;
}

interface CatalogState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
}

// Mock data for the catalog
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'crm-001',
    name: 'Enterprise CRM Pro',
    price: 12000,
    image: 'https://picsum.photos/seed/crm/400/300',
    category: 'CRM',
    description: 'Full-featured CRM solution for enterprise teams with AI-powered insights.',
    badge: 'Best Seller',
  },
  {
    id: 'erp-001',
    name: 'CloudERP Suite',
    price: 25000,
    image: 'https://picsum.photos/seed/erp/400/300',
    category: 'ERP',
    description: 'Complete ERP solution with finance, HR, and supply chain modules.',
  },
  {
    id: 'analytics-001',
    name: 'DataLens Analytics',
    price: 8000,
    image: 'https://picsum.photos/seed/analytics/400/300',
    category: 'Analytics',
    description: 'Real-time analytics and visualization platform for enterprise data.',
    badge: 'New',
  },
  {
    id: 'collab-001',
    name: 'TeamConnect',
    price: 5000,
    image: 'https://picsum.photos/seed/collab/400/300',
    category: 'Collaboration',
    description: 'Secure collaboration platform with video, chat, and file sharing.',
  },
  {
    id: 'security-001',
    name: 'ShieldGuard',
    price: 15000,
    image: 'https://picsum.photos/seed/security/400/300',
    category: 'Security',
    description: 'Comprehensive security operations center with threat detection.',
  },
  {
    id: 'crm-002',
    name: 'SalesForce One',
    price: 18000,
    image: 'https://picsum.photos/seed/sf/400/300',
    category: 'CRM',
    description: 'AI-driven sales automation and customer relationship management.',
  },
];

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      searchTerm: '',
      selectedCategory: 'All',

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 300));
          set({ products: MOCK_PRODUCTS, loading: false });
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch products',
          });
        }
      },

      fetchProduct: async (id: string) => {
        set({ loading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 200));
          const product = MOCK_PRODUCTS.find((p) => p.id === id);
          if (!product) {
            throw new Error(`Product with id "${id}" not found`);
          }
          set({ loading: false });
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch product',
          });
        }
      },

      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setSelectedCategory: (category: string) => set({ selectedCategory: category }),
    }),
    {
      name: 'catalog-store',
    }
  )
);
