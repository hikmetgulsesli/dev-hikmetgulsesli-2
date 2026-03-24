'use client';

import * as React from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      type = 'text',
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    const [, setIsFocused] = React.useState(false);

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`
            w-full bg-surface-container border rounded-md
            text-on-surface placeholder:text-on-surface-variant
            transition-all duration-150 ease-out
            focus:outline-none
            ${leftIcon ? 'pl-10' : sizeStyles[inputSize]}
            ${rightIcon ? 'pr-10' : sizeStyles[inputSize]}
            ${error
              ? 'border-error focus:border-error ring-2 ring-error/20 focus:ring-error/20'
              : 'border-outline focus:border-primary ring-2 focus:ring-primary/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          aria-invalid={error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {rightIcon}
          </div>
        )}
        {error && errorMessage && (
          <p id={`${props.id}-error`} className="mt-1.5 text-xs text-error font-label">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
