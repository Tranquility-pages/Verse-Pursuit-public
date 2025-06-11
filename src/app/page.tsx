'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GameScreen } from '@/components/game/GameScreen';

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return <GameScreen onBackToMenu={() => setShowGame(false)} />;
  }

  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('/assets/backgrounds/Main_menu_screen.png')`,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/assets/images/App-Icon-1024x1024@1x.png" 
              alt="Verse Pursuit" 
              className="w-16 h-16 md:w-20 md:h-20 mr-4"
            />
            <h1 className="text-5xl md:text-6xl font-biblical text-white drop-shadow-2xl">
              Verse Pursuit
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white drop-shadow-lg mb-8 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4">
            Complete Bible verses by placing word tiles in the correct order
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-center space-x-2 text-white bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3">
              <span>📖</span>
              <span className="text-sm md:text-base">474 Bible verses across multiple categories</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3">
              <span>🎯</span>
              <span className="text-sm md:text-base">Single-player mode with AI opponent</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3">
              <span>⏱️</span>
              <span className="text-sm md:text-base">Turn-based gameplay with hints and scoring</span>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGame(true)}
              className="px-8 py-4 bg-gradient-to-r from-biblical-600 to-biblical-700 text-white text-xl font-semibold rounded-lg hover:from-biblical-700 hover:to-biblical-800 transition-all shadow-2xl border-2 border-white border-opacity-20"
            >
              🎮 Start Playing
            </motion.button>

            <div className="text-sm text-white bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-2">
              No sign-up required • Play instantly in your browser
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-white border-opacity-20">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3 flex items-center">
              ⚡ Easy & Hard Modes
            </h3>
            <p className="text-biblical-600 text-sm">
              Choose your difficulty level. Easy mode provides helpful word hints to get you started.
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-white border-opacity-20">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3 flex items-center">
              📚 Multiple Categories
            </h3>
            <p className="text-biblical-600 text-sm">
              Play with verses from Psalms, Famous Verses, Promises, and more biblical themes.
            </p>
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-white border-opacity-20">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3 flex items-center">
              🤖 Smart AI Opponent
            </h3>
            <p className="text-biblical-600 text-sm">
              Challenge yourself against an AI that adapts to the difficulty level you choose.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}