'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/game', label: 'Play Game' },
    { href: '/support', label: 'Support Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <nav className="bg-white bg-opacity-95 backdrop-blur-sm shadow-lg border-b border-biblical-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/assets/images/App-Icon-1024x1024@1x.png" 
              alt="Verse Pursuit" 
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-xl font-biblical text-biblical-700">Verse Pursuit</span>
              <span className="text-xs text-biblical-500 -mt-1">Pursue. Learn. Grow.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-biblical-600 hover:text-biblical-800 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-biblical-50 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Call to Action */}
            <Link
              href="/game"
              className="bg-gradient-to-r from-biblical-600 to-biblical-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-biblical-700 hover:to-biblical-800 transition-all duration-200 shadow-lg"
            >
              🎮 Play Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-biblical-600 hover:text-biblical-800 focus:outline-none focus:text-biblical-800"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-biblical-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-biblical-600 hover:text-biblical-800 hover:bg-biblical-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/game"
                  className="block mt-3 bg-gradient-to-r from-biblical-600 to-biblical-700 text-white px-3 py-2 rounded-lg font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🎮 Play Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};