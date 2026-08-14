import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeading } from '@/components/ui/SectionHeading';

describe('SectionHeading', () => {
  it('renders title', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Title" subtitle="Subtitle" />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<SectionHeading title="Title" />);
    expect(container.querySelector('.mt-1')).not.toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<SectionHeading title="Title" action={<button>Clear</button>} />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('aligns left by default', () => {
    const { container } = render(<SectionHeading title="Title" />);
    expect(container.querySelector('.text-center')).not.toBeInTheDocument();
  });

  it('aligns center when align is "center"', () => {
    const { container } = render(<SectionHeading title="Title" align="center" />);
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });

  it('shows decorative line only when align is left', () => {
    const { container } = render(<SectionHeading title="Title" align="left" />);
    expect(container.querySelector('.w-12')).toBeInTheDocument();
  });

  it('does not show decorative line when align is center', () => {
    const { container } = render(<SectionHeading title="Title" align="center" />);
    expect(container.querySelector('.w-12')).not.toBeInTheDocument();
  });
});
