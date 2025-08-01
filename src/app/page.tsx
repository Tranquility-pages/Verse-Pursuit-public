'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center"
        style={{
          background: `linear-gradient(135deg, #8B4513 0%, #D2691E 25%, #DEB887 50%, #F5DEB3 75%, #FAEBD7 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/assets/backgrounds/game_background_desktop.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/assets/images/bible_android12.png" 
                alt="Verse Pursuit" 
                className="w-20 h-20 md:w-24 md:h-24 mr-6 rounded-2xl"
              />
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-biblical text-white drop-shadow-2xl">
                  Verse Pursuit
                </h1>
                <p className="text-xl md:text-2xl text-yellow-300 drop-shadow-lg mt-2">
                  Pursue. Learn. Grow.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl text-white drop-shadow-lg mb-6 max-w-4xl mx-auto">
              The Ultimate Scripture Challenge
            </h2>
            
            <p className="text-lg md:text-xl text-white drop-shadow-lg mb-8 max-w-3xl mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-6">
              Test your Bible knowledge in a fast-paced, faith-filled Scripture game that sharpens your recall and strategic thinking—all while deepening your connection to God&apos;s Word.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/game"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xl font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl border-2 border-white border-opacity-20"
              >
                🎮 Play Free Online
              </Link>
              <div className="text-white text-sm">or</div>
              <div className="flex gap-3">
                <a 
                  href="https://apps.apple.com/ca/app/verse-pursuit/id6743778976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-all border border-white border-opacity-20"
                >
                  📱 App Store
                </a>
                <a 
                  href="https://play.google.com/store/search?q=Verse%20Pursuit&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-all border border-white border-opacity-20"
                >
                  🤖 Google Play
                </a>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-8 border-2 border-yellow-400 border-opacity-30 shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl mb-4">💝</div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-3">Keep Verse Pursuit Free for Everyone</h3>
                  <p className="text-white text-lg mb-6 leading-relaxed">
                    This is a 100% ad-free ministry project. Your support helps us continue developing this Scripture game and reaching believers worldwide.
                  </p>
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xl font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl border-2 border-yellow-300"
                  >
                    💖 Support the Project
                  </a>
                  <div className="text-yellow-200 text-sm mt-4 italic">
                    "Freely you have received; freely give." — Matthew 10:8
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gameplay Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-4">
              How to Play
            </h2>
            <p className="text-xl text-biblical-600 max-w-3xl mx-auto">
              Simple to learn, challenging to master. Reconstruct Bible verses by finding the missing words before your opponent does.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-biblical-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Choose Your Verse</h3>
                    <p className="text-biblical-600">Select from categories like Psalms, Famous Verses, Promises, and more biblical themes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-biblical-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Find Missing Words</h3>
                    <p className="text-biblical-600">Use strategy and Bible knowledge to place the correct words in the right positions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-biblical-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Race Against Time</h3>
                    <p className="text-biblical-600">Complete verses quickly for bonus points. The clock is ticking!</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-biblical-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-biblical-700 mb-2">Win & Grow</h3>
                    <p className="text-biblical-600">Earn points, level up, and deepen your connection to God's Word with every victory.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/assets/screenshots/02_Gameplay_Word_Selection.png" 
                  alt="Verse Pursuit Gameplay" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                  Live Gameplay!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-biblical-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-4">
              Game Features
            </h2>
            <p className="text-xl text-biblical-600">
              Everything you need for an engaging Scripture experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            {[
              {
                icon: "👥",
                title: "Real-Time Multiplayer",
                description: "Challenge friends and family in live Scripture battles"
              },
              {
                icon: "🤖",
                title: "Smart AI Opponents",
                description: "Practice against AI that adapts to your skill level"
              },
              {
                icon: "🎯",
                title: "Multiple Difficulty Levels",
                description: "From Scripture Seeker to Verse Master - find your level"
              },
              {
                icon: "💬",
                title: "Safe Chat System",
                description: "Communicate with preset faith-friendly messages"
              },
              {
                icon: "🏆",
                title: "Achievement System",
                description: "Track progress and unlock new biblical characters"
              },
              {
                icon: "🎨",
                title: "Customizable Themes",
                description: "Choose from 6 beautiful color themes for word tiles"
              },
              {
                icon: "📚",
                title: "Verse Categories",
                description: "Psalms, Promises, Famous Verses, and more"
              },
              {
                icon: "🔇",
                title: "100% Ad-Free",
                description: "Pure Scripture focus with no distractions"
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Friendly",
                description: "Perfect for all ages and church gatherings"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-biblical-700 mb-3">{feature.title}</h3>
                <p className="text-biblical-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-4">
              Game Screenshots
            </h2>
            <p className="text-xl text-biblical-600">
              See Verse Pursuit in action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: "/assets/screenshots/01_Main_Menu_Screen.png", alt: "Main Menu" },
              { src: "/assets/screenshots/02_Gameplay_Word_Selection.png", alt: "Gameplay" },
              { src: "/assets/screenshots/05_Game_Complete.png", alt: "Victory Screen" },
              { src: "/assets/screenshots/06_Profile_screen.png", alt: "Player Profile" },
              { src: "/assets/screenshots/08_setting_screen.png", alt: "Settings" },
              { src: "/assets/screenshots/09_Categories_screen.png", alt: "Categories" }
            ].map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <img 
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-4xl md:text-5xl font-biblical text-biblical-700 mb-6">
              Support Our Work
            </h2>
            <p className="text-xl text-biblical-600 mb-8 max-w-3xl mx-auto">
              Verse Pursuit is a 100% ad-free ministry project. Your generous donations help us continue 
              developing this Scripture game and reaching more believers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=LNPYUUA3ADNX4"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-bold rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-xl"
              >
                💖 Donate via PayPal
              </a>
              <Link
                href="/support"
                className="px-6 py-3 border-2 border-biblical-500 text-biblical-700 font-semibold rounded-lg hover:bg-biblical-50 transition-all"
              >
                Learn More Ways to Support
              </Link>
            </div>
            
            <div className="text-biblical-500 text-sm">
              Every donation helps us add new features, verses, and reach more Christian communities
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-biblical-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-biblical mb-6">
              Ready to Master Scripture?
            </h2>
            <p className="text-xl mb-8 text-biblical-200">
              Join thousands of players deepening their Bible knowledge through engaging gameplay
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/game"
                className="px-8 py-4 bg-yellow-500 text-black text-xl font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-xl"
              >
                🎮 Start Playing Free
              </Link>
              <div className="text-biblical-300">or download the mobile app</div>
            </div>
            
            <div className="mt-8 text-biblical-300 italic">
              &ldquo;Thy word have I hid in mine heart, that I might not sin against thee.&rdquo;<br />
              —Psalm 119:11 (KJV)
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}