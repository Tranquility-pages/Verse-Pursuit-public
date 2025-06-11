'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlayerState } from '@/game/types';
import { AvatarDisplay } from './AvatarDisplay';

interface ScoreDisplayProps {
  player1: PlayerState;
  player2: PlayerState;
  activePlayer: 'player1' | 'player2';
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1,
  player2,
  activePlayer,
  className = ''
}) => {
  const renderPlayerScore = (player: PlayerState, playerId: 'player1' | 'player2') => {
    const isActive = activePlayer === playerId;
    const playerLabel = playerId === 'player1' ? 'You' : 'Computer';
    
    return (
      <motion.div
        layout
        className={`
          relative rounded-lg border-2 p-4
          ${isActive 
            ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100' 
            : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
          }
          transition-all duration-300
        `}
        whileHover={{ scale: 1.02 }}
        animate={isActive ? { 
          boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)" 
        } : {}}
      >
        {/* Active indicator dot */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Player Info Row */}
        <div className="flex items-center space-x-3 mb-3">
          <AvatarDisplay
            avatarId={player.avatar || "1"}
            name={player.name}
            size={40}
            isActive={isActive}
          />
          <div>
            <h3 className={`
              font-bold text-lg
              ${isActive ? 'text-yellow-800' : 'text-gray-700'}
            `}>
              {playerLabel}
            </h3>
          </div>
        </div>

        {/* Scores */}
        <div className="space-y-3">
          {/* Round Score */}
          <div className="text-center">
            <div className="text-xs text-gray-500 font-medium">Round Score</div>
            <motion.div
              key={player.score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-3xl font-bold ${isActive ? 'text-yellow-700' : 'text-gray-700'}`}
            >
              {player.score}
            </motion.div>
          </div>

          {/* Total Score */}
          <div className="text-center">
            <div className="text-xs text-gray-500 font-medium">Total Score</div>
            <motion.div
              key={player.totalScore}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className={`text-xl font-semibold ${isActive ? 'text-yellow-700' : 'text-gray-600'}`}
            >
              {player.totalScore}
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between text-center border-t pt-2">
            <div>
              <div className="text-xs text-gray-500">Mistakes</div>
              <div className="font-medium text-gray-700">{player.mistakes}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Timeouts</div>
              <div className="font-medium text-gray-700">{player.consecutiveTimeouts}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Words Left</div>
              <div className="font-medium text-gray-700">{player.words.length}</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full ${className}`}>
      {renderPlayerScore(player1, 'player1')}
      {renderPlayerScore(player2, 'player2')}
    </div>
  );
};