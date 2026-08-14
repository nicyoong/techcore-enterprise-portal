import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../../../src/components/pages/ProductCard';
import { useCartStore } from '../../../src/store/cart';
import { useCompareStore } from '../../../src/store/compare';
import { useUpsellStore } from '../../../src/store/upsell';
import { useToast } from '../../../src/components/ToastProvider';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../src/store/cart', () => ({
  useCartStore: vi.fn(),
}));
vi.mock('../../../src/store/compare', () => ({
  useCompareStore: vi.fn(),
}));
vi.mock('../../../src/store/upsell', () => ({
  useUpsellStore: vi.fn(),
}));
vi.mock('../../../src/components/ToastProvider', () => ({
  useToast: vi.fn(),
}));
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockProduct = {
  sku: 'DELL-PE-R760-001',
  name: 'Dell PowerEdge R760 2U Dual-Socket',
  vendor: 'Dell',
  category: 'Servers & Compute',
  price: 8499,
  stockStatus: 'ok' as const,
  totalStock: 47,
  allocatedStock: 31,
  specs: {
    CPU: 'Intel Xeon Scalable',
    Memory: '16× DIMM slots',
    PSU: 'Dual 1600W',
  },
  description: 'High-density 2U workhorse',
};

describe('ProductCard', () => {
  beforeEach(() => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem: vi.fn() });
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ toggle: vi.fn(), isSelected: vi.fn().mockReturnValue(false) });
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ showUpsell: vi.fn() });
    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addToast: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Dell PowerEdge R760 2U Dual-Socket')).toBeInTheDocument();
  });

  it('renders SKU', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$8,499')).toBeInTheDocument();
  });

  it('shows available stock badge for ok stock status', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('16 Available')).toBeInTheDocument();
  });

  it('shows Low Stock badge for low stock status', () => {
    const lowProduct = { ...mockProduct, stockStatus: 'low' as const, totalStock: 8, allocatedStock: 3 };
    render(<ProductCard product={lowProduct} />);
    expect(screen.getByText(/Low — \d+ left/)).toBeInTheDocument();
  });

  it('shows Out of Stock badge', () => {
    const outProduct = { ...mockProduct, stockStatus: 'out' as const, totalStock: 0, allocatedStock: 0 };
    render(<ProductCard product={outProduct} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows total and allocated stock info', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('47 total · 31 allocated')).toBeInTheDocument();
  });

  it('calls addItem when Add to RFQ is clicked', () => {
    const mockAddItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem: mockAddItem });
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockAddItem).toHaveBeenCalledWith(expect.objectContaining({
      sku: 'DELL-PE-R760-001',
      availableStock: 16,
    }));
  });

  it('does not call addItem when product is out of stock', () => {
    const mockAddItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem: mockAddItem });
    const outProduct = { ...mockProduct, stockStatus: 'out' as const };
    render(<ProductCard product={outProduct} />);
    fireEvent.click(screen.getByText('Unavailable'));
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('shows Added state after adding to cart', async () => {
    const mockAddItem = vi.fn();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem: mockAddItem });
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to RFQ'));
    await waitFor(() => {
      expect(screen.getByText('✓ Added')).toBeInTheDocument();
    });
  });

  it('calls showUpsell for Servers & Compute products', () => {
    const mockShowUpsell = vi.fn();
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ showUpsell: mockShowUpsell });
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockShowUpsell).toHaveBeenCalledWith('DELL-PE-R760-001');
  });

  it('does not call showUpsell for non-server products', () => {
    const mockShowUpsell = vi.fn();
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ showUpsell: mockShowUpsell });
    const endpointProduct = { ...mockProduct, category: 'Endpoints' };
    render(<ProductCard product={endpointProduct} />);
    fireEvent.click(screen.getByText('Add to RFQ'));
    expect(mockShowUpsell).not.toHaveBeenCalled();
  });

  it('renders Compare checkbox', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Compare')).toBeInTheDocument();
  });

  it('renders Details button', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('renders spec values', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Intel Xeon Scalable')).toBeInTheDocument();
    expect(screen.getByText('16× DIMM slots')).toBeInTheDocument();
  });
});
