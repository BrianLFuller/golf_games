import type { Player } from '../../types/game.types';

export interface GameState {
  gameId: string | null;
  players: Player[];
  currentHole: number;
  isPremiumGame: boolean;
}

export interface GameActions {
  addPlayer: (player: Player) => Promise<void>;
  updateScore: (playerId: string, hole: number, score: number) => Promise<void>;
  createGame: (isPremium: boolean) => Promise<string>;
}