import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Crear el renderer y añadirlo al DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;  // Habilitar sombras
document.body.appendChild(renderer.domElement);

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Color de fondo de la escena

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 70, 0);  // Nueva posición de la cámara
camera.lookAt(0, 0, 0);  // La cámara mira hacia el origen

// Añadir controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Crear el plano subdividido (piso) con un material wireframe
const planeSize = 60;
const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize); // Tamaño y subdivisiones del plano
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: true }); // Material en modo wireframe
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotar para que quede horizontal
plane.receiveShadow = true; // El plano puede recibir sombras
scene.add(plane);

// Añadir un cubo verde con la misma dimensión de un cuadro del plano
const cubeSize = 1; // Tamaño del cubo igual al tamaño de un cuadro del plano
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Color verde
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true; // El cubo puede proyectar sombras

// Colocar el cubo en la posición inicial
cube.position.set(0.5, 0.5, 0.5); // Posición inicial (ajustada para centrarlo en un cuadro)
scene.add(cube);

// Añadir una luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10); // Posición de la luz en la escena
directionalLight.castShadow = true; // La luz puede proyectar sombras

// Ajustar el tamaño de la cámara de sombras para mejorar la calidad de las sombras
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
scene.add(directionalLight);

// Añadir un helper para ver la posición de la luz direccional
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

// Función para generar un cubo amarillo en una posición aleatoria
function generateYellowCube() {
    const yellowCubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const yellowCubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Color amarillo
    const yellowCube = new THREE.Mesh(yellowCubeGeometry, yellowCubeMaterial);
    yellowCube.castShadow = true; // El cubo puede proyectar sombras

    // Posicionar el cubo en una posición aleatoria en el plano
    const maxPosition = planeSize / 2; // Mitad del tamaño del plano
    yellowCube.position.set(
        Math.floor(Math.random() * planeSize) - maxPosition + 0.5, // Random entre -29.5 y 29.5
        0.5,
        Math.floor(Math.random() * planeSize) - maxPosition + 0.5
    );

    scene.add(yellowCube);
    return yellowCube;
}

// Generar el primer cubo amarillo
let yellowCube = generateYellowCube();

// Variables para controlar el movimiento
const moveDistance = 1; // Distancia en unidades del plano para cada movimiento
let currentDirection = null; // Dirección actual de movimiento del cubo
let previousDirection = null; // Dirección previa del movimiento del cubo
const moveInterval = 60; // Intervalo de movimiento en milisegundos

// Arreglo para la "cola" de cubos
let snakeSegments = [cube]; // Iniciar con el cubo verde

// Función para manejar los eventos del teclado
function onKeyDown(event) {
    switch (event.key) {
        case 'w':
            if (currentDirection !== 'backward') {
                currentDirection = 'forward';
            }
            break;
        case 's':
            if (currentDirection !== 'forward') {
                currentDirection = 'backward';
            }
            break;
        case 'a':
            if (currentDirection !== 'right') {
                currentDirection = 'left';
            }
            break;
        case 'd':
            if (currentDirection !== 'left') {
                currentDirection = 'right';
            }
            break;
    }
}

// Añadir listeners para eventos del teclado
window.addEventListener('keydown', onKeyDown);

// Función para mover el cubo en la dirección actual
function moveCube() {
    if (currentDirection) {
        // Calcular la nueva posición del cubo basado en la dirección actual
        const newPosition = cube.position.clone();

        switch (currentDirection) {
            case 'forward':
                newPosition.z -= moveDistance;
                break;
            case 'backward':
                newPosition.z += moveDistance;
                break;
            case 'left':
                newPosition.x -= moveDistance;
                break;
            case 'right':
                newPosition.x += moveDistance;
                break;
        }

        // Verificar que el cubo no se mueva fuera de los límites del plano
        const halfSize = planeSize / 2 - 0.5; // Borde del plano
        if (newPosition.x > halfSize || newPosition.x < -halfSize || newPosition.z > halfSize || newPosition.z < -halfSize) {
            return; // No hacer nada si se intenta mover fuera del plano
        }

        // Mover todos los segmentos de la "cola"
        for (let i = snakeSegments.length - 1; i > 0; i--) {
            snakeSegments[i].position.copy(snakeSegments[i - 1].position);
        }

        // Mover el cubo principal
        cube.position.copy(newPosition);

        // Actualizar la dirección previa
        previousDirection = currentDirection;

        // Verificar colisión con el cubo amarillo
        if (cube.position.distanceTo(yellowCube.position) < 0.5) {
            // Agregar un nuevo segmento a la "cola"
            const newSegment = new THREE.Mesh(cubeGeometry, cubeMaterial);
            newSegment.castShadow = true;
            newSegment.position.copy(snakeSegments[snakeSegments.length - 1].position);
            scene.add(newSegment);
            snakeSegments.push(newSegment);

            // Generar un nuevo cubo amarillo
            scene.remove(yellowCube);
            yellowCube = generateYellowCube();
        }
    }
}

// Configurar un intervalo para mover el cubo automáticamente
setInterval(moveCube, moveInterval);

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
