import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Crear el renderer y añadirlo al DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Variables globales para la animación de la cámara
let targetPosition = new THREE.Vector3();
let targetLook = new THREE.Vector3();
let isAnimating = false; // Bandera para indicar si se está animando

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 70, 0);
camera.lookAt(0, 0, 0);

// Añadir controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Crear el plano (piso)
const planeSize = 60;
const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Función para generar cubos aleatoriamente en el plano
const cubes: Array<THREE.Mesh<THREE.BoxGeometry>> = [];
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(
        Math.random() * planeSize - planeSize / 2,
        1,
        Math.random() * planeSize - planeSize / 2
    );
    scene.add(cube);
    cubes.push(cube);
}

// Añadir luz a la escena
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Función para animar la escena
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  
  camera.lookAt(targetLook);

  if (isAnimating) {
      // Interpola la posición de la cámara hacia la posición objetivo
      camera.position.lerp(targetPosition, 0.1);

      // Interpola la dirección en la que la cámara mira hacia el cubo objetivo
      camera.lookAt(targetLook);

      // Detener la animación si la cámara está cerca de la posición objetivo
      if (camera.position.distanceTo(targetPosition) < 0.1) {
          isAnimating = false;
      }
  }

  renderer.render(scene, camera);
}

// Detectar clic en los cubos y mover la cámara
function onMouseClick(event: { clientX: number; clientY: number; }) {
  const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
      const targetCube = intersects[0].object;

      console.log('Cubo clicado:', targetCube.position);

      // Configura la posición objetivo y la bandera de animación
      targetPosition.set(
          targetCube.position.x + 5,
          targetCube.position.y + 5,
          targetCube.position.z + 5
      );

      targetLook.set(
          targetCube.position.x,
          targetCube.position.y,
          targetCube.position.z
      );

      isAnimating = true; // Activa la animación
  }
}

window.addEventListener('click', onMouseClick);

// Iniciar la animación
animate();
