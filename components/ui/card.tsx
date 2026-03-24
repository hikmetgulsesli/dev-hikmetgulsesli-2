'use client';

import * as React from 'react';

export type CardVariant = 'default' | 'interactive' | 'featured';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface-container border border-outline/10',
  interactive: 'bg-surface-container border border-outline/10 hover:border-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5',
  featured: 'bg-surface-container border-2 border-primary/50 shadow-lg shadow-primary/10',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    const isInteractive = variant === 'interactive' || hover;
    const hoverClasses = hover ? 'hover:border-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5' : '';

    return (
      <div
        ref={ref}
        className={`
          rounded-lg overflow-hidden
          transition-all duration-200 ease-out
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${hoverClasses}
          ${isInteractive ? 'cursor-pointer' : ''}
          ${className}
        `}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={isInteractive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (e.target as HTMLDivElement).click();
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3 ref={ref} className={`font-headline text-xl font-bold tracking-tight ${className}`} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => (
    <p ref={ref} className={`text-sm text-on-surface-variant ${className}`} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`mt-auto flex justify-between items-center pt-4 ${className}`} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
