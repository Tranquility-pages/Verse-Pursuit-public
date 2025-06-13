'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Powerful Donation Appeal */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24"
        style={{
          backgroundImage: `url('/assets/backgrounds/Main_menu_screen.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-biblical text-white mb-8">
              Support God's Work
            </h1>
            <p className="text-2xl md:text-3xl text-yellow-400 mb-8 font-semibold">
              Help Us Spread Scripture Through Gaming
            </p>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
              Verse Pursuit has helped thousands of believers memorize Scripture and grow in their faith. 
              <span className="text-yellow-300 font-semibold"> Your support keeps this ministry free and growing.</span>
            </p>
            
            {/* Primary Donation CTA */}
            <div className="space-y-6">
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-12 py-6 rounded-2xl text-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-2xl"
              >
                💖 Donate Now - Support Scripture Gaming
              </a>
              <p className="text-white text-lg">
                🔒 Secure donation via PayPal • Every dollar directly supports the ministry
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-biblical-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-6">
              Your Impact in Numbers
            </h2>
            <p className="text-xl text-biblical-600 max-w-3xl mx-auto">
              See how your support is already transforming lives through Scripture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-biblical-700 mb-2">20,000+</div>
              <div className="text-xl text-biblical-600 font-semibold">Players Reached</div>
              <div className="text-sm text-biblical-500 mt-2">Believers engaging with Scripture daily</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-biblical-700 mb-2">200,000+</div>
              <div className="text-xl text-biblical-600 font-semibold">Verses Completed</div>
              <div className="text-sm text-biblical-500 mt-2">Scripture passages memorized</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-biblical-700 mb-2">100%</div>
              <div className="text-xl text-biblical-600 font-semibold">Ad-Free Experience</div>
              <div className="text-sm text-biblical-500 mt-2">Pure Scripture focus, no distractions</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="text-5xl font-bold text-biblical-700 mb-2">$0</div>
              <div className="text-xl text-biblical-600 font-semibold">Cost to Players</div>
              <div className="text-sm text-biblical-500 mt-2">Free forever through your support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Need Support */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-6">
              Why Your Support Matters
            </h2>
            <p className="text-xl text-biblical-600 max-w-4xl mx-auto">
              Verse Pursuit is a <strong>faith-driven ministry</strong>, not a commercial business. 
              We depend on believers like you to keep this Scripture tool alive and growing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center">
                  ⚠️ The Reality We Face
                </h3>
                <ul className="space-y-3 text-red-600">
                  <li>• Server costs: $200/month to keep the game running</li>
                  <li>• App store fees: $100/year per platform</li>
                  <li>• Development tools: $300/month for professional software</li>
                  <li>• Content creation: Hundreds of hours of volunteer time</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center">
                  🎯 Our Commitment
                </h3>
                <ul className="space-y-3 text-yellow-600">
                  <li>• <strong>100% of donations</strong> go directly to the ministry</li>
                  <li>• <strong>No salaries</strong> - we serve as volunteers</li>
                  <li>• <strong>Complete transparency</strong> in how funds are used</li>
                  <li>• <strong>Kingdom focus</strong> - not profit driven</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold mb-6 text-center">What Your Donation Funds</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">💻</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Game Development</h4>
                      <p className="text-green-100">New features, bug fixes, and platform improvements to enhance Scripture engagement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">📚</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Scripture Content</h4>
                      <p className="text-green-100">Adding more Bible verses, translations, and educational categories</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🌍</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Global Outreach</h4>
                      <p className="text-green-100">Translating the game to reach Christian communities worldwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🚀</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Ministry Growth</h4>
                      <p className="text-green-100">Server capacity, app store presence, and reaching more believers</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 bg-gradient-to-r from-biblical-700 to-biblical-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-biblical text-white mb-6">
              <motion.span
                key="kingdom-investment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                Choose Your Kingdom Investment
              </motion.span>
            </h2>
            <p className="text-xl text-biblical-200 max-w-3xl mx-auto">
              Every contribution, no matter the size, makes an eternal difference in spreading God's Word
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Supporter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-biblical-700 mb-4">Supporter</h3>
              <div className="text-4xl font-bold text-biblical-700 mb-6">$10</div>
              <ul className="text-left space-y-3 text-biblical-600 mb-8">
                <li>• Keeps the game running for 200+ players for one day</li>
                <li>• Covers basic server costs</li>
                <li>• Shows your heart for Scripture ministry</li>
                <li>• Makes the game accessible to those who can't give</li>
              </ul>
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4&amount=10"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-biblical-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-biblical-700 transition-colors"
              >
                Donate $10
              </a>
            </motion.div>

            {/* Partner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center shadow-xl transform scale-105 border-4 border-yellow-300"
            >
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-black mb-2">Ministry Partner</h3>
              <div className="bg-black text-yellow-400 text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">MOST POPULAR</div>
              <div className="text-4xl font-bold text-black mb-6">$50</div>
              <ul className="text-left space-y-3 text-black mb-8">
                <li>• Funds game operation for one full week</li>
                <li>• Supports new Scripture content development</li>
                <li>• Helps us reach 1,000+ new believers</li>
                <li>• Enables platform improvements and features</li>
              </ul>
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4&amount=50"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black text-yellow-400 py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Become a Partner - $50
              </a>
            </motion.div>

            {/* Champion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl"
            >
              <div className="text-4xl mb-4">👑</div>
              <h3 className="text-2xl font-bold text-biblical-700 mb-4">Scripture Champion</h3>
              <div className="text-4xl font-bold text-biblical-700 mb-6">$100</div>
              <ul className="text-left space-y-3 text-biblical-600 mb-8">
                <li>• Powers the ministry for half a month</li>
                <li>• Funds major feature development</li>
                <li>• Supports global translation efforts</li>
                <li>• Makes eternal impact on thousands of lives</li>
              </ul>
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4&amount=100"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-biblical-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-biblical-700 transition-colors"
              >
                Champion Scripture - $100
              </a>
            </motion.div>

            {/* Kingdom Patron - $500+ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-center shadow-xl border-4 border-purple-400"
            >
              <div className="text-4xl mb-4">👼</div>
              <h3 className="text-2xl font-bold text-white mb-2">Kingdom Patron</h3>
              <div className="bg-white text-purple-600 text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">APP RECOGNITION</div>
              <div className="text-4xl font-bold text-white mb-6">$500+</div>
              <ul className="text-left space-y-3 text-purple-100 mb-8">
                <li>• Powers the entire ministry for a full month</li>
                <li>• Your name honored in the mobile app</li>
                <li>• Special patron badge and recognition</li>
                <li>• Direct impact on thousands of believers worldwide</li>
                <li>• Exclusive updates on ministry growth</li>
              </ul>
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4&amount=500"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Become a Kingdom Patron - $500
              </a>
            </motion.div>
          </div>

          {/* Custom Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Give What God Leads You To</h3>
              <p className="text-biblical-200 mb-6">
                Every amount is a blessing. Click below to give any amount you feel led to contribute.
              </p>
              <a 
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-yellow-400 transition-colors"
              >
                💝 Give Custom Amount
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile App Download */}
      <section className="py-20 bg-biblical-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-6">
              Experience the Full Game
            </h2>
            <p className="text-xl text-biblical-600 max-w-3xl mx-auto">
              Download the mobile app for the complete Verse Pursuit experience with multiplayer, achievements, and more Scripture content
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center"
            >
              <div className="text-6xl mb-6">📱</div>
              <h3 className="text-3xl font-bold text-biblical-700 mb-6">
                Download Verse Pursuit
              </h3>
              <p className="text-lg text-biblical-600 mb-8">
                Get the full mobile experience with multiplayer battles, achievement tracking, 
                offline play, and hundreds of Bible verses to master.
              </p>

              <div className="space-y-4 max-w-md mx-auto">
                <a 
                  href="https://apps.apple.com/ca/app/verse-pursuit/id6743778976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-black text-white py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors w-full"
                >
                  <span className="text-3xl">🍎</span>
                  <div className="text-left">
                    <div className="text-sm">Download on the</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </a>
                
                <div className="bg-gray-100 text-gray-500 py-4 px-6 rounded-xl text-center">
                  <span className="text-3xl mb-2 block">📲</span>
                  <div className="text-sm">Coming Soon to</div>
                  <div className="text-lg font-semibold">Google Play Store</div>
                </div>
              </div>

              <div className="mt-8 bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <span className="text-2xl">⭐</span>
                  <span className="font-bold text-lg">100% Ad-Free Forever</span>
                </div>
                <p className="text-green-600 mt-2">
                  Pure Scripture focus with no distractions - supported by believers like you
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-r from-biblical-100 to-yellow-50 rounded-2xl p-12"
          >
            <blockquote className="text-3xl md:text-4xl italic text-biblical-700 mb-6 leading-relaxed">
              "Let the word of Christ dwell in you richly, teaching and admonishing one another 
              in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in 
              your hearts to God."
            </blockquote>
            <cite className="text-biblical-600 font-bold text-xl">
              — Colossians 3:16 (ESV)
            </cite>
            <div className="mt-8 text-biblical-500">
              <p className="text-lg">
                This is why we do what we do. Your support helps the Word of Christ dwell richly in believers around the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}