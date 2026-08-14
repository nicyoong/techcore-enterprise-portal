import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cart';
import { useNavigate } from 'react-router-dom';

function generateReference(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `RFQ-${year}-${num}`;
}

export default function QuoteSuccess() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      navigate('/catalog');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    const ref = generateReference();
    setReference(ref);
    setSubmitted(true);
    clearCart();
  };

  if (!submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">Submit Your RFQ</h2>
          <p className="text-sm text-text-muted mb-6">
            Your quote includes {items.length} line items totaling $
            {items.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()}.
            An account manager will follow up within 2 business hours.
          </p>
          <div className="space-y-3 mb-8 text-left">
            {items.map((item) => (
              <div key={item.sku} className="flex justify-between text-sm">
                <span className="text-text-secondary font-mono">{item.sku} × {item.qty}</span>
                <span className="font-mono text-text-primary">${(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-semibold border-t border-border pt-3">
              <span className="text-text-primary">Subtotal</span>
              <span className="font-mono text-accent">
                ${items.reduce((sum, i) => sum + i.price * i.qty, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all"
            >
              Submit RFQ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">RFQ Submitted Successfully</h2>
        <p className="text-sm text-text-muted mb-6">
          Your quote request has been received. A TechCore account manager will contact you within 2 business hours.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-base border border-border font-mono text-sm text-accent mb-6">
          <span>Reference:</span>
          <span className="font-bold">{reference}</span>
        </div>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/catalog"
            className="px-5 py-2.5 rounded-lg border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Continue Shopping
          </a>
          <a
            href="/"
            className="px-5 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
