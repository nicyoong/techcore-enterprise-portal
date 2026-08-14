import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    const { container } = render(<Input label="Username" id="username" />);
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(container.querySelector('label')?.textContent).toBe('Username');
  });

  it('renders with error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('does not render error when error prop is not provided', () => {
    const { container } = render(<Input label="Email" />);
    expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
  });

  it('passes through value and onChange', () => {
    const handleChange = vi.fn();
    render(<Input value="test" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies error border class when error is present', () => {
    const { container } = render(<Input error="Required" />);
    expect(container.querySelector('input')).toHaveClass('border-red-500');
  });

  it('passes through custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders disabled input', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
