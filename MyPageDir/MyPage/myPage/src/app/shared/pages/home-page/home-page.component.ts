import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FloatingCardComponent } from '../../../opening/components/floating-card/floating-card.component';
import { MainCardComponent } from '../../../opening/components/main-card/main-card.component';
import { ContactComponent } from '../../../opening/components/contact/contact.component';


@Component({
  selector: 'shared-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['home-page.component.css']
})
export class HomePageComponent {
  @ViewChild(FloatingCardComponent) floatingCard!:  FloatingCardComponent;
  @ViewChild(MainCardComponent)     maingCard!:     MainCardComponent;
  @ViewChild(ContactComponent)     contactCard!:     ContactComponent;
  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngAfterViewInit(): void {
    this.initThreeJS();

  }

  objClicked(clickedObject: number) {
    this.maingCard.open(clickedObject); // Call the open method to show the card
    // this.floatingCard.open(clickedObject); // Call the open method to show the card
  }

  objClickedContact(){
    this.contactCard.open(); // Call the open method to show the card

  }

  initThreeJS(): void {

    //#region window etc
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

    const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;;
    const progressBarContainer = document.getElementById('progress-bar-cont') as HTMLProgressElement;;

    //#endregion

    //#region Escena Camara y Controles
    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Crear la cámara y posicionarla
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, -310); // Alejar la cámara en el eje Z
    camera.lookAt(0, 150, 0);

    // Añadir controles de órbita
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minPolarAngle = THREE.MathUtils.degToRad(70); // 30 grados
    // controls.maxPolarAngle = THREE.MathUtils.degToRad(90); // 70 grados

    // controls.update();

    // Añadir una luz para iluminar el cubo
    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(0, 20, -350);
    light.lookAt(0, 0, 0);
    scene.add(light);
    //#endregion


    //#region Variables
    // Estos serian los objetos interactuables del mapa
    const mixerArray: THREE.AnimationMixer[] = [];
    let mixer: THREE.AnimationMixer;
    let spaceSphere : THREE.Object3D; // Variable global para referenciar el objeto

    const clock = new THREE.Clock();

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


    // Crear geometría y material para el cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    //#region Load Models
    // Creamos el loader
    const loader = new GLTFLoader(loadingManager);
    let gltObject: THREE.Object3D;

    // Cargar el modelo
    loader.load(
    'assets/glts/groundMap.glb',
    (gltf) => {
      const original = gltf.scene;
      original.position.set(0, -32, 0);
      original.scale.set(10, 10, 10);
      scene.add(original);

      // Crear un mixer para el objeto original
      mixer = new THREE.AnimationMixer(original);
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.timeScale = 1;
        action.play();
      });

      // Añadir los mixers al array para ser actualizados
      mixerArray.push(mixer);
      // mixerArray.push(mixer1);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/saceBack.glb',
      (gltf) => {
        spaceSphere = gltf.scene;
        spaceSphere.position.set(0, 0, 0);
        spaceSphere.scale.set(30, 30, 30);
        scene.add(spaceSphere);


      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      });

    // Cargar el modelo
    loader.load(
    'assets/glts/welcome.glb',
    (gltf) => {
      const original = gltf.scene;
      original.position.set(0, 0, -305);
      original.scale.set(0.2, 0.2, 0.2);
      original.rotation.y = 3.1;

      scene.add(original);

      // Crear un mixer para el objeto original
      mixer = new THREE.AnimationMixer(original);
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.timeScale = 1;
        action.play();
      });

      // Añadir los mixers al array para ser actualizados
      mixerArray.push(mixer);
      // mixerArray.push(mixer1);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    // loader.load(
    //   'assets/glts/ClawScene01.glb',
    //   (gltf) => {
    //     const original = gltf.scene;
    //     original.position.set(0, 0, 100);
    //     original.scale.set(0.6, 0.6, 0.6);
    //     original.rotation.y = 3.1;

    //     scene.add(original);

    //     // Crear un mixer para el objeto original
    //     mixer = new THREE.AnimationMixer(original);
    //     gltf.animations.forEach(clip => {
    //       const action = mixer.clipAction(clip);
    //       action.timeScale = 1;
    //       action.play();
    //     });

    //     // Añadir los mixers al array para ser actualizados
    //     mixerArray.push(mixer);
    //     // mixerArray.push(mixer1);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error('Error al cargar el modelo GLTF:', error);
    //   });


    //#endregion


    // Inicia la actualización de los mixers
    updateMixers();

    let previousTime = 0;

    /*==============  Animation   ============== */
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      // controls.update();

      const deltaTime = (time - previousTime) * 0.0001; // Convierte el tiempo delta a segundos
      previousTime = time;

      if(spaceSphere != undefined) {
        spaceSphere.rotation.z += deltaTime * 0.15;
      }

      // Rotar el cubo
      // cube.rotation.x += deltaTime;
      // cube.rotation.y += deltaTime;

      renderer.render(scene, camera);
    };

    function updateMixers() {
      const delta = clock.getDelta();

      // Actualiza todos los mixers
      mixerArray.forEach((mixer) => {
        mixer.update(delta);
      });

      // Vuelve a llamar a la función en el siguiente frame
      requestAnimationFrame(updateMixers);
    }

    animate(0);
  }
}
