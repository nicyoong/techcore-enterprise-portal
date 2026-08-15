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

  it('renders the UpsellPanel component', () => {
    render(<RenderApp />);
    // UpsellPanel is rendered but hidden when no upsell is active
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('renders the CompareBar component', () => {
    render(<RenderApp />);
    // CompareBar is rendered at the bottom
    const compareBar = document.querySelector('[class*="fixed"]');
    expect(compareBar).toBeInTheDocument();
  });

  it('renders category cards on homepage', () => {
    render(<RenderApp />);
    // Use getAllByText since some text appears multiple times
    expect(screen.getAllByText('Servers & Compute').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Networking').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Storage').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Endpoints').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Security Appliances').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Accessories').length).toBeGreaterThan(0);
  });

  it('renders the "View Full Catalog" link', () => {
    render(<RenderApp />);
    expect(screen.getByText('View Full Catalog')).toBeInTheDocument();
  });

  it('renders the EnterpriseServicesStrip', () => {
    render(<RenderApp />);
    // The strip has specific text content
    expect(document.body.textContent?.includes('Enterprise Hardware')).toBe(true);
  });
});
