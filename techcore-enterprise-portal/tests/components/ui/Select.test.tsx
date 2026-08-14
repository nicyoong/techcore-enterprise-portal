import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from '@/components/ui/Select';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option One' },
    { value: '2', label: 'Option Two' },
    { value: '3', label: 'Option Three' },
  ];

  it('renders label', () => {
    render(<Select label="Category" options={options} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Category" options={options} />);
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it('renders error message', () => {
    render(<Select label="Category" options={options} error="Please select" />);
    expect(screen.getByText('Please select')).toBeInTheDocument();
    expect(screen.getByText('Please select')).toHaveClass('text-danger');
  });

  it('does not render error when error prop is not provided', () => {
    render(<Select label="Category" options={options} />);
    expect(screen.queryByText(/please select/i)).not.toBeInTheDocument();
  });

  it('renders option values correctly', () => {
    render(<Select label="Category" options={options} />);
    const select = screen.getByRole('combobox');
    const optionElements = select.querySelectorAll('option');
    expect(optionElements[0]).toHaveValue('1');
    expect(optionElements[1]).toHaveValue('2');
    expect(optionElements[2]).toHaveValue('3');
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Select label="Category" options={options} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('passes through custom className', () => {
    const { container } = render(<Select label="Category" options={options} className="custom-select" />);
    const select = container.querySelector('select');
    expect(select).toHaveClass('custom-select');
  });

  it('passes through disabled state', () => {
    render(<Select label="Category" options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies error border class', () => {
    const { container } = render(<Select label="Category" options={options} error="Error" />);
    const select = container.querySelector('select');
    expect(select).toHaveClass('border-danger');
  });

  it('does not apply error border when no error', () => {
    const { container } = render(<Select label="Category" options={options} />);
    const select = container.querySelector('select');
    expect(select).not.toHaveClass('border-danger');
  });
});
