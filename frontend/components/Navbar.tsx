'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stethoscope, History } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Navigation bar component
 * Includes app title, navigation links, and theme toggle
 */
export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <Stethoscope className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">
                Emergency-Mind
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                AI-Powered Medical Documentation
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/history"
              className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}


