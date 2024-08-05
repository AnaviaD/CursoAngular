import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer= new THREE.WebGLRenderer();

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
camera.position.set(0,2,5);
orbit.update();

//  ==============   Agregando un cubo  ==============
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial(
    {color: 0x00FF00}
);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
//  ==============   Agregando un cubo  ==============

//  ==============   Agregando un Plano  ==============
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0xFFFFFF,
        side: THREE.DoubleSide,
    }
);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.set(-0.5*Math.PI, 0, 0);
//  ==============   Agregando un Plano  ============== 


//  Agregamos la separacion del plano
const gridHelper = new THREE.GridHelper(20, 40);
scene.add(gridHelper);


//  ==============   Agregando una Esfera  ==============
const sphereGeometry = new THREE.SphereGeometry(2, 10, 10);
const sphereMaterial = new THREE.MeshBasicMaterial(
    {   
        color: 0x0000FF,
        wireframe: true,
    }
);
const spere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(spere);
//  ==============   Agregando una Esfera  ==============

//creamos instancia de gui
const gui = new dat.GUI();


//Iteraccion con los valores del objeto
const options = {
    sphereColor: '#ffea00',
    wireframe: true,
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