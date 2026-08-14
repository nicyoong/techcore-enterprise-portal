import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from '@/components/layout/Navbar';
import { useCartStore } from '@/store/cart';
import { useCompareStore } from '@/store/compare';

vi.mock('@/store/cart', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/store/compare', () => ({
  useCompareStore: vi.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(useCartStore).mockReturnValue({ items: [], addToCart: vi.fn(), removeFromCart: vi.fn(), clearCart: vi.fn() } as any);
    vi.mocked(useCompareStore).mockReturnValue({ items: [], addToCompare: vi.fn(), removeFromCompare: vi.fn(), clearCompare: vi.fn(), isInCompare: vi.fn() } as any);
  });

  it('renders navigation links', () => {
    render(
      <Layout>
        <main>Content</main>
      </Layout>
    );
    expect(screen.getByRole('link', { name: /catalog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /compare/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /support/i })).toBeInTheDocument();
  });

  it('renders logo link', () => {
    render(
      <Layout>
        <main>Content</main>
      </Layout>
    );
    expect(screen.getByRole('link', { name: /techcore/i })).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(
      <Layout>
        <main>Content</main>
      </Layout>
    );
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    expect(screen.getByRole('link', { name: /catalog/i })).toBeVisible();
  });
});
