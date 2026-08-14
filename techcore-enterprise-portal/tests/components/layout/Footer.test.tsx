import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders Products section header', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
  });

  it('renders Solutions section header', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /solutions/i })).toBeInTheDocument();
  });

  it('renders Support section header', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /support/i })).toBeInTheDocument();
  });

  it('renders Company section header', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /company/i })).toBeInTheDocument();
  });

  it('renders all product category links', () => {
    render(<Footer />);
    expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Storage Arrays')).toBeInTheDocument();
    expect(screen.getByText('Endpoints')).toBeInTheDocument();
    expect(screen.getByText('Security Appliances')).toBeInTheDocument();
  });

  it('renders all solution links', () => {
    render(<Footer />);
    expect(screen.getByText('Hyperconverged Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('SD-WAN & Edge')).toBeInTheDocument();
  });

  it('renders all support links', () => {
    render(<Footer />);
    expect(screen.getByText('Technical Documentation')).toBeInTheDocument();
    expect(screen.getByText('RMA & Returns')).toBeInTheDocument();
    expect(screen.getByText('Warranty Lookup')).toBeInTheDocument();
  });

  it('renders company links', () => {
    render(<Footer />);
    expect(screen.getByText('About TechCore')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders compliance badges', () => {
    render(<Footer />);
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
    expect(screen.getByText('SOC 2 Type II')).toBeInTheDocument();
    expect(screen.getByText('C-TPAT')).toBeInTheDocument();
    expect(screen.getByText('ITAR Registered')).toBeInTheDocument();
  });

  it('renders vendor partners', () => {
    render(<Footer />);
    expect(screen.getByText('Dell Technologies')).toBeInTheDocument();
    expect(screen.getByText('HPE')).toBeInTheDocument();
    expect(screen.getByText('Cisco')).toBeInTheDocument();
    expect(screen.getByText('Pure Storage')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 TechCore Enterprise, Inc/)).toBeInTheDocument();
  });

  it('renders "Authorized Reseller & Partner" label', () => {
    render(<Footer />);
    expect(screen.getByText(/Authorized Reseller & Partner/i)).toBeInTheDocument();
  });
});
