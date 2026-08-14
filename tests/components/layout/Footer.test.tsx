import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders TechCore logo link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /techcore/i })).toBeInTheDocument();
  });

  it('renders Catalog section', () => {
    render(<Footer />);
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('renders Company section', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders Legal section', () => {
    render(<Footer />);
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} TechCore. All rights reserved.`)).toBeInTheDocument();
  });
});
