import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '@/App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/enterprise software made simple/i)).toBeInTheDocument();
  });

  it('renders ToastProvider', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
});
