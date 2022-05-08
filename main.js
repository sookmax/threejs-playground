import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const camera = new THREE.PerspectiveCamera();
camera.position.set(40, 165, 230);

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-10, 77, -40);
controls.addEventListener("change", render);

const scene = new THREE.Scene();
// scene.background = new THREE.Color("skyblue");

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const loader = new GLTFLoader();
loader.load("./models/ahri/ahri.glb", (gltf) => {
  console.log(gltf);

  scene.add(gltf.scene);
  render();
});

const container = document.createElement("div");
container.appendChild(renderer.domElement);
document.body.appendChild(container);

window.addEventListener("resize", onWindowResize);

controls.update();
render();

function render() {
  renderer.render(scene, camera);
  console.log(controls.target);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}
