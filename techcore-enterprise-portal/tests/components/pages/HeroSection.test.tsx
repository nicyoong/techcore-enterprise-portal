import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/pages/HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock canvas context
    const mockCtx = {
      scale: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillRect: vi.fn(),
    };
    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx);
  });

  it('renders hero heading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Enterprise hardware/i)).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Authorized distributor/i)).toBeInTheDocument();
  });

  it('renders Browse Catalog button', () => {
    render(<HeroSection />);
    expect(screen.getByText('Browse Catalog')).toBeInTheDocument();
  });

  it('renders Talk to Sales button', () => {
    render(<HeroSection />);
    expect(screen.getByText('Talk to Sales')).toBeInTheDocument();
  });

  it('shows live stock feed', () => {
    render(<HeroSection />);
    expect(screen.getByText('Live Stock Feed')).toBeInTheDocument();
  });

  it('shows stock items', () => {
    render(<HeroSection />);
    expect(screen.getByText('DELL-PE-R760-001')).toBeInTheDocument();
    expect(screen.getByText('CISCO-C9300-004')).toBeInTheDocument();
    expect(screen.getByText('PURE-FA-X90-006')).toBeInTheDocument();
  });

  it('shows stock quantities', () => {
    render(<HeroSection />);
    expect(screen.getByText('47 units')).toBeInTheDocument();
    expect(screen.getByText('8 units')).toBeInTheDocument();
    expect(screen.getByText('3 units')).toBeInTheDocument();
  });

  it('shows stock prices', () => {
    render(<HeroSection />);
    expect(screen.getByText('$8,499')).toBeInTheDocument();
    expect(screen.getByText('$4,250')).toBeInTheDocument();
    expect(screen.getByText('$89,500')).toBeInTheDocument();
  });

  it('shows volume pricing announcement', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Q3 Volume Pricing/i)).toBeInTheDocument();
  });

  it('shows compliance badges', () => {
    render(<HeroSection />);
    expect(screen.getByText('ISO 27001 Certified')).toBeInTheDocument();
    expect(screen.getByText('SOC 2 Type II Audited')).toBeInTheDocument();
    expect(screen.getByText('ITAR Compliant')).toBeInTheDocument();
  });

  it('shows View Full Inventory link', () => {
    render(<HeroSection />);
    expect(screen.getByText(/View Full Inventory/i)).toBeInTheDocument();
  });

  it('renders canvas element', () => {
    const { container } = render(<HeroSection />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
