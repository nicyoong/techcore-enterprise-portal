import { describe, it, expect } from 'vitest';
import { parseBOMCSVWithQty } from '../../src/utils/bomParser';

describe('parseBOMCSVWithQty', () => {
  it('matches SKUs against the catalog and returns correct quantities', () => {
    const csv = 'SKU,Qty\nDELL-PE-R760-001,5\nCISCO-C9300-004,2\n';
    const result = parseBOMCSVWithQty(csv);
    expect(result.added).toHaveLength(2);
    expect(result.added[0]).toEqual({ sku: 'DELL-PE-R760-001', qty: 5 });
    expect(result.added[1]).toEqual({ sku: 'CISCO-C9300-004', qty: 2 });
    expect(result.notFound).toEqual([]);
    expect(result.errors).toEqual([]);
  });

  it('reports unknown SKUs in notFound', () => {
    const csv = 'SKU,Qty\nFAKE-SKU-999,3\nDELL-PE-R760-001,1\n';
    const result = parseBOMCSVWithQty(csv);
    expect(result.notFound).toEqual(['FAKE-SKU-999']);
    expect(result.added).toHaveLength(1);
  });

  it('handles CSV without header row', () => {
    const csv = 'DELL-PE-R760-001,10\nHPE-PL-DL380-002,3\n';
    const result = parseBOMCSVWithQty(csv);
    expect(result.added).toHaveLength(2);
    expect(result.added[0].qty).toBe(10);
    expect(result.added[1].qty).toBe(3);
  });

  it('rejects invalid quantities', () => {
    const csv = 'SKU,Qty\nDELL-PE-R760-001,abc\n';
    const result = parseBOMCSVWithQty(csv);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.added).toHaveLength(0);
  });

  it('returns empty result for empty CSV', () => {
    const result = parseBOMCSVWithQty('');
    expect(result.added).toEqual([]);
    expect(result.errors).toEqual(['CSV is empty']);
  });

  it('aggregates duplicate SKUs as separate entries (cart handles merging)', () => {
    const csv = 'SKU,Qty\nDELL-PE-R760-001,2\nDELL-PE-R760-001,3\n';
    const result = parseBOMCSVWithQty(csv);
    expect(result.added).toHaveLength(2);
    expect(result.added.map((a) => a.qty)).toEqual([2, 3]);
  });
});
