'use client';

import { Match, Player } from '@/lib/types';

interface BracketDisplayProps {
  matches: Match[];
  currentRound: number;
  onStartMatch: (match: Match) => void;
}

export default function BracketDisplay({ 
  matches, 
  currentRound, 
  onStartMatch 
}: BracketDisplayProps) {
  const renderPlayer = (player: Player) => (
    <div className={`p-3 rounded-lg ${player.isGhost ? 'bg-gray-600/50 text-gray-300' : 'bg-white/20 text-white'}`}>
      <span className="font-semibold">{player.name}</span>
      {player.isGhost && <span className="ml-2 text-xs">👻</span>}
    </div>
  );

  const renderMatch = (match: Match, index: number) => {
    const isComplete = match.winner !== undefined;
    const isCurrent = match.round === currentRound && !isComplete;

    return (
      <div
        key={match.id}
        className={`border-2 rounded-xl p-4 ${
          isCurrent ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/30 bg-white/5'
        }`}
      >
        <div className="text-center text-sm text-purple-200 mb-3">
          {match.round === 1 ? 'Semifinal' : 'Final'} {match.round === 1 ? index + 1 : ''}
        </div>
        
        <div className="space-y-2 mb-4">
          {renderPlayer(match.player1)}
          <div className="text-center text-white/50 text-sm">VS</div>
          {renderPlayer(match.player2)}
        </div>

        {isComplete ? (
          <div className="text-center py-2 bg-green-500/20 rounded-lg text-green-300 font-bold">
            Winner: {match.winner?.name}
          </div>
        ) : isCurrent ? (
          <button
            onClick={() => onStartMatch(match)}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition"
          >
            Start Match
          </button>
        ) : (
          <div className="text-center py-2 text-white/50 text-sm">Waiting...</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Tournament Bracket
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.filter(m => m.round === currentRound).map((match, index) => renderMatch(match, index))}
        </div>
      </div>
    </div>
  );
}
