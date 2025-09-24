import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

/**
 * Button component with multiple variants and sizes
 * Supports loading states and accessibility features
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading && (
        <div className="spinner mr-2" />
      )}
      {children}
    </motion.button>
  );
}

/**
 * Icon button component for icon-only buttons
 */
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      className={cn('p-2', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
}



