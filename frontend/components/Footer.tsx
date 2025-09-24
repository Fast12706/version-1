'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Footer component
 * Minimal footer with app information
 */
export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-12"
    >
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
            <span>Emergency-Mind v1.0.0</span>
            <span>•</span>
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="h-4 w-4 text-red-500" />
            </motion.div>
            <span>for healthcare professionals</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            AI-Powered Medical Documentation System
          </p>
        </div>
      </div>
    </motion.footer>
  );
}



