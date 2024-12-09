import { create } from 'zustand';
import type { GameState, GameActions } from './types';
import { createGameActions } from './actions';

const initialState: GameState = {
  gameId: null,
  players: [],
  currentHole: 1,
  isPremiumGame: false
};

export const useGameStore = create<GameState & GameActions>()((set, get) => ({
  ...initialState,
  ...createGameActions(set, get)
}));