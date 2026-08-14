import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from '../../../src/components/layout/CartDrawer';
import { useCartStore } from '../../../src/store/cart';
import { useUpsellStore } from '../../../src/store/upsell';
import { ToastProvider } from '../../../src/components/ToastProvider';

vi.mock('../../../src/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('../../../src/store/upsell', () => ({
  useUpsellStore: vi.fn(),
}));

describe('CartDrawer', () => {
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
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: null,
      dismissUpsell: vi.fn(),
      selectedAccessories: new Set(),
      toggleAccessory: vi.fn(),
      getActiveRule: vi.fn(),
    });
  });

  it('renders empty state when cart is empty', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByText(/Your RFQ cart is empty/i)).toBeInTheDocument();
  });

  it('renders items when cart has products', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 2, availableStock: 16 },
      ],
      totalItems: () => 2,
      totalPrice: () => 16998,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByText('Dell PowerEdge R760')).toBeInTheDocument();
    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
  });

  it('calls removeItem when remove button is clicked', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1, availableStock: 16 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    const removeBtn = screen.getByLabelText(/Remove Dell PowerEdge R760/i);
    fireEvent.click(removeBtn);
    expect(mockRemoveItem).toHaveBeenCalledWith('DELL-PE-R760-001');
  });

  it('calls updateQty when + button is clicked', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1, availableStock: 16 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    const plusBtn = screen.getAllByText('+')[0];
    fireEvent.click(plusBtn);
    expect(mockUpdateQty).toHaveBeenCalledWith('DELL-PE-R760-001', 2);
  });

  it('disables + button when at available limit', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 16, availableStock: 16 }],
      totalItems: () => 16,
      totalPrice: () => 135984,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    const plusBtn = screen.getAllByText('+')[0];
    expect(plusBtn).toBeDisabled();
  });

  it('shows available stock info for each item', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 2, availableStock: 16 }],
      totalItems: () => 2,
      totalPrice: () => 16998,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByText(/16 available/)).toBeInTheDocument();
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

  it('calls onSubmit when Submit RFQ is clicked', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 1, availableStock: 16 }],
      totalItems: () => 1,
      totalPrice: () => 8499,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQty: mockUpdateQty,
      clearCart: mockClearCart,
    });
    const onSubmit = vi.fn();
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={onSubmit} />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Submit RFQ'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders Import BOM button', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.getByRole('button', { name: /Import BOM/i })).toBeInTheDocument();
  });
});
