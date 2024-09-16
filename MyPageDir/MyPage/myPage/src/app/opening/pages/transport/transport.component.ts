import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import * as CANNON from 'cannon-es';
import { Raycaster, Vector2 } from 'three';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {

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

    // // Crear geometría y material para el cubo
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });

    // // Crear y añadir el cubo a la escena
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 0, 0);

    // scene.add(cube);


    // Crear objetos (cubo, cilindro, triángulo)
    const geometryCube = new THREE.BoxGeometry();
    const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometryCube, materialCube);
    cube.position.set(-2, 2, 0);
    scene.add(cube);

    const geometryCylinder = new THREE.CylinderGeometry(1, 1, 2, 32);
    const materialCylinder = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
    cylinder.position.set(2, 2, 0);
    scene.add(cylinder);

    const geometryTriangle = new THREE.ConeGeometry(1, 2, 3);
    const materialTriangle = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const triangle = new THREE.Mesh(geometryTriangle, materialTriangle);
    triangle.position.set(0, 2, 0);
    scene.add(triangle);

    // Configurar física con Cannon.js
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Gravedad hacia abajo

    // Crear el plano (suelo)
    const groundBody = new CANNON.Body({
      mass: 0, // El suelo no se mueve, así que su masa es 0
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotar el plano para que sea horizontal
    world.addBody(groundBody);

    // Añadirlo también en Three.js para visualizar el plano
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    scene.add(planeMesh);

    // Crear cuerpos físicos para cada geometría
    function createPhysicsBody(mesh: THREE.Mesh, shape: CANNON.Shape) {
        const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
            shape: shape
        });
        world.addBody(body);
        return body;
    }

    const cubeBody = createPhysicsBody(cube, new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)));
    const cylinderBody = createPhysicsBody(cylinder, new CANNON.Cylinder(1, 1, 2, 32));
    const triangleBody = createPhysicsBody(triangle, new CANNON.Cylinder(1, 1, 2, 3)); // Aproximación

    // Raycaster y lógica de selección
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    let selectedObject: THREE.Object3D | null = null;

    function onMouseMove(event: MouseEvent) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([cube, cylinder, triangle]);

        if (intersects.length > 0 && !selectedObject) {
            console.log("Selected object");
            document.body.style.cursor = 'pointer'; // Cambia el cursor si hay intersección
        } else {
            document.body.style.cursor = 'auto';
        }
    }

    function onMouseDown(event: MouseEvent) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([cube, cylinder, triangle]);

        if (intersects.length > 0) {
            selectedObject = intersects[0].object;
            controls.enabled = false; // Deshabilitar controles mientras arrastras
        }
    }

    function onMouseUp() {
        if (selectedObject) {
            controls.enabled = true; // Habilitar controles nuevamente
            selectedObject = null;
        }
    }

    function animate() {
        requestAnimationFrame(animate);


        if (selectedObject) {
            // Mueve el objeto seleccionado con el mouse
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([cube, cylinder, triangle]);

            if (intersects.length > 0) {
                const intersectPoint = intersects[0].point;
                selectedObject.position.copy(intersectPoint);
            }
        }

        // Actualizar física
        world.step(1 / 60);
        cube.position.copy(cubeBody.position as unknown as THREE.Vector3);
        cylinder.position.copy(cylinderBody.position as unknown as THREE.Vector3);
        triangle.position.copy(triangleBody.position as unknown as THREE.Vector3);

        controls.update();
        renderer.render(scene, camera);
    }

    // Eventos del mouse
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);

    // Posición inicial de la cámara
    camera.position.set(0, 5, 10);
    controls.update();

    // Iniciar animación
    animate();
  }

}
