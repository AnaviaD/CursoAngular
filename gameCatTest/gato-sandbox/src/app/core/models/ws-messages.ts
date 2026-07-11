// src/app/core/models/ws-messages.ts
import { CatStats } from './cat-player';

// Mensajes que enviamos al servidor
export type ClientMessage =
  | { type: 'auth'; token: string }
  | { type: 'ping' }
  | { type: 'player_update'; data: Partial<PlayerData> }
  | { type: 'chat'; content: string };

// Mensajes que recibimos del servidor
export type ServerMessage =
  | { type: 'auth_ok'; playerId: string }
  | { type: 'auth_error'; reason: string }
  | { type: 'pong'; timestamp: number }
  | { type: 'player_joined'; player: PlayerData }
  | { type: 'player_left'; playerId: string }
  | { type: 'player_moved'; playerId: string; position: Vector3 }
  | { type: 'world_state'; players: PlayerData[]; enemies: EnemyData[] }
  | { type: 'chat'; playerId: string; content: string };

export interface PlayerData {
  id: string;
  name: string;
  position: Vector3;
  rotation: number;
  stats: CatStats;
  animation: string; // 'idle', 'walk', 'run', 'jump'
}

export interface EnemyData {
  id: string;
  type: 'rat' | 'bird';
  position: Vector3;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
