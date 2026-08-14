import { PRODUCTS } from '../store/catalog';
import type { Product } from '../store/catalog';

export interface BOMParseResult {
  added: Array<{ sku: string; qty: number }>;
  notFound: string[];
  errors: string[];
}

export function parseBOMCSVWithQty(text: string): BOMParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { added: [], notFound: [], errors: ['CSV is empty'] };
  }

  const headerLine = lines[0].toLowerCase();
  const hasHeader =
    headerLine.includes('sku') || headerLine.includes('qty') || headerLine.includes('quantity');

  const dataLines = hasHeader ? lines.slice(1) : lines;
  const headers = hasHeader ? lines[0].toLowerCase().split(',').map((s) => s.trim()) : [];
  const productMap = new Map(PRODUCTS.map((p: Product) => [p.sku.toUpperCase(), p]));
  const notFound: string[] = [];
  const added: Array<{ sku: string; qty: number }> = [];
  const errors: string[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];
    const rowNum = hasHeader ? i + 2 : i + 1;
    const parts = line.split(',').map((s) => s.trim());

    if (parts.length < 2) {
      errors.push(`Row ${rowNum}: expected at least 2 columns (SKU, Qty)`);
      continue;
    }

    let sku = '';
    let rawQty = '';
    let qty = 1;

    if (hasHeader) {
      const skuIdx = headers.findIndex(
        (h) => h === 'sku' || h === 'part number' || h === 'partnumber'
      );
      const qtyIdx = headers.findIndex((h) => h === 'qty' || h === 'quantity');
      if (skuIdx !== -1) sku = parts[skuIdx] ?? '';
      if (qtyIdx !== -1) {
        rawQty = parts[qtyIdx] ?? '';
        qty = parseInt(rawQty, 10) || 1;
      }
      if (!sku) {
        errors.push(`Row ${rowNum}: SKU column not found`);
        continue;
      }
    } else {
      sku = parts[0];
      rawQty = parts[1];
      qty = parseInt(parts[1], 10) || 1;
    }

    if (!sku) {
      errors.push(`Row ${rowNum}: empty SKU`);
      continue;
    }

    // Reject non-numeric qty values (e.g. "abc", "varies", "")
    if (!/^\d+$/.test(rawQty.trim())) {
      errors.push(`Row ${rowNum}: invalid quantity "${rawQty}"`);
      continue;
    }

    const product = productMap.get(sku.toUpperCase());
    if (!product) {
      notFound.push(sku);
      continue;
    }

    added.push({ sku, qty });
  }

  return { added, notFound, errors };
}
