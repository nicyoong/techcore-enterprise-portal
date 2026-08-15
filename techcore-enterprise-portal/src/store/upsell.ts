import { create } from 'zustand';

export interface UpsellItem {
  sku: string;
  name: string;
  price: number;
  reason: string;
  required: boolean;
}

export interface UpsellRule {
  matchSkus: string[];
  category?: string;
  items: UpsellItem[];
}

export const UPSELL_RULES: UpsellRule[] = [
  {
    matchSkus: ['DELL-PE-R760-001', 'DELL-R660-010'],
    items: [
      {
        sku: 'DELL-Rail-2U',
        name: 'Dell 2U Slide Rail Kit (Per Server)',
        price: 189,
        reason: 'Required for rack mounting — ships separately from server',
        required: true,
      },
      {
        sku: 'DELL-PSU-Red',
        name: 'Dell 1600W Platinum Hot-Swap Power Supply (Redundant)',
        price: 849,
        reason: 'Second PSU for HA — single PSU is a single point of failure',
        required: false,
      },
      {
        sku: 'DELL-C13-PDU',
        name: 'C13 to C14 PDU Power Cables (2-Pack, 6ft)',
        price: 42,
        reason: 'Matches Dell PSU C14 inlet — 2 cables per redundant PSU pair',
        required: false,
      },
    ],
  },
  {
    matchSkus: ['HPE-PL-DL380-002'],
    items: [
      {
        sku: 'HPE-Rail-2U',
        name: 'HPE Server Slide Rail Kit (2U, Per Server)',
        price: 165,
        reason: 'Required for rack mounting — not included with server',
        required: true,
      },
      {
        sku: 'HPE-PSU-Red',
        name: 'HPE 1300W Flex Slot Platinum Hot Plug Power Supply Kit',
        price: 729,
        reason: 'Redundant PSU for HA — eliminates single point of failure',
        required: false,
      },
      {
        sku: 'HPE-C13-PDU',
        name: 'C13 to C13 PDU Power Cables (2-Pack, 6ft)',
        price: 38,
        reason: 'Matches HPE PSU C13 inlet — one per PSU for redundant feed',
        required: false,
      },
    ],
  },
  {
    matchSkus: [],
    category: 'Servers & Compute',
    items: [
      {
        sku: 'GEN-Rail-2U',
        name: 'Universal 2U Server Rail Kit (Dell/HPE/Lenovo Compatible)',
        price: 129,
        reason: 'Aftermarket rail kit — fits most 2U rack servers',
        required: false,
      },
      {
        sku: 'CBL-KIT-DEC',
        name: 'Server Deployment Cable Kit (Mgmt + Console + Power)',
        price: 87,
        reason: 'Includes management cable, serial console, and spare C13 power',
        required: false,
      },
    ],
  },
];

interface UpsellState {
  shownForSku: string | null;
  selectedAccessories: Set<string>;
  showUpsell: (sku: string) => void;
  dismissUpsell: () => void;
  toggleAccessory: (sku: string) => void;
  isSelected: (sku: string) => boolean;
  getActiveRule: (sku: string) => UpsellRule | null;
}

export const useUpsellStore = create<UpsellState>((set, get) => ({
  shownForSku: null,
  selectedAccessories: new Set(),

  showUpsell: (sku) => {
    const rule = get().getActiveRule(sku);
    if (!rule) return;
    set({ shownForSku: sku, selectedAccessories: new Set() });
  },

  dismissUpsell: () => {
    set({ shownForSku: null, selectedAccessories: new Set() });
  },

  toggleAccessory: (sku) => {
    set((state) => {
      const next = new Set(state.selectedAccessories);
      if (next.has(sku)) next.delete(sku);
      else next.add(sku);
      return { selectedAccessories: next };
    });
  },

  isSelected: (sku) => get().selectedAccessories.has(sku),

  getActiveRule: (sku) => {
    const matched = UPSELL_RULES.find((r) => r.matchSkus.includes(sku));
    if (matched) return matched;
    return UPSELL_RULES.find((r): r is UpsellRule => !!r.category) ?? null;
  },
}));
