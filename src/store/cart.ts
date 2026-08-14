import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './catalog';

interface CartState {
  items: string[];
  cartProducts: Product[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartProducts: [],

      addToCart: (id) => {
        const { items } = get();
        if (!items.includes(id)) {
          set({ items: [...items, id] });
        }
      },

      removeFromCart: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item !== id) });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-store',
    }
  )
);
