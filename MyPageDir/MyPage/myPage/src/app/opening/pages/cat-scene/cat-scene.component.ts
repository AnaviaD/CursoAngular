import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


import * as THREE from 'three';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { getParticleSystem } from '../../assets/getParticleSystem.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

@Component({
  selector: 'app-cat-scene',
  templateUrl: './cat-scene.component.html',
  styleUrls: ['./cat-scene.component.css']
})
export class CatSceneComponent {

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  initThreeJS(): void {

    const cubeScale = 1;
    const palette = [0x191919, 0x351c75, 0x8fce00, 0xb45f06, 0x69000b, 0x210038];

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
    //#endregion

    //#region Escena Camara y Controles
    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Crear la cámara y posicionarla
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25); // Alejar la cámara en el eje Z

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = THREE.MathUtils.degToRad(30); // 30 grados
    controls.maxPolarAngle = THREE.MathUtils.degToRad(70); // 70 grados
    controls.update();

    // Añadir una luz para iluminar el cubo
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);
    //#endregion

    //#region   particleSystem
    // Crear geometría y material para el cubo
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    // // Crear y añadir el cubo a la escena
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 0, 0);

    // scene.add(cube);

    // const smokeEffect = getParticleSystem({
    //   camera,
    //   emitter : cube,
    //   parent  : scene,
    //   rate    : 20,
    //   texture : "/assets/img/fire.png" ,
    //   // texture : "../../../../assets/img/fire.png" ,
    // });
    //#endregion

    //#region

    const cubeGroup = new THREE.Group();
    const interval = 50;
    let nextTime = 0;
    cubeGroup.userData['update'] = function (time: number) {
      if (time > nextTime) {
        const cube = getCube();
        cube.userData['start']();
        cubeGroup.add(cube);
        nextTime = time + interval;
      }
    }
    scene.add(cubeGroup);


    function transformMesh(mesh: THREE.Mesh) {
      mesh.scale.setScalar(0);
      mesh.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      );

      const radius = 0.75 + Math.random() * 4;
      mesh.position.normalize().multiplyScalar(radius);
      // mesh.position.y = Math.random() * Math.PI * 2;

    }



    function getCube(){

      const color =  palette[Math.floor(Math.random() * palette.length)];
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({
            color,
            side: THREE.BackSide
          });

      // Crear y añadir el cubo a la escena
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, 0);

      // scene.add(cube);

      function tweenScale(shouldScaleUp:boolean){

        const goalScale = shouldScaleUp ? cubeScale : 0;
        const delay = shouldScaleUp ? 0 : 1000;

        const scaleTween = new TWEEN.Tween(cube.scale)
        .to({x: goalScale, y: goalScale, z: goalScale}, 1000)
        .easing (TWEEN.Easing. Elastic. Out)
        .onComplete(() => {
          if (shouldScaleUp) {
            tweenScale(false)
          }
        })
        .delay(delay)
        .start();

        const goalRote = new THREE.Vector3().random();
        const roteTween = new TWEEN.Tween(cube.rotation)
        .to(goalRote, 1000)
        .easing(TWEEN.Easing.Elastic.Out)
        .onComplete(() => {
          if (shouldScaleUp) {
            tweenScale(false);
          }
        })
        .delay(delay)
        .start();


      }

      const innerColor = palette[Math.floor(Math.random() * palette.length)];
      const innerMat = new THREE.MeshBasicMaterial({color: innerColor});
      const innerCube = new THREE.Mesh(geometry, innerMat);
      innerCube.scale.setScalar(0.8);
      cube.add(innerCube);

      cube.userData = {start:() => tweenScale(true)};
      transformMesh(cube);
      // cubeGroup.add(cube);

      return cube;
    }

    //#endregion


    let previousTime = 0;

    /*==============  Animation   ============== */
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      controls.update();
      TWEEN.update();

      // if (time > nextTime) {
      //   cube.userData['start']();
      //   nextTime = time + interval;
      // }

      cubeGroup.userData['update'](time);


      // smokeEffect.update(0.016);


      const deltaTime = (time - previousTime) * 0.0001; // Convierte el tiempo delta a segundos
      previousTime = time;

      // Rotar el cubo
      // cube.rotation.x += deltaTime;
      // cube.rotation.y += deltaTime;

      renderer.render(scene, camera);
    };

    animate(0);
  }


}
