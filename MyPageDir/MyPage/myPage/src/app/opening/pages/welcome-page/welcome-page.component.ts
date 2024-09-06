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

    const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;;
    const progressBarContainer = document.getElementById('progress-bar-cont') as HTMLProgressElement;;



    // Estos serian los objetos interactuables del mapa
    const cubes: Array<THREE.Mesh<THREE.BoxGeometry>> = [];
    let remainingObjects: THREE.Object3D[] = [...cubes]; // Copia inicial de objetos disponibles

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
    camera.position.set(0, 50, 0);
    camera.lookAt(0, 0, 0);

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    // Limitar el ángulo de inclinación (elevación) de la cámara
    controls.minPolarAngle = THREE.MathUtils.degToRad(30); // 30 grados
    controls.maxPolarAngle = THREE.MathUtils.degToRad(70); // 70 grados
    controls.update();

    // Añadir luz a la escena
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);


    //#region    LoadingManager(LoadingScreen)
    const loadingManager = new THREE.LoadingManager();
    //inicio de la carga
    loadingManager.onStart = function(url, item, total){
      console.log(`Started loading ${url}`);
    }

    loadingManager.onProgress = function(url, loaded, total){
      console.log(`Progress loading ${url}`);
      progressBar.value = (loaded / total) * 100;
    }

    loadingManager.onLoad = function(){
      progressBarContainer.style.display = 'none';
    }

    loadingManager.onError = function(url){
      console.error(`Error loading   ${url}`);
    }
    //#endregion

    // Creamos el loader
    const loader = new GLTFLoader(loadingManager);
    let gltObject: THREE.Object3D;

    // Cargamos los modelos
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
      'assets/Switch01.glb',
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

    //Cubo boton
    const followerCube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(followerCube);



    /*==============  Animation   ============== */
    // Función para animar la escena
    function animate(time: number) {
      requestAnimationFrame(animate);
      controls.update();
      const deltaTime = (time - previousTime) * 0.0001; // Convierte el tiempo delta a segundos
      previousTime = time; // Actualiza el tiempo previo para el siguiente frame



      //#region    CameraMovents
      //Va a checar si el objetivo esta cerca de la camara
      limitCameraMovement();
      updateFollowerCube();

      if (isAnimating) {
        // Interpola la posición de la cámara hacia la posición objetivo
        cameraOnClickAnimation();
      }
      if (isRotating) {
        rotateCameraAnimation(deltaTime);
      }else{
        isRotating = false;
      }
      //#endregion

      renderer.render(scene, camera);
    }


    //#region    CubeBtn
    function updateFollowerCube() {
      // Obtén la dirección en la que la cámara está mirando
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

      // Calcula la nueva posición para el cubo a 5 unidades de distancia frente a la cámara
      const distance = 7; // Distancia desde la cámara
      const newPosition = new THREE.Vector3().copy(camera.position).add(cameraDirection.multiplyScalar(distance));

      // Ajusta el cubo para que esté más arriba en la pantalla (por ejemplo, 2 unidades más arriba en el eje Y)
      const verticalOffset = 3; // Ajusta este valor para mover el cubo más arriba o abajo
      newPosition.y += verticalOffset;

      // Actualiza la posición del cubo
      followerCube.position.copy(newPosition);
    }
    //#endregion

    //#region    limitCameraMovement
    function limitCameraMovement() {
      // Limitar el valor de Y entre 0 y 50

      if (camera.position.y < 0) {
        camera.position.y = 0;
      }
      if (camera.position.y > 30) {
        camera.position.y = 30;
      }
      if ((camera.position.distanceTo(targetPosition) < 15.15) || (camera.position.distanceTo(targetPosition) < 10.15) && !isAnimating) {
        posicionateCamera();
      }else{
        isPosicion = false;
      }
    }
    //#endregion

    //#region    posicionateCamera
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
    //#endregion

    //#region    rotateCameraAnimation
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
    //#endregion

    //#region    cameraOnClickAnimation
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
    //#endregion

    // Detectar clic en los cubos y mover la cámara
    //#region    onMouseClick
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

      if (raycaster.intersectObject(followerCube)){
        console.log('btn Cube clicado ');
        const randomObject = selectRandomObject();

        targetPosition.set(
              randomObject!.position.x,
              1,
              randomObject!.position.z
          );

          targetLook.set(
              randomObject!.position.x,
              1,
              randomObject!.position.z
          );

          isAnimating = true; // Activa la animación
      }
    }
    //#endregion


    // Función para seleccionar un objeto aleatorio sin repetir
    function selectRandomObject(): THREE.Object3D | null {
      if (remainingObjects.length === 0) {
        // Si ya se han seleccionado todos, restablece la lista
        remainingObjects = [...cubes];
      }

      // Selecciona un índice aleatorio de los objetos restantes
      const randomIndex = Math.floor(Math.random() * remainingObjects.length);

      // Extrae el objeto seleccionado
      const selectedObject = remainingObjects[randomIndex];

      // Elimina el objeto seleccionado de los restantes
      remainingObjects.splice(randomIndex, 1);

      return selectedObject;
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
