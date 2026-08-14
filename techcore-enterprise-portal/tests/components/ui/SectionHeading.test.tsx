import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeading } from '@/components/ui/SectionHeading';

describe('SectionHeading', () => {
  it('renders title', () => {
    render(<SectionHeading title="Main Title" />);
    expect(screen.getByRole('heading', { name: /main title/i })).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<SectionHeading label="SECTION" title="Title" />);
    expect(screen.getByText('SECTION')).toBeInTheDocument();
    expect(screen.getByText('SECTION')).toHaveClass('text-accent');
  });

  it('does not render label when not provided', () => {
    render(<SectionHeading title="Title" />);
    expect(screen.queryByText(/SECTION/i)).not.toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Title" subtitle="Some description" />);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<SectionHeading title="Title" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('aligns left by default', () => {
    const { container } = render(<SectionHeading title="Title" />);
    expect(container.querySelector('div')).toHaveClass('text-left');
  });

  it('aligns center when align is "center"', () => {
    const { container } = render(<SectionHeading title="Title" align="center" />);
    expect(container.querySelector('div')).toHaveClass('text-center');
  });

  it('shows decorative line only when align is left', () => {
    const { container } = render(<SectionHeading title="Title" />);
    expect(container.querySelector('.mt-3')).toBeInTheDocument();
  });

  it('does not show decorative line when align is center', () => {
    const { container } = render(<SectionHeading title="Title" align="center" />);
    expect(container.querySelector('.mt-3')).not.toBeInTheDocument();
  });
});
