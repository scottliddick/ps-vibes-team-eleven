'use client';

import { Player } from '@/lib/types';

type VictoryScreenProps = {
  winner: Player;
  onPlayAgain: () => void;
};

export default function VictoryScreen({ winner, onPlayAgain }: VictoryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl mb-8">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mb-4">
            Victory!
          </h1>
          
          <div className="text-4xl font-bold text-white mb-8">
            {winner.name}
          </div>
          
          <div className="text-xl text-purple-200 mb-8">
            Roshambo Royale Champion
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-xl p-6 mb-8">
            <p className="text-white text-lg">
              Congratulations on surviving the Battle Royale!
            </p>
            <p className="text-purple-200 mt-2">
              You&apos;ve proven yourself as the ultimate rock-paper-scissors warrior.
            </p>
          </div>

          <button
            onClick={onPlayAgain}
            className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            Play Again
          </button>
        </div>

        <div className="text-purple-300 text-sm">
          Thanks for playing Roshambo Royale!
        </div>
      </div>
    </div>
  );
}
