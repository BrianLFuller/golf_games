export interface Player {
  id: string;
  name: string;
  scores: Record<number, number>;
}

export interface Game {
  id: string;
  players: Player[];
  isPremium: boolean;
  status: 'active' | 'completed';
  createdAt: number;
}