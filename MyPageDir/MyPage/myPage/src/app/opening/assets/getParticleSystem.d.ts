declare module '../../assets/getParticleSystem.js' {
  import * as THREE from 'three';

  interface ParticleSystemParams {
    camera: THREE.Camera;
    emitter: THREE.Object3D;
    parent: THREE.Object3D;
    rate: number;
    texture: string;
  }

  function getParticleSystem(params: ParticleSystemParams): { update: (timeElapsed: number) => void };

  export { getParticleSystem };
}
