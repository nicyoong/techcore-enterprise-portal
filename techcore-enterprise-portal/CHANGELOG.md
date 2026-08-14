# Changelog

All notable changes to TechCore Enterprise Portal.

---

## v0.3.0 — 2026-08-14

### Added
- **Product Detail Page** (`/product/:sku`) — image gallery placeholders, full spec table, tiered volume pricing (1–9 / 10–49 / 50+), stock-by-warehouse breakdown, related-products carousel, Datasheet PDF button
- **Support Page** (`/support`) — SLA tier comparison (Standard / Professional / Enterprise), 4-step RMA process, knowledge-base cards, contact channels, ticket submission form
- **Toast notifications** — `ToastProvider` + `useToast()` hook, aria-live polite region, slide-in animations, auto-dismiss after 3.5s
- **Skeleton loaders** — `SkeletonHero`, `SkeletonGrid`, `ProductCardSkeleton` for lazy-loaded pages
- **Micro-interactions** — `btn-press` scale on click, card hover glow with cyan shadow, focus-visible outlines, `prefers-reduced-motion` media query
- **Company email validation** — RFQ and support forms reject free-mail domains (gmail, yahoo, outlook, etc.) with inline error
- **Lazy route loading** — all secondary pages (`/catalog`, `/product/:sku`, `/compare`, `/support`, `/quote-success`) loaded on-demand via `React.lazy`
- **Favicon** — SVG grid-icon matching the design system
- **README.md** — architecture overview, design tokens, scripts, page map, accessibility notes
- **CHANGELOG.md** — this file

### Changed
- Navbar now includes `/support` link
- ProductCard shows toast on "Add to RFQ" click
- All pages wrapped in `Suspense` with skeleton fallbacks

---

## v0.2.0 — 2026-08-14

### Added
- **Full product catalog** — 12 realistic B2B SKUs across 5 categories with technical specs
- **Catalog page** (`/catalog`) — client-side search, category/vendor filters, price/availability sort, animated empty state
- **RFQ cart drawer** — slide-in panel with quantity steppers, line-item subtotals, clear cart, submit button
- **Quote success flow** (`/quote-success`) — order summary, generated reference number (`RFQ-2026-XXXX`)
- **Spec comparison** (`/compare`) — side-by-side table with monospace values, sticky compare bar, max 4 products
- **Zustand stores** — `cart.ts`, `compare.ts`, `catalog.ts` with typed interfaces
- **React Router** — client-side navigation with scroll-to-top on route change
- **Vendor marquee** — infinite horizontal scroll, grayscale wordmarks, colorize on hover, pause on hover
- **Enterprise Services strip** — Net-30, white-glove deployment, 4-hour hardware SLA, asset tagging
- **117 unit tests** across 11 test files covering all components and pages

### Fixed
- `Tag.tsx` variant mapping bug — `stock-ok` → `stockok` instead of `stockOk` (3 failing tests resolved)
- `Input.tsx` TypeScript conflict — `prefix` prop type incompatible with `InputHTMLAttributes`
- `Input.tsx` label accessibility — added `htmlFor`/`id` linkage

---

## v0.1.0 — 2026-08-14

### Added
- **Vite + React 18 + TypeScript + Tailwind CSS v4** project scaffold
- **Dark-mode-first design system** — `#0A0E14` base, `#38BDF8` accent with cyan glow, `#34D399` success
- **Typography** — Inter for headings (tight tracking), JetBrains Mono for SKUs/specs/prices
- **Reusable UI components** — Button (primary/secondary/ghost/outline), Card (1px border + hover glow), Tag/Badge (stock status, vendor), Input/Select (dark-styled), SectionHeading
- **Layout shell** — sticky navbar with mega-menu, announcement bar, 4-column footer with compliance badges (ISO 27001, SOC 2 Type II, C-TPAT, ITAR)
- **Homepage** — hero section, category browser, featured product cards, trust signals
- **Real B2B copy** — no lorem ipsum; all product descriptions, specs, and pricing are technically credible
- **SEO meta + Open Graph + Twitter Card** tags
- **124 unit tests** covering all UI components, layout, and page integration
