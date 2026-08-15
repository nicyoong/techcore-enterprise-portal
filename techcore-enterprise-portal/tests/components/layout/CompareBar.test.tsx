import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CompareBar from '@/components/layout/CompareBar';
import { useCompareStore } from '@/store/compare';

vi.mock('@/store/compare', () => ({
  useCompareStore: vi.fn(),
}));

describe('CompareBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no items selected', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    const { container } = render(<CompareBar />);
    expect(container.innerHTML).toBe('');
  });

  it('renders when items are selected', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} },
      ],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    render(<CompareBar />);
    expect(screen.getByText('Comparing 1 products')).toBeInTheDocument();
  });

  it('shows product details', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} },
      ],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    render(<CompareBar />);
    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
    expect(screen.getByText('Dell PowerEdge R760')).toBeInTheDocument();
    expect(screen.getByText('$8,499')).toBeInTheDocument();
  });

  it('shows View Comparison Table button', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} }],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    render(<CompareBar />);
    expect(screen.getByText('View Comparison Table')).toBeInTheDocument();
  });

  it('shows Clear all button', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} }],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    render(<CompareBar />);
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls clear when Clear all is clicked', () => {
    const clear = vi.fn();
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} }],
      remove: vi.fn(),
      clear,
    });

    render(<CompareBar />);
    fireEvent.click(screen.getByText('Clear all'));
    expect(clear).toHaveBeenCalled();
  });

  it('calls remove when remove button is clicked', () => {
    const remove = vi.fn();
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [{ sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} }],
      remove,
      clear: vi.fn(),
    });

    render(<CompareBar />);
    const removeButtons = screen.getAllByLabelText(/Remove Dell PowerEdge R760/i);
    fireEvent.click(removeButtons[0]);
    expect(remove).toHaveBeenCalledWith('DELL-PE-R760-001');
  });

  it('shows multiple products', () => {
    (useCompareStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selected: [
        { sku: 'DELL-PE-R760-001', name: 'Dell PowerEdge R760', vendor: 'Dell', price: 8499, specs: {} },
        { sku: 'HPE-PL-DL380-002', name: 'HPE ProLiant DL380', vendor: 'HPE', price: 7899, specs: {} },
      ],
      remove: vi.fn(),
      clear: vi.fn(),
    });

    render(<CompareBar />);
    expect(screen.getByText('Comparing 2 products')).toBeInTheDocument();
    expect(screen.getByText('HPE ProLiant DL380')).toBeInTheDocument();
    expect(screen.getByText('$7,899')).toBeInTheDocument();
  });
});
