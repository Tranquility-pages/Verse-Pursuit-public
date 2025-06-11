'use client';

import { GameScreen } from '@/components/game/GameScreen';
import { Navigation } from '@/components/layout/Navigation';

export default function GamePage() {
  return (
    <div className="min-h-screen">
      <GameScreen />
    </div>
  );
}