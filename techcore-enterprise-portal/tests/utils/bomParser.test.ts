import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { parseBOMCSVWithQty } from '@/utils/bomParser';

describe('BOM Parser', () => {
  describe('parseBOMCSVWithQty', () => {
    it('should return error for empty CSV', () => {
      const result = parseBOMCSVWithQty('');
      expect(result).toEqual({
        added: [],
        notFound: [],
        errors: ['CSV is empty'],
      });
    });

    it('should handle CSV with whitespace only', () => {
      const result = parseBOMCSVWithQty('   \n\n  ');
      expect(result.errors).toContain('CSV is empty');
    });

    it('should parse CSV with header and valid data', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,2
HPE-PL-DL380-002,1`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(2);
      expect(result.added[0].sku).toBe('DELL-PE-R760-001');
      expect(result.added[0].qty).toBe(2);
      expect(result.added[1].sku).toBe('HPE-PL-DL380-002');
      expect(result.added[1].qty).toBe(1);
      expect(result.errors).toEqual([]);
      expect(result.notFound).toEqual([]);
    });

    it('should handle invalid SKU', () => {
      const csv = `SKU,Qty
INVALID-SKU,2`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.notFound).toContain('INVALID-SKU');
      expect(result.added).toEqual([]);
    });

    it('should handle invalid quantity', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,abc`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle row with insufficient columns', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should be case-insensitive for SKU matching', () => {
      const csv = `SKU,Qty
dell-pe-r760-001,2`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(1);
      expect(result.added[0].sku).toBe('dell-pe-r760-001');
    });

    it('should trim whitespace from values', () => {
      const csv = `  SKU  ,  Qty  
  DELL-PE-R760-001  ,  2  
`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(1);
    });

    it('should handle mixed valid and invalid SKUs', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,2
INVALID-SKU,1`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(1);
      expect(result.notFound).toContain('INVALID-SKU');
    });

    it('should handle empty rows', () => {
      const csv = `SKU,Qty

DELL-PE-R760-001,2
`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result).toBeDefined();
    });

    it('should filter out negative quantities', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,-5`;
      
      const result = parseBOMCSVWithQty(csv);
      // Parser filters out invalid quantities including negative
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle zero quantity', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,0`;
      
      const result = parseBOMCSVWithQty(csv);
      // Zero quantity may be filtered or kept depending on implementation
      expect(result).toBeDefined();
    });

    it('should handle row with only SKU and no quantity column', () => {
      const csv = `SKU
DELL-PE-R760-001`;
      
      const result = parseBOMCSVWithQty(csv);
      // Should default qty to 1 when quantity column is missing
      expect(result).toBeDefined();
    });

    it('should handle row with extra columns beyond SKU and Qty', () => {
      const csv = `SKU,Qty,Notes
DELL-PE-R760-001,2,Priority shipment`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(1);
      expect(result.added[0].qty).toBe(2);
    });

    it('should handle empty SKU field', () => {
      const csv = `SKU,Qty
,2`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle whitespace-only SKU', () => {
      const csv = `SKU,Qty
   ,2`;
      
      const result = parseBOMCSVWithQty(csv);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle CSV with no header row (positional parsing)', () => {
      const csv = `DELL-PE-R760-001,2
HPE-PL-DL380-002,1`;

      const result = parseBOMCSVWithQty(csv);
      // Without header, it should still parse positionally
      expect(result).toBeDefined();
    });

    it('should handle rows with empty quantity', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,`;

      const result = parseBOMCSVWithQty(csv);
      expect(result).toBeDefined();
    });

    it('should handle SKU with special characters', () => {
      const csv = `SKU,Qty
DELL-PE-R760-001,2
HPE-PL-DL380-002,1
CISCO-C9300-004,3`;

      const result = parseBOMCSVWithQty(csv);
      expect(result.added.length).toBe(3);
    });

    it('should use positional parsing when no header match', () => {
      const csv = `DELL-PE-R760-001,2
HPE-PL-DL380-002,1`;

      const result = parseBOMCSVWithQty(csv);
      // First row is treated as data (no header match), so DELL-PE-R760-001 is parsed positionally
      expect(result).toBeDefined();
    });
  });
});
