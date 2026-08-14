import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastProvider';

function RenderApp() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  );
}

describe('App', () => {
  it('renders the full app layout', () => {
    render(<RenderApp />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the announcement bar', () => {
    render(<RenderApp />);
    expect(screen.getByText(/Q3 volume pricing now live/i)).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<RenderApp />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<RenderApp />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2026 TechCore Enterprise, Inc/)).toBeInTheDocument();
  });

  it('renders product cards', () => {
    render(<RenderApp />);
    expect(screen.getByText(/Dell PowerEdge R760/i)).toBeInTheDocument();
    expect(screen.getByText(/HPE ProLiant DL380 Gen11/i)).toBeInTheDocument();
  });

  it('renders the main element', () => {
    render(<RenderApp />);
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
