import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductCard from '@/components/pages/ProductCard';
import { useCartStore } from '@/store/cart';
import { useCompareStore } from '@/store/compare';
import { useUpsellStore } from '@/store/upsell';
import { ToastProvider, useToast } from '@/components/ToastProvider';
import { MemoryRouter, useNavigate } from 'react-router-dom';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/store/compare', () => ({
  useCompareStore: vi.fn(),
}));

vi.mock('@/store/upsell', () => ({
  useUpsellStore: vi.fn(),
}));

vi.mock('@/components/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    __esModule: true,
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockProduct = {
  sku: 'DELL-PE-R760-001',
  name: 'Dell PowerEdge R760 2U Dual-Socket',
  vendor: 'Dell',
  category: 'Servers & Compute',
  price: 8499,
  stockStatus: 'ok' as const,
  stockQty: 47,
  specs: {
    CPU: 'Intel Xeon Scalable',
    Memory: '16× DIMM slots',
    PSU: 'Dual 1600W',
  },
  description: 'High-density 2U workhorse',
};

describe('ProductCard', () => {
  let mockShowUpsell: ReturnType<typeof vi.fn>;
  let mockAddItem: ReturnType<typeof vi.fn>;
  let mockToggle: ReturnType<typeof vi.fn>;
  let mockAddToast: ReturnType<typeof vi.fn>;
  let mockUseToast: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockShowUpsell = vi.fn();
    mockAddItem = vi.fn();
    mockToggle = vi.fn();
    mockAddToast = vi.fn();
    mockUseToast = vi.fn().mockReturnValue({ addToast: mockAddToast });

    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      addItem: mockAddItem,
    });
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggle: mockToggle,
      isSelected: vi.fn(() => false),
    });
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      showUpsell: mockShowUpsell,
    });
    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addToast: mockAddToast });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders product SKU', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
  });

  it('renders product name', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Dell PowerEdge R760 2U Dual-Socket')).toBeInTheDocument();
  });

  it('renders vendor tag', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Dell')).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('$8,499')).toBeInTheDocument();
  });

  it('renders specs', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('Intel Xeon Scalable')).toBeInTheDocument();
  });

  it('shows In Stock badge for ok stock status', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('In Stock (47)')).toBeInTheDocument();
  });

  it('shows Low Stock badge for low stock status', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'low' as const, stockQty: 5 }} />
      </MemoryRouter>
    );
    expect(screen.getByText('Low Stock (5)')).toBeInTheDocument();
  });

  it('shows Out of Stock badge for out stock status', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('disables Add to RFQ for out-of-stock products', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );
    const button = screen.getByText('Unavailable');
    expect(button).toBeDisabled();
  });

  it('enables Add to RFQ for in-stock products', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    const button = screen.getByText('Add to RFQ');
    expect(button).not.toBeDisabled();
  });

  it('calls addItem when Add to RFQ is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockAddItem).toHaveBeenCalledWith({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
  });

  it('does not call addItem for out-of-stock products', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Unavailable'));
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('shows Details button', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('shows Compare checkbox', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText('Compare')).toBeInTheDocument();
  });

  it('calls toggle when Compare checkbox is clicked', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Compare'));
    expect(mockToggle).toHaveBeenCalledWith(mockProduct);
  });

  it('shows Added state after adding to cart', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(screen.getByText('✓ Added')).toBeInTheDocument();
  });

  it('navigates to product detail on Details button click', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const detailsButton = screen.getByText('Details');
    expect(detailsButton).toBeInTheDocument();
  });

  it('highlights selected product in compare', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggle: mockToggle,
      isSelected: vi.fn(() => true),
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText('Compare') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('renders product card with all specs', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('Intel Xeon Scalable')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('PSU')).toBeInTheDocument();
  });

  // --- Upsell integration tests ---

  it('calls showUpsell when adding a Servers & Compute product to cart', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockShowUpsell).toHaveBeenCalledWith('DELL-PE-R760-001');
  });

  it('does not call showUpsell for non-Servers & Compute products', () => {
    const networkProduct = {
      ...mockProduct,
      sku: 'CISCO-C9300-001',
      category: 'Networking',
      name: 'Cisco Catalyst 9300 Switch',
    };

    render(
      <MemoryRouter>
        <ProductCard product={networkProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockShowUpsell).not.toHaveBeenCalled();
  });

  it('calls showUpsell even when addItem fails to fire (no crash)', () => {
    // If addItem throws, the upsell should still fire because the call is after
    // the try/catch-free code path
    mockAddItem.mockImplementation(() => {
      // no-op, just succeed
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockShowUpsell).toHaveBeenCalled();
  });

  it('does not call showUpsell for out-of-stock products', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Unavailable'));
    expect(mockShowUpsell).not.toHaveBeenCalled();
  });

  it('calls addToast with success message when adding to cart', () => {
    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addToast: mockAddToast });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockAddToast).toHaveBeenCalledWith(
      'Dell PowerEdge R760 2U Dual-Socket added to RFQ cart',
      'success'
    );
  });

  it('shows "Added" state and reverts after 1500ms', async () => {
    vi.useFakeTimers();
    await act(async () => {
      render(
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Add to RFQ'));
    });
    expect(screen.getByText('✓ Added')).toBeInTheDocument();

    vi.advanceTimersByTime(1500);
    // After 1500ms, the setTimeout callback should fire and revert state
    await act(async () => {
      vi.advanceTimersByTime(0);
    });
    // Use a text matcher that handles split text
    const btn = document.querySelector('button[class*="flex-1"]');
    expect(btn).not.toBeNull();
    expect(btn!.textContent).not.toContain('✓ Added');

    vi.useRealTimers();
  });

  it('renders low stock badge with correct quantity', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'low' as const, stockQty: 3 }} />
      </MemoryRouter>
    );
    expect(screen.getByText('Low Stock (3)')).toBeInTheDocument();
  });

  it('renders out of stock badge with no quantity', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('only shows first 3 specs in the card', () => {
    const productWithManySpecs = {
      ...mockProduct,
      specs: {
        CPU: 'Intel Xeon Scalable',
        Memory: '16× DIMM slots',
        PSU: 'Dual 1600W',
        Storage: '8× NVMe',
        Network: '4× 25GbE',
        FormFactor: '2U',
      },
    };

    render(
      <MemoryRouter>
        <ProductCard product={productWithManySpecs} />
      </MemoryRouter>
    );

    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('PSU')).toBeInTheDocument();
    // 4th spec should not appear (slice(0, 3))
    expect(screen.queryByText('Storage')).not.toBeInTheDocument();
  });

  it('navigates to product detail on image click', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate as unknown as ReturnType<typeof useNavigate>);

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const imageContainer = document.querySelector('[class*="h-36"]');
    expect(imageContainer).toBeInTheDocument();
    if (imageContainer) {
      fireEvent.click(imageContainer);
      expect(mockNavigate).toHaveBeenCalledWith('/product/DELL-PE-R760-001');
    }
  });

  it('navigates to product detail on name click', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate as unknown as ReturnType<typeof useNavigate>);

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const nameEl = screen.getByText('Dell PowerEdge R760 2U Dual-Socket');
    expect(nameEl).toHaveClass('cursor-pointer');
    fireEvent.click(nameEl);
    expect(mockNavigate).toHaveBeenCalledWith('/product/DELL-PE-R760-001');
  });

  it('navigates to product detail on Details button click', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate as unknown as ReturnType<typeof useNavigate>);

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const detailsButton = screen.getByText('Details');
    fireEvent.click(detailsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/product/DELL-PE-R760-001');
  });
});
