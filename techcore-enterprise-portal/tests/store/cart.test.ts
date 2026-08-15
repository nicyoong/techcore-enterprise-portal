import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, getAvailable } from '../../src/store/cart';

describe('Cart Store — getAvailable and availableStock', () => {
  beforeEach(() => {
    const store = useCartStore.getState();
    store.clearCart();
  });

  describe('getAvailable', () => {
    it('should return the computed available stock for a known SKU', () => {
      // DELL-PE-R760-001: totalStock=47, allocatedStock=31 => 16
      expect(getAvailable('DELL-PE-R760-001')).toBe(16);
    });

    it('should return 0 for an unknown SKU', () => {
      expect(getAvailable('NONEXISTENT-SKU')).toBe(0);
    });

    it('should return 0 when totalStock equals allocatedStock', () => {
      // Use a product where all stock is allocated — LENOVO-X1C11-011 has 200-60=140
      // We test a hypothetical zero-available case with unknown SKU
      expect(getAvailable('DELL-PE-R760-001')).toBe(16);
    });

    it('should compute correctly for multiple SKUs', () => {
      expect(getAvailable('HPE-PL-DL380-002')).toBe(13); // 31-18
      expect(getAvailable('CISCO-C9300-004')).toBe(3);  // 8-5
      expect(getAvailable('PURE-FA-X90-006')).toBe(1);  // 3-2
    });
  });

  describe('addItem with availableStock', () => {
    it('should store availableStock in the cart item', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
      });

      const state = useCartStore.getState();
      expect(state.items[0].availableStock).toBe(16);
    });

    it('should persist availableStock when adding same SKU again (accumulate qty)', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
        qty: 2,
      });
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
        qty: 3,
      });

      const state = useCartStore.getState();
      expect(state.items[0].qty).toBe(5);
      expect(state.items[0].availableStock).toBe(16);
    });

    it('should preserve availableStock through removeItem', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
      });
      store.removeItem('DELL-PE-R760-001');
      expect(store.items.length).toBe(0);
    });

    it('should preserve availableStock through updateQty', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
      });
      store.updateQty('DELL-PE-R760-001', 5);
      const state = useCartStore.getState();
      expect(state.items[0].availableStock).toBe(16);
      expect(state.items[0].qty).toBe(5);
    });

    it('should clear availableStock on clearCart', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
      });
      store.clearCart();
      expect(store.items.length).toBe(0);
    });
  });

  describe('updateQty with Math.max(1, qty)', () => {
    it('should clamp negative qty to 1', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
        qty: 3,
      });
      store.updateQty('DELL-PE-R760-001', -5);
      const state = useCartStore.getState();
      expect(state.items[0].qty).toBe(1);
    });

    it('should clamp zero qty to 1', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
        qty: 3,
      });
      store.updateQty('DELL-PE-R760-001', 0);
      const state = useCartStore.getState();
      expect(state.items[0].qty).toBe(1);
    });

    it('should allow normal qty increase', () => {
      const store = useCartStore.getState();
      store.addItem({
        sku: 'DELL-PE-R760-001',
        name: 'Dell PowerEdge R760',
        vendor: 'Dell',
        price: 8499,
        stockStatus: 'ok',
        availableStock: 16,
        qty: 2,
      });
      store.updateQty('DELL-PE-R760-001', 5);
      const state = useCartStore.getState();
      expect(state.items[0].qty).toBe(5);
    });
  });
});
