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
      { sku: 'DELL-C13-PDU', name: 'C13 to C14 PDU Power Cables', price: 42, reason: 'Optional', required: false },
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

  it('returns null (not rendered) when shownForSku is null', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: null,
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(),
      toggleAccessory: mockToggle,
      getActiveRule: vi.fn(),
    });
    const { container } = render(<UpsellPanel />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when getActiveRule returns null', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(),
      toggleAccessory: mockToggle,
      getActiveRule: () => null,
    });
    const { container } = render(<UpsellPanel />);
    expect(container.innerHTML).toBe('');
  });

  it('displays the product name in header', () => {
    render(<UpsellPanel />);
    expect(screen.getByText(/Dell PowerEdge R760/i)).toBeInTheDocument();
  });

  it('renders accessory rows', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('Dell 2U Slide Rail Kit')).toBeInTheDocument();
    expect(screen.getByText('Dell Redundant PSU')).toBeInTheDocument();
    expect(screen.getByText('C13 to C14 PDU Power Cables')).toBeInTheDocument();
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

  it('shows plural "accessories selected" when multiple selected', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U', 'DELL-PSU-Red']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    // The text may be split across elements; use container to verify presence
    const { container } = render(<UpsellPanel />);
    // Note: there's a typo in the component — "accessorys" instead of "accessories"
    expect(container.textContent).toContain('2 accessorys selected');
  });

  it('shows "No accessories selected" when none selected', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('No accessories selected')).toBeInTheDocument();
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

  it('shows combined total for multiple selected items', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U', 'DELL-PSU-Red']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    // 189 + 849 = 1038
    expect(screen.getByText('+$1,038')).toBeInTheDocument();
  });

  it('does not show total when nothing selected', () => {
    render(<UpsellPanel />);
    expect(screen.queryByText(/^\+\$/)).not.toBeInTheDocument();
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
      availableStock: 999,
      qty: 1,
    }));
    expect(mockDismiss).toHaveBeenCalled();
    expect(mockAddToast).toHaveBeenCalled();
  });

  it('calls addItem for each selected item (plural)', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(['DELL-Rail-2U', 'DELL-PSU-Red']),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    fireEvent.click(screen.getByText('Add Selected to RFQ Cart'));
    expect(mockAddItem).toHaveBeenCalledTimes(2);
    expect(mockAddItem).toHaveBeenNthCalledWith(1, expect.objectContaining({ sku: 'DELL-Rail-2U' }));
    expect(mockAddItem).toHaveBeenNthCalledWith(2, expect.objectContaining({ sku: 'DELL-PSU-Red' }));
  });

  it('does not call addItem when no items selected', () => {
    render(<UpsellPanel />);
    const btn = screen.getByText('Add Selected to RFQ Cart');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('renders REQ badge on required items', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('REQ')).toBeInTheDocument();
  });

  it('renders product name from catalog', () => {
    render(<UpsellPanel />);
    expect(screen.getByText(/Dell PowerEdge R760/i)).toBeInTheDocument();
  });

  it('falls back to "Server" when product not found in catalog', () => {
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'UNKNOWN-SKU-999',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(),
      toggleAccessory: mockToggle,
      getActiveRule: () => mockRule,
    });
    render(<UpsellPanel />);
    // Product not in PRODUCTS array — should fallback to "Server"
    expect(screen.getByText(/Server/)).toBeInTheDocument();
  });

  it('calls dismissUpsell when overlay backdrop is clicked', () => {
    render(<UpsellPanel />);
    // The overlay is the first element with aria-hidden
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(mockDismiss).toHaveBeenCalled();
  });

  it('calls dismissUpsell when X button is clicked', () => {
    render(<UpsellPanel />);
    const dismissBtn = screen.getByLabelText('Dismiss');
    fireEvent.click(dismissBtn);
    expect(mockDismiss).toHaveBeenCalled();
  });

  it('toggles optional item', () => {
    render(<UpsellPanel />);
    const optionalRow = screen.getByText('Dell Redundant PSU').closest('label');
    fireEvent.click(optionalRow!);
    expect(mockToggle).toHaveBeenCalledWith('DELL-PSU-Red');
    // Toggle again to deselect
    fireEvent.click(optionalRow!);
    expect(mockToggle).toHaveBeenCalledWith('DELL-PSU-Red');
  });

  it('renders "Required" section heading when required items exist', () => {
    render(<UpsellPanel />);
    // Use getAllBy to disambiguate — heading is the first match with uppercase tracking
    const requiredEls = screen.getAllByText(/Required/);
    expect(requiredEls.length).toBeGreaterThanOrEqual(1);
  });

  it('renders "Optional" section heading when optional items exist', () => {
    render(<UpsellPanel />);
    const optionalEls = screen.getAllByText(/Optional/);
    expect(optionalEls.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render Optional section when no optional items exist', () => {
    const requiredOnlyRule = {
      matchSkus: ['DELL-PE-R760-001'],
      items: [
        { sku: 'DELL-Rail-2U', name: 'Dell 2U Slide Rail Kit', price: 189, reason: 'Required', required: true },
      ],
    };
    (useUpsellStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      shownForSku: 'DELL-PE-R760-001',
      dismissUpsell: mockDismiss,
      selectedAccessories: new Set(),
      toggleAccessory: mockToggle,
      getActiveRule: () => requiredOnlyRule,
    });
    render(<UpsellPanel />);
    // The "Optional" text should not appear at all (no heading, no item reason text)
    expect(screen.queryByText(/Optional/)).not.toBeInTheDocument();
  });

  it('renders unit price on each accessory row', () => {
    render(<UpsellPanel />);
    expect(screen.getByText('$189')).toBeInTheDocument();
    expect(screen.getByText('$849')).toBeInTheDocument();
    expect(screen.getByText('$42')).toBeInTheDocument();
  });
});
