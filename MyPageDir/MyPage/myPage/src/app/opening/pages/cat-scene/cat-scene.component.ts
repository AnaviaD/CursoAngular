import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { getParticleSystem } from '../../assets/getParticleSystem.js';

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
    camera.position.set(0, 0, 5); // Alejar la cámara en el eje Z

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

    // Crear geometría y material para el cubo
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    // Crear y añadir el cubo a la escena
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);

    scene.add(cube);

    const smokeEffect = getParticleSystem({
      camera,
      emitter : cube,
      parent  : scene,
      rate    : 10,
      texture : "../../../../assets/img/smoke.png" ,
    });




    let previousTime = 0;

    /*==============  Animation   ============== */
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      controls.update();
      // TWEEN.update();
      smokeEffect.update(0.016);

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
