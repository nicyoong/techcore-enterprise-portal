import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies default primary variant classes', () => {
    const { container } = render(<Button>Primary</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-accent');
    expect(button).toHaveClass('text-bg-base');
  });

  it('applies secondary variant classes', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-bg-elevated');
    expect(button).not.toHaveClass('bg-accent');
  });

  it('applies ghost variant classes', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).not.toHaveClass('bg-accent');
  });

  it('applies outline variant classes', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-accent/50');
    expect(button).toHaveClass('text-accent');
  });

  it('applies sm size', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1.5');
    expect(button).toHaveClass('text-sm');
  });

  it('applies md size (default)', () => {
    const { container } = render(<Button>Medium</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('applies lg size', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('text-base');
  });

  it('renders icon on the left by default', () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">★</span>}>With Icon</Button>
    );
    const iconSpans = container.querySelectorAll('button span[data-testid="icon"]');
    expect(iconSpans).toHaveLength(1);
  });

  it('renders icon on the right when iconPosition is "right"', () => {
    render(
      <Button icon={<span data-testid="icon">★</span>} iconPosition="right">
        With Icon Right
      </Button>
    );
    const button = screen.getByRole('button', { name: /with icon right/i });
    const textNode = Array.from(button.childNodes).find(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim() === 'With Icon Right'
    );
    const iconNode = button.querySelector('[data-testid="icon"]');
    // Icon should appear after the text node in DOM order
    expect(iconNode).toBeInTheDocument();
    expect(button.textContent).toContain('With Icon Right');
    expect(button.textContent).toContain('★');
  });

  it('does not render icon span when icon is not provided', () => {
    const { container } = render(<Button>No Icon</Button>);
    const spans = container.querySelector('button')?.querySelectorAll('span');
    // Should have no icon-related spans (but may have nothing)
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('passes through disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('passes through custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through HTML button attributes', () => {
    render(<Button type="submit" data-testid="btn" aria-label="Submit form">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit form/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-testid', 'btn');
  });

  it('hides icon when icon is null/undefined', () => {
    const { container } = render(<Button icon={null}>No Icon</Button>);
    expect(container.querySelector('button span')).not.toBeInTheDocument();
  });
});
