import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

interface Product {
  id: string;
  sku: string;
  name: string;
  shortDesc: string;
  price: string;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'SRV-840-GEN12',
    name: 'Dell PowerEdge R760',
    shortDesc: 'Dual Intel Xeon Scalable (4th Gen), 24× DDR5, 12× 2.5" SAS/SATA + 4× NVMe, 2× 1300W Platinum PSU. Ideal for virtualization and database workloads.',
    price: '$8,450.00',
    stock: 'in-stock',
    category: 'Servers',
  },
  {
    id: '2',
    sku: 'NET-9200-2CQ',
    name: 'Arista 7060CX3-48Y6',
    shortDesc: '48-port 40/100Gb Ethernet switch with 6× 400Gb QSFP28 uplinks. EVPN-VXLAN, APIC-EM, and Telemetry for modern data center spine-leaf topologies.',
    price: '$24,900.00',
    stock: 'in-stock',
    category: 'Networking',
  },
  {
    id: '3',
    sku: 'STR-740-NVME',
    name: 'Pure Storage FlashArray//X90',
    shortDesc: 'All-NVMe enterprise SAN delivering sub-millisecond latency. 720TB raw, 8× host ports (32Gb FC / 100GbE). Includes Pulse data protection.',
    price: '$67,500.00',
    stock: 'low-stock',
    category: 'Storage',
  },
  {
    id: '4',
    sku: 'SEC-PA-5200',
    name: 'Palo Alto PA-5280',
    shortDesc: 'Next-gen firewall: 9.5 Gbps threat prevention throughput, 28× 1GbE, 14× 10GbE SFP+. Includes Prisma SD-WAN and WildFire subscription.',
    price: '$12,340.00',
    stock: 'in-stock',
    category: 'Security',
  },
  {
    id: '5',
    sku: 'EPT-WS-T1700',
    name: 'Lenovo ThinkStation T1700',
    shortDesc: 'Workstation: AMD EPYC Desktop PRO 435GE, 64GB DDR5 ECC, 1TB NVMe + 2TB HDD, NVIDIA RTX A2000 12GB. Certified for CAD and AI inference.',
    price: '$3,875.00',
    stock: 'in-stock',
    category: 'Endpoints',
  },
  {
    id: '6',
    sku: 'SRV-R750-EPYC',
    name: 'HPE ProLiant DL380 Gen11',
    shortDesc: 'AMD EPYC 9004-series, 32× DDR5 slots, 8× LFF SAS + 8× SFF NVMe, 2× 800W Gold Platinum. iLO 7 with integrated Lights-Out management.',
    price: '$9,200.00',
    stock: 'out-of-stock',
    category: 'Servers',
  },
];

const CATEGORIES = [
  { name: 'Servers & Compute', count: 142, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="8" y1="15" x2="16" y2="15" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="10" cy="6" r="1" fill="currentColor" />
    </svg>
  )},
  { name: 'Networking', count: 87, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="14" width="6" height="7" rx="1" />
      <rect x="9" y="8" width="6" height="13" rx="1" />
      <rect x="17" y="3" width="6" height="18" rx="1" />
      <line x1="4" y1="14" x2="4" y2="17" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="20" y1="3" x2="20" y2="7" />
    </svg>
  )},
  { name: 'Storage', count: 56, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  )},
  { name: 'Endpoints', count: 203, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )},
  { name: 'Security Appliances', count: 38, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )},
];

function StockBadge({ status }: { status: Product['stock'] }) {
  const config = {
    'in-stock': { tag: 'in-stock', label: 'In Stock' },
    'low-stock': { tag: 'stock-low', label: 'Low Stock' },
    'out-of-stock': { tag: 'stock-out', label: 'Out of Stock' },
  };
  const { tag, label } = config[status];
  return <Tag variant={tag as any}>{label}</Tag>;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col h-full group">
      <div className="flex items-start justify-between mb-3">
        <Tag variant="vendor">{product.category}</Tag>
        <StockBadge status={product.stock} />
      </div>

      <p className="font-mono text-xs text-accent mb-1 tracking-wide">{product.sku}</p>
      <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed flex-1">{product.shortDesc}</p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="font-mono text-lg font-semibold text-text-primary">{product.price}</span>
        <Button variant="outline" size="sm" disabled={product.stock === 'out-of-stock'}>
          Add to RFQ
        </Button>
      </div>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(56,189,248,0.04),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-accent">Q3 Volume Pricing Active</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-text-primary leading-[1.1]">
            Enterprise IT hardware,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
              delivered fast
            </span>
            .
          </h1>

          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
            Authorized procurement for servers, networking, storage, and security — with
            competitive volume pricing, same-ship availability, and full lifecycle support.
            Built for IT teams that need reliability at scale.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Request a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg">
              Browse Catalog
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-text-muted">
            {[
              { label: 'Authorized Reseller', sub: '10+ global vendors' },
              { label: 'Lead Time', sub: 'Same-week shipping' },
              { label: 'Compliance', sub: 'ISO 27001 & SOC 2 Type II' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-semibold text-text-primary">{stat.label}</p>
                <p className="text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="CATEGORIES"
          title="Browse by product family"
          subtitle="Every category is stocked and ready to ship. Volume discounts apply on orders of 50+ units."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group flex flex-col items-center text-center p-5 rounded-xl border border-border bg-bg-surface hover:border-accent/40 hover:bg-bg-base transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {cat.name}
              </p>
              <p className="text-xs font-mono text-text-muted mt-1">{cat.count} products</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FEATURED PRODUCTS"
          title="Most requested this quarter"
          subtitle="High-demand SKUs with immediate availability. Click &quot;Add to RFQ&quot; to build your order."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="WHY TECHCORE"
          title="Procurement you can rely on"
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Authorized Vendor Partnerships',
              desc: 'Direct factory authorization from Dell, HPE, Lenovo, Cisco, Pure Storage, Palo Alto, Fortinet, and Arista — with full warranty and firmware support.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
            },
            {
              title: 'Volume & Contract Pricing',
              desc: 'Tiered discounts on 10+, 50+, and 100+ unit orders. Multi-year pricing agreements available for enterprise accounts with committed spend.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              ),
            },
            {
              title: 'Certified Compliance & Security',
              desc: 'ISO 27001 certified operations, SOC 2 Type II audited processes, and ITAR-registered facilities for defense and government contracts.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M6 8h.01M9 8h.01" strokeDasharray="2 2" />
                </svg>
              ),
            },
          ].map((item) => (
            <Card key={item.title} className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
