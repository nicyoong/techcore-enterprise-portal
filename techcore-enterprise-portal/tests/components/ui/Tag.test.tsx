import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tag } from '@/components/ui/Tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>Label</Tag>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { container } = render(<Tag>Default</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('bg-bg-elevated');
    expect(tag).toHaveClass('text-text-secondary');
  });

  it('applies vendor variant', () => {
    const { container } = render(<Tag variant="vendor">Vendor</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('bg-accent/10');
    expect(tag).toHaveClass('text-accent');
  });

  it('passes through className', () => {
    const { container } = render(<Tag className="extra-class">Tag</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('extra-class');
  });

  // BUG: variant="stock-ok" does not render success colors because
  // variant.replace(/-/g, '') produces "stockok" instead of "stockOk"
  it('applies stock-ok variant with success colors', () => {
    const { container } = render(<Tag variant="stock-ok">In Stock</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('bg-success/10');
    expect(tag).toHaveClass('text-success');
  });

  // BUG: same camelCase conversion issue
  it('applies stock-low variant with warning colors', () => {
    const { container } = render(<Tag variant="stock-low">Low</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('bg-warning/10');
    expect(tag).toHaveClass('text-warning');
  });

  // BUG: same camelCase conversion issue
  it('applies stock-out variant with danger colors', () => {
    const { container } = render(<Tag variant="stock-out">Out</Tag>);
    const tag = container.querySelector('span');
    expect(tag).toHaveClass('bg-danger/10');
    expect(tag).toHaveClass('text-danger');
  });
});
