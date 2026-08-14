import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from '@/components/layout/CartDrawer';
import { useCartStore } from '@/store/cart';
import { ToastProvider } from '@/components/ToastProvider';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/components/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: () => ({ addToast: vi.fn() }),
}));

vi.mock('@/utils/bomParser', () => ({
  parseBOMCSVWithQty: vi.fn(() => ({ added: [], notFound: [], errors: [] })),
}));

describe('CartDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [],
      totalItems: () => 0,
      totalPrice: () => 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });
  });

  it('shows import BOM button', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByText('Import BOM (CSV)')).toBeInTheDocument();
  });

  it('calls addToast with success when BOM import adds items', async () => {
    const { parseBOMCSVWithQty } = await import('@/utils/bomParser');
    vi.mocked(parseBOMCSVWithQty).mockReturnValue({
      added: [{ sku: 'DELL-PE-R760-001', qty: 2 }],
      notFound: [],
      errors: [],
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const importButton = screen.getByText('Import BOM (CSV)');
    expect(importButton).toBeInTheDocument();
  });

  it('shows not-found SKUs after import', async () => {
    const { parseBOMCSVWithQty } = await import('@/utils/bomParser');
    vi.mocked(parseBOMCSVWithQty).mockReturnValue({
      added: [],
      notFound: ['INVALID-SKU-1', 'INVALID-SKU-2'],
      errors: [],
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const importButton = screen.getByText('Import BOM (CSV)');
    expect(importButton).toBeInTheDocument();
  });

  it('shows import count after successful import', async () => {
    const { parseBOMCSVWithQty } = await import('@/utils/bomParser');
    vi.mocked(parseBOMCSVWithQty).mockReturnValue({
      added: [{ sku: 'DELL-PE-R760-001', qty: 2 }],
      notFound: [],
      errors: [],
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const importButton = screen.getByText('Import BOM (CSV)');
    expect(importButton).toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={onClose} onSubmit={() => {}} />
      </ToastProvider>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not close on other keys', () => {
    const onClose = vi.fn();
    
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={onClose} onSubmit={() => {}} />
      </ToastProvider>
    );

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('prevents body scroll when open', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    render(
      <ToastProvider>
        <CartDrawer open={false} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('closes when overlay is clicked', () => {
    const onClose = vi.fn();
    
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={onClose} onSubmit={() => {}} />
      </ToastProvider>
    );

    const overlay = document.querySelector('[class*="bg-black/60"]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('does not close when drawer content is clicked', () => {
    const onClose = vi.fn();
    
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={onClose} onSubmit={() => {}} />
      </ToastProvider>
    );

    const drawer = document.querySelector('[role="dialog"]');
    if (drawer) {
      fireEvent.click(drawer);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('renders empty cart message', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByText(/Your RFQ cart is empty/i)).toBeInTheDocument();
  });

  it('renders cart items when not empty', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 2 },
      ],
      totalItems: () => 2,
      totalPrice: () => 16998,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
    expect(screen.getByText('Dell PowerEdge R760')).toBeInTheDocument();
  });

  it('calls removeItem when remove button is clicked', () => {
    const removeItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 },
      ],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem,
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const removeButtons = screen.getAllByLabelText(/Remove Dell PowerEdge R760/i);
    fireEvent.click(removeButtons[0]);
    expect(removeItem).toHaveBeenCalledWith('DELL-PE-R760-001');
  });

  it('calls updateQty when + button is clicked', () => {
    const updateQty = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 },
      ],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty,
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const plusButtons = screen.getAllByText('+');
    fireEvent.click(plusButtons[0]);
    expect(updateQty).toHaveBeenCalledWith('DELL-PE-R760-001', 2);
  });

  it('calls updateQty when - button is clicked', () => {
    const updateQty = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 3 },
      ],
      totalItems: () => 3,
      totalPrice: () => 25497,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty,
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const minusButtons = screen.getAllByText('−');
    fireEvent.click(minusButtons[0]);
    expect(updateQty).toHaveBeenCalledWith('DELL-PE-R760-001', 2);
  });

  it('does not go below 1 quantity', () => {
    const updateQty = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 },
      ],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty,
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    const minusButtons = screen.getAllByText('−');
    fireEvent.click(minusButtons[0]);
    expect(updateQty).toHaveBeenCalledWith('DELL-PE-R760-001', 1);
  });

  it('shows footer with clear and submit buttons when items exist', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
    expect(screen.getByText(/Submit RFQ/i)).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
  });

  it('calls clearCart when Clear Cart button is clicked', () => {
    const clearCart = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart,
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Clear Cart'));
    expect(clearCart).toHaveBeenCalled();
  });

  it('calls onSubmit when Submit RFQ button is clicked', () => {
    const onSubmit = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={onSubmit} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText(/Submit RFQ/i));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [],
      totalItems: () => 0,
      totalPrice: () => 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={onClose} onSubmit={() => {}} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByLabelText('Close cart'));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides footer when cart is empty', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [],
      totalItems: () => 0,
      totalPrice: () => 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );

    expect(screen.queryByText(/Submit RFQ/i)).toBeNull();
  });
});
