export type Move = 'rock' | 'paper' | 'scissors';

export type Player = {
  id: string;
  name: string;
  isGhost: boolean;
  cursedMove?: Move;
};

export type Match = {
  id: string;
  player1: Player;
  player2: Player;
  winner?: Player;
  round: number;
  player1Move?: Move;
  player2Move?: Move;
};

export type GamePhase =
  | { type: 'setup' }
  | { type: 'bracket'; matches: Match[]; currentRound: number }
  | { type: 'curse'; match: Match; ghosts: Player[]; curseIndex: number }
  | { type: 'throw'; match: Match; currentPlayer: 1 | 2 }
  | { type: 'waiting'; match: Match }
  | { type: 'result'; match: Match; winner: Player }
  | { type: 'victory'; winner: Player };

export type GameState = {
  phase: GamePhase;
  players: Player[];
  allMatches: Match[];
};
