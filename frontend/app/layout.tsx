import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Emergency-Mind | AI-Powered Medical Documentation',
  description: 'Generate medico-legal documents quickly and accurately with AI assistance for healthcare professionals.',
  keywords: ['medical', 'AI', 'documentation', 'emergency', 'healthcare', 'legal'],
};

/**
 * Root layout component
 * Provides the basic HTML structure and global styles
 * Supports dark mode with class-based theming
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <div className="min-h-screen bg-surface-light-secondary dark:bg-surface-dark transition-colors duration-200">
          {/* Navigation Header */}
          <Navbar />

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
