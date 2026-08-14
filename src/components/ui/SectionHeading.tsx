interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, action, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`flex items-start justify-between mb-6 ${align === 'center' ? 'text-center' : ''}`}>
      <div className={align === 'center' ? 'mx-auto' : ''}>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        {align === 'left' && <div className="mt-2 w-12 h-1 bg-indigo-600 rounded" />}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
