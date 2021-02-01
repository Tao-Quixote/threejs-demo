import * as THREE from 'three';
import { update } from '../../utils';

function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true

  // show axes in the screen
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  plane.receiveShadow = true

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF0000,
    wireframe: false
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.set(0, 2, 0);
  cube.castShadow = true

  // add the cube to the scene
  scene.add(cube);

  // create a sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777FF,
    wireframe: false
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.set(20, 4, 2);
  sphere.castShadow = true

  // add the sphere to the scene
  scene.add(sphere);

  // add spotlight for the shadows
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  // var spotLight = new THREE.PointLight(0xFFFFFF);
  spotLight.position.set(-40, 40, -15);
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  spotLight.castShadow = true

  // If you want a more detailled shadow you can increase the 
  // mapSize used to draw the shadows.
  // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  scene.add(spotLight);

  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // add the output of the renderer to the html element
  document.getElementById("webgl-output").appendChild(renderer.domElement);

  function rotation() {
    // rotate
    cube.rotation.x += 0.1
    // cube.rotation.y += 0.2
    // cube.rotation.z += 0.2
  }

  let step = 0;

  function jump() {
    step += 0.04

    sphere.position.x = 20 + 10*(Math.cos(step))
    sphere.position.y = 2 + 10*Math.abs((Math.sin(step)))
  }

  function renderscene () {
    requestAnimationFrame(renderscene)
    rotation()
    jump()
    // render the scene
    renderer.render(scene, camera);

    update()
  }

  renderscene()
}

export default init