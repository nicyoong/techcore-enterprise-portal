import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../../src/store';

describe('Cart Store', () => {
  beforeEach(() => {
    const store = useCartStore.getState();
    store.clearCart();
  });

  it('should add item to cart', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
    
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].sku).toBe('DELL-PE-R760-001');
  });

  it('should not duplicate items with same SKU', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 2,
    });
    
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].qty).toBe(3);
  });

  it('should remove item from cart', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
    store.removeItem('DELL-PE-R760-001');
    
    expect(store.items.length).toBe(0);
  });

  it('should update item quantity', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
    store.updateQty('DELL-PE-R760-001', 5);
    
    const state = useCartStore.getState();
    expect(state.items[0].qty).toBe(5);
  });

  it('should clear cart', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
    store.clearCart();
    
    expect(store.items).toEqual([]);
  });

  it('should calculate total items', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 2,
    });
    store.addItem({
      sku: 'HPE-PL-DL380-002',
      name: 'HPE ProLiant DL380 Gen11',
      vendor: 'HPE',
      price: 7899,
      stockStatus: 'ok',
      qty: 3,
    });
    
    expect(store.totalItems()).toBe(5);
  });

  it('should calculate total price', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 2,
    });
    store.addItem({
      sku: 'HPE-PL-DL380-002',
      name: 'HPE ProLiant DL380 Gen11',
      vendor: 'HPE',
      price: 7899,
      stockStatus: 'ok',
      qty: 1,
    });
    
    expect(store.totalPrice()).toBe(8499 * 2 + 7899 * 1);
  });

  it('should handle empty cart calculations', () => {
    const store = useCartStore.getState();
    expect(store.totalItems()).toBe(0);
    expect(store.totalPrice()).toBe(0);
  });

  it('should default qty to 1 when not provided', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });

    const state = useCartStore.getState();
    expect(state.items[0].qty).toBe(1);
  });

  it('should use provided qty when specified', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 5,
    });

    const state = useCartStore.getState();
    expect(state.items[0].qty).toBe(5);
  });

  it('should accumulate qty when adding same SKU twice', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 3,
    });
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 2,
    });

    const state = useCartStore.getState();
    expect(state.items[0].qty).toBe(5);
  });

  it('should handle updateQty for existing item', () => {
    const store = useCartStore.getState();
    store.addItem({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
      qty: 1,
    });
    store.updateQty('DELL-PE-R760-001', 10);

    const state = useCartStore.getState();
    expect(state.items[0].qty).toBe(10);
  });

  it('should handle removeItem for non-existent SKU', () => {
    const store = useCartStore.getState();
    store.removeItem('NONEXISTENT');
    expect(store.items.length).toBe(0);
  });
});
