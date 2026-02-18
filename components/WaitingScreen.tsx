'use client';

import { Player } from '@/lib/types';

interface WaitingScreenProps {
  nextPlayer: Player;
  onContinue: () => void;
}

export default function WaitingScreen({ nextPlayer, onContinue }: WaitingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl max-w-md w-full text-center">
        <div className="text-6xl mb-6 animate-pulse">🔒</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Move Locked In!
        </h2>
        <p className="text-purple-200 mb-8">
          Pass the device to {nextPlayer.name}
        </p>
        <button
          onClick={onContinue}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition"
        >
          {nextPlayer.name} Ready!
        </button>
      </div>
    </div>
  );
}
