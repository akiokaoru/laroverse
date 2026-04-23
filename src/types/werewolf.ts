export type Role = 'werewolf' | 'villager' | 'seer' | 'robber' | 'troublemaker' | 'insomniac';

export interface Player {
  id: string;
  name: string;
  role: Role;
  originalRole?: Role;
  isAlive: boolean;
}

export type GamePhase = 'setup' | 'night' | 'day' | 'voting' | 'gameOver' | 'cardView';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentTurn: number;
  nightActions: {
    seerTarget?: string;
    seerCenterTargets?: [number, number];
    robberTarget?: string;
    troublemakerTargets?: [string, string];
  };
  votes: Record<string, string>;
  winner?: 'werewolves' | 'villagers';
  centerCards: Role[];
}

export interface GameConfig {
  playerCount: number;
  roles: Role[];
}
