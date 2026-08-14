import { useState } from 'react';
import { useToast } from '../components/ToastProvider';

const FREE_MAIL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com', 'zoho.com',
]);

export default function SupportPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    return !FREE_MAIL_DOMAINS.has(domain);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    else if (!validateEmail(form.email)) newErrors.email = 'Please use a company email address (not Gmail, Yahoo, etc.)';
    if (!form.company.trim()) newErrors.company = 'Company is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    addToast('Support ticket submitted. Reference: SUP-' + Date.now().toString(36).toUpperCase(), 'success');
    setForm({ name: '', email: '', company: '', subject: '', message: '' });
  };

  const slaTiers = [
    { name: 'Standard', price: 'Included', response: '4 business hours', resolution: '24 business hours', features: ['Email support', 'Knowledge base', 'Community forums'] },
    { name: 'Professional', price: '$2,500/mo', response: '1 business hour', resolution: '8 business hours', features: ['Priority email', 'Phone support 9-5', 'Quarterly health checks', 'Dedicated CSM'] },
    { name: 'Enterprise', price: 'Custom', response: '15 minutes', resolution: '4 business hours', features: ['24/7 phone & chat', 'On-site engineer', 'Guaranteed SLA', 'Executive reviews', 'Custom integrations'] },
  ];

  const rmaSteps = [
    { step: 1, title: 'Submit RMA Request', desc: 'Provide serial number, proof of purchase, and symptom description via portal or phone.' },
    { step: 2, title: 'Triage & Validation', desc: 'Our engineers validate the issue and confirm eligibility within 2 business hours.' },
    { step: 3, title: 'Shipping Label Issued', desc: 'Prepaid return label emailed. Advance replacement shipped same day for Enterprise tier.' },
    { step: 4, title: 'Replacement Delivered', desc: 'New unit arrives. Install and return defective unit within 15 days.' },
  ];

  const kbCards = [
    { title: 'Getting Started Guides', desc: 'Rack, stack, and configure your first deployment in under 30 minutes.', icon: '📋', count: 47 },
    { title: 'Firmware & Driver Downloads', desc: 'Latest BIOS, firmware, and driver packages for all supported hardware.', icon: '⬇️', count: 128 },
    { title: 'Troubleshooting KB', desc: 'Common issues, error codes, and resolution paths from our field engineers.', icon: '🔧', count: 215 },
    { title: 'API & Automation Docs', desc: 'REST APIs, CLI references, Terraform providers, and Ansible modules.', icon: '🔌', count: 63 },
  ];

  const contactChannels = [
    { icon: '📞', title: 'Phone', value: '1-800-555-CORE', hours: 'Mon-Fri 6am-8pm PT' },
    { icon: '💬', title: 'Live Chat', value: 'Available in portal', hours: '24/7 for Enterprise' },
    { icon: '📧', title: 'Email', value: 'support@techcore.com', hours: 'Response within 4hrs' },
    { icon: '📋', title: 'Portal', value: 'Open a ticket online', hours: 'Auto-acknowledged' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Support Center</h1>
        <p className="text-sm text-text-muted">Technical support, RMA, and documentation for enterprise infrastructure</p>
      </div>

      {/* SLA Tiers */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Support Plans</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {slaTiers.map((tier) => (
            <div key={tier.name} className="rounded-xl bg-surface border border-border p-6 hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">{tier.name}</h3>
                <span className="text-sm font-mono font-bold text-accent">{tier.price}</span>
              </div>
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between"><span className="text-text-muted">Response Time</span><span className="font-mono text-text-primary">{tier.response}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Resolution Target</span><span className="font-mono text-text-primary">{tier.resolution}</span></div>
              </div>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* RMA Process */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">RMA Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rmaSteps.map((s) => (
            <div key={s.step} className="relative rounded-xl bg-surface border border-border p-5">
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-mono font-bold text-sm flex items-center justify-center mb-3">{s.step}</div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{s.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Knowledge Base</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kbCards.map((card) => (
            <a key={card.title} href="#kb" className="rounded-xl bg-surface border border-border p-5 hover:border-accent/40 hover:shadow-[0_0_16px_rgba(56,189,248,0.1)] transition-all group">
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">{card.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-2">{card.desc}</p>
              <span className="text-xs font-mono text-text-muted">{card.count} articles</span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Channels */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Contact Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactChannels.map((ch) => (
            <div key={ch.title} className="rounded-xl bg-surface border border-border p-5 text-center">
              <div className="text-2xl mb-2">{ch.icon}</div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{ch.title}</h3>
              <p className="text-xs font-mono text-accent mb-1">{ch.value}</p>
              <p className="text-xs text-text-muted">{ch.hours}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-6">Submit a Ticket</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl bg-surface border border-border p-6 space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="support-name" className="block text-xs font-medium text-text-secondary mb-1.5">Full Name *</label>
              <input id="support-name" name="name" value={form.name} onChange={handleChange}
                className={`w-full rounded-lg bg-bg-base border ${errors.name ? 'border-danger' : 'border-border'} text-sm text-text-primary px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent transition-colors`}
                placeholder="Jane Smith" />
              {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="support-email" className="block text-xs font-medium text-text-secondary mb-1.5">Company Email *</label>
              <input id="support-email" name="email" type="email" value={form.email} onChange={handleChange}
                className={`w-full rounded-lg bg-bg-base border ${errors.email ? 'border-danger' : 'border-border'} text-sm text-text-primary px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent transition-colors`}
                placeholder="jane@company.com" />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="support-company" className="block text-xs font-medium text-text-secondary mb-1.5">Company *</label>
            <input id="support-company" name="company" value={form.company} onChange={handleChange}
              className={`w-full rounded-lg bg-bg-base border ${errors.company ? 'border-danger' : 'border-border'} text-sm text-text-primary px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent transition-colors`}
              placeholder="Acme Corporation" />
            {errors.company && <p className="mt-1 text-xs text-danger">{errors.company}</p>}
          </div>
          <div>
            <label htmlFor="support-subject" className="block text-xs font-medium text-text-secondary mb-1.5">Subject</label>
            <select id="support-subject" name="subject" value={form.subject} onChange={handleChange}
              className="w-full rounded-lg bg-bg-base border border-border text-sm text-text-primary px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent transition-colors">
              <option value="">Select a topic...</option>
              <option value="technical">Technical Support</option>
              <option value="rma">RMA / Return</option>
              <option value="billing">Billing Inquiry</option>
              <option value="quote">Quote Request</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="support-message" className="block text-xs font-medium text-text-secondary mb-1.5">Message *</label>
            <textarea id="support-message" name="message" rows={4} value={form.message} onChange={handleChange}
              className={`w-full rounded-lg bg-bg-base border ${errors.message ? 'border-danger' : 'border-border'} text-sm text-text-primary px-3 py-2 focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none`}
              placeholder="Describe your issue or question..." />
            {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-text-muted">We typically respond within 2 business hours during support windows.</p>
            <button type="submit" disabled={submitting}
              className="px-6 py-2.5 rounded-lg bg-accent text-bg-base text-sm font-semibold hover:shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-press">
              {submitting ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
