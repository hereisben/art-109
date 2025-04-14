// Basic Three.JS scene from documentation, importing Three.JS through a CDN
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from "three";

// Import add-ons
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~
let scene,
  camera,
  renderer,
  ball,
  dog,
  torus,
  mushroom,
  balloon,
  mixerBalloon,
  mixerDog,
  actionDown,
  actionPant,
  actionTail,
  dogIsReady,
  egg;

let sceneContainer = document.getElementById("three-container");
let eggContainer = document.getElementById("egg-container");

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    sceneContainer.clientWidth / sceneContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 7.5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
  sceneContainer.appendChild(renderer.domElement);
  renderer.setClearColor(0xb17457);
  renderer.shadowMap.enabled = true;

  // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
  // const controls = new OrbitControls(camera, renderer.domElement);
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

  const geometry = new THREE.SphereGeometry(0.7, 32, 32);
  const texture = new THREE.TextureLoader().load("./textures/globalearth.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  ball = new THREE.Mesh(geometry, material);
  ball.position.set(0, 0, 0);

  ball.scale.set(2, 2, 2);
  scene.add(ball);

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
  torus.position.set(-5, 0, 0);
  scene.add(torus);

  loader.load(
    "./assets/3d-models/stylized_mushrooms/scene.gltf",
    function (gltf) {
      mushroom = gltf.scene;
      scene.add(mushroom);
      onWindowResize();
    }
  );

  loader.load(
    "./assets/3d-models/armature_balloon/balloon_peachy_sketchfab.glb",
    function (gltf) {
      balloon = gltf.scene;
      scene.add(balloon);
      onWindowResize();

      mixerBalloon = new THREE.AnimationMixer(balloon);
      const clips = gltf.animations;
      const clip = THREE.AnimationClip.findByName(
        clips,
        "armature_balloonAction"
      );

      console.log(
        "Clips:",
        clips.map((c) => c.name)
      );
      if (clip) {
        mixerBalloon.clipAction(clip).play();
      }
      onWindowResize();
    }
  );

  dogIsReady = false;
  loader.load("./assets/3d-models/dog_shiny/dog_shiny.gltf", function (gltf) {
    dog = gltf.scene;
    scene.add(dog);
    onWindowResize();

    mixerDog = new THREE.AnimationMixer(dog);
    const clips = gltf.animations;

    const downClip = THREE.AnimationClip.findByName(clips, "down");
    actionDown = mixerDog.clipAction(downClip);
    actionDown.setLoop(THREE.LoopOnce, 1);
    actionDown.clampWhenFinished = true;

    const pantClip = THREE.AnimationClip.findByName(clips, "pant");
    actionPant = mixerDog.clipAction(pantClip);
    actionPant.setLoop(THREE.LoopRepeat);
    actionPant.clampWhenFinished = true;

    const tailClip = THREE.AnimationClip.findByName(clips, "tail");
    actionTail = mixerDog.clipAction(tailClip);
    actionTail.setLoop(THREE.LoopRepeat);
    actionTail.clampWhenFinished = true;

    console.log(
      "Clips:",
      clips.map((c) => c.name)
    );

    dogIsReady = true;
  });
}

let eggScene, eggCamera, eggRedenderer;

function initSecondScene() {
  eggScene = new THREE.Scene();
  eggCamera = new THREE.PerspectiveCamera(
    75,
    eggContainer.clientWidth / eggContainer.clientHeight,
    0.1,
    1000
  );
  eggCamera.position.z = 5;

  eggRedenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  eggRedenderer.setSize(eggContainer.clientWidth, eggContainer.clientHeight);
  eggContainer.appendChild(eggRedenderer.domElement);
  // eggRedenderer.setClearColor(0xb17457);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  eggScene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(-5, 5, 5);
  directionalLight.castShadow = true;
  eggScene.add(directionalLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(5, 5, 5);
  pointLight.castShadow = true;
  eggScene.add(pointLight);

  const eggGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const eggTextureLoader = new THREE.TextureLoader();
  const eggBaseColor = eggTextureLoader.load(
    "./textures/egg/egg_basecolor.jpg"
  );
  const eggNormalMap = eggTextureLoader.load("./textures/egg/egg_normal.jpg");
  const eggRoughnessMap = eggTextureLoader.load(
    "./textures/egg/egg_roughness.jpg"
  );
  const eggAoMap = eggTextureLoader.load(
    "./textures/egg/egg_ambientOcclusion.jpg"
  );
  const eggDisplacementMap = eggTextureLoader.load(
    "./textures/egg/egg_height.png"
  );
  eggBaseColor.wrapS = eggBaseColor.wrapT = THREE.RepeatWrapping;
  eggNormalMap.wrapS = eggNormalMap.wrapT = THREE.RepeatWrapping;
  eggRoughnessMap.wrapS = eggRoughnessMap.wrapT = THREE.RepeatWrapping;
  eggAoMap.wrapS = eggAoMap.wrapT = THREE.RepeatWrapping;
  eggDisplacementMap.wrapS = eggDisplacementMap.wrapT = THREE.RepeatWrapping;
  eggBaseColor.repeat.set(5, 2);
  eggNormalMap.repeat.set(5, 2);
  eggRoughnessMap.repeat.set(5, 2);
  eggAoMap.repeat.set(5, 2);
  eggDisplacementMap.repeat.set(5, 2);
  const eggMaterial = new THREE.MeshStandardMaterial({
    map: eggBaseColor,
    normalMap: eggNormalMap,
    roughnessMap: eggRoughnessMap,
    aoMap: eggAoMap,
    displacementMap: eggDisplacementMap,
    displacementScale: 0.005,
    metalness: 0.3,
    roughness: 0.4,
  });

  egg = new THREE.Mesh(eggGeometry, eggMaterial);
  egg.geometry.attributes.uv2 = egg.geometry.attributes.uv;
  eggScene.add(egg);
}

function onWindowResize() {
  const width = sceneContainer.clientWidth;
  const height = sceneContainer.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  const scaleFactor = width / 800;

  ball.scale.set(1.5 * scaleFactor, 1.5 * scaleFactor, 1.5 * scaleFactor);

  torus.scale.set(0.4 * scaleFactor, 0.4 * scaleFactor, 0.4 * scaleFactor);
  torus.position.set(-7 * scaleFactor, 0 * scaleFactor, 0 * scaleFactor);

  if (mushroom) {
    mushroom.scale.set(0.7 * scaleFactor, 0.7 * scaleFactor, 0.7 * scaleFactor);
    mushroom.position.set(6 * scaleFactor, -0.8 * scaleFactor, 0 * scaleFactor);
  }

  if (balloon) {
    balloon.scale.set(
      0.08 * scaleFactor,
      0.08 * scaleFactor,
      0.08 * scaleFactor
    );
    balloon.position.set(1 * scaleFactor, -0.8 * scaleFactor, 0 * scaleFactor);
  }

  if (dog) {
    dog.scale.set(2.3 * scaleFactor, 2.3 * scaleFactor, 2.3 * scaleFactor);
    dog.position.set(-3 * scaleFactor, -1.2 * scaleFactor, 0 * scaleFactor);
  }

  if (eggCamera && eggRedenderer) {
    const eggWidth = eggContainer.clientWidth;
    const eggHeight = eggContainer.clientHeight;
    eggCamera.aspect = eggWidth / eggHeight;
    eggCamera.updateProjectionMatrix();
    eggRedenderer.setSize(eggWidth, eggHeight);
  }

  if (egg) {
    egg.scale.set(1.2, 1.6, 1.2);
    egg.position.set(6, 0, 0);
  }
}

const clock = new THREE.Clock();
function animate() {
  const time = Date.now() * 0.001;
  const radius = 21;

  ball.position.x = Math.cos(time) * radius;
  ball.position.z = (Math.sin(time) * radius) / 4;
  ball.rotation.y += 0.01;

  torus.rotation.y += 0.005;

  if (mushroom) {
    mushroom.rotation.y += 0.01;
  }

  const delta = clock.getDelta();
  if (balloon && mixerBalloon) {
    mixerBalloon.update(delta);
  }

  if (dog && mixerDog) {
    mixerDog.update(delta);
    dog.rotation.y += 0.01;
  }

  renderer.render(scene, camera);

  if (eggRedenderer && eggScene && eggCamera) {
    eggRedenderer.render(eggScene, eggCamera);
  }

  if (egg) {
    egg.rotation.y += 0.01;
  }
}

window.addEventListener("resize", onWindowResize, false);
init();
initSecondScene();
renderer.setAnimationLoop(animate);

// ~~~~~~~~~~~~~~~~ Animation ~~~~~~~~~~~~~~~~

sceneContainer.addEventListener("mousedown", () => {
  if (dogIsReady && actionPant && actionTail.isRunning()) {
    actionDown?.stop();
    actionTail.stop();
    actionPant.reset().play();
    console.log("Panting");
  } else if (dogIsReady && actionTail && actionPant.isRunning()) {
    actionPant.stop();
    actionDown?.stop();
    actionTail.reset().play();
    console.log("Tail wagging");
  }
});
sceneContainer.addEventListener("mouseenter", () => {
  if (dogIsReady && actionTail) {
    actionPant?.stop();
    actionDown?.stop();
    actionTail.reset().play();
    console.log("Tail wagging");
  } else {
    console.warn("Tail animation not ready yet");
  }
});
sceneContainer.addEventListener("mouseleave", () => {
  if (dogIsReady && actionDown) {
    actionPant?.stop();
    actionTail?.stop();
    actionDown.setLoop(THREE.LoopOnce, 1);
    actionDown.clampWhenFinished = false;
    actionDown.play();
    console.log("Going down");
  } else {
    console.warn("Down animation not ready yet");
  }
});

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // eggCamera.position.z = t * -0.001;
  // eggCamera.position.x = t * 0.001;
  egg.scale.set(1.2 + t * -0.001, 1.6 + t * -0.001, 1.2 + t * -0.001);

  egg.position.set(7 + t * 0.02, 0 + t * -0.002, 0 + t * -0.002);
}

document.body.onscroll = moveCamera;
