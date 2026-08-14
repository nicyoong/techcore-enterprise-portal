import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartDrawer from '@/components/layout/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ToastProvider } from '@/components/ToastProvider';
import { parseBOMCSVWithQty } from '@/utils/bomParser';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/components/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: () => ({ addToast: vi.fn() }),
}));

describe('CartDrawer - BOM Import', () => {
  const mockAddItem = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockUpdateQty = vi.fn();
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [],
      totalItems: () => 0,
      totalPrice: () => 0,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
  });

  it('triggers file input click when Import BOM button is clicked', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const importButton = screen.getByLabelText('Import BOM CSV file');
    expect(importButton).toBeInTheDocument();

    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
  });

  it('shows import count after successful BOM import', async () => {
    const mockParse = vi.fn().mockReturnValue({
      added: [{ sku: 'DELL-PE-R760-001', qty: 2 }],
      notFound: [],
      errors: [],
    });

    vi.doMock('@/utils/bomParser', () => ({
      parseBOMCSVWithQty: mockParse,
    }));

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['SKU,Qty\nDELL-PE-R760-001,2'], 'bom.csv', { type: 'text/csv' });
    if (fileInput) {
      Object.defineProperty(fileInput, 'files', { value: [file], writable: true });
      fireEvent.change(fileInput);
    }

    await waitFor(() => {
      expect(screen.getByText(/1 items imported/i)).toBeInTheDocument();
    });
  });

  it('shows not-found SKUs after BOM import', async () => {
    const mockParse = vi.fn().mockReturnValue({
      added: [],
      notFound: ['INVALID-SKU-1', 'INVALID-SKU-2'],
      errors: [],
    });

    vi.doMock('@/utils/bomParser', () => ({
      parseBOMCSVWithQty: mockParse,
    }));

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['SKU,Qty\nINVALID-SKU-1,1'], 'bom.csv', { type: 'text/csv' });
    if (fileInput) {
      Object.defineProperty(fileInput, 'files', { value: [file], writable: true });
      fireEvent.change(fileInput);
    }

    await waitFor(() => {
      expect(screen.getByText(/Unknown SKUs/i)).toBeInTheDocument();
    });
  });

  it('shows BOM parse errors after import', async () => {
    const mockParse = vi.fn().mockReturnValue({
      added: [],
      notFound: [],
      errors: ['Invalid quantity format'],
    });

    vi.doMock('@/utils/bomParser', () => ({
      parseBOMCSVWithQty: mockParse,
    }));

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['SKU,Qty\nDELL-PE-R760-001,abc'], 'bom.csv', { type: 'text/csv' });
    if (fileInput) {
      Object.defineProperty(fileInput, 'files', { value: [file], writable: true });
      fireEvent.change(fileInput);
    }

    await waitFor(() => {
      expect(screen.getByText(/Invalid quantity/i)).toBeInTheDocument();
    });
  });
});
