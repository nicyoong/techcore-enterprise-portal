import { describe, it, expect, beforeEach } from 'vitest';
import { useCompareStore } from '../../src/store';

describe('Compare Store', () => {
  beforeEach(() => {
    const store = useCompareStore.getState();
    store.clear();
  });

  it('should add item to compare', () => {
    const store = useCompareStore.getState();
    store.toggle({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      specs: { CPU: 'Intel Xeon' },
    });
    
    const state = useCompareStore.getState();
    expect(state.selected.length).toBe(1);
    expect(state.isSelected('DELL-PE-R760-001')).toBe(true);
  });

  it('should remove item from compare', () => {
    const store = useCompareStore.getState();
    store.toggle({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      specs: { CPU: 'Intel Xeon' },
    });
    store.remove('DELL-PE-R760-001');
    
    expect(store.selected.length).toBe(0);
    expect(store.isSelected('DELL-PE-R760-001')).toBe(false);
  });

  it('should toggle item on/off', () => {
    const store = useCompareStore.getState();
    const item = {
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      specs: { CPU: 'Intel Xeon' },
    };
    
    store.toggle(item);
    expect(store.isSelected('DELL-PE-R760-001')).toBe(true);
    
    store.toggle(item);
    expect(store.isSelected('DELL-PE-R760-001')).toBe(false);
  });

  it('should clear all compare items', () => {
    const store = useCompareStore.getState();
    store.toggle({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      specs: { CPU: 'Intel Xeon' },
    });
    store.clear();
    
    expect(store.selected.length).toBe(0);
  });

  it('should check if item is selected', () => {
    const store = useCompareStore.getState();
    expect(store.isSelected('nonexistent')).toBe(false);
    
    store.toggle({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      specs: { CPU: 'Intel Xeon' },
    });
    
    expect(store.isSelected('DELL-PE-R760-001')).toBe(true);
    expect(store.isSelected('HPE-PL-DL380-002')).toBe(false);
  });

  it('should not add more than 4 items to compare', () => {
    useCompareStore.getState().clear();
    const store = useCompareStore.getState();
    expect(store.selected.length).toBe(0);
    store.toggle({
      sku: 'DELL-A',
      name: 'A',
      vendor: 'V',
      price: 1,
      specs: { CPU: 'x' },
    });
    expect(useCompareStore.getState().selected.length).toBe(1);
    store.toggle({
      sku: 'DELL-B',
      name: 'B',
      vendor: 'V',
      price: 1,
      specs: { CPU: 'x' },
    });
    expect(useCompareStore.getState().selected.length).toBe(2);
    store.toggle({
      sku: 'DELL-C',
      name: 'C',
      vendor: 'V',
      price: 1,
      specs: { CPU: 'x' },
    });
    expect(useCompareStore.getState().selected.length).toBe(3);
    store.toggle({
      sku: 'DELL-D',
      name: 'D',
      vendor: 'V',
      price: 1,
      specs: { CPU: 'x' },
    });

    expect(useCompareStore.getState().selected.length).toBe(4);

    // 5th item should be rejected
    store.toggle({
      sku: 'DELL-E',
      name: 'E',
      vendor: 'V',
      price: 1,
      specs: { CPU: 'x' },
    });
    expect(useCompareStore.getState().selected.length).toBe(4);
    expect(useCompareStore.getState().isSelected('DELL-E')).toBe(false);
  });
});
