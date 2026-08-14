# TechCore Enterprise Portal

B2B IT hardware procurement portal — dark-mode-first, enterprise-grade design system.

## Architecture

```
src/
├── store/                 # Zustand stores (cart, compare, catalog)
├── components/
│   ├── layout/            # Navbar, Footer, AnnouncementBar, CartDrawer, CompareBar
│   ├── pages/             # HeroSection, VendorMarquee, ProductCard, EnterpriseServicesStrip
│   └── ui/                # Button, Card, Tag, Input, Select, SectionHeading
├── pages/                 # CatalogPage, ComparePage, QuoteSuccess, ProductDetailPage, SupportPage
├── types/                 # Shared TypeScript types
└── App.tsx                # Router shell + HomePage
```

## State Management

- **Zustand** for cart (RFQ line items), compare (spec selection), and catalog (filter/sort)
- **React Router v6** with lazy-loaded route components
- **ToastProvider** via React Context for non-intrusive notifications

## Design System

| Token | Value |
|---|---|
| Base bg | `#0A0E14` |
| Surface | `#151B26` |
| Border | `#1F2937` |
| Accent | `#38BDF8` (cyan glow on hover) |
| Success | `#34D399` |
| Warning | `#FBBF24` |
| Danger | `#F87171` |
| Font headings | Inter, tight tracking |
| Font mono | JetBrains Mono (SKUs, prices) |

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run test       # Vitest unit tests
npm run test:run   # Test with coverage
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, vendor marquee, categories, featured products, services |
| `/catalog` | Full catalog with search, filter, sort |
| `/product/:sku` | Product detail — specs, tiered pricing, warehouse stock, related products |
| `/compare` | Side-by-side spec comparison table |
| `/quote-success` | RFQ confirmation with generated reference number |
| `/support` | SLA plans, RMA process, KB, contact form |

## Accessibility

- `:focus-visible` outlines on all interactive elements
- `aria-live="polite"` on toast container
- Semantic `<nav>`, `<main>`, `<footer>` landmarks
- `prefers-reduced-motion` disables all animations
- Keyboard-navigable dropdown menus

## Performance

- Lazy-loaded route components via `React.lazy`
- Skeleton loaders during page transitions
- Canvas grid pattern only renders on hero section
- CSS animations use `transform` and `opacity` (GPU-accelerated)
