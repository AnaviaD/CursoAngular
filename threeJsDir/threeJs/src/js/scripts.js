import * as THREE from 'three';
import * as dat from 'dat.gui';

//Esta libreria es para la camara
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Esta libreria es para cargar objetos glb 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//Importamos unas imagenes
import nino01 from '../img/nino01.jpeg';
import nino02 from '../img/nino02.jpg';
import stars01 from '../img/stars01.jpg';

const weightUrl = new URL('../assets/Weight.glb', import.meta.url);

const renderer= new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

//Esto sirve para poder girar la camara con el mouse
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//Sirve para actualizar la posicion
camera.position.set(0,12,15);
orbit.update();

//  ==============   Agregando un cubo  ==============
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial(
    {color: 0x00FF00}
);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
//  ==============   Agregando un cubo  ==============

//  ==============   Agregando un Plano  ==============
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial(
    {
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
    }
);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.set(-0.5*Math.PI, 0, 0);
plane.receiveShadow = true;
//  ==============   Agregando un Plano  ============== 


//  Agregamos la separacion del plano
const gridHelper = new THREE.GridHelper(20, 10);
scene.add(gridHelper);


//  ==============   Agregando una Esfera  ==============
const sphereGeometry = new THREE.SphereGeometry(2, 10, 10);
const sphereMaterial = new THREE.MeshStandardMaterial(
    {   
        color: 0x0000FF,
        wireframe: false,
    }
);
const spere = new THREE.Mesh(sphereGeometry, sphereMaterial);
spere.position.x = -5;
spere.castShadow = true;
scene.add(spere);


// const spotLight = new THREE.SpotLight(0xffffff, 1);
// scene.add(spotLight);
// spotLight.position.set(0, 10, 10);
// spotLight.castShadow = true;
// spotLight.angle = 0.2;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// ========== Agregamos una instancia de luz de ambiente ==========
// const ambientLight =  new THREE.AmbientLight(0x404040, 10);
// scene.add(ambientLight);

//================= Agregamos luz direccional   =================
const directionalLight = new THREE.DirectionalLight(0xFFFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(-20, 20, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

//Agregamos un helper que nos ayude a ver de donde viene la luz dir
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 50);
scene.add(directionalLightHelper);
const dlightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dlightShadowHelper);

// //Creamos una instancia de el cargador de texturas
const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars01);

//Cargamos imagenes como background de las imag
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nino01,
    nino02,
    nino02,
    stars01,
    nino01,
    nino02
]);

// ==================== Agregamos Cubo 02   ====================
//Tenemos que crear el cubo despues porque tiene que cargar el texture loader
const box02Geometry = new THREE.BoxGeometry(4, 4, 4);
const box02Material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(nino01)
});
const box02 = new THREE.Mesh(box02Geometry, box02Material);
scene.add(box02);
box02.position.set(0, 5, -10);

// ==================== Agregamos Otro plano   ====================


//creamos una instancia de el cargador de archivos glb
const assetLoader = new GLTFLoader();

assetLoader.load(weightUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10);
}, undefined, function(err){
    console.error(err);
});


//creamos instancia de gui
const gui = new dat.GUI();


//Iteraccion con los valores del objeto
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.01,
    penumbra: 0,
    intensity: 1,

};

gui.add(options, 'wireframe').onChange(function(e){
    spere.material.wireframe = e;
});

gui.addColor(options, 'sphereColor').onChange(function(e){
    spere.material.color.set(e);
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 10);

let step = 1;

//Creamos una instancia de la posicion del mouse
const mousePosition = new THREE.Vector2();

//Creamos una constancia para poder seleccionar objetos
window.addEventListener('mousemove', function(e){
    mousePosition.x =  (e.clientX /window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY /window.innerHeight) * 2 + 1;
}); 

//Creamos una instancia del Raycaster
const rayCaster = new THREE.Raycaster();

const spereId = spere.id;
box02.name = 'theBox02';



// box.rotation.set(5, 5, 5);
function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;

    //Tomamos los valores de options y actualizamos las cosas    
    step += options.speed;
    spere.position.y = 10 * Math.abs(Math.sin(step));

    directionalLight.setSize = options.angle;
    directionalLight.penumbra = options.penumbra;
    directionalLight.intensity = options.intensity;
    directionalLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects);

    for (let index = 0; index < intersects.length; index++) {
        if (intersects[index].object.id === spereId) {
            intersects[index].object.material.color.set(0xFF0000);
        }

        if (intersects[index].object.name === 'theBox02') {
            intersects[index].object.rotation.x = time/1000;
            intersects[index].object.rotation.y = time/1000;
        }
        
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateWorldMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
});