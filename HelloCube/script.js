import * as THREE from './three/three.js-master/build/three.module.min.js'

const scene = new THREE.scene();

//Mesh
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: "purple"})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh);

//camera