import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
// import { GUI } from "/node_modules/dat.gui/build/dat.gui.module.js";

let camera, scene, renderer, controls, model, mixer;
let light, ambientLight;
const contactContainer = document.getElementById("contact-info");
const sceneContainer = document.getElementById("box-container");

// const gui = new GUI();
// const params = {
//   lightness: 0.5,
//   opacity: 1,
// };

const clock = new THREE.Clock();

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // GUI Controls
  // gui
  //   .add(params, "lightness", 0, 1)
  //   .onChange((val) => (ambientLight.intensity = val));
  // gui.add(params, "opacity", 0, 1);

  // document.getElementById("blackout").appendChild(gui.domElement.parentNode);
}

function loadModel() {
  if (window.getComputedStyle(contactContainer).display === "block") return;

  loader.load(
    "./assets/textures/computer.glb",
    (gltf) => {
      model = gltf.scene;
      model.position.set(0, -0.5, 0);
      model.scale.set(1.2, 1.2, 1.2);
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
    },
    (xhr) => {
      console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);
  if (
    model &&
    contactContainer &&
    window.getComputedStyle(contactContainer).display === "block"
  ) {
    scene.remove(model);
    model = null;
  }

  if (model) {
    model.position.x = Math.sin(Date.now() * 0.001) * 1.5;
  }

  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
setTimeout(loadModel, 100); // Defer model loading slightly
