import create from 'zustand';
import { databaseService } from '../services/firebase/database.service';
import { analyticsService } from '../services/firebase/analytics.service';
import type { Player } from '../types/game.types';

interface GameState {
  gameId: string | null;
  players: Player[];
  currentHole: number;
  isPremiumGame: boolean;
  addPlayer: (player: Player) => Promise<void>;
  updateScore: (playerId: string, hole: number, score: number) => Promise<void>;
  createGame: (isPremium: boolean) => Promise<string>;
}

export const useGameStore = create<GameState>((set, get) => ({
  gameId: null,
  players: [],
  currentHole: 1,
  isPremiumGame: false,

  addPlayer: async (player) => {
    const { gameId } = get();
    if (!gameId) return;

    await databaseService.addPlayer(gameId, player);
    await analyticsService.logPlayerJoined(gameId, player.id);
    
    set((state) => ({
      players: [...state.players, player]
    }));
  },

  updateScore: async (playerId, hole, score) => {
    const { gameId } = get();
    if (!gameId) return;

    await databaseService.updateScore(gameId, playerId, hole, score);
    await analyticsService.logScoreUpdated(gameId, playerId, hole);
    
    set((state) => ({
      players: state.players.map(player => 
        player.id === playerId 
          ? { ...player, scores: { ...player.scores, [hole]: score } }
          : player
      )
    }));
  },

  createGame: async (isPremium) => {
    const gameId = await databaseService.createGame(isPremium);
    await analyticsService.logGameCreated(gameId, isPremium);
    
    set({ 
      gameId, 
      isPremiumGame: isPremium,
      players: [],
      currentHole: 1
    });
    
    return gameId;
  }
}));