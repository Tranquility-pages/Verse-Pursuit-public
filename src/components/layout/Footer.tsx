'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-biblical-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/images/App-Icon-1024x1024@1x.png" 
                alt="Verse Pursuit" 
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-2xl font-biblical text-white">Verse Pursuit</h3>
                <p className="text-biblical-300 text-sm">Pursue. Learn. Grow.</p>
              </div>
            </div>
            <p className="text-biblical-300 mb-4 max-w-md">
              Test your Bible knowledge in a fast-paced, faith-filled Scripture game. 
              Whether challenging friends or training solo, every round strengthens your 
              memory, mind, and mission.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://apps.apple.com/ca/app/verse-pursuit/id6743778976" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                📱 Download on App Store
              </a>
              <a 
                href="#google-play" 
                className="bg-black bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                🤖 Get it on Google Play
              </a>
            </div>
            
            {/* Donation Button */}
            <div className="mt-6">
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg transition-all duration-200 font-semibold text-sm shadow-lg"
              >
                💖 Support Development
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/game" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Play Game
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Support Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#terms" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="mailto:tranquilitypages@gmail.com" className="text-biblical-300 hover:text-white transition-colors duration-200">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-biblical-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-biblical-400 text-sm mb-4 md:mb-0">
            © 2024 Tranquility Pages. All rights reserved.
          </div>
          <div className="text-biblical-400 text-sm text-center">
            <span className="block md:inline">"Thy word have I hid in mine heart, that I might not sin against thee."</span>
            <span className="block md:inline md:ml-2">—Psalm 119:11 (KJV)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};