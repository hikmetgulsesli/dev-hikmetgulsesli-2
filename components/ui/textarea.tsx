'use client';

import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  showCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      error = false,
      errorMessage,
      showCount = false,
      maxLength,
      autoResize = false,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCharCount(newValue.length);
      onChange?.(e);

      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={`
            w-full bg-surface-container border rounded-md
            text-on-surface placeholder:text-on-surface-variant
            transition-all duration-150 ease-out
            focus:outline-none resize-y
            px-4 py-3 text-base
            ${error
              ? 'border-error focus:border-error ring-2 ring-error/20 focus:ring-error/20'
              : 'border-outline focus:border-primary ring-2 focus:ring-primary/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {showCount && maxLength && (
          <div className={`absolute right-3 bottom-3 text-xs font-label ${charCount >= maxLength ? 'text-error' : 'text-on-surface-variant'}`}>
            {charCount}/{maxLength}
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

Textarea.displayName = 'Textarea';
