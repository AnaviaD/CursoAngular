// src/app/game/types.ts
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export interface CatStats {
  name: string;
  id: string;

  // Salud y energía
  hp: number;
  maxHp: number;
  hungry: number;    // 0-100 (100 = lleno)
  stamina: number;   // 0-100 (100 = descansado)

  // Combate
  atk: number;
  def: number;
  vel: number;

  // Progresión
  level: number;
  exp: number;
  lives: number;

  // Estado anímico (determina animaciones idle)
  mood: 'happy' | 'neutral' | 'angry' | 'sleepy';
}

export interface GameConfig {
  gravity: number;
  debugPhysics: boolean;
}

export interface GameObject {
  mesh: THREE.Mesh;
  body: CANNON.Body;
  update(): void;
  dispose(): void;
}
