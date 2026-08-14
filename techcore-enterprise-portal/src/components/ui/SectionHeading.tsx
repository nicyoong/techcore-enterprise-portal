interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ label, title, subtitle, align = 'left' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-8 ${alignClass}`}>
      {label && (
        <span className="inline-block font-mono text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary max-w-2xl">{subtitle}</p>
      )}
      {align === 'left' && (
        <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-accent/60 to-transparent rounded-full" />
      )}
    </div>
  );
}
