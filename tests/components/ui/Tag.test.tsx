import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tag } from '@/components/ui/Tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { container } = render(<Tag>Default</Tag>);
    expect(container.firstChild).toHaveClass('bg-gray-100', 'text-gray-700');
  });

  it('applies vendor variant', () => {
    const { container } = render(<Tag variant="vendor">Vendor</Tag>);
    expect(container.firstChild).toHaveClass('bg-indigo-100', 'text-indigo-700');
  });

  it('passes through className', () => {
    const { container } = render(<Tag className="custom-class">Custom</Tag>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies stock-ok variant with success colors', () => {
    const { container } = render(<Tag variant="stock-ok">In Stock</Tag>);
    expect(container.firstChild).toHaveClass('bg-green-100', 'text-green-700');
  });

  it('applies stock-low variant with warning colors', () => {
    const { container } = render(<Tag variant="stock-low">Low Stock</Tag>);
    expect(container.firstChild).toHaveClass('bg-yellow-100', 'text-yellow-700');
  });

  it('applies stock-out variant with danger colors', () => {
    const { container } = render(<Tag variant="stock-out">Out of Stock</Tag>);
    expect(container.firstChild).toHaveClass('bg-red-100', 'text-red-700');
  });
});
