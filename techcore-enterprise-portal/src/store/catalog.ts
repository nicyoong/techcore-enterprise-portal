import { create } from 'zustand';

export interface Product {
  sku: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  stockStatus: 'ok' | 'low' | 'out';
  stockQty?: number;
  specs: Record<string, string>;
  description: string;
}

interface CatalogState {
  products: Product[];
  category: string;
  vendor: string;
  search: string;
  sortBy: 'price-asc' | 'price-desc' | 'availability';
  setCategory: (c: string) => void;
  setVendor: (v: string) => void;
  setSearch: (s: string) => void;
  setSortBy: (s: 'price-asc' | 'price-desc' | 'availability') => void;
  filtered: () => Product[];
}

export const PRODUCTS: Product[] = [
  {
    sku: 'DELL-PE-R760-001',
    name: 'Dell PowerEdge R760 2U Dual-Socket',
    vendor: 'Dell',
    category: 'Servers & Compute',
    price: 8499,
    stockStatus: 'ok',
    stockQty: 47,
    specs: {
      Processors: '2× Intel Xeon Scalable (up to 6th Gen)',
      Memory: '16× DIMM slots, up to 12TB DDR5',
      DriveBays: '12× 3.5" SAS/SATA or 24× 2.5" NVMe',
      PSU: 'Dual 1600W Platinum Hot-Swap',
      GPU: 'Up to 4× PCIe 5.0 x16',
      FormFactor: '2U Rack',
    },
    description:
      'High-density 2U workhorse for virtualization, databases, and AI/ML inference. Supports up to 6th Gen Intel Xeon Scalable processors with 12TB DDR5.',
  },
  {
    sku: 'HPE-PL-DL380-002',
    name: 'HPE ProLiant DL380 Gen11',
    vendor: 'HPE',
    category: 'Servers & Compute',
    price: 7899,
    stockStatus: 'ok',
    stockQty: 31,
    specs: {
      Processors: '2× Intel Xeon Scalable (Sapphire Rapids)',
      Memory: '16× DIMM slots, up to 8TB DDR5',
      DriveBays: '10× LFF or 16× SFF + 4× M.2',
      PSU: 'Redundant 1300W Platinum Flex Slot',
      GPU: 'Up to 3× PCIe 5.0 add-in cards',
      FormFactor: '2U Rack',
    },
    description:
      'Industry-standard 2U server with HPE Intelligent Provisioning and iLO 7 management. Built for hybrid cloud and enterprise workloads.',
  },
  {
    sku: 'LENOVO-PS-T1700-003',
    name: 'Lenovo ThinkStation T1700 Gen2 Workstation',
    vendor: 'Lenovo',
    category: 'Endpoints',
    price: 3299,
    stockStatus: 'ok',
    stockQty: 120,
    specs: {
      CPU: 'Intel Core i7-14700 / i9-14900K',
      GPU: 'NVIDIA RTX 4070 12GB (optional)',
      Memory: '2× DDR5 DIMM, up to 128GB',
      Storage: '1× M.2 2280 NVMe + 1× 3.5" SATA',
      PSU: '700W 80+ Platinum',
      Warranty: '3-year depot with next-business-day',
    },
    description:
      'Professional workstation for CAD, BIM, and creative workloads. ISV-certified for Autodesk, Adobe, and Dassault Systèmes.',
  },
  {
    sku: 'CISCO-C9300-004',
    name: 'Cisco Catalyst 9300-48T Ethernet Module',
    vendor: 'Cisco',
    category: 'Networking',
    price: 4250,
    stockStatus: 'low',
    stockQty: 8,
    specs: {
      Ports: '48× Gigabit Ethernet (RJ-45)',
      Uplinks: '6× 40G QSFP+ uplinks',
      Switching: '1.28 Tbps switching capacity',
      PoE: 'PoE+ up to 740W (with 600W power supply)',
      Security: 'MACsec, IP SLA, TrustSec',
      Stacking: 'Cisco StackPower or virtual stacking',
    },
    description:
      'Enterprise access-layer switch with Cisco IOS XE and digital trilateration security. Supports up to 740W PoE per chassis.',
  },
  {
    sku: 'ARISTA-7060-005',
    name: 'Arista 7060CX3-48YC5 Switch',
    vendor: 'Arista',
    category: 'Networking',
    price: 12900,
    stockStatus: 'ok',
    stockQty: 14,
    specs: {
      Ports: '48× 10GbE/25GbE SFP28',
      Uplinks: '4× 100GbE QSFP28',
      Switching: '2.4 Tbps switching capacity',
      Memory: '32GB DRAM, 16GB Flash',
      OS: 'EOS (Extensible Operating System)',
      Height: '1U fixed-configuration',
    },
    description:
      'High-performance data center switch with low-latency EOS and automation-ready CLI. Ideal for spine-leaf and leaf-tier deployments.',
  },
  {
    sku: 'PURE-FA-X90-006',
    name: 'Pure Storage FlashArray//X90 All-Flash Array',
    vendor: 'Pure Storage',
    category: 'Storage',
    price: 89500,
    stockStatus: 'low',
    stockQty: 3,
    specs: {
      Capacity: 'Up to 10.2 PB raw (8× 1.92TB or 3.84TB SSDs)',
      Performance: 'Up to 18M IOPS, 350GB/s throughput',
      Latency: 'Sub-millisecond average',
      FormFactor: '4U dual-controller',
      Connectivity: '16× 32Gb FC + 16× 100GbE',
      Support: 'Pure1 managed, 24/7 proactive support',
    },
    description:
      'All-flash NAS/SAN hybrid array with active-active HA, inline dedupe/compression, and Pure1 observability. 5-year warranty standard.',
  },
  {
    sku: 'PALO-PA5280-007',
    name: 'Palo Alto Networks PA-5280 Next-Gen Firewall',
    vendor: 'Palo Alto Networks',
    category: 'Security Appliances',
    price: 14750,
    stockStatus: 'ok',
    stockQty: 22,
    specs: {
      ThreatPrevention: 'Up to 4.5 Gbps',
      FirewallThroughput: 'Up to 8.5 Gbps',
      IPS: 'Up to 5.2 Gbps',
      VPN: 'TLS/IPsec up to 4.2 Gbps combined',
      Slots: '4× expansion slots',
      Power: 'Dual hot-swappable redundant PSUs',
    },
    description:
      'Mid-range next-gen firewall with AI-driven threat intelligence, Prisma SD-WAN integration, and DNA analysis for automated incident response.',
  },
  {
    sku: 'FORTI-FG200F-008',
    name: 'Fortinet FortiGate 200F NG Firewall',
    vendor: 'Fortinet',
    category: 'Security Appliances',
    price: 5600,
    stockStatus: 'ok',
    stockQty: 38,
    specs: {
      ThreatProtection: 'Up to 1.76 Gbps',
      FirewallThroughput: 'Up to 3.5 Gbps',
      VPN: 'IPsec up to 1.6 Gbps, TLS up to 1.2 Gbps',
      Cores: '8-core ARM64 + FortiOS optimized ASICs',
      Slots: '2× SFP+ 10Gb + 4× GE management',
      VPNConcurrent: 'Up to 2,000 IPsec peers',
    },
    description:
      'Cost-effective next-gen firewall with AI-accelerated threat detection, SD-WAN built-in, and single-pane-of-glass FortiManager integration.',
  },
  {
    sku: 'CISCO-C9400-009',
    name: 'Cisco Catalyst 9400-8 Super Series Switch',
    vendor: 'Cisco',
    category: 'Networking',
    price: 32500,
    stockStatus: 'ok',
    stockQty: 6,
    specs: {
      FormFactor: '3RU modular chassis',
      Supervisor: 'C9400-SUP10-4T (1.6 Tbps per sup)',
      Slots: '8× modular line card slots',
      Power: 'Dual redundant 2000W AC/DC PSUs',
      Cooling: 'Dual redundant smart fans',
      StackMode: 'Cisco StackWise Virtual (up to 32 Tbps)',
    },
    description:
      'Modular core/distribution switch with sup flexibility and ScaleX silicon. Supports FabricPath, VXLAN, and Cisco Application Centric Infrastructure.',
  },
  {
    sku: 'DELL-R660-010',
    name: 'Dell PowerEdge R660 1U Single-Socket',
    vendor: 'Dell',
    category: 'Servers & Compute',
    price: 4299,
    stockStatus: 'ok',
    stockQty: 63,
    specs: {
      CPU: '1× Intel Xeon Scalable (up to 6th Gen)',
      Memory: '16× DIMM slots, up to 8TB DDR5',
      DriveBays: '8× 2.5" SAS/SATA/NVMe internal',
      PSU: 'Single 1300W Platinum hot-swap',
      GPU: 'Up to 1× full-height dual-slot PCIe 5.0',
      Management: 'iDRAC9 with Lifecycle Controller',
    },
    description:
      'Compact 1U compute node for edge, VDI, and lightweight virtualization. iDRAC9 Enterprise with remote console and PowerShell support.',
  },
  {
    sku: 'LENOVO-X1C11-011',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    vendor: 'Lenovo',
    category: 'Endpoints',
    price: 1849,
    stockStatus: 'ok',
    stockQty: 200,
    specs: {
      CPU: 'Intel Core Ultra 7 155H (16 cores)',
      Display: '14" WUXGA (1920×1200) IPS, 400 nits',
      Memory: '32GB LPDDR5x onboard',
      Storage: '1TB PCIe 4.0 NVMe SSD',
      Battery: '88Wh, up to 18hr runtime',
      Weight: '1.12 kg / 2.47 lbs',
    },
    description:
      'Ultra-lightweight business ultrabook with AI NPU, Thunderbolt 4, and military-grade durability (MIL-STD-810H). Windows Hello IR camera standard.',
  },
  {
    sku: 'UBNT-UDM-PRO-012',
    name: 'Ubiquiti UniFi Dream Machine Pro',
    vendor: 'Ubiquiti',
    category: 'Networking',
    price: 549,
    stockStatus: 'ok',
    stockQty: 55,
    specs: {
      Gateway: '10 GbE WAN + 5 GbE LAN + 2.5 GbE WAN/LAN',
      Switching: '8× 1GbE + 1× 10GbE SFP+',
      WiFi: '802.11ax (Wi-Fi 6) tri-radio, up to 2.5 Gbps',
      Controller: 'UniFi Network 7.x built-in',
      NVR: '2× 3.5" SATA, up to 16TB storage',
      CameraSlots: 'Supports up to 32 UniFi cameras',
    },
    description:
      'All-in-one networking appliance combining UniFi gateway, switch, WiFi controller, and NVR. Ideal for SMBs and branch offices.',
  },
];

export const CATEGORIES = [
  { name: 'Servers & Compute', count: 142, icon: 'server' },
  { name: 'Networking', count: 98, icon: 'network' },
  { name: 'Storage', count: 67, icon: 'storage' },
  { name: 'Endpoints', count: 215, icon: 'endpoint' },
  { name: 'Security Appliances', count: 54, icon: 'security' },
  { name: 'Accessories', count: 310, icon: 'accessories' },
] as const;

export const VENDORS = [
  'Cisco',
  'Dell',
  'HPE',
  'Lenovo',
  'Pure Storage',
  'Palo Alto Networks',
  'Fortinet',
  'Arista',
  'Ubiquiti',
  'Juniper',
  'Netapp',
  'Nutanix',
] as const;

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: PRODUCTS,
  category: '',
  vendor: '',
  search: '',
  sortBy: 'availability' as const,
  setCategory: (c) => set({ category: c }),
  setVendor: (v) => set({ vendor: v }),
  setSearch: (s) => set({ search: s }),
  setSortBy: (s) => set({ sortBy: s }),
  filtered: () => {
    const { products, category, vendor, search, sortBy } = get();
    let result = products;
    if (category) result = result.filter((p) => p.category === category);
    if (vendor) result = result.filter((p) => p.vendor === vendor);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // availability: ok first, then low, then out
      const order = { ok: 0, low: 1, out: 2 };
      return order[a.stockStatus] - order[b.stockStatus];
    });
    return result;
  },
}));
