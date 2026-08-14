import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><div>Card Content</div></Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies hover class when hover is true', () => {
    const { container } = render(<Card hover><div>Hover Card</div></Card>);
    expect(container.firstChild).toHaveClass('hover:shadow-md');
  });

  it('does not apply hover class when hover is false', () => {
    const { container } = render(<Card hover={false}><div>No Hover Card</div></Card>);
    expect(container.firstChild).not.toHaveClass('hover:shadow-md');
  });

  it('passes through custom className', () => {
    const { container } = render(<Card className="custom-class"><div>Custom</div></Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
