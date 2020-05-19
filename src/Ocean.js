import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

export const Ocean = () => {
  let x = 0;
  //Scene and Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  camera.position.z = 40;
  camera.position.y = 15;
  camera.position.x = 20;

  //Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Controls
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //Circles
  const createCircle = () => {
    var geo = new THREE.CircleGeometry(0.1, 30, 30);
    var material = new THREE.MeshBasicMaterial({
      color: '#55ccff',
    });
    var circle = new THREE.Mesh(geo, material);
    scene.add(circle);
    return circle;
  };
  const count = 50;
  let circles = [];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const circle = createCircle();
      circle.position.x = i;
      circle.position.z = j;
      circles.push(circle);
    }
  }

  function update() {
    circles.forEach((circle, i) => {
      circle.position.y = Math.sin(x + i);
      circle.lookAt(camera.position);
    });
    x += 0.05;
  }

  function animate() {
    update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  camera.lookAt(circles[circles.length / 2].position);
  animate();
  return { camera, renderer, scene };
};
