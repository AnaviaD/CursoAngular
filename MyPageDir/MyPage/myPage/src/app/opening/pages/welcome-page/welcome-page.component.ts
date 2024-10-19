import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { FloatingCardComponent } from '../../components/floating-card/floating-card.component';
import { TranslateService } from '@ngx-translate/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { SkeletonUtils } from 'three-stdlib';
import TWEEN from '@tweenjs/tween.js'

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';
import { transition } from '@angular/animations';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['welcome-page.component.css']
})
export class WelcomePageComponent implements AfterViewInit {

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target: HTMLElement) {
    if (target.id === 'leftButton' || target.id === 'rightButton') {
      const threeContainer = document.getElementById('three-container');
      if (threeContainer) {
        threeContainer.style.pointerEvents = 'none'; // Desactiva los clics en la escena
      }
    }
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target: HTMLElement) {
    if (target.id === 'leftButton' || target.id === 'rightButton') {
      const threeContainer = document.getElementById('three-container');
      if (threeContainer) {
        threeContainer.style.pointerEvents = 'auto'; // Activa de nuevo los clics en la escena
      }
    }
  }

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  @ViewChild(FloatingCardComponent) floatingCard!: FloatingCardComponent;

  isDropdownMainVisible = false;
  isDropdown1Visible = false;
  isDropdown2Visible = false;
  isDropdown3Visible = false;
  isDropdown4Visible = false;
  isDropdown5Visible = false;
  public btnNextStepClicked : boolean = false;
  public focusObj           : number = 0;
  private readonly maxFocus : number = 29;


  actionComponent1(elem:number) {
    this.objClicked(elem);
    this.isDropdownMainVisible = false;
    this.isDropdown1Visible = false;
    this.isDropdown2Visible = false;
    this.isDropdown3Visible = false;
    this.isDropdown4Visible = false;
    this.isDropdown5Visible = false;
  }
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


  section01(){
    // this.isDropdown1Visible = !this.isDropdown1Visible;
    this.isDropdown1Visible = !this.isDropdown1Visible;
  }
  section02(){
    this.isDropdown2Visible = !this.isDropdown2Visible;
  }
  section03(){
    this.isDropdown3Visible = !this.isDropdown3Visible;
  }
  section04(){
    this.isDropdown4Visible = !this.isDropdown4Visible;
  }
  section05(){
    this.isDropdown5Visible = !this.isDropdown5Visible;
  }

  updateFocus(increment: boolean): void {
    if (increment) {
      // Si se presiona el botón de sumar
      this.focusObj = (this.focusObj + 1) % (this.maxFocus + 1);
      this.objClicked(this.focusObj);
    } else {
      // Si se presiona el botón de restar
      this.focusObj = this.focusObj === 0 ? this.maxFocus : this.focusObj - 1;
      this.objClicked(this.focusObj);
    }
    console.log(this.focusObj);
  }

  nextStep() {
    this.isDropdownMainVisible = !this.isDropdownMainVisible;
    this.isDropdown1Visible = false;
    this.isDropdown2Visible = false;
    this.isDropdown3Visible = false;
    this.isDropdown4Visible = false;
    this.isDropdown5Visible = false;
    // this.btnNextStepClicked = true;
    // this.floatingCard.open(Math.floor(Math.random() * 2) + 1); // Call the open method to show the card
    // console.log('Next step button clicked');
  }

  objClicked(clickedObject: number) {
    this.btnNextStepClicked = true;
    this.focusObj = clickedObject;
    this.floatingCard.open(clickedObject); // Call the open method to show the card
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
    const cubes: Array<THREE.Object3D> = [];
    let remainingObjects: THREE.Object3D[] = [...cubes]; // Copia inicial de objetos disponibles

    // Variables globales para la animación de la cámara
    const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;;
    const progressBarContainer = document.getElementById('progress-bar-cont') as HTMLProgressElement;;

    const defaultPosition = new THREE.Vector3(0, 10, 0); // Posición por defecto cuando targetPosition es indeterminada
    const rotationSpeed = (2 * Math.PI) / 60000;
    const radius = 30;
    const cubeScale = 0.5;
    const clones = [];
    const numClones = 3;
    const distanceBetweenClones = 2;
    const clock = new THREE.Clock();

    const mixerArray: THREE.AnimationMixer[] = [];
    let mixer: THREE.AnimationMixer;
    let mixer01: THREE.AnimationMixer;
    let mixer02: THREE.AnimationMixer;
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
    let ufoObject : THREE.Object3D; // Variable global para referenciar el objeto
    let spaceSphere : THREE.Object3D; // Variable global para referenciar el objeto
    let mustang01 : THREE.Object3D; // Variable global para referenciar el objeto
    let eyeBath   : THREE.Object3D; // Variable global para referenciar el objeto
    let eyeBath01   : THREE.Object3D; // Variable global para referenciar el objeto
    let eyeBath02   : THREE.Object3D; // Variable global para referenciar el objeto
    let eyeBath03   : THREE.Object3D; // Variable global para referenciar el objeto

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
    ufoLight.angle = Math.PI / 5; // Ángulo de apertura del haz
    ufoLight.penumbra = 0; // Suaviza los bordes del haz
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

    // Cargar el modelo
    loader.load(
    'assets/glts/groundMap01.glb',
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
    'assets/glts/eyeBathRigged.glb',
    (gltf) => {
      const original = gltf.scene;
      original.position.set(10, 1, 120);
      original.scale.set(0.1, 0.1, 0.1);
      scene.add(original);
      cubes.push(original);

      // Crear un mixer para el objeto original
      mixer = new THREE.AnimationMixer(original);
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.timeScale = 1;
        action.play();
      });

      // Clonar el modelo correctamente
      const clone = SkeletonUtils.clone(original);
      clone.position.set(10, 1, 16);

      // // Asegurar que el clon tenga las mismas propiedades de transformación
      // clone.position.copy(original.position);
      // clone.scale.copy(original.scale);
      // clone.rotation.copy(original.rotation);

      // scene.add(clone);
      // cubes.push(clone);

      // // Crear un nuevo mixer para el clon
      // mixer01 = new THREE.AnimationMixer(clone);
      // gltf.animations.forEach((clip) => {
      //   const action = mixer01.clipAction(clip);
      //   action.timeScale = 1;
      //   action.play();
      // });

      // Añadir los mixers al array para ser actualizados
      mixerArray.push(mixer);
      // mixerArray.push(mixer01);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    }
    );

    // Cargar el modelo
    loader.load(
      'assets/glts/pyramid03.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(0, -5, -100);
        original.scale.set(0.2, 0.2, 0.2);
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
        // mixerArray.push(mixer01);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
    );

    // Cargar el modelo
    loader.load(
    'assets/glts/pool.glb',
    (gltf) => {
      const original = gltf.scene;
      original.position.set(-90, 5, -330);
      original.scale.set(0.08, 0.08, 0.08);
      scene.add(original);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    }
    );

    // Cargar el modelo
    loader.load(
    'assets/glts/duck.glb',
    (gltf) => {
      const original = gltf.scene;
      original.position.set(-90, 15, -230);
      original.scale.set(2, 2, 2);
      scene.add(original);
    },
    undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    }
    );

    // Cargar el modelo
    loader.load(
      'assets/glts/Cemetery01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(120, 5, 465);
        original.scale.set(0.5, 0.5, 0.5);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

      // Cargar el modelo
    loader.load(
      'assets/glts/police.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-50, 0, 465);
        original.scale.set(0.8, 0.8, 0.8);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/jail.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-40, 0, 300);
        original.scale.set(0.4, 0.4, 0.4);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );


    loader.load(
      'assets/glts/fungi02.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-110, 0, 250);
        original.scale.set(0.04, 0.04, 0.04);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/fungi04.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-110, 0, 200);
        original.scale.set(0.04, 0.04, 0.04);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );


    loader.load(
      'assets/glts/Lighthouse01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(200, 0, -295);
        original.scale.set(10, 10, 10);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/truck01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(75, 5, 450);
        original.scale.set(1, 1, 1);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/school.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(90, 0, 330);
        original.scale.set(0.20, 0.20, 0.20);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/pizzeria.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(10, 0, 280);
        original.scale.set(0.15, 0.15, 0.15);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );

    loader.load(
      'assets/glts/greasyDinner01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-30, 5, 400);
        original.scale.set(5, 5, 5);
        scene.add(original);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLTF:', error);
      }
      );



    // Cargar el modelo
    loader.load(
      'assets/glts/totem.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-20, 1, -170);
        original.scale.set(0.5, 0.5, 0.5);
        scene.add(original);

      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });




    // Cargar el modelo
    loader.load(
      'assets/glts/waterTower01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-60, 0, -170);
        original.scale.set(1, 1, 1);
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
      }
      );


    // Cargar el modelo
    loader.load(
      'assets/glts/ClawScene01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(50, 5, 140);
        original.scale.set(0.2, 0.2, 0.2);
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
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/ClawScene02.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-50, 5, 140);
        original.scale.set(0.2, 0.2, 0.2);
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
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/moline.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(180, 0, -230);
        original.scale.set(0.15, 0.15, 0.15);
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
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/miniMoose.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(20, 0, -330);
        original.scale.set(0.1, 0.1, 0.1);
        scene.add(original);

        // Crear un mixer para el objeto original
        mixer = new THREE.AnimationMixer(original);
        gltf.animations.forEach(clip => {
          const action = mixer.clipAction(clip);
          action.timeScale = 0.1;
          action.play();
        });

        // Añadir los mixers al array para ser actualizados
        mixerArray.push(mixer);
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/akiraMotorCycle.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(120, 0, -310);
        original.scale.set(1, 1, 1);
        scene.add(original);

        // Crear un mixer para el objeto original
        mixer = new THREE.AnimationMixer(original);
        gltf.animations.forEach(clip => {
          const action = mixer.clipAction(clip);
          action.timeScale = 0.2;
          action.play();
        });

        // Añadir los mixers al array para ser actualizados
        mixerArray.push(mixer);
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/akiraMotorCycle01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(80, 0, -310);
        original.scale.set(1, 1, 1);
        scene.add(original);

        // Crear un mixer para el objeto original
        mixer = new THREE.AnimationMixer(original);
        gltf.animations.forEach(clip => {
          const action = mixer.clipAction(clip);
          action.timeScale = 0.2;
          action.play();
        });

        // Añadir los mixers al array para ser actualizados
        mixerArray.push(mixer);
        // mixerArray.push(mixer01);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/ship.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(140, 0, -230);
        original.scale.set(0.35, 0.35, 0.35);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/butterMachine.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(20, 0, -165);
        original.scale.set(0.3, 0.3, 0.3);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/bmo.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(-30, 15, -230);
        original.scale.set(1, 1, 1);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/kart.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(30, 0, -240);
        original.scale.set(0.8, 0.8, 0.8);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });

    // Cargar el modelo
    loader.load(
      'assets/glts/fungi.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(65, 0, -165);
        original.scale.set(0.08, 0.08, 0.08);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // Cargar el modelo
    loader.load(
      'assets/glts/fungi01.glb',
      (gltf) => {
        const original = gltf.scene;
        original.position.set(65, 0, -240);
        original.scale.set(0.08, 0.08, 0.08);
        scene.add(original);
      },
      undefined,
    (error) => {
      console.error('Error al cargar el modelo GLTF:', error);
    });


    // loader.load(
    //   'assets/glts/Mustang.glb',
    //   (gltf) => {
    //     mustang01 = gltf.scene;


    //     scene.add(gltf.scene);
    //     mustang01.position.set(10,0,0);

    //   },
    //   undefined,
    //   (error) => {
    //     console.error('Error al cargar el modelo GLTF:', error);
    //   }
    // );

    loader.load(
      'assets/glts/UfoObj.glb',
      (gltf) => {
        ufoObject = gltf.scene; // Almacena el objeto en la variable global
        scene.add(gltf.scene);

        ufoObject.position.set(0, 22, 0); // Ejemplo: moverlo a (10, 5, 0)
        ufoObject.scale.set(5, 5, 5);
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

    const cubeGeometry = new THREE.BoxGeometry(20, 120, 20);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });


    const baitCube08 = new THREE.Mesh(new THREE.BoxGeometry(20,60,20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube08.position.set(90, 5, 300);
    baitCube08.userData = { id: 2 }; // Asignamos un id único a cada cubo
    baitCube08.castShadow = false;
    baitCube08.receiveShadow = false;
    scene.add(baitCube08);
    cubes.push(baitCube08);

    const baitCube09 = new THREE.Mesh(new THREE.BoxGeometry(20,50,20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube09.position.set(70, 5, 320);
    baitCube09.userData = { id: 3 }; // Asignamos un id único a cada cubo
    baitCube09.castShadow = false;
    baitCube09.receiveShadow = false;
    scene.add(baitCube09);
    cubes.push(baitCube09);

    const baitCube10 = new THREE.Mesh(new THREE.BoxGeometry(20,50,20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube10.position.set(110, 5, 320);
    baitCube10.userData = { id: 4 }; // Asignamos un id único a cada cubo
    baitCube10.castShadow = false;
    baitCube10.receiveShadow = false;
    scene.add(baitCube10);
    cubes.push(baitCube10);

    const baitCube11 = new THREE.Mesh(new THREE.BoxGeometry(20,50,20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube11.position.set(90, 5, 330);
    baitCube11.userData = { id: 5 }; // Asignamos un id único a cada cubo
    baitCube11.castShadow = false;
    baitCube11.receiveShadow = false;
    scene.add(baitCube11);
    cubes.push(baitCube11);

    const baitCube030 = new THREE.Mesh(new THREE.BoxGeometry(50,20,50), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube030.position.set(135, 0, 440);
    baitCube030.userData = { id: 6 }; // Asignamos un id único a cada cubo
    baitCube030.castShadow = false;
    baitCube030.receiveShadow = false;
    scene.add(baitCube030);
    cubes.push(baitCube030);

    const baitCube04 = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 30), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube04.position.set(-35, 5, 470);
    baitCube04.userData = { id: 7 }; // Asignamos un id único a cada cubo
    baitCube04.castShadow = false;
    baitCube04.receiveShadow = false;
    scene.add(baitCube04);
    cubes.push(baitCube04);

    const baitCube100 = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 50), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube100.position.set(-30, 5, 400);
    baitCube100.userData = { id: 8 }; // Asignamos un id único a cada cubo
    baitCube100.castShadow = false;
    baitCube100.receiveShadow = false;
    scene.add(baitCube100);
    cubes.push(baitCube100);

    const baitCube07 = new THREE.Mesh(new THREE.BoxGeometry(40, 20, 30), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube07.position.set(75, 5, 450);
    baitCube07.userData = { id: 9 }; // Asignamos un id único a cada cubo
    baitCube07.castShadow = false;
    baitCube07.receiveShadow = false;
    scene.add(baitCube07);
    cubes.push(baitCube07);

    const baitCube24 = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube24.position.set(50, 5, 140);
    baitCube24.userData = { id: 10 }; // Asignamos un id único a cada cubo
    baitCube24.castShadow = false;
    baitCube24.receiveShadow = false;
    scene.add(baitCube24);
    cubes.push(baitCube24);

    const baitCube13 = new THREE.Mesh(cubeGeometry, new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube13.position.set(-50, 5, 140);
    baitCube13.userData = { id: 11 }; // Asignamos un id único a cada cubo
    baitCube13.castShadow = false;
    baitCube13.receiveShadow = false;
    scene.add(baitCube13);
    cubes.push(baitCube13);

    const baitCube05 = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 60), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube05.position.set(-50, 5, 280);
    baitCube05.userData = { id: 12 }; // Asignamos un id único a cada cubo
    baitCube05.castShadow = false;
    baitCube05.receiveShadow = false;
    scene.add(baitCube05);
    cubes.push(baitCube05);

    const baitCube16 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube16.position.set(120, 5, -310);
    baitCube16.userData = { id: 14 }; // Asignamos un id único a cada cubo
    baitCube16.castShadow = false;
    baitCube16.receiveShadow = false;
    scene.add(baitCube16);
    cubes.push(baitCube16);

    const baitCube17 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube17.position.set(80, 5, -310);
    baitCube17.userData = { id: 13 }; // Asignamos un id único a cada cubo
    baitCube17.castShadow = false;
    baitCube17.receiveShadow = false;
    scene.add(baitCube17);
    cubes.push(baitCube17);

    const baitCube090 = new THREE.Mesh(new THREE.BoxGeometry(40, 20, 40), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube090.position.set(35, 5, 265);
    baitCube090.userData = { id: 15 }; // Asignamos un id único a cada cubo
    baitCube090.castShadow = false;
    baitCube090.receiveShadow = false;
    scene.add(baitCube090);
    cubes.push(baitCube090);

    const baitCube120 = new THREE.Mesh(new THREE.BoxGeometry(50, 20, 50), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube120.position.set(-90, 5, -310);
    baitCube120.userData = { id: 16 }; // Asignamos un id único a cada cubo
    baitCube120.castShadow = false;
    baitCube120.receiveShadow = false;
    scene.add(baitCube120);
    cubes.push(baitCube120);

    const baitCube020 = new THREE.Mesh(new THREE.BoxGeometry(60, 30, 60), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube020.position.set(-90, 15, -230);
    baitCube020.userData = { id: 17 }; // Asignamos un id único a cada cubo
    baitCube020.castShadow = false;
    baitCube020.receiveShadow = false;
    scene.add(baitCube020);
    cubes.push(baitCube020);

    const baitCube19 = new THREE.Mesh(new THREE.BoxGeometry(20, 30, 20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube19.position.set(20, 5, -165);
    baitCube19.userData = { id: 18 }; // Asignamos un id único a cada cubo
    baitCube19.castShadow = false;
    baitCube19.receiveShadow = false;
    scene.add(baitCube19);
    cubes.push(baitCube19);

    const baitCube20 = new THREE.Mesh(new THREE.BoxGeometry(20, 40, 20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube20.position.set(-30, 30, -230);
    baitCube20.userData = { id: 19 }; // Asignamos un id único a cada cubo
    baitCube20.castShadow = false;
    baitCube20.receiveShadow = false;
    scene.add(baitCube20);
    cubes.push(baitCube20);

    const baitCube110 = new THREE.Mesh(new THREE.BoxGeometry(20, 80, 20), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube110.position.set(-20, 1, -170);
    baitCube110.userData = { id: 20 }; // Asignamos un id único a cada cubo
    baitCube110.castShadow = false;
    baitCube110.receiveShadow = false;
    scene.add(baitCube110);
    cubes.push(baitCube110);

    const baitCube130 = new THREE.Mesh(new THREE.BoxGeometry(30, 20, 30), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube130.position.set(0, -5, -100);
    baitCube130.userData = { id: 21 }; // Asignamos un id único a cada cubo
    baitCube130.castShadow = false;
    baitCube130.receiveShadow = false;
    scene.add(baitCube130);
    cubes.push(baitCube130);

    const baitCube06 = new THREE.Mesh(new THREE.BoxGeometry(5, 60, 5), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube06.position.set(200, 5, -295);
    baitCube06.userData = { id: 22 }; // Asignamos un id único a cada cubo
    baitCube06.castShadow = false;
    baitCube06.receiveShadow = false;
    scene.add(baitCube06);
    cubes.push(baitCube06);


    const baitCube12 = new THREE.Mesh(new THREE.BoxGeometry(15, 80, 15), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube12.position.set(-60, 1, -170);
    baitCube12.userData = { id: 23 }; // Asignamos un id único a cada cubo
    baitCube12.castShadow = false;
    baitCube12.receiveShadow = false;
    scene.add(baitCube12);
    cubes.push(baitCube12);


    const baitCube14 = new THREE.Mesh(new THREE.BoxGeometry(10, 40, 10), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube14.position.set(180, 5, -230);
    baitCube14.userData = { id: 24 }; // Asignamos un id único a cada cubo
    baitCube14.castShadow = false;
    baitCube14.receiveShadow = false;
    scene.add(baitCube14);
    cubes.push(baitCube14);

    const baitCube18 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube18.position.set(140, 5, -230);
    baitCube18.userData = { id: 25 }; // Asignamos un id único a cada cubo
    baitCube18.castShadow = false;
    baitCube18.receiveShadow = false;
    scene.add(baitCube18);
    cubes.push(baitCube18);

    const baitCube15 = new THREE.Mesh(new THREE.BoxGeometry(40, 30, 40), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube15.position.set(0, 5, -330);
    baitCube15.userData = { id: 26 }; // Asignamos un id único a cada cubo
    baitCube15.castShadow = false;
    baitCube15.receiveShadow = false;
    scene.add(baitCube15);
    cubes.push(baitCube15);


    const baitCube21 = new THREE.Mesh(new THREE.BoxGeometry(25, 20, 25), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube21.position.set(30, 5, -240);
    baitCube21.userData = { id: 27 }; // Asignamos un id único a cada cubo
    baitCube21.castShadow = false;
    baitCube21.receiveShadow = false;
    scene.add(baitCube21);
    cubes.push(baitCube21);

    const baitCube22 = new THREE.Mesh(new THREE.BoxGeometry(25, 30, 25), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube22.position.set(65, 5, -165);
    baitCube22.userData = { id: 28 }; // Asignamos un id único a cada cubo
    baitCube22.castShadow = false;
    baitCube22.receiveShadow = false;
    scene.add(baitCube22);
    cubes.push(baitCube22);

    const baitCube23 = new THREE.Mesh(new THREE.BoxGeometry(25, 30, 25), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube23.position.set(65, 5, -240);
    baitCube23.userData = { id: 29 }; // Asignamos un id único a cada cubo
    baitCube23.castShadow = false;
    baitCube23.receiveShadow = false;
    scene.add(baitCube23);
    cubes.push(baitCube23);

    const baitCube231 = new THREE.Mesh(new THREE.BoxGeometry(25, 130, 25), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube231.position.set(-110, 0, 250);
    baitCube231.userData = { id: 0 }; // Asignamos un id único a cada cubo
    baitCube231.castShadow = false;
    baitCube231.receiveShadow = false;
    scene.add(baitCube231);
    cubes.push(baitCube231);

    const baitCube232 = new THREE.Mesh(new THREE.BoxGeometry(25, 130, 25), new THREE.MeshBasicMaterial({transparent: true, opacity: 0.001}));
    baitCube232.position.set(-110, 0, 200);
    baitCube232.userData = { id: 1 }; // Asignamos un id único a cada cubo
    baitCube232.castShadow = false;
    baitCube232.receiveShadow = false;
    scene.add(baitCube232);
    cubes.push(baitCube232);



    // for (let i = 0; i < 7; i++) {
    //     const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //     cube.position.set(
    //         Math.random() * planeSize - planeSize / 2,
    //         1,
    //         Math.random() * planeSize - planeSize / 2
    //     );
    //     cube.castShadow = true;
    //     cube.receiveShadow = true;
    //     scene.add(cube);
    //     cubes.push(cube);
    // }


    //#endregion


    function updateMixers() {
      const delta = clock.getDelta();

      // Actualiza todos los mixers
      mixerArray.forEach((mixer) => {
        mixer.update(delta);
      });

      // Vuelve a llamar a la función en el siguiente frame
      requestAnimationFrame(updateMixers);
    }


    // Inicia la actualización de los mixers
    updateMixers();

    /*==============  Animation   ============== */
    // Función para animar la escena
    const animate = (time: number) => {
      requestAnimationFrame(animate);

      controls.update();
      TWEEN.update();
      const deltaTime = (time - previousTime) / 1000; // Convierte el tiempo delta a segundos
      previousTime = time; // Actualiza el tiempo previo para el siguiente frame

      if(spaceSphere != undefined) {
        spaceSphere.rotation.z += deltaTime * 0.15;
      }

      //#region    CameraMovents
      //Va a checar si el objetivo esta cerca de la camara
      limitCameraMovement();
      UfoAnimation(deltaTime);

      // if (this.btnNextStepClicked) {
      //   selectRandomObject()
      // }

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

      camera.updateMatrixWorld(true);
      scene.updateMatrixWorld(true);

      scene.traverse((object) => {
        object.updateMatrixWorld(true); // Fuerza la actualización de todas las matrices
      });

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

          ufoObject.position.set(x, 30, z);
          ufoObject.lookAt(target); // Mantiene el Ufo mirando hacia el centro de la circunferencia

          // Actualizar la posición y dirección de la luz para que siempre apunte a targetPosition
          ufoLight.position.set(ufoObject.position.x, ufoObject.position.y, ufoObject.position.z);
          ufoLight.target.position.copy(target); // La luz siempre mira a targetPosition
          ufoLight.target.updateMatrixWorld(); // Asegura que la luz actualice su objetivo
        }
      }else {
        const distance = ufoObject.position.distanceTo(currentTarget!.position);
        let targetPositionWithOffset = currentTarget?.position.clone();
        targetPositionWithOffset?.setY(currentTarget!.position.y + 30);

        // Verifica si el cubo ha llegado al objetivo
        if (distance < 35) {
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
      if (camera.position.y > 300) {
        camera.position.y = 300;
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
      let radius = 60;

      function animateRotation() {

        if (isRotating) {

          isPosicion = false;
          // Calcula la nueva posición de la cámara
          angle += rotationSpeed * 0.5;

          const x = targetPosition.x + radius * Math.sin(angle);
          const z = targetPosition.z + radius * Math.cos(angle);

          targetPositionRotation.set(
            x,
            100,
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
          const cameraOffset = new THREE.Vector3(0, 5, -55); // 5 unidades arriba y 5 unidades atrás
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

      // controls.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
      camera.position.lerp(targetPosition, 0.40);

      // Interpola la dirección en la que la cámara mira hacia el cubo objetivo
      camera.lookAt(targetLook);

      // console.log("look",camera.position.distanceTo(targetLook));
      // console.log("pos",camera.position.distanceTo(targetPosition));

      // Detener la animación si la cámara está cerca de la posición objetivo
      if (camera.position.distanceTo(targetLook) < 100) {
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
        let targetObject = intersects[0].object;

        const cubeId = targetObject.userData['id'];

        this.focusObj = targetObject.userData['id'];

        if (cubeId) {
          console.log('Cubo clicado con id:', cubeId);

          // Llamar a la función `objClicked` desde Angular
          this.objClicked(cubeId);
        }


        // Verificar si el objeto tiene geometría (es un Mesh)
        if (targetObject.isObject3D) {
        console.log('Objeto clicado (Mesh):', targetObject.position);
        // Si no tiene geometría, tratar de obtener la posición global
        const globalPosition = new THREE.Vector3();
        targetObject.getWorldPosition(globalPosition);
        targetObject.position.set(globalPosition.x, globalPosition.y, globalPosition.z);
        console.log('Posición global del objeto:', globalPosition);
        }

        console.log('Objeto clicado:', targetObject.position);
        console.log('Objeto clicado:', targetObject);

        // Configura la posición objetivo y la bandera de animación
        targetPosition.set(
            targetObject.position.x,
            1,
            targetObject.position.z
        );

        targetLook.set(
            targetObject.position.x,
            1,
            targetObject.position.z
        );

        console.log('Cubo - cambiamos a false');
        isAnimating = true; // Activa la animación
        this.btnNextStepClicked = false;
        UfoFollows = false;
      }


      if (this.btnNextStepClicked) {
        const randomObject = findObjectById(this.focusObj);
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

    //#region elemento de menu clicado
    const menuElementClicked = () =>{
      if(this.btnNextStepClicked)
      {

      }
    }
    //#endregion

    //#region find objects
    function findObjectById(id: number): THREE.Object3D | null {
      // Buscar el objeto en la lista cubes que tenga el userData['id'] especificado
      const object = cubes.find(obj => obj.userData['id'] === id);

      // Si se encuentra el objeto, lo devuelve; de lo contrario, devuelve null
      return object || null;
    }
    //#endregion



    window.addEventListener('click', onMouseClick);

    window.addEventListener('wheel', onWheelDown);

    // Iniciar la animación
    animate(0);
  }





}
