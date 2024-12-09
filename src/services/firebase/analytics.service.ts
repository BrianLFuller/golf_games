import { FirebaseInitializer } from './initialize';

class AnalyticsService {
  async logGameCreated(gameId: string, isPremium: boolean): Promise<void> {
    const { analytics } = FirebaseInitializer.getInstance();
    await analytics.logEvent('game_created', {
      game_id: gameId,
      is_premium: isPremium
    });
  }

  async logPlayerJoined(gameId: string, playerId: string): Promise<void> {
    const { analytics } = FirebaseInitializer.getInstance();
    await analytics.logEvent('player_joined', {
      game_id: gameId,
      player_id: playerId
    });
  }

  async logScoreUpdated(gameId: string, playerId: string, hole: number): Promise<void> {
    const { analytics } = FirebaseInitializer.getInstance();
    await analytics.logEvent('score_updated', {
      game_id: gameId,
      player_id: playerId,
      hole: hole
    });
  }
}

export const analyticsService = new AnalyticsService();