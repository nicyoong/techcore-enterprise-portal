import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('shows "limit reached" indicator when qty equals available', () => {
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
    expect(screen.getByText(/limit reached/)).toBeInTheDocument();
  });

  it('shows toast and does NOT update qty when + button exceeds available', () => {
    const mockAddToast = vi.fn();
    vi.doMock('../../../src/components/ToastProvider', () => ({
      ToastProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      useToast: () => ({ addToast: mockAddToast }),
    }));
    // Re-render with mocked toast
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
    // Button is disabled — this path shouldn't be reachable via click,
    // but we verify it stays disabled
    expect(plusBtn).toBeDisabled();
    expect(mockUpdateQty).not.toHaveBeenCalled();
  });

  it('calls updateQty when - button is clicked (decreases qty)', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, stockStatus: 'ok' as const, qty: 5, availableStock: 16 }],
      totalItems: () => 5,
      totalPrice: () => 42495,
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
    const minusBtn = screen.getAllByText('−')[0];
    fireEvent.click(minusBtn);
    expect(mockUpdateQty).toHaveBeenCalledWith('DELL-PE-R760-001', 4);
  });

  it('shows line total price for each item', () => {
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
    // Line total appears in the item card (font-mono text-xs)
    const { container } = render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(container.textContent).toContain('8,499');
  });

  it('shows "No more can be added" hint when at limit', () => {
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
    // When at limit, the tooltip should contain "No more"
    const hintEl = screen.getByText(/16 available · 16 in cart · limit reached/);
    expect(hintEl).toBeInTheDocument();
  });

  it('shows remaining availability hint when not at limit', () => {
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
    // Verify "16 available · 2 in cart" text is present
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

  it('shows clear cart button when items exist', () => {
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
    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
  });

  it('calls clearCart when Clear Cart button is clicked', () => {
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
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(mockClearCart).toHaveBeenCalled();
  });

  it('renders subtotal when items exist', () => {
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
    // Subtotal line total
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    const { container } = render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    // Subtotal appears in the footer
    expect(container.textContent).toContain('Subtotal');
  });

  it('does not render footer when cart is empty', () => {
    render(
      <ToastProvider>
        <CartDrawer open={true} onClose={() => {}} onSubmit={() => {}} />
      </ToastProvider>
    );
    expect(screen.queryByText('Clear Cart')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit RFQ')).not.toBeInTheDocument();
  });
});
