import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

describe('AnnouncementBar', () => {
  it('renders the announcement text', () => {
    render(<AnnouncementBar />);
    expect(screen.getByText(/free enterprise software consultation/i)).toBeInTheDocument();
  });

  it('renders a link to support', () => {
    render(<AnnouncementBar />);
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
  });
});
