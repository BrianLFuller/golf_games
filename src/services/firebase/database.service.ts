import { ref, set, push, get } from '@nativescript/firebase-database';
import { FirebaseInitializer } from './initialize';
import type { Game, Player } from '../../types/game.types';

class DatabaseService {
  async createGame(isPremium: boolean): Promise<string> {
    const { database } = FirebaseInitializer.getInstance();
    const gamesRef = ref(database, 'games');
    const newGameRef = push(gamesRef);
    const gameId = newGameRef.key;
    
    await set(newGameRef, {
      createdAt: Date.now(),
      isPremium,
      status: 'active'
    });

    return gameId;
  }

  async getGame(gameId: string): Promise<Game | null> {
    const { database } = FirebaseInitializer.getInstance();
    const gameRef = ref(database, `games/${gameId}`);
    const snapshot = await get(gameRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  async updateGame(gameId: string, data: Partial<Game>): Promise<void> {
    const { database } = FirebaseInitializer.getInstance();
    const gameRef = ref(database, `games/${gameId}`);
    await set(gameRef, data);
  }

  async addPlayer(gameId: string, player: Player): Promise<void> {
    const { database } = FirebaseInitializer.getInstance();
    const playerRef = ref(database, `games/${gameId}/players/${player.id}`);
    await set(playerRef, player);
  }

  async updateScore(gameId: string, playerId: string, hole: number, score: number): Promise<void> {
    const { database } = FirebaseInitializer.getInstance();
    const scoreRef = ref(database, `games/${gameId}/players/${playerId}/scores/${hole}`);
    await set(scoreRef, score);
  }
}

export const databaseService = new DatabaseService();