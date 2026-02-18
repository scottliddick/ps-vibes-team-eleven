'use client';

import { useState } from 'react';
import { Move, Player, Match } from '@/lib/types';

interface CurseInterfaceProps {
  ghost: Player;
  match: Match;
  onCurse: (targetPlayerId: string, move: Move) => void;
}

export default function CurseInterface({ ghost, match, onCurse }: CurseInterfaceProps) {
  const livingPlayers = [match.player1, match.player2].filter(p => !p.isGhost);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [showReady, setShowReady] = useState(true);

  if (showReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {ghost.name} (Ghost)
          </h2>
          <p className="text-purple-200 mb-8">
            Time to haunt the living! Make sure only {ghost.name} can see the screen.
          </p>
          <button
            onClick={() => setShowReady(false)}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            I&apos;m Ready to Curse!
          </button>
        </div>
      </div>
    );
  }

  const moves: { value: Move; emoji: string; label: string }[] = [
    { value: 'rock', emoji: '🪨', label: 'Rock' },
    { value: 'paper', emoji: '📄', label: 'Paper' },
    { value: 'scissors', emoji: '✂️', label: 'Scissors' },
  ];

  const handleConfirm = () => {
    if (selectedTarget && selectedMove) {
      onCurse(selectedTarget, selectedMove);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {ghost.name}&apos;s Curse
          </h2>
          <p className="text-purple-200">Force a player to throw a specific move!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Choose Your Target</h3>
          <div className="grid grid-cols-2 gap-4">
            {livingPlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedTarget(player.id)}
                className={`p-4 rounded-lg font-semibold transition ${
                  selectedTarget === player.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Force Them to Throw</h3>
          <div className="grid grid-cols-3 gap-4">
            {moves.map((move) => (
              <button
                key={move.value}
                onClick={() => setSelectedMove(move.value)}
                className={`p-6 rounded-lg transition ${
                  selectedMove === move.value
                    ? 'bg-red-500 text-white scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className="text-4xl mb-2">{move.emoji}</div>
                <div className="font-semibold">{move.label}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selectedTarget || !selectedMove}
          className={`w-full py-4 font-bold rounded-lg shadow-lg transition ${
            selectedTarget && selectedMove
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Cast Curse
        </button>
      </div>
    </div>
  );
}
