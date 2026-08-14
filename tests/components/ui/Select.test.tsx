import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from '@/components/ui/Select';

describe('Select', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  it('renders label', () => {
    const { container } = render(<Select label="Category" options={options} />);
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(container.querySelector('label')?.textContent).toBe('Category');
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    options.forEach((opt) => {
      expect(screen.getByRole('option', { name: opt })).toBeInTheDocument();
    });
  });

  it('renders error message', () => {
    render(<Select options={options} error="Invalid selection" />);
    expect(screen.getByText('Invalid selection')).toBeInTheDocument();
  });

  it('does not render error when error prop is not provided', () => {
    const { container } = render(<Select options={options} />);
    expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
  });

  it('renders option values correctly', () => {
    render(<Select options={options} />);
    const select = screen.getAllByRole('combobox')[0];
    expect(select.querySelector('option[value="Option 1"]')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'Option 2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('passes through custom className', () => {
    const { container } = render(<Select options={options} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes through disabled state', () => {
    render(<Select options={options} disabled />);
    const select = screen.getAllByRole('combobox')[0];
    expect(select).toHaveAttribute('disabled');
  });

  it('applies error border class', () => {
    const { container } = render(<Select options={options} error="Required" />);
    expect(container.querySelector('select')).toHaveClass('border-red-500');
  });

  it('does not apply error border when no error', () => {
    const { container } = render(<Select options={options} />);
    expect(container.querySelector('select')).not.toHaveClass('border-red-500');
  });
});
