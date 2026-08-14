import { HTMLAttributes, forwardRef } from 'react';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'vendor' | 'stock-ok' | 'stock-low' | 'stock-out';
}

const variantStyles: Record<TagProps['variant'], string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  vendor: 'bg-indigo-100 text-indigo-700',
  'stock-ok': 'bg-green-100 text-green-700',
  'stock-low': 'bg-yellow-100 text-yellow-700',
  'stock-out': 'bg-red-100 text-red-700',
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
