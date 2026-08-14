import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { useCartStore } from '@/store/cart';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastProvider';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    __esModule: true,
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      totalItems: vi.fn(() => 0),
    });
  });

  it('renders TechCore logo', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Tech/i)).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders Products dropdown trigger', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('shows RFQ cart button', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    const cartButton = screen.getByLabelText(/RFQ Cart/i);
    expect(cartButton).toBeInTheDocument();
  });

  it('shows mobile menu toggle button', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query.includes('max-width: 768px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  it('renders search input button', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('opens mobile menu when toggle is clicked', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query.includes('max-width: 768px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(toggleButton);
    
    // Mobile menu should be open - check for mobile-specific links
    const mobileLinks = screen.getAllByText('Products');
    expect(mobileLinks.length).toBeGreaterThan(1); // One from desktop, one from mobile
  });

  it('shows cart badge when items exist', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      totalItems: vi.fn(() => 5),
    });

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const cartButton = screen.getByLabelText(/RFQ Cart/i);
    expect(cartButton).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show cart badge when cart is empty', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      totalItems: vi.fn(() => 0),
    });

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('opens search when search button is clicked', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    
    expect(screen.getByPlaceholderText(/Search SKUs/i)).toBeInTheDocument();
  });

  it('closes search when input loses focus', async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    
    expect(screen.getByPlaceholderText(/Search SKUs/i)).toBeInTheDocument();
    
    // Blur the input
    const input = screen.getByPlaceholderText(/Search SKUs/i);
    fireEvent.blur(input);
    
    // Should close after timeout
    await new Promise(resolve => setTimeout(resolve, 250));
    expect(screen.queryByPlaceholderText(/Search SKUs/i)).not.toBeInTheDocument();
  });

  it('renders Sign In link', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('navigates to catalog on Solutions link click', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const solutionsLink = screen.getByText('Solutions');
    expect(solutionsLink.closest('a')).toHaveAttribute('href', '/catalog');
  });

  it('navigates to support on Support link click', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const supportLink = screen.getByText('Support');
    expect(supportLink.closest('a')).toHaveAttribute('href', '/support');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const hamburger = screen.getByLabelText('Toggle menu');
    expect(hamburger).toBeInTheDocument();
    
    // Mobile menu should be closed initially
    const mobileNav = document.querySelector('[class*="py-4 border-t"]');
    expect(mobileNav).toBeNull();
    
    // Click hamburger to open
    fireEvent.click(hamburger);
    
    // Mobile menu should now be open
    expect(document.querySelector('[class*="py-4 border-t"]')).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(hamburger);
    expect(document.querySelector('[class*="py-4 border-t"]')).toBeNull();
  });

  it('shows cart badge when items are in cart', () => {
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: [{ sku: 'DELL-PE-R760-001', name: 'Test', vendor: 'Dell', price: 100, stockStatus: 'ok', qty: 1 }],
      totalItems: () => 1,
      totalPrice: () => 100,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQty: vi.fn(),
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    // Cart badge should show item count
    expect(screen.getByLabelText(/RFQ Cart \(1 items\)/i)).toBeInTheDocument();
  });

  it('opens cart drawer when cart button is clicked', () => {
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
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const cartButton = screen.getByLabelText('RFQ Cart (0 items)');
    fireEvent.click(cartButton);
    
    // CartDrawer should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens Products dropdown on mouse enter', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const productsButton = screen.getByText('Products').closest('button');
    expect(productsButton).toBeInTheDocument();
    
    // Hover to open dropdown
    fireEvent.mouseEnter(productsButton!);
    
    // Dropdown should be visible
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes Products dropdown on mouse leave', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const productsButton = screen.getByText('Products').closest('button');
    
    // Hover to open dropdown
    fireEvent.mouseEnter(productsButton!);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Leave to close dropdown
    fireEvent.mouseLeave(productsButton!);
    
    // Dropdown should be closed (menu role should not exist anymore)
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('shows search input when search button is clicked', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    // Search should be closed initially
    expect(screen.queryByPlaceholderText(/Search SKUs/i)).toBeNull();
    
    // Click search button
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    
    // Search input should appear
    expect(screen.getByPlaceholderText(/Search SKUs/i)).toBeInTheDocument();
  });

  it('submits search and navigates to catalog', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate as unknown as ReturnType<typeof useNavigate>);

    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    // Open search
    const searchButton = screen.getByLabelText('Search');
    fireEvent.click(searchButton);
    
    // Type and submit
    const input = screen.getByPlaceholderText(/Search SKUs/i);
    fireEvent.change(input, { target: { value: 'Dell' } });
    const form = input.closest('form');
    expect(form).toBeInTheDocument();
    if (form) {
      fireEvent.submit(form);
    }
    
    // Should navigate to catalog with search param
    expect(mockNavigate).toHaveBeenCalledWith('/catalog?search=Dell');
  });

  it('renders search button when search is closed', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    // Search button should be visible when search is closed
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('closes Products dropdown when clicking outside', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Navbar />
        </ToastProvider>
      </MemoryRouter>
    );
    
    const productsButton = screen.getByText('Products').closest('button');
    
    // Hover to open dropdown
    fireEvent.mouseEnter(productsButton!);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click outside to close
    fireEvent.mouseDown(document.body);
    
    // Dropdown should close
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
