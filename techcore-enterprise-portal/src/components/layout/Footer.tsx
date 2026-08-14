export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Products */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-tight">Products</h3>
            <ul className="space-y-2">
              {['Servers & Compute', 'Networking', 'Storage Arrays', 'Endpoints', 'Security Appliances'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-tight">Solutions</h3>
            <ul className="space-y-2">
              {['Hyperconverged Infrastructure', 'Software-Defined Storage', 'SD-WAN & Edge', 'VDI & Workspace', 'Zero Trust Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-tight">Support</h3>
            <ul className="space-y-2">
              {['Technical Documentation', 'RMA & Returns', 'Warranty Lookup', 'Firmware Updates', 'Contact Sales'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 tracking-tight">Company</h3>
            <ul className="space-y-2">
              {['About TechCore', 'Carrier Partners', 'Become a Reseller', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-text-muted hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-text-muted">Compliance & Certifications</span>
            {[
              { name: 'ISO 27001', desc: 'Information Security' },
              { name: 'SOC 2 Type II', desc: 'Trust Services' },
              { name: 'C-TPAT', desc: 'Supply Chain Security' },
              { name: 'ITAR Registered', desc: 'Defense Trade' },
            ].map((badge) => (
              <div
                key={badge.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-base border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                <div>
                  <span className="text-xs font-mono font-semibold text-text-primary">{badge.name}</span>
                  <span className="text-xs text-text-muted ml-1.5 hidden sm:inline">— {badge.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted">
            © 2026 TechCore Enterprise, Inc. All rights reserved.
          </p>
        </div>

        {/* Vendor authorization row */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-text-muted mb-3 font-medium tracking-wide uppercase">
            Authorized Reseller &amp; Partner
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              'Dell Technologies',
              'HPE',
              'Lenovo',
              'Cisco',
              'Juniper Networks',
              'Pure Storage',
              'Netapp',
              'Palo Alto Networks',
              'Fortinet',
              'Arista Networks',
            ].map((vendor) => (
              <span
                key={vendor}
                className="text-xs font-mono text-text-muted hover:text-accent transition-colors cursor-default"
              >
                {vendor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
