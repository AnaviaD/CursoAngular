import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
const gridHelper = new THREE.GridHelper(20, 40);
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

//  ==============   Agregando una Esfera  ==============

//Agregamos una instancia de luz de ambiente
const ambientLight =  new THREE.AmbientLight(0x33333333);
scene.add(ambientLight);

//Agregamos luz direccional
const directionalLight = new THREE.DirectionalLight(0xFFFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-20, 20, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

//Agregamos un helper que nos ayude a ver de donde viene la luz dir
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

const dlightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dlightShadowHelper);


//creamos instancia de gui
const gui = new dat.GUI();


//Iteraccion con los valores del objeto
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,

};

gui.add(options, 'wireframe').onChange(function(e){
    spere.material.wireframe = e;
});

gui.addColor(options, 'sphereColor').onChange(function(e){
    spere.material.color.set(e);
});

gui.add(options, 'speed', 0, 0.1);

let step = 1;


// box.rotation.set(5, 5, 5);
function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;

    step += options.speed;
    spere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);