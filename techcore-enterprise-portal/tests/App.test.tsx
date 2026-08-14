import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App', () => {
  it('renders the full app layout', () => {
    render(<App />);
    // Main content sections should be present
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /browse by product family/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /most requested this quarter/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /procurement you can rely on/i })).toBeInTheDocument();
  });

  it('renders the announcement bar', () => {
    render(<App />);
    expect(screen.getByText(/Q3 volume pricing now live/i)).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getByText('TechCore')).toBeInTheDocument();
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/© 2026 TechCore Enterprise, Inc/)).toBeInTheDocument();
  });

  it('renders all product cards', () => {
    render(<App />);
    expect(screen.getByText('Dell PowerEdge R760')).toBeInTheDocument();
    expect(screen.getByText('Arista 7060CX3-48Y6')).toBeInTheDocument();
    expect(screen.getByText('Pure Storage FlashArray//X90')).toBeInTheDocument();
    expect(screen.getByText('Palo Alto PA-5280')).toBeInTheDocument();
    expect(screen.getByText('Lenovo ThinkStation T1700')).toBeInTheDocument();
    expect(screen.getByText('HPE ProLiant DL380 Gen11')).toBeInTheDocument();
  });

  it('renders the main element', () => {
    render(<App />);
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('has correct document structure', () => {
    render(<App />);
    expect(document.querySelector('header')).toBeInTheDocument();
    expect(document.querySelector('footer')).toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});
