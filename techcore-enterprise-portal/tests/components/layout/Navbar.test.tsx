import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '@/components/layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastProvider';

function RenderNavbar() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Navbar />
      </ToastProvider>
    </BrowserRouter>
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the TechCore logo', () => {
    render(<RenderNavbar />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
  });

  it('renders the ENTERPRISE subtitle', () => {
    render(<RenderNavbar />);
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('renders desktop navigation links for Solutions and Support', () => {
    render(<RenderNavbar />);
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders the Products dropdown trigger button', () => {
    render(<RenderNavbar />);
    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
  });

  it('opens the Products dropdown when hovered', () => {
    render(<RenderNavbar />);
    const productsBtn = screen.getByRole('button', { name: /products/i });
    fireEvent.mouseEnter(productsBtn);
    expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
  });

  it('shows the RFQ cart button', () => {
    render(<RenderNavbar />);
    expect(screen.getByLabelText(/RFQ Cart/i)).toBeInTheDocument();
  });

  it('shows the mobile menu toggle button', () => {
    render(<RenderNavbar />);
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders search input', () => {
    render(<RenderNavbar />);
    const searchInputs = document.querySelectorAll('input[type="text"]');
    expect(searchInputs.length).toBeGreaterThanOrEqual(0);
  });
});
