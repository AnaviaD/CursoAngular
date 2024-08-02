import * as THREE from 'three';

const renderer= new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0,2,5);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// box.rotation.set(5, 5, 5);

function animate() {
    box.rotation.x += .05;
    box.rotation.y += .05;
    box.rotation.z += .01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);