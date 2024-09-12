import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';
import { FloatingCardComponent } from '../../components/floating-card/floating-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['welcome-page.component.css']
})
export class WelcomePageComponent implements AfterViewInit {

  public btnNextStepClicked: boolean = false;

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  @ViewChild(FloatingCardComponent) floatingCard!: FloatingCardComponent;

  constructor() {}


  nextStep() {
    this.btnNextStepClicked = true;
    this.floatingCard.open(1); // Call the open method to show the card
    console.log('Next step button clicked');
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    if (!this.floatingCard) {
      console.error('Floating card component is not available');
    }
  }



  //ThreeJs engine
  initThreeJS(): void {
    //No borrar esta parte que es la que obtiene el elemento del componente
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    this.threeContainer.nativeElement.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });



    //#region Variables
    // Estos serian los objetos interactuables del mapa
    const cubes: Array<THREE.Mesh<THREE.BoxGeometry>> = [];
    let remainingObjects: THREE.Object3D[] = [...cubes]; // Copia inicial de objetos disponibles

    // Variables globales para la animación de la cámara
    const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;;
    const progressBarContainer = document.getElementById('progress-bar-cont') as HTMLProgressElement;;

    const defaultPosition = new THREE.Vector3(0, 10, 0); // Posición por defecto cuando targetPosition es indeterminada
    const rotationSpeed = (2 * Math.PI) / 60000;
    const radius = 5;
    const cubeScale = 0.5;
    let angle = 0;
    let intensity = 1000.40; // UFO Variable para controlar la intensidad de la luz
    let targetPosition = new THREE.Vector3();
    let targetPositionRotation = new THREE.Vector3();
    let targetLook = new THREE.Vector3();
    let currentTarget = selectRandomObject(); // Selecciona el primer objetivo
    let isAnimating = false; // Bandera para indicar si se está animando
    let isRotating = false; // Bandera para indicar si se está rotando
    let isPosicion = false; // Bandera para indicar si se está rotando
    let UfoFollows = false; // Bandera para indicar el movimiento del UFO
    let previousTime = 0;
    //#endregion

    //#region GLTF obj
    //  Variables GLTF
    let ufoObject: THREE.Object3D; // Variable global para referenciar el objeto
    let mustang01: THREE.Object3D; // Variable global para referenciar el objeto

    //#endregion

    //#region Escena Camara y Controles
    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 0);
    camera.lookAt(0, 0, 0);

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    // Limitar el ángulo de inclinación (elevación) de la cámara
    controls.minPolarAngle = THREE.MathUtils.degToRad(30); // 30 grados
    controls.maxPolarAngle = THREE.MathUtils.degToRad(70); // 70 grados

    // Limitar la rotación de la cámara en el eje horizontal, si es necesario
    // controls.minAzimuthAngle = -Math.PI / 2; // Limitar la rotación horizontal (opcional)
    // controls.maxAzimuthAngle = Math.PI / 2;
    controls.update();
    //#endregion

    //#region   Light
    // Añadir luz a la escena
    // const ambientLight = new THREE.AmbientLight(0x404040);
    // scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.51);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Crear la luz direccional que apuntará a targetPosition
    const ufoLight = new THREE.SpotLight(0xffffff, intensity);
    ufoLight.position.set(0, 20, 0); // Posición inicial de la luz
    ufoLight.castShadow = true;
    ufoLight.angle = Math.PI / 18; // Ángulo de apertura del haz
    ufoLight.penumbra = 1; // Suaviza los bordes del haz
    scene.add(ufoLight);
    //#endregion

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

    //#region Load Models
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
        mustang01 = gltf.scene;


        scene.add(gltf.scene);
        mustang01.position.set(10,0,0);

      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
    );

    loader.load(
      'assets/UfoObj.glb',
      (gltf) => {
        ufoObject = gltf.scene; // Almacena el objeto en la variable global
        scene.add(gltf.scene);

        ufoObject.position.set(0, 22, 0); // Ejemplo: moverlo a (10, 5, 0)
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
    );
    //#endregion

    //#region testObjects
    // Crear el plano (piso)
    const planeSize = 60;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    for (let i = 0; i < 5; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            Math.random() * planeSize - planeSize / 2,
            1,
            Math.random() * planeSize - planeSize / 2
        );
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        cubes.push(cube);
    }
    //#endregion



    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0xffff00,
    });

    function tweenScale(shouldScaleUp: boolean)
    {
      const goalScale = shouldScaleUp? cubeScale: 1;
      const scaleTween = new TWEEN.Tween(cube.scale)
      .to({x: goalScale, y: goalScale, z: goalScale}, 1000)
      .easing(TWEEN.Easing.Elastic.InOut)
      .start();
    }

    const cube = new THREE.Mesh(geometry, material);
    cube.userData = {start: () => tweenScale(true)};
    scene.add(cube);
    cube.position.set(0, 10, 0);


    /*==============  Animation   ============== */
    // Función para animar la escena
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      controls.update();
      const deltaTime = (time - previousTime) * 0.0001; // Convierte el tiempo delta a segundos
      previousTime = time; // Actualiza el tiempo previo para el siguiente frame

      cube.userData['start']();
      TWEEN.update();


      //#region    CameraMovents
      //Va a checar si el objetivo esta cerca de la camara
      limitCameraMovement();
      UfoAnimation(deltaTime);

      if (this.btnNextStepClicked) {
        selectRandomObject()
      }

      if ((isAnimating || this.btnNextStepClicked) || (isAnimating && this.btnNextStepClicked)) {
        // Interpola la posición de la cámara hacia la posición objetivo
        cameraOnClickAnimation();
      }
      if ((isRotating  || this.btnNextStepClicked) || (isRotating  && this.btnNextStepClicked) || (UfoFollows)) {
        rotateCameraAnimation(deltaTime);
      }else{
        isRotating = false;
        this.btnNextStepClicked = false;
      }
      //#endregion

      renderer.render(scene, camera);
    }




    //UfoAnimation
    //#region
    function UfoAnimation(deltaTime: number)
    {
      let target = targetPosition || defaultPosition; // Si targetPosition no está definida, usa la posición por defecto

      // console.log(UfoFollows)
      if (!UfoFollows) {
        if (ufoObject) {
          // console.log("animando UFO")

          // Rotación sobre sí mismo
          ufoObject.rotation.y += rotationSpeed * -10;

          // Movimiento en circunferencia alrededor de targetPosition (o defaultPosition si targetPosition es indeterminada)
          angle += rotationSpeed * 100;

          const x = target.x + radius * Math.cos(angle);
          const z = target.z + radius * Math.sin(angle);

          ufoObject.position.set(x, 5, z);
          ufoObject.lookAt(target); // Mantiene el Ufo mirando hacia el centro de la circunferencia

          // Actualizar la posición y dirección de la luz para que siempre apunte a targetPosition
          ufoLight.position.set(ufoObject.position.x, ufoObject.position.y, ufoObject.position.z);
          ufoLight.target.position.copy(target); // La luz siempre mira a targetPosition
          ufoLight.target.updateMatrixWorld(); // Asegura que la luz actualice su objetivo
        }
      }else {
        const distance = ufoObject.position.distanceTo(currentTarget!.position);
        let targetPositionWithOffset = currentTarget?.position.clone();
        targetPositionWithOffset?.setY(currentTarget!.position.y + 3);

        // Verifica si el cubo ha llegado al objetivo
        if (distance < 3.6) {
          // Selecciona una nueva posición cuando llega al destino

          currentTarget = selectRandomObject();
        }

        if (currentTarget) {
          // Interpolación de la posición del cubo hacia el objetivo
          ufoObject.position.lerp(targetPositionWithOffset!, 2.50 * deltaTime);

          // Verifica si el cubo ha llegado al objetivo
          if (distance > 9.5)
          {
            // Si quieres que el cubo siempre mire hacia el objetivo:
            ufoObject.lookAt(currentTarget.position);
            // Actualizar la posición y dirección de la luz para que siempre apunte a targetPosition
            ufoLight.position.set(ufoObject.position.x, ufoObject.position.y + 1, ufoObject.position.z);
            ufoLight.target.position.copy(currentTarget.position); // La luz siempre mira a targetPosition
            ufoLight.target.updateMatrixWorld(); // Asegura que la luz actualice su objetivo
          }else{
            // Actualizar la posición y dirección de la luz para que siempre apunte a targetPosition
            ufoLight.position.set(ufoObject.position.x, ufoObject.position.y - 1, ufoObject.position.z);
            ufoLight.target.position.copy(currentTarget.position); // La luz siempre mira a targetPosition
            ufoLight.target.updateMatrixWorld(); // Asegura que la luz actualice su objetivo

          }

        }
      }

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
          // console.log("posicionando");

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

          // console.log("antes del if", camera.position.distanceTo(targetPositionRotation))

          if ((camera.position.distanceTo(targetPositionRotation) < 0.15) || (camera.position.distanceTo(targetPositionRotation) < 0.20)) {
            // console.log("despues del if", camera.position.distanceTo(targetPositionRotation))
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
          angle += rotationSpeed * 0.5;

          const x = targetPosition.x + radius * Math.sin(angle);
          const z = targetPosition.z + radius * Math.cos(angle);

          targetPositionRotation.set(
            x,
            camera.position.y,
            z
          );


          camera.position.set(x , camera.position.y, z);
          // console.log("Rotando")
          // console.log(x, camera.position.y, z);

          // Mantén la cámara mirando al objetivo
          camera.lookAt(targetLook);

          // Continua la animación en el siguiente frame
          requestAnimationFrame(animateRotation);
        }

         // Verifica si UfoFollows es verdadero
        if (UfoFollows) {
          const distance = targetLook.distanceTo(ufoObject.position);
          console.log('Distancia entre la cámara y el ufoObject:', distance);

          // Mantén la cámara a 5 unidades detrás y 5 unidades arriba del ufoObject
          const ufoPos = ufoObject.position;

          // Calcula la nueva posición de la cámara detrás y arriba del ufoObject
          const cameraOffset = new THREE.Vector3(0, 5, -15); // 5 unidades arriba y 5 unidades atrás
          const newCameraPos = ufoPos.clone().add(cameraOffset);

          // Establece la nueva posición de la cámara
          camera.position.set(newCameraPos.x, newCameraPos.y, newCameraPos.z);

          // Mantén la cámara mirando hacia el currentTarget
          camera.lookAt(ufoObject!.position);

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

      // console.log("look",camera.position.distanceTo(targetLook));
      // console.log("pos",camera.position.distanceTo(targetPosition));

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
    const onMouseClick = (event: { clientX: number; clientY: number; }) => {
      const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(cubes);
      const ufoIntersections = raycaster.intersectObject(ufoObject);

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

        console.log('Cubo - cambiamos a false');
        isAnimating = true; // Activa la animación
        this.btnNextStepClicked = false;
        UfoFollows = false;
      }

      if (this.btnNextStepClicked) {
        const randomObject = selectRandomObject();
        console.log('btn Cube clicado ');

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

        console.log('BTN - cambiamos a false');
        isAnimating = true; // Activa la animación
        this.btnNextStepClicked = false;
        UfoFollows = false;

      }
      if(ufoIntersections.length > 0)
        {
        console.log('Ufo clicado');
        UfoFollows = true;
        isRotating = false;
        isPosicion = false;
        isAnimating = false;

        currentTarget = selectRandomObject();
        rotateCameraAnimation(1);
      }



    }
    //#endregion

    // Función para seleccionar un objeto aleatorio sin repetir
    //#region
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

    const onWheelDown = () =>{
      isPosicion = false;
      isRotating = false;
      isAnimating = false;
      UfoFollows = false;
      this.btnNextStepClicked = false;
    }
    //#endregion

    window.addEventListener('click', onMouseClick);

    window.addEventListener('wheel', onWheelDown);


    // Iniciar la animación
    animate(0);
  }





}
