import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UpsellPanel from '../../../src/components/layout/UpsellPanel';
import { useUpsellStore } from '../../../src/store/upsell';
import { useCartStore } from '../../../src/store/cart';
import { useToast } from '../../../src/components/ToastProvider';

vi.mock('../../../src/store/upsell', () => ({
  useUpsellStore: vi.fn(),
}));
vi.mock('../../../src/store/cart', () => ({
  useCartStore: vi.fn(),
}));
vi.mock('../../../src/components/ToastProvider', () => ({
  useToast: vi.fn(),
}));

describe('UpsellPanel', () => {
  const mockDismiss = vi.fn();
  const mockToggle = vi.fn();
  const mockAddItem = vi.fn();
  const mockAddToast = vi.fn();

  const mockRule = {
    matchSkus: ['DELL-PE-R760-001'],
    items: [
      { sku: 'DELL-Rail-2U', name: 'Dell 2U Slide Rail Kit', price: 189, reason: 'Required', required: true },
      { sku: 'DELL-PSU-Red', name: 'Dell Redundant PSU', price: 849, reason: 'Optional', required: false },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addItem: mockAddItem });
    (useToast as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ addToast: mockAddToast });
  });

  it('renders the panel when shownForSku is set', () => {
    render(<UpsellPanel />);
    expect(screen.getByText(/Deployment Accessories/i)).toBeInTheDocument();
  });

  it('displays the product name in header', () => {
    render(<UpsellPanel />);
    expect(screen.getByText(/Dell PowerEdge R760/i)).toBeInTheDocument();
  });

  it('renders accessory rows', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('Dell 2U Slide Rail Kit')).toBeInTheDocument();
    expect(screen.getByText('Dell Redundant PSU')).toBeInTheDocument();
  });

  it('toggles accessory when row is clicked', () => {
    render(<UpsellPanel />);
    const row = screen.getByText('Dell 2U Slide Rail Kit').closest('label');
    fireEvent.click(row!);
    expect(mockToggle).toHaveBeenCalledWith('DELL-Rail-2U');
  });

  it('shows selected count in footer', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    expect(screen.getByText(/1 accessory selected/)).toBeInTheDocument();
  });

  it('shows running total when items selected', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    expect(screen.getByText('+$189')).toBeInTheDocument();
  });

  it('calls addItem and dismiss when Add Selected is clicked', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    fireEvent.click(screen.getByText('Add Selected to RFQ Cart'));
    expect(mockAddItem).toHaveBeenCalledWith(expect.objectContaining({
      sku: 'DELL-Rail-2U',
      vendor: 'TechCore Accessories',
      stockStatus: 'ok',
    }));
    expect(mockDismiss).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalled();
  });

  it('does not call addItem when no items selected', () => {
    render(<UpsellPanel />);
    const btn = screen.getByText('Add Selected to RFQ Cart');
    expect(btn).toBeDisabled();
  });

  it('renders REQ badge on required items', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('REQ')).toBeInTheDocument();
  });

  it('renders product name from catalog', () => {
    render(<UpsellPanel />);
    expect(screen.getByText(/Dell PowerEdge R760/i)).toBeInTheDocument();
  });
});
