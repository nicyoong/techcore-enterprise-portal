import { create } from 'zustand';

interface CompareState {
  items: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],

  addToCompare: (id) => {
    const { items } = get();
    if (!items.includes(id)) {
      set({ items: [...items, id] });
    }
  },

  removeFromCompare: (id) => {
    const { items } = get();
    set({ items: items.filter((item) => item !== id) });
  },

  clearCompare: () => set({ items: [] }),

  isInCompare: (id) => {
    return get().items.includes(id);
  },
}));
