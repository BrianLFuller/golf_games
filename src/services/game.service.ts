import { firebase } from '@nativescript/firebase-core';
import { getDatabase, ref, set, push } from '@nativescript/firebase-database';
import { Player } from '../types/game.types';

export const gameService = {
  async createGame(isPremium: boolean): Promise<string> {
    const db = getDatabase(firebase);
    const gamesRef = ref(db, 'games');
    const newGameRef = push(gamesRef);
    const gameId = newGameRef.key;
    
    await set(newGameRef, {
      createdAt: Date.now(),
      isPremium,
      status: 'active'
    });

    return gameId;
  },

  async addPlayerToGame(gameId: string, player: Player): Promise<void> {
    const db = getDatabase(firebase);
    await set(ref(db, `games/${gameId}/players/${player.id}`), player);
  },

  async updateScore(gameId: string, playerId: string, hole: number, score: number): Promise<void> {
    const db = getDatabase(firebase);
    await set(ref(db, `games/${gameId}/players/${playerId}/scores/${hole}`), score);
  }
};