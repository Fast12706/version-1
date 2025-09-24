import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

/**
 * Card component with modern design and subtle animations
 * Supports hover effects and dark mode
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01 } : undefined}
      className={cn(
        'card',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card header component for consistent spacing
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card content component for main content area
 */
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card footer component for actions
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('mt-6 pt-4 border-t border-border-light dark:border-border-dark', className)}
      {...props}
    >
      {children}
    </div>
  );
}



