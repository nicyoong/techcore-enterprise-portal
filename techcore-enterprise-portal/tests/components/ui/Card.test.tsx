import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders with default className', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border-border');
    expect(card).toHaveClass('bg-bg-surface');
    expect(card).toHaveClass('p-5');
  });

  it('passes through className prop', () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('custom-card');
  });

  it('passes through HTML div attributes', () => {
    render(<Card data-testid="card" aria-label="Test card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('aria-label', 'Test card');
  });

  it('renders with no children (empty card)', () => {
    const { container } = render(<Card />);
    const card = container.querySelector('div');
    expect(card).toBeInTheDocument();
    expect(card).toBeEmptyDOMElement();
  });
});
