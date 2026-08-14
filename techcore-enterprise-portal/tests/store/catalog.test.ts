import { describe, it, expect, beforeEach } from 'vitest';
import { useCatalogStore, PRODUCTS } from '../../src/store';

describe('Catalog Store', () => {
  beforeEach(() => {
    const store = useCatalogStore.getState();
    store.setCategory('');
    store.setVendor('');
    store.setSearch('');
    store.setSortBy('availability');
  });

  it('should initialize with all products', () => {
    const store = useCatalogStore.getState();
    expect(store.products).toEqual(PRODUCTS);
  });

  it('should filter by category', () => {
    const store = useCatalogStore.getState();
    store.setCategory('Servers & Compute');
    
    const filtered = store.filtered();
    expect(filtered.length).toBe(3);
    expect(filtered.every(p => p.category === 'Servers & Compute')).toBe(true);
  });

  it('should filter by vendor', () => {
    const store = useCatalogStore.getState();
    store.setVendor('Dell');
    
    const filtered = store.filtered();
    expect(filtered.length).toBe(2);
    expect(filtered.every(p => p.vendor === 'Dell')).toBe(true);
  });

  it('should filter by search term', () => {
    const store = useCatalogStore.getState();
    store.setSearch('Dell');
    
    const filtered = store.filtered();
    expect(filtered.some(p => p.vendor === 'Dell')).toBe(true);
  });

  it('should search in name, SKU, vendor, and description', () => {
    const store = useCatalogStore.getState();
    store.setSearch('PowerEdge');
    
    const filtered = store.filtered();
    expect(filtered.some(p => p.name.includes('PowerEdge'))).toBe(true);
  });

  it('should sort by price ascending', () => {
    const store = useCatalogStore.getState();
    store.setSortBy('price-asc');
    
    const filtered = store.filtered();
    for (let i = 0; i < filtered.length - 1; i++) {
      expect(filtered[i].price).toBeLessThanOrEqual(filtered[i + 1].price);
    }
  });

  it('should sort by price descending', () => {
    const store = useCatalogStore.getState();
    store.setSortBy('price-desc');
    
    const filtered = store.filtered();
    for (let i = 0; i < filtered.length - 1; i++) {
      expect(filtered[i].price).toBeGreaterThanOrEqual(filtered[i + 1].price);
    }
  });

  it('should sort by availability (stock status)', () => {
    const store = useCatalogStore.getState();
    store.setSortBy('availability');
    
    const filtered = store.filtered();
    const order = { ok: 0, low: 1, out: 2 };
    for (let i = 0; i < filtered.length - 1; i++) {
      expect(order[filtered[i].stockStatus]).toBeLessThanOrEqual(order[filtered[i + 1].stockStatus]);
    }
  });

  it('should return empty array when no matches', () => {
    const store = useCatalogStore.getState();
    store.setCategory('NonExistent');
    
    expect(store.filtered().length).toBe(0);
  });

  it('should handle combined filters', () => {
    const store = useCatalogStore.getState();
    store.setCategory('Servers & Compute');
    store.setVendor('Dell');
    
    const filtered = store.filtered();
    expect(filtered.every(p => p.category === 'Servers & Compute')).toBe(true);
    expect(filtered.every(p => p.vendor === 'Dell')).toBe(true);
  });
});
