interface TagProps {
  children: React.ReactNode;
  variant?: 'stock-ok' | 'stock-low' | 'stock-out' | 'vendor' | 'default';
  className?: string;
}

export function Tag({ variant = 'default', className = '', children }: TagProps) {
  const variants: Record<string, string> = {
    'stock-ok': 'bg-success/10 text-success border border-success/30',
    'stock-low': 'bg-warning/10 text-warning border border-warning/30',
    'stock-out': 'bg-danger/10 text-danger border border-danger/30',
    vendor: 'bg-accent/10 text-accent border border-accent/30',
    default: 'bg-bg-elevated text-text-secondary border border-border',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
