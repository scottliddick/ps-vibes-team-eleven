import { Move, Player, Match } from './types';

export function resolveThrow(move1: Move, move2: Move): 'p1' | 'p2' | 'tie' {
  if (move1 === move2) return 'tie';
  
  if (
    (move1 === 'rock' && move2 === 'scissors') ||
    (move1 === 'scissors' && move2 === 'paper') ||
    (move1 === 'paper' && move2 === 'rock')
  ) {
    return 'p1';
  }
  
  return 'p2';
}

export function generateBracket(players: Player[]): Match[] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  
  const round1Matches: Match[] = [
    {
      id: 'match-1',
      player1: shuffled[0],
      player2: shuffled[1],
      round: 1,
    },
    {
      id: 'match-2',
      player1: shuffled[2],
      player2: shuffled[3],
      round: 1,
    },
  ];
  
  return round1Matches;
}

export function applyCurse(player: Player, intendedMove: Move): Move {
  if (player.cursedMove) {
    return player.cursedMove;
  }
  return intendedMove;
}

export function createFinalMatch(winner1: Player, winner2: Player): Match {
  return {
    id: 'finals',
    player1: winner1,
    player2: winner2,
    round: 2,
  };
}

export function getMoveEmoji(move: Move): string {
  switch (move) {
    case 'rock': return '🪨';
    case 'paper': return '📄';
    case 'scissors': return '✂️';
  }
}
