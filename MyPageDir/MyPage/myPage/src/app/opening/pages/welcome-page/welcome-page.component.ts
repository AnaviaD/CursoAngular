import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['welcome-page.component.css']
})
export class WelcomePageComponent implements AfterViewInit {

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.initThreeJS();
  }



  //ThreeJs engine
  initThreeJS(): void {
    //No borrar esta parte que es la que obtiene el elemento del componente
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.threeContainer.nativeElement.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });



    // Variables globales para la animación de la cámara
    const rotationSpeed = (2 * Math.PI) / 60000;
    let angle = 0;
    let targetPosition = new THREE.Vector3();
    let targetPositionRotation = new THREE.Vector3();
    let targetLook = new THREE.Vector3();
    let isAnimating = false; // Bandera para indicar si se está animando
    let isRotating = false; // Bandera para indicar si se está rotando
    let isPosicion = false; // Bandera para indicar si se está rotando
    let previousTime = 0;


    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 70, 0);
    camera.lookAt(0, 0, 0);

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    // Limitar el ángulo de inclinación (elevación) de la cámara
    controls.minPolarAngle = THREE.MathUtils.degToRad(30); // 30 grados
    controls.maxPolarAngle = THREE.MathUtils.degToRad(70); // 70 grados
    controls.update();

    // Cargar modelos
    const loader = new GLTFLoader();
    let gltObject: THREE.Object3D;

    loader.load(
      'assets/House_medieval01.glb',
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
    );

    loader.load(
      'assets/Mustang.glb',
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
    );



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
    function animate(time: number) {
      requestAnimationFrame(animate);
      controls.update();
      const deltaTime = (time - previousTime) * 0.0001; // Convierte el tiempo delta a segundos
      previousTime = time; // Actualiza el tiempo previo para el siguiente frame


      if (isAnimating) {
        // Interpola la posición de la cámara hacia la posición objetivo
        cameraOnClickAnimation();
      }

      //Va a checar si el objetivo esta cerca de la camara
      if ((camera.position.distanceTo(targetPosition) < 15.15) || (camera.position.distanceTo(targetPosition) < 10.15) && !isAnimating) {
        posicionateCamera();
      }else{
        isPosicion = false;
      }

      if (isRotating) {
        rotateCameraAnimation(deltaTime);
      }else{
        isRotating = false;
      }

      renderer.render(scene, camera);
    }

    function posicionateCamera(){
      const x = targetPosition.x + 12 * Math.sin(rotationSpeed);
      const z = targetPosition.z + 12 * Math.cos(rotationSpeed);

      function animatePosition() {

        if (isPosicion) {
          console.log("posicionando");

          // Calcula la nueva posición de la cámara


          targetPositionRotation.set(
            x,
            camera.position.y,
            z
          );


          // camera.position.set(x , camera.position.y, z);
          camera.position.lerp(targetPositionRotation, .01);

          // Mantén la cámara mirando al objetivo
          camera.lookAt(targetLook);

          console.log("antes del if", camera.position.distanceTo(targetPositionRotation))

          if ((camera.position.distanceTo(targetPositionRotation) < 0.15) || (camera.position.distanceTo(targetPositionRotation) < 0.20)) {
            console.log("despues del if", camera.position.distanceTo(targetPositionRotation))
            isRotating = true;
          }

          // Continua la animación en el siguiente frame
          requestAnimationFrame(animatePosition);
        }
      }
      // Inicia la rotación
      animatePosition();
    }

    function rotateCameraAnimation(deltaTime: number){
      // Define el radio y el ángulo de rotación
      let radius = 12;

      function animateRotation() {

        if (isRotating) {

          isPosicion = false;
          // Calcula la nueva posición de la cámara
          angle += rotationSpeed;

          const x = targetPosition.x + radius * Math.sin(angle);
          const z = targetPosition.z + radius * Math.cos(angle);

          targetPositionRotation.set(
            x,
            camera.position.y,
            z
          );


          camera.position.set(x , camera.position.y, z);
          console.log("Rotando")
          console.log(x, camera.position.y, z);

          // Mantén la cámara mirando al objetivo
          camera.lookAt(targetLook);

          // Continua la animación en el siguiente frame
          requestAnimationFrame(animateRotation);
        }
      }
      // Inicia la rotación
      animateRotation();
    }

    function cameraOnClickAnimation(){

      controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
      camera.position.lerp(targetPosition, 0.40);

      // Interpola la dirección en la que la cámara mira hacia el cubo objetivo
      camera.lookAt(targetLook);

      console.log("look",camera.position.distanceTo(targetLook));
      console.log("pos",camera.position.distanceTo(targetPosition));

      // Detener la animación si la cámara está cerca de la posición objetivo
      if (camera.position.distanceTo(targetLook) < 10) {
        controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
        isAnimating = false;
        isPosicion = true;
      }
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
              targetCube.position.x,
              1,
              targetCube.position.z
          );

          targetLook.set(
              targetCube.position.x,
              1,
              targetCube.position.z
          );

          isAnimating = true; // Activa la animación
      }
    }

    function onWheelDown(){
      isPosicion = false;
      isRotating = false;
      isAnimating = false;
    }

    window.addEventListener('click', onMouseClick);

    window.addEventListener('wheel', onWheelDown);


    // Iniciar la animación
    animate(0);
  }





}
