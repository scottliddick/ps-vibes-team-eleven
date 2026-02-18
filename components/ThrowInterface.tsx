'use client';

import { useState } from 'react';
import { Move, Player } from '@/lib/types';

interface ThrowInterfaceProps {
  player: Player;
  onThrow: (move: Move) => void;
}

export default function ThrowInterface({ player, onThrow }: ThrowInterfaceProps) {
  const [showReady, setShowReady] = useState(true);

  if (showReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {player.name}&apos;s Turn
          </h2>
          {player.cursedMove && (
            <div className="mb-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg">
              <p className="text-red-300 font-bold">⚠️ You&apos;ve been cursed by a ghost!</p>
              <p className="text-red-200 text-sm">Your move has been influenced...</p>
            </div>
          )}
          <p className="text-purple-200 mb-8">
            Make sure only {player.name} can see the screen
          </p>
          <button
            onClick={() => setShowReady(false)}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            I&apos;m Ready!
          </button>
        </div>
      </div>
    );
  }

  const moves: { value: Move; emoji: string; label: string; color: string }[] = [
    { value: 'rock', emoji: '🪨', label: 'Rock', color: 'from-gray-500 to-gray-600' },
    { value: 'paper', emoji: '📄', label: 'Paper', color: 'from-blue-500 to-blue-600' },
    { value: 'scissors', emoji: '✂️', label: 'Scissors', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-white text-center mb-2">
          {player.name}
        </h2>
        <p className="text-purple-200 text-center mb-8">Choose your move!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moves.map((move) => (
            <button
              key={move.value}
              onClick={() => onThrow(move.value)}
              className={`bg-gradient-to-br ${move.color} hover:scale-105 transform transition p-8 rounded-2xl shadow-2xl group`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition">
                {move.emoji}
              </div>
              <div className="text-2xl font-bold text-white">
                {move.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
