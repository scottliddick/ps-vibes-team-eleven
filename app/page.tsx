'use client';

import { useState } from 'react';
import { GameState, Player, Match, Move } from '@/lib/types';
import { generateBracket, resolveThrow, applyCurse, createFinalMatch } from '@/lib/game-logic';
import PlayerSetup from '@/components/PlayerSetup';
import BracketDisplay from '@/components/BracketDisplay';
import ThrowInterface from '@/components/ThrowInterface';
import CurseInterface from '@/components/CurseInterface';
import ResultDisplay from '@/components/ResultDisplay';
import VictoryScreen from '@/components/VictoryScreen';
import WaitingScreen from '@/components/WaitingScreen';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    phase: { type: 'setup' },
    players: [],
    allMatches: [],
  });

  const handleStart = (names: string[]) => {
    const players: Player[] = names.map((name, i) => ({
      id: `player-${i}`,
      name,
      isGhost: false,
    }));

    const matches = generateBracket(players);

    setGameState({
      phase: { type: 'bracket', matches, currentRound: 1 },
      players,
      allMatches: matches,
    });
  };

  const handleStartMatch = (match: Match) => {
    const ghosts = gameState.players.filter(p => p.isGhost);
    
    if (ghosts.length > 0) {
      setGameState({
        ...gameState,
        phase: { type: 'curse', match, ghosts, curseIndex: 0 },
      });
    } else {
      setGameState({
        ...gameState,
        phase: { type: 'throw', match, currentPlayer: 1 },
      });
    }
  };

  const handleCurse = (targetPlayerId: string, move: Move) => {
    if (gameState.phase.type !== 'curse') return;

    const { match, ghosts, curseIndex } = gameState.phase;
    
    const updatedMatch = { ...match };
    if (updatedMatch.player1.id === targetPlayerId) {
      updatedMatch.player1 = { ...updatedMatch.player1, cursedMove: move };
    } else if (updatedMatch.player2.id === targetPlayerId) {
      updatedMatch.player2 = { ...updatedMatch.player2, cursedMove: move };
    }

    if (curseIndex < ghosts.length - 1) {
      setGameState({
        ...gameState,
        phase: { type: 'curse', match: updatedMatch, ghosts, curseIndex: curseIndex + 1 },
      });
    } else {
      setGameState({
        ...gameState,
        phase: { type: 'throw', match: updatedMatch, currentPlayer: 1 },
      });
    }
  };

  const handleThrow = (move: Move) => {
    if (gameState.phase.type !== 'throw') return;

    const { match, currentPlayer } = gameState.phase;

    if (currentPlayer === 1) {
      const actualMove = applyCurse(match.player1, move);
      const updatedMatch = { ...match, player1Move: actualMove };
      
      setGameState({
        ...gameState,
        phase: { type: 'waiting', match: updatedMatch },
      });
    } else {
      const actualMove = applyCurse(match.player2, move);
      const updatedMatch = { ...match, player2Move: actualMove };

      const result = resolveThrow(updatedMatch.player1Move!, updatedMatch.player2Move!);
      
      if (result === 'tie') {
        const resetMatch = {
          ...updatedMatch,
          player1Move: undefined,
          player2Move: undefined,
          player1: { ...updatedMatch.player1, cursedMove: undefined },
          player2: { ...updatedMatch.player2, cursedMove: undefined },
        };
        
        setGameState({
          ...gameState,
          phase: { type: 'throw', match: resetMatch, currentPlayer: 1 },
        });
      } else {
        const winner = result === 'p1' ? updatedMatch.player1 : updatedMatch.player2;
        updatedMatch.winner = winner;

        setGameState({
          ...gameState,
          phase: { type: 'result', match: updatedMatch, winner },
        });
      }
    }
  };

  const handleContinueToPlayer2 = () => {
    if (gameState.phase.type !== 'waiting') return;

    setGameState({
      ...gameState,
      phase: { type: 'throw', match: gameState.phase.match, currentPlayer: 2 },
    });
  };

  const handleContinue = () => {
    if (gameState.phase.type !== 'result') return;

    const { match, winner } = gameState.phase;
    const loser = winner.id === match.player1.id ? match.player2 : match.player1;

    const updatedPlayers = gameState.players.map(p =>
      p.id === loser.id ? { ...p, isGhost: true } : p
    );

    const updatedMatches = gameState.allMatches.map(m =>
      m.id === match.id ? match : m
    );

    if (match.round === 1) {
      const round1Winners = updatedMatches
        .filter(m => m.round === 1 && m.winner)
        .map(m => m.winner!);

      if (round1Winners.length === 2) {
        const finalsMatch = createFinalMatch(round1Winners[0], round1Winners[1]);
        const allMatches = [...updatedMatches, finalsMatch];

        setGameState({
          phase: { type: 'bracket', matches: allMatches, currentRound: 2 },
          players: updatedPlayers,
          allMatches,
        });
      } else {
        setGameState({
          phase: { type: 'bracket', matches: updatedMatches, currentRound: 1 },
          players: updatedPlayers,
          allMatches: updatedMatches,
        });
      }
    } else {
      setGameState({
        phase: { type: 'victory', winner },
        players: updatedPlayers,
        allMatches: updatedMatches,
      });
    }
  };

  const handlePlayAgain = () => {
    setGameState({
      phase: { type: 'setup' },
      players: [],
      allMatches: [],
    });
  };

  const { phase } = gameState;

  if (phase.type === 'setup') {
    return <PlayerSetup onStart={handleStart} />;
  }

  if (phase.type === 'bracket') {
    return (
      <BracketDisplay
        matches={phase.matches}
        currentRound={phase.currentRound}
        onStartMatch={handleStartMatch}
      />
    );
  }

  if (phase.type === 'curse') {
    const currentGhost = phase.ghosts[phase.curseIndex];
    return (
      <CurseInterface
        ghost={currentGhost}
        match={phase.match}
        onCurse={handleCurse}
      />
    );
  }

  if (phase.type === 'throw') {
    const currentPlayer = phase.currentPlayer === 1 ? phase.match.player1 : phase.match.player2;
    return <ThrowInterface player={currentPlayer} onThrow={handleThrow} />;
  }

  if (phase.type === 'waiting') {
    return <WaitingScreen nextPlayer={phase.match.player2} onContinue={handleContinueToPlayer2} />;
  }

  if (phase.type === 'result') {
    return (
      <ResultDisplay
        match={phase.match}
        winner={phase.winner}
        onContinue={handleContinue}
      />
    );
  }

  if (phase.type === 'victory') {
    return <VictoryScreen winner={phase.winner} onPlayAgain={handlePlayAgain} />;
  }

  return null;
}
