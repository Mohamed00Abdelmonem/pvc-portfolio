import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'primary' | 'sky' | 'light' | 'outline';
  className?: string;
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon = true
}) => {
  const variantStyles = {
    navy: 'bg-brand-navy text-white border-brand-navy-light',
    primary: 'bg-brand-primary/15 text-brand-primary border-brand-primary/40',
    sky: 'bg-brand-sky/20 text-brand-navy border-brand-sky/40',
    light: 'bg-brand-light text-brand-primary border-brand-light-border',
    outline: 'bg-transparent text-brand-slate border-brand-light-border'
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-xs tracking-wider uppercase font-medium rounded-sm border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="text-brand-primary text-[10px]">✳</span>}
      <span>{children}</span>
    </span>
  );
};
