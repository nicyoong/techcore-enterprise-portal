import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

describe('AnnouncementBar', () => {
  it('renders the announcement text', () => {
    render(<AnnouncementBar />);
    expect(screen.getByText(/Q3 volume pricing now live/i)).toBeInTheDocument();
  });

  it('renders a quote request button', () => {
    render(<AnnouncementBar />);
    expect(screen.getByRole('button', { name: /request a quote/i })).toBeInTheDocument();
  });

  it('has the correct background styling', () => {
    const { container } = render(<AnnouncementBar />);
    const bar = container.querySelector('div');
    expect(bar).toHaveClass('bg-accent/10');
  });

  it('mentions the 50-unit threshold', () => {
    render(<AnnouncementBar />);
    expect(screen.getByText(/orders exceeding 50 units/i)).toBeInTheDocument();
  });
});
