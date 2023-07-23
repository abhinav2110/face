import * as THREE from './three.js-master/three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
let face, glasses;
loader.load('hmm/faces.glb', function (glb) {
    face = glb.scene;
    face.traverse(function (child) {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide; 
            child.material.depthTest = true; 
        }
    });
    face.scale.set(0.1, 0.1, 0.1);
    scene.add(face);

    if (glasses) {
        render();
    }
}, undefined, function (error) {
    console.error('ERROR!', error);
});


loader.load('hmm/glasses.glb', function (glb) {
    glasses = glb.scene;
    glasses.scale.set(0.1, 0.1, 0.1);
    scene.add(glasses);

    if (face) {
        render();
    }
}, undefined, function (error) {
    console.error('ERROR!', error);
});

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1, 2);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;

function render() {
    renderer.render(scene, camera);
    controls.update();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

animate();
