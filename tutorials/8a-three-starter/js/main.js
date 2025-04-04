// Basic Three.JS scene from documentation, importing Three.JS through a CDN
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from "three";

// Import add-ons
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube, torus, mushroom;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 7.5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("three-container").appendChild(renderer.domElement);
  renderer.setClearColor(0x1a1a19);
  renderer.shadowMap.enabled = true;

  // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader(); // to load 3d models

  // ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
  // →→→→→→ Follow next steps in tutorial:
  // // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

  //~~~~~ Lights ~~~~~
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(-5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(5, 5, 5);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const texture = new THREE.TextureLoader().load(
    "./textures/grasslight-big.jpg"
  );
  const material = new THREE.MeshBasicMaterial({ map: texture });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(-8.5, 0, 0);
  cube.scale.set(2, 2, 2);
  scene.add(cube);

  const torusGeometry = new THREE.TorusGeometry(2, 0.6, 128, 256);
  torusGeometry.computeVertexNormals();
  const torusTextureLoader = new THREE.TextureLoader();

  const baseColor = torusTextureLoader.load(
    "./textures/abstract010/Abstract_Organic_004_basecolor.jpg"
  );
  const normalMap = torusTextureLoader.load(
    "./textures/abstract010/Abstract_Organic_004_normal.jpg"
  );
  const roughnessMap = torusTextureLoader.load(
    "./textures/abstract010/Abstract_Organic_004_roughness.jpg"
  );
  const aoMap = torusTextureLoader.load(
    "./textures/abstract010/Abstract_Organic_004_ambientOcclusion.jpg"
  );
  const displacementMap = torusTextureLoader.load(
    "./textures/abstract010/Abstract_Organic_004_height.png"
  );

  baseColor.wrapS = baseColor.wrapT = THREE.RepeatWrapping;
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;

  baseColor.repeat.set(5, 2);
  normalMap.repeat.set(5, 2);
  roughnessMap.repeat.set(5, 2);
  aoMap.repeat.set(5, 2);
  displacementMap.repeat.set(5, 2);

  const torusMaterial = new THREE.MeshStandardMaterial({
    map: baseColor,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    aoMap: aoMap,
    displacementMap: displacementMap,
    displacementScale: 0.2,
    metalness: 0.3,
    roughness: 0.4,
  });

  torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.geometry.attributes.uv2 = torus.geometry.attributes.uv;
  torus.castShadow = true;
  torus.receiveShadow = true;
  torus.position.set(-1, 0, 0);
  scene.add(torus);

  loader.load(
    "./assets/3d-models/stylized_mushrooms/scene.gltf",
    function (gltf) {
      mushroom = gltf.scene;
      mushroom.position.set(6.5, -1, 0);
      mushroom.scale.set(1.2, 1.2, 1.2);
      scene.add(mushroom);
    }
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  torus.rotation.y += 0.005;

  if (mushroom) {
    mushroom.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);
init();
renderer.setAnimationLoop(animate);
