import { describe, it, expect, beforeEach } from 'vitest';
import { useCatalogStore } from '../../src/store/catalog';

describe('Catalog Store', () => {
  beforeEach(() => {
    const store = useCatalogStore.getState();
    store.setCategory('');
    store.setVendor('');
    store.setSearch('');
    store.setSortBy('availability');
  });

  it('should have all products', () => {
    const store = useCatalogStore.getState();
    expect(store.filtered().length).toBeGreaterThan(0);
  });

  it('should filter by category', () => {
    const store = useCatalogStore.getState();
    store.setCategory('Servers & Compute');
    const filtered = store.filtered();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((p: { category: string }) => p.category === 'Servers & Compute')).toBe(true);
  });

  it('should filter by vendor', () => {
    const store = useCatalogStore.getState();
    store.setVendor('Dell');
    const filtered = store.filtered();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((p: { vendor: string }) => p.vendor === 'Dell')).toBe(true);
  });

  it('should filter by search term', () => {
    const store = useCatalogStore.getState();
    store.setSearch('Dell');
    const filtered = store.filtered();
    expect(filtered.some((p: { vendor: string }) => p.vendor === 'Dell')).toBe(true);
  });

  it('should search in name, SKU, vendor, and description', () => {
    const store = useCatalogStore.getState();
    store.setSearch('PowerEdge');
    const filtered = store.filtered();
    expect(filtered.some((p: { name: string }) => p.name.includes('PowerEdge'))).toBe(true);
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

  it('should sort by availability (ascending — lowest available first)', () => {
    const store = useCatalogStore.getState();
    store.setSortBy('availability');
    const filtered = store.filtered();
    for (let i = 0; i < filtered.length - 1; i++) {
      const aAvail = filtered[i].totalStock - filtered[i].allocatedStock;
      const bAvail = filtered[i + 1].totalStock - filtered[i + 1].allocatedStock;
      expect(aAvail).toBeLessThanOrEqual(bAvail);
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
    expect(filtered.every((p: { category: string; vendor: string }) => p.category === 'Servers & Compute')).toBe(true);
    expect(filtered.every((p: { category: string; vendor: string }) => p.vendor === 'Dell')).toBe(true);
  });

  it('should return available stock for a SKU', () => {
    const store = useCatalogStore.getState();
    const available = store.getAvailable('DELL-PE-R760-001');
    expect(available).toBe(16); // 47 total - 31 allocated
  });
});
