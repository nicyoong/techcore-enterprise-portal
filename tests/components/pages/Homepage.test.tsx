import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Homepage } from '@/components/pages/Homepage';

describe('Homepage', () => {
  it('renders HeroSection heading', () => {
    render(<Homepage />);
    expect(screen.getByText(/enterprise software made simple/i)).toBeInTheDocument();
  });

  it('renders Browse Catalog button', () => {
    render(<Homepage />);
    expect(screen.getByRole('link', { name: /browse catalog/i })).toBeInTheDocument();
  });

  it('renders Request a Quote button', () => {
    render(<Homepage />);
    expect(screen.getByRole('link', { name: /request a quote/i })).toBeInTheDocument();
  });

  it('renders trust stats', () => {
    render(<Homepage />);
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('24h')).toBeInTheDocument();
  });

  it('renders VendorMarquee', () => {
    render(<Homepage />);
    expect(screen.getByText(/trusted by enterprises/i)).toBeInTheDocument();
  });

  it('renders Featured Products section', () => {
    render(<Homepage />);
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
  });

  it('renders product card with product data', () => {
    render(<Homepage />);
    expect(screen.getByText('Enterprise CRM Pro')).toBeInTheDocument();
    expect(screen.getByText('$12,000')).toBeInTheDocument();
    expect(screen.getByText('CRM')).toBeInTheDocument();
    expect(screen.getByText('SKU001')).toBeInTheDocument();
  });

  it('shows In Stock badge for in-stock product', () => {
    render(<Homepage />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('has enabled Add to Cart button for in-stock product', () => {
    render(<Homepage />);
    const addButton = screen.getByLabelText(/add to cart/i);
    expect(addButton).not.toBeDisabled();
  });
});
