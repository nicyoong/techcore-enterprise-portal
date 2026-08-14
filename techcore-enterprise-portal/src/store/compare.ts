import { create } from 'zustand';

export interface CompareItem {
  sku: string;
  name: string;
  vendor: string;
  specs: Record<string, string>;
  price: number;
}

interface CompareState {
  selected: CompareItem[];
  toggle: (item: CompareItem) => void;
  remove: (sku: string) => void;
  clear: () => void;
  isSelected: (sku: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  selected: [],
  toggle: (item) => {
    const { selected } = get();
    const exists = selected.find((s) => s.sku === item.sku);
    if (exists) {
      set({ selected: selected.filter((s) => s.sku !== item.sku) });
    } else {
      if (selected.length >= 4) return;
      set({ selected: [...selected, item] });
    }
  },
  remove: (sku) =>
    set((state) => ({ selected: state.selected.filter((s) => s.sku !== sku) })),
  clear: () => set({ selected: [] }),
  isSelected: (sku) => get().selected.some((s) => s.sku === sku),
}));
