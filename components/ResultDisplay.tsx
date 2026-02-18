'use client';

import { Match, Player, Move } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

interface ResultDisplayProps {
  match: Match;
  winner: Player;
  onContinue: () => void;
}

const moveEmoji: Record<Move, string> = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
};

function getWinnerVideo(winnerMove: Move, loserMove: Move): string | null {
  if (winnerMove === 'paper' && loserMove === 'rock') {
    return '/winner-videos/paper-covers-rock.mp4';
  }
  if (winnerMove === 'scissors' && loserMove === 'paper') {
    return '/winner-videos/scissors-beat-paper.mp4';
  }
  if (winnerMove === 'rock' && loserMove === 'scissors') {
    return '/winner-videos/rock-beats-scissors.mp4';
  }
  return null;
}

export default function ResultDisplay({ match, winner, onContinue }: ResultDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const winnerMove = winner.id === match.player1.id ? match.player1Move : match.player2Move;
  const loserMove = winner.id === match.player1.id ? match.player2Move : match.player1Move;
  const videoSrc = winnerMove && loserMove ? getWinnerVideo(winnerMove, loserMove) : null;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video autoplay failed:', err);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {match.round === 1 ? 'Semifinal' : 'Final'} Result
        </h1>

        {videoSrc && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full max-h-[350px] object-contain"
              onEnded={() => setVideoEnded(true)}
              playsInline
            />
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-4 items-center mb-8">
            <div className={`text-center p-6 rounded-xl ${
              winner?.id === match.player1.id ? 'bg-green-500/30 border-2 border-green-500' : 'bg-white/10'
            }`}>
              <div className="text-2xl font-bold text-white mb-2">
                {match.player1.name}
              </div>
              <div className="text-7xl mb-2">
                {match.player1Move && moveEmoji[match.player1Move]}
              </div>
              <div className="text-xl text-purple-200">
                {match.player1Move}
              </div>
              {match.player1.cursedMove && (
                <div className="mt-2 text-sm text-red-300">
                  👻 Cursed!
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-white">VS</div>
            </div>

            <div className={`text-center p-6 rounded-xl ${
              winner?.id === match.player2.id ? 'bg-green-500/30 border-2 border-green-500' : 'bg-white/10'
            }`}>
              <div className="text-2xl font-bold text-white mb-2">
                {match.player2.name}
              </div>
              <div className="text-7xl mb-2">
                {match.player2Move && moveEmoji[match.player2Move]}
              </div>
              <div className="text-xl text-purple-200">
                {match.player2Move}
              </div>
              {match.player2.cursedMove && (
                <div className="mt-2 text-sm text-red-300">
                  👻 Cursed!
                </div>
              )}
            </div>
          </div>

          <div className="text-center py-6 bg-green-500/20 border-2 border-green-500 rounded-xl">
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-3xl font-bold text-green-300 mb-2">
              {winner.name} Wins!
            </div>
            <div className="text-green-200">
              {winner.id === match.player1.id ? match.player2.name : match.player1.name} becomes a ghost 👻
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
