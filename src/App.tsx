import { ToastProvider } from './components/ToastProvider';
import { Router } from './Router';

export function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}
