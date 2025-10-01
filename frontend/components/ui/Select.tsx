import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Select component with consistent styling and accessibility
 * Supports error states and labels
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  helperText,
  className,
  options,
  placeholder,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'form-select',
          error && 'border-accent-error focus:ring-accent-error',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
        }
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm text-accent-error"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${selectId}-helper`}
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}




