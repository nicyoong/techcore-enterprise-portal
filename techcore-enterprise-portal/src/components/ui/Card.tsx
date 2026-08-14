interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`relative rounded-xl border border-border bg-bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.08)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
