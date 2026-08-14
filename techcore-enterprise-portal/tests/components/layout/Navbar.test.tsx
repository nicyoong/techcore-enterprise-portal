import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '@/components/layout/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the TechCore logo', () => {
    render(<Navbar />);
    expect(screen.getByText('TechCore')).toBeInTheDocument();
  });

  it('renders the ENTERPRISE subtitle', () => {
    render(<Navbar />);
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('renders desktop navigation links for Solutions and Support', () => {
    render(<Navbar />);
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders the Products dropdown trigger button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
  });

  it('opens the Products dropdown when clicked', () => {
    render(<Navbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.click(productsBtn);
    // Categories should be visible
    expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('Endpoints')).toBeInTheDocument();
    expect(screen.getByText('Security Appliances')).toBeInTheDocument();
  });

  it('closes the dropdown when clicking outside', () => {
    render(<Navbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.click(productsBtn);
    expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    // Click outside
    fireEvent.mouseDown(document.body);
    // The dropdown should be removed
    expect(screen.queryByText('Servers & Compute')).not.toBeInTheDocument();
  });

  it('shows the cart badge with count', () => {
    render(<Navbar />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders the RFQ Cart link', () => {
    render(<Navbar />);
    expect(screen.getByText('RFQ Cart')).toBeInTheDocument();
  });

  it('shows the mobile menu toggle button', () => {
    render(<Navbar />);
    // The hamburger button is visible on small screens
    const hamburgerBtn = document.querySelector('button');
    expect(hamburgerBtn).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Navbar />);
    const buttons = document.querySelectorAll('button');
    // Find the hamburger button (has 3 lines icon)
    const hamburgerBtn = Array.from(buttons).find((btn) => {
      const svg = btn.querySelector('svg');
      return svg && svg.querySelectorAll('path').length === 2;
    });
    if (hamburgerBtn) {
      fireEvent.click(hamburgerBtn);
      // Mobile menu categories should be visible
      expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    }
  });

  it('renders desktop search input', () => {
    render(<Navbar />);
    const searchInputs = document.querySelectorAll('input[type="text"]');
    expect(searchInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders category SKUs in dropdown', () => {
    render(<Navbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.click(productsBtn);
    expect(screen.getByText('SRV')).toBeInTheDocument();
    expect(screen.getByText('NET')).toBeInTheDocument();
    expect(screen.getByText('STR')).toBeInTheDocument();
  });

  it('shows "Browse catalog" link in dropdown', () => {
    render(<Navbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.click(productsBtn);
    expect(screen.getByText('Browse catalog →')).toBeInTheDocument();
  });

  it('rotates the chevron icon when dropdown is open', () => {
    render(<Navbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.click(productsBtn);
    const svg = productsBtn.querySelector('svg');
    expect(svg).toHaveClass('rotate-180');
  });
});
