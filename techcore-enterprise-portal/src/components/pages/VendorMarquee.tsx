const VENDORS = [
  'Cisco',
  'Dell Technologies',
  'HPE',
  'Lenovo',
  'Fortinet',
  'Ubiquiti',
  'Palo Alto Networks',
  'Pure Storage',
  'Arista Networks',
  'Juniper Networks',
  'Netapp',
  'Nutanix',
];

export default function VendorMarquee() {
  return (
    <section className="border-y border-border bg-surface/30 overflow-hidden py-5">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-base to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-base to-transparent z-10" />
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...VENDORS, ...VENDORS].map((vendor, i) => (
            <span
              key={i}
              className="text-text-muted text-sm font-mono font-medium tracking-widest uppercase cursor-default hover:text-accent transition-colors duration-200"
            >
              {vendor}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
