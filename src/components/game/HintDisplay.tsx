'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HintDisplayProps {
  hintsRemaining: number;
  onUseHint?: () => void;
  onPurchaseHints?: () => void;
  canUseHint?: boolean;
  canPurchaseHint?: boolean;
  hintCost?: number;
  className?: string;
}

export const HintDisplay: React.FC<HintDisplayProps> = ({
  hintsRemaining,
  onUseHint,
  onPurchaseHints,
  canUseHint = true,
  canPurchaseHint = true,
  hintCost = 20,
  className = ''
}) => {
  return (
    <div className={`bg-parchment-50 rounded-lg p-4 border border-parchment-200 ${className}`}>
      <div className="text-center">
        {/* Hint Count */}
        <div className="mb-4">
          <div className="text-sm text-biblical-500 mb-1">Hints Available</div>
          <motion.div
            key={hintsRemaining}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-biblical-700"
          >
            {hintsRemaining}
          </motion.div>
        </div>

        {/* Use Hint Button */}
        <motion.button
          whileHover={{ scale: canUseHint ? 1.05 : 1 }}
          whileTap={{ scale: canUseHint ? 0.95 : 1 }}
          onClick={onUseHint}
          disabled={!canUseHint || hintsRemaining === 0}
          className={`
            w-full px-4 py-2 rounded-lg font-medium text-sm mb-3
            transition-colors duration-200
            ${canUseHint && hintsRemaining > 0
              ? 'bg-biblical-500 text-white hover:bg-biblical-600 active:bg-biblical-700'
              : 'bg-parchment-200 text-parchment-500 cursor-not-allowed'
            }
          `}
        >
          Use Hint
        </motion.button>

        {/* Purchase Hints Button */}
        <motion.button
          whileHover={{ scale: canPurchaseHint ? 1.05 : 1 }}
          whileTap={{ scale: canPurchaseHint ? 0.95 : 1 }}
          onClick={onPurchaseHints}
          disabled={!canPurchaseHint}
          className={`
            w-full px-4 py-2 rounded-lg font-medium text-xs
            transition-colors duration-200 border-2
            ${canPurchaseHint
              ? 'border-biblical-400 text-biblical-600 hover:bg-biblical-50 active:bg-biblical-100'
              : 'border-parchment-300 text-parchment-500 cursor-not-allowed'
            }
          `}
        >
          Buy 5 Hints ({hintCost} pts)
        </motion.button>

        {/* Hint Instructions */}
        <div className="mt-3 text-xs text-biblical-500 text-center">
          <p>Hints highlight empty slots that need words</p>
        </div>
      </div>
    </div>
  );
};