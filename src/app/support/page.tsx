'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: `url('/assets/backgrounds/Main_menu_screen.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-biblical text-white mb-6">
              Support Verse Pursuit
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Help us spread God's Word through engaging gameplay
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-biblical text-biblical-700 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-biblical-600 max-w-3xl mx-auto">
              Verse Pursuit is more than a game—it's a ministry. We're committed to making Scripture 
              accessible, engaging, and memorable for believers of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Download the Mobile App */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-biblical-50 rounded-lg p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-semibold text-biblical-700 mb-4">
                  Download the Mobile App
                </h3>
                <p className="text-biblical-600 mb-6">
                  Get the full Verse Pursuit experience on your phone with multiplayer battles, 
                  achievement tracking, and offline gameplay.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/verse-pursuit/id6743778976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
                
                <a 
                  href="#google-play"
                  className="flex items-center justify-center space-x-3 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span className="text-2xl">📲</span>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 text-center">
                <div className="text-sm text-biblical-500 bg-white rounded-lg p-3">
                  ⭐ <strong>100% Ad-Free</strong> - Pure Scripture focus with no distractions
                </div>
              </div>
            </motion.div>

            {/* Spread the Word */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-yellow-50 rounded-lg p-8 shadow-lg"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-2xl font-semibold text-biblical-700 mb-4">
                  Spread the Word
                </h3>
                <p className="text-biblical-600 mb-6">
                  Help us reach more believers by sharing Verse Pursuit with your church, 
                  family, and friends.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-biblical-700 mb-2">🏛️ Share with Your Church</h4>
                  <p className="text-sm text-biblical-600">
                    Perfect for youth groups, Sunday school, and family game nights
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-biblical-700 mb-2">👨‍👩‍👧‍👦 Family Fun</h4>
                  <p className="text-sm text-biblical-600">
                    Engage kids and adults in meaningful Scripture memorization
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-biblical-700 mb-2">📚 Educational Tool</h4>
                  <p className="text-sm text-biblical-600">
                    Ideal for Christian schools and homeschooling families
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  📘 Share on Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  🐦 Share on Twitter
                </button>
              </div>
            </motion.div>
          </div>

          {/* Support Our Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-biblical-700 to-biblical-800 text-white rounded-lg p-8 shadow-xl text-center"
          >
            <h3 className="text-3xl font-biblical mb-6">Support Our Development</h3>
            <p className="text-xl mb-8 text-biblical-200 max-w-3xl mx-auto">
              Verse Pursuit is developed by a small Christian team passionate about making Scripture 
              accessible through technology. Your support helps us continue improving the game and 
              reaching more believers worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">💻 Development</h4>
                <p className="text-sm text-biblical-200">
                  Fund new features, bug fixes, and platform improvements
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">📚 Content</h4>
                <p className="text-sm text-biblical-200">
                  Add more Bible verses, categories, and educational content
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">🌍 Outreach</h4>
                <p className="text-sm text-biblical-200">
                  Translate the game and reach global Christian communities
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
              >
                💖 Donate via PayPal
              </a>
              <div className="text-biblical-300 text-sm">
                Secure donation through PayPal - every contribution helps us improve the game
              </div>
              <div className="text-biblical-300 text-xs mt-2">
                You can also use the "Tip Jar" feature in the mobile app
              </div>
            </div>
          </motion.div>

          {/* Community Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-biblical text-biblical-700 mb-6">
              Join Our Community
            </h3>
            <p className="text-xl text-biblical-600 mb-8 max-w-3xl mx-auto">
              Connect with other believers who are deepening their Bible knowledge through Verse Pursuit
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-biblical-200">
                <div className="text-3xl mb-3">⭐</div>
                <h4 className="font-semibold text-biblical-700 mb-2">Rate & Review</h4>
                <p className="text-sm text-biblical-600">
                  Leave a review on the App Store or Google Play
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg border border-biblical-200">
                <div className="text-3xl mb-3">📧</div>
                <h4 className="font-semibold text-biblical-700 mb-2">Stay Updated</h4>
                <p className="text-sm text-biblical-600">
                  Subscribe for news about updates and new features
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg border border-biblical-200">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-semibold text-biblical-700 mb-2">Partner with Us</h4>
                <p className="text-sm text-biblical-600">
                  Churches and organizations can partner with us
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg border border-biblical-200">
                <div className="text-3xl mb-3">💡</div>
                <h4 className="font-semibold text-biblical-700 mb-2">Share Ideas</h4>
                <p className="text-sm text-biblical-600">
                  Send feedback and suggestions for improvements
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bible Verse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center bg-biblical-50 rounded-lg p-8"
          >
            <blockquote className="text-2xl italic text-biblical-700 mb-4">
              "Let the word of Christ dwell in you richly, teaching and admonishing one another 
              in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in 
              your hearts to God."
            </blockquote>
            <cite className="text-biblical-600 font-semibold">
              — Colossians 3:16 (ESV)
            </cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}