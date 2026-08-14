import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard, HeroSection, CategorySection, FeaturedProducts, TrustSection } from '@/components/pages/Homepage';

// The PRODUCTS const is not exported, so we use the same fixture data inline
const TEST_PRODUCT = {
  id: '1',
  sku: 'SRV-840-GEN12',
  name: 'Dell PowerEdge R760',
  shortDesc: 'Dual Intel Xeon Scalable (4th Gen), 24× DDR5, 12× 2.5" SAS/SATA + 4× NVMe, 2× 1300W Platinum PSU. Ideal for virtualization and database workloads.',
  price: '$8,450.00',
  stock: 'in-stock' as const,
  category: 'Servers',
};

const TEST_PRODUCT_OUT_OF_STOCK = {
  ...TEST_PRODUCT,
  id: '2',
  sku: 'SRV-R750-EPYC',
  name: 'HPE ProLiant DL380 Gen11',
  stock: 'out-of-stock' as const,
  price: '$9,200.00',
  category: 'Servers',
};

describe('StockBadge', () => {
  // StockBadge is a private component, tested indirectly via ProductCard
  it('renders "In Stock" for in-stock product via ProductCard', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('renders "Low Stock" for low-stock product via ProductCard', () => {
    const lowStockProduct = { ...TEST_PRODUCT, stock: 'low-stock' as const };
    render(<ProductCard product={lowStockProduct} />);
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });

  it('renders "Out of Stock" for out-of-stock product via ProductCard', () => {
    render(<ProductCard product={TEST_PRODUCT_OUT_OF_STOCK} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});

describe('ProductCard', () => {
  it('renders product SKU', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText(TEST_PRODUCT.sku)).toBeInTheDocument();
  });

  it('renders product name', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText(TEST_PRODUCT.name)).toBeInTheDocument();
  });

  it('renders product short description', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText(TEST_PRODUCT.shortDesc)).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText(TEST_PRODUCT.price)).toBeInTheDocument();
  });

  it('renders vendor category tag', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText(TEST_PRODUCT.category)).toBeInTheDocument();
  });

  it('shows "In Stock" badge for in-stock product', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows "Out of Stock" badge for out-of-stock product', () => {
    render(<ProductCard product={TEST_PRODUCT_OUT_OF_STOCK} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('disables "Add to RFQ" button for out-of-stock products', () => {
    render(<ProductCard product={TEST_PRODUCT_OUT_OF_STOCK} />);
    const btn = screen.getByRole('button', { name: /add to rfq/i });
    expect(btn).toBeDisabled();
  });

  it('enables "Add to RFQ" button for in-stock products', () => {
    render(<ProductCard product={TEST_PRODUCT} />);
    const btn = screen.getByRole('button', { name: /add to rfq/i });
    expect(btn).not.toBeDisabled();
  });

  it('uses outline variant for Add to RFQ button', () => {
    const { container } = render(<ProductCard product={TEST_PRODUCT} />);
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('bg-transparent');
  });
});

describe('HeroSection', () => {
  it('renders the hero heading', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the hero description', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Authorized procurement for servers/i)).toBeInTheDocument();
  });

  it('renders "Request a Quote" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /request a quote/i })).toBeInTheDocument();
  });

  it('renders "Browse Catalog" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /browse catalog/i })).toBeInTheDocument();
  });

  it('renders trust stats', () => {
    render(<HeroSection />);
    expect(screen.getByText('Authorized Reseller')).toBeInTheDocument();
    expect(screen.getByText('Lead Time')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
  });

  it('renders the volume pricing badge', () => {
    render(<HeroSection />);
    expect(screen.getByText('Q3 Volume Pricing Active')).toBeInTheDocument();
  });
});

describe('CategorySection', () => {
  it('renders section heading', () => {
    render(<CategorySection />);
    expect(screen.getByRole('heading', { level: 2, name: /browse by product family/i })).toBeInTheDocument();
  });

  it('renders all category cards', () => {
    render(<CategorySection />);
    expect(screen.getByText('Servers & Compute')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('Endpoints')).toBeInTheDocument();
    expect(screen.getByText('Security Appliances')).toBeInTheDocument();
  });

  it('renders product counts for each category', () => {
    render(<CategorySection />);
    expect(screen.getByText('142 products')).toBeInTheDocument();
    expect(screen.getByText('87 products')).toBeInTheDocument();
    expect(screen.getByText('56 products')).toBeInTheDocument();
    expect(screen.getByText('203 products')).toBeInTheDocument();
    expect(screen.getByText('38 products')).toBeInTheDocument();
  });
});

describe('FeaturedProducts', () => {
  it('renders section heading', () => {
    render(<FeaturedProducts />);
    expect(screen.getByRole('heading', { level: 2, name: /most requested this quarter/i })).toBeInTheDocument();
  });

  it('renders all product cards', () => {
    render(<FeaturedProducts />);
    expect(screen.getByText('Dell PowerEdge R760')).toBeInTheDocument();
    expect(screen.getByText('Arista 7060CX3-48Y6')).toBeInTheDocument();
    expect(screen.getByText('Pure Storage FlashArray//X90')).toBeInTheDocument();
    expect(screen.getByText('Palo Alto PA-5280')).toBeInTheDocument();
    expect(screen.getByText('Lenovo ThinkStation T1700')).toBeInTheDocument();
    expect(screen.getByText('HPE ProLiant DL380 Gen11')).toBeInTheDocument();
  });

  it('renders 6 product cards', () => {
    render(<FeaturedProducts />);
    const cards = document.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBeGreaterThanOrEqual(6);
  });
});

describe('TrustSection', () => {
  it('renders section heading', () => {
    render(<TrustSection />);
    expect(screen.getByRole('heading', { level: 2, name: /procurement you can rely on/i })).toBeInTheDocument();
  });

  it('renders all trust items', () => {
    render(<TrustSection />);
    expect(screen.getByText('Authorized Vendor Partnerships')).toBeInTheDocument();
    expect(screen.getByText('Volume & Contract Pricing')).toBeInTheDocument();
    expect(screen.getByText('Certified Compliance & Security')).toBeInTheDocument();
  });

  it('renders trust item descriptions', () => {
    render(<TrustSection />);
    expect(screen.getByText(/Direct factory authorization/i)).toBeInTheDocument();
    expect(screen.getByText(/Tiered discounts/i)).toBeInTheDocument();
    expect(screen.getByText(/ISO 27001 certified/i)).toBeInTheDocument();
  });
});
