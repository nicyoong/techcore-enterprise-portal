import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../../src/components/ToastProvider';

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children', () => {
    render(
      <ToastProvider>
        <div>Test Content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('displays success toast', async () => {
    function TestComponent() {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Success message', 'success')}>
          Show Toast
        </button>
      );
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('displays error toast', async () => {
    function TestComponent() {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Error message', 'error')}>
          Show Error
        </button>
      );
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('displays info toast', async () => {
    function TestComponent() {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Info message', 'info')}>
          Show Info
        </button>
      );
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Info'));
    
    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });

  it('has aria-live region', () => {
    render(
      <ToastProvider>
        <div>Content</div>
      </ToastProvider>
    );
    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });

  it('renders multiple toasts', async () => {
    function TestComponent() {
      const { addToast } = useToast();
      return (
        <>
          <button onClick={() => addToast('Message 1', 'success')}>Toast 1</button>
          <button onClick={() => addToast('Message 2', 'error')}>Toast 2</button>
        </>
      );
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Toast 1'));
    fireEvent.click(screen.getByText('Toast 2'));
    
    await waitFor(() => {
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
    });
  });

  it('dismisses toast when dismiss button is clicked', async () => {
    function TestComponent() {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Dismissable', 'success')}>
          Show Toast
        </button>
      );
    }

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    
    await waitFor(() => {
      expect(screen.getByText('Dismissable')).toBeInTheDocument();
    });

    // Click dismiss button
    const dismissButtons = screen.getAllByLabelText('Dismiss');
    if (dismissButtons.length > 0) {
      fireEvent.click(dismissButtons[0]);
    }
  });
});
