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
    <main className="min-h-screen bg-gradient-to-b from-parchment-50 to-parchment-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-biblical text-biblical-700 mb-6">
            Verse Pursuit
          </h1>
          
          <p className="text-xl md:text-2xl text-biblical-600 mb-8">
            Complete Bible verses by placing word tiles in the correct order
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-center space-x-2 text-biblical-500">
              <span>📖</span>
              <span>474 Bible verses across multiple categories</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-biblical-500">
              <span>🎯</span>
              <span>Single-player mode with AI opponent</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-biblical-500">
              <span>⏱️</span>
              <span>Turn-based gameplay with hints and scoring</span>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGame(true)}
              className="px-8 py-4 bg-biblical-500 text-white text-xl font-semibold rounded-lg hover:bg-biblical-600 transition-colors shadow-lg"
            >
              Start Playing
            </motion.button>

            <div className="text-sm text-biblical-500">
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
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3">Easy & Hard Modes</h3>
            <p className="text-biblical-600 text-sm">
              Choose your difficulty level. Easy mode provides helpful word hints to get you started.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3">Multiple Categories</h3>
            <p className="text-biblical-600 text-sm">
              Play with verses from Psalms, Famous Verses, Promises, and more biblical themes.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-biblical text-biblical-700 mb-3">Smart AI Opponent</h3>
            <p className="text-biblical-600 text-sm">
              Challenge yourself against an AI that adapts to the difficulty level you choose.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}