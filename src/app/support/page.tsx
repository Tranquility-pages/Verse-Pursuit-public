'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function AppleCompliantSupport() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Clean and Simple */}
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
              Help us keep this Scripture learning tool free for everyone
            </p>
            <p className="text-lg text-biblical-200 max-w-3xl mx-auto">
              Verse Pursuit is a free Bible verse memorization game designed to help believers 
              engage with Scripture in an interactive way. Your support helps us maintain servers 
              and continue development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Our Mission */}
      <section className="py-16 bg-biblical-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-biblical text-biblical-700 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-biblical-600 leading-relaxed">
              We believe Scripture memorization strengthens faith and transforms lives. 
              Verse Pursuit makes learning God's Word engaging and accessible to believers worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-biblical-700 mb-3">Scripture Focus</h3>
              <p className="text-biblical-600">
                Every verse is carefully selected to provide meaningful Bible study and memorization opportunities.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-bold text-biblical-700 mb-3">Always Free</h3>
              <p className="text-biblical-600">
                The complete game experience is free for all users. No premium features or paid content.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-biblical-700 mb-3">Global Reach</h3>
              <p className="text-biblical-600">
                Helping believers around the world engage with Scripture through interactive learning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-biblical text-biblical-700 mb-6">
              How You Can Help
            </h2>
            <p className="text-xl text-biblical-600">
              There are several ways you can support our ministry and help us reach more believers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-biblical-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-biblical-700 mb-4">📱 Share the App</h3>
              <p className="text-biblical-600 mb-6">
                Help us reach more believers by sharing Verse Pursuit with your church, 
                family, and friends. Word of mouth is our most powerful tool for growth.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Recommend to your church group</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Share with family members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Use in Sunday school or youth groups</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-biblical-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-biblical-700 mb-4">⭐ Rate & Review</h3>
              <p className="text-biblical-600 mb-6">
                Your positive reviews help other believers discover Verse Pursuit and 
                understand the value of Scripture-based learning games.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Leave a review on the App Store</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Rate us 5 stars if you enjoy the game</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-biblical-500">•</span>
                  <span className="text-biblical-600">Share your testimony about the app</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ministry Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-biblical-700 to-biblical-800 text-white rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Support Our Ministry</h3>
            <p className="text-biblical-200 mb-6 max-w-2xl mx-auto">
              Verse Pursuit is supported by voluntary donations that help us cover server costs, 
              app store fees, and ongoing development. The app remains completely free regardless of donation status.
            </p>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold mb-3">Your Support Helps Us:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-biblical-200">
                <div>• Maintain game servers</div>
                <div>• Cover app store fees</div>
                <div>• Add new Bible verses</div>
                <div>• Improve game features</div>
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                💖 Support Our Ministry
              </a>
              
              <div className="text-sm text-biblical-300">
                <p>Secure donation via PayPal</p>
                <p className="mt-2">
                  <strong>Disclaimer:</strong> Donations support ministry operations. 
                  No goods, services, or app features are provided in exchange for donations.
                </p>
              </div>
              
              {/* Link to detailed donation page */}
              <div className="mt-6 pt-4 border-t border-white border-opacity-20">
                <a 
                  href="/donate"
                  className="text-yellow-300 hover:text-yellow-200 underline text-sm"
                >
                  Learn more about our ministry impact and support options →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download the Mobile App */}
      <section className="py-16 bg-biblical-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-biblical text-biblical-700 mb-6">
              Download the Mobile App
            </h2>
            <p className="text-xl text-biblical-600">
              Get the complete Verse Pursuit experience on your mobile device
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg text-center"
            >
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-bold text-biblical-700 mb-4">
                Available Now
              </h3>
              <p className="text-biblical-600 mb-6">
                Play against AI opponents, track your progress, and memorize hundreds of Bible verses.
              </p>

              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/verse-pursuit/id6743778976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors w-full"
                >
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
                
                <div className="bg-gray-100 text-gray-500 py-3 px-6 rounded-lg text-center">
                  <span className="text-2xl mb-2 block">📲</span>
                  <div className="text-xs">Coming Soon to</div>
                  <div className="text-base font-semibold">Google Play Store</div>
                </div>
              </div>

              <div className="mt-6 bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <span className="text-lg">⭐</span>
                  <span className="font-bold">100% Free Forever</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Complete game experience with no ads or premium features
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-r from-biblical-100 to-yellow-50 rounded-xl p-8"
          >
            <blockquote className="text-2xl md:text-3xl italic text-biblical-700 mb-4 leading-relaxed">
              "Your word I have hidden in my heart, that I might not sin against You."
            </blockquote>
            <cite className="text-biblical-600 font-bold text-lg">
              — Psalm 119:11 (NKJV)
            </cite>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}