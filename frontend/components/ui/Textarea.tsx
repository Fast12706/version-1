import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Textarea component with consistent styling and accessibility
 * Supports error states and labels
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'form-textarea',
          error && 'border-accent-error focus:ring-accent-error',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${textareaId}-error`}
          className="text-sm text-accent-error"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${textareaId}-helper`}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}



