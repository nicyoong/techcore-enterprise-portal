import { create } from 'zustand';

export interface CartItem {
  sku: string;
  name: string;
  vendor: string;
  price: number;
  qty: number;
  stockStatus: 'ok' | 'low' | 'out';
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeItem: (sku: string) => void;
  updateQty: (sku: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.sku === item.sku);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.sku === item.sku ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: item.qty ?? 1 }] };
    }),
  removeItem: (sku) =>
    set((state) => ({ items: state.items.filter((i) => i.sku !== sku) })),
  updateQty: (sku, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.sku === sku ? { ...i, qty } : i)),
    })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
