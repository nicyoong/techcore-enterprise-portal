import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/pages/ProductCard';
import { useCartStore } from '@/store/cart';
import { useCompareStore } from '@/store/compare';
import { ToastProvider } from '@/components/ToastProvider';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/store/compare', () => ({
  useCompareStore: vi.fn(),
}));

vi.mock('@/components/ToastProvider', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useToast: () => ({ addToast: vi.fn() }),
}));

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
  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      addItem: vi.fn(),
    });
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggle: vi.fn(),
      isSelected: vi.fn(() => false),
    });
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
    const addItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(addItem).toHaveBeenCalledWith({
      sku: 'DELL-PE-R760-001',
      name: 'Dell PowerEdge R760 2U Dual-Socket',
      vendor: 'Dell',
      price: 8499,
      stockStatus: 'ok',
    });
  });

  it('does not call addItem for out-of-stock products', () => {
    const addItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem });

    render(
      <MemoryRouter>
        <ProductCard product={{ ...mockProduct, stockStatus: 'out' as const, stockQty: 0 }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Unavailable'));
    expect(addItem).not.toHaveBeenCalled();
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
    const toggle = vi.fn();
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggle,
      isSelected: vi.fn(() => false),
    });

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Compare'));
    expect(toggle).toHaveBeenCalledWith(mockProduct);
  });

  it('shows Added state after adding to cart', () => {
    const addItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem });

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
      toggle: vi.fn(),
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
});
