const vendors = [
  'Microsoft', 'Salesforce', 'SAP', 'Oracle', 'ServiceNow',
  'Workday', 'HubSpot', 'Slack', 'Snowflake', 'Atlassian',
];

export function VendorMarquee() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
          Trusted by enterprises worldwide
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {vendors.map((vendor) => (
            <span key={vendor} className="text-gray-400 font-bold text-xl tracking-wide">
              {vendor}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
