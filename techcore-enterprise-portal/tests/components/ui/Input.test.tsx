import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email Address" placeholder="user@example.com" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('renders without label when label is not provided', () => {
    render(<Input placeholder="No label" />);
    expect(screen.queryByText('No label')).not.toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(<Input error="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Invalid email address')).toHaveClass('text-danger');
  });

  it('does not render error when error prop is not provided', () => {
    render(<Input />);
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
  });

  it('adds left padding when prefix is provided', () => {
    const { container } = render(<Input prefix={<span>📧</span>} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('pl-8');
  });

  it('adds right padding when suffix is provided', () => {
    const { container } = render(<Input suffix={<span>$</span>} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('pr-8');
  });

  it('adds error border class when error is present', () => {
    const { container } = render(<Input error="Required" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('border-danger');
  });

  it('does not add error border when no error', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).not.toHaveClass('border-danger');
  });

  it('passes through input attributes', () => {
    render(<Input type="email" id="email" name="email" />);
    const input = document.getElementById('email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'test' }) }));
  });

  it('passes through custom className', () => {
    const { container } = render(<Input className="custom-input" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-input');
  });

  it('renders disabled input', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
