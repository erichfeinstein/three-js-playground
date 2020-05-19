import * as THREE from 'three';

export const FlyingShapes = () => {
  //Objects
  let objs = [];

  //Scene and Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  camera.position.z = 10;

  //Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function createObj() {
    const geometry = new THREE.OctahedronGeometry();
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    });
    const renderItem = new THREE.Mesh(geometry, material);
    const rotationFactor = (Math.random() - 0.5) / 50.0;
    scene.add(renderItem);
    return { renderItem, rotationFactor };
  }
  setInterval(() => {
    objs.push(createObj());
  }, 200);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    objs.forEach((obj) => {
      if (obj.renderItem.position.z > 25) {
        obj.renderItem.geometry.dispose();
        obj.renderItem.material.dispose();
        scene.remove(obj.renderItem);
      }
      obj.renderItem.position.z += 0.1;
      obj.renderItem.rotateZ(obj.rotationFactor);
      obj.renderItem.rotateX(obj.rotationFactor);
      obj.renderItem.rotateY(obj.rotationFactor);
    });
  }
  animate();
  return { camera, renderer, scene };
};
