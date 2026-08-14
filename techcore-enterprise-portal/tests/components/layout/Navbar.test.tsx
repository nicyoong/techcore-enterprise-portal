import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { useCartStore } from '@/store/cart';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastProvider';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

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
});
