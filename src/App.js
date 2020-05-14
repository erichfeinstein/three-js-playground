import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

//Three
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

function App() {
  let pressed = {};
  //Main
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let pressed = {};
    let deltaY = 0;
    document.addEventListener('keypress', (evt) => {
      pressed[evt.key] = true;
    });
    document.addEventListener('keyup', (evt) => {
      delete pressed[evt.key];
    });
    document.addEventListener('mousemove', (evt) => {
      deltaY = (evt.screenY - window.innerHeight / 2) / 1500;
      deltaY = Math.min(deltaY, 0.01);
    });

    //CUBE
    var boxGeo = new THREE.BoxGeometry();
    var boxMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x0000ff,
    });
    var cube = new THREE.Mesh(boxGeo, boxMat);
    scene.add(cube);

    //SPHERE
    var sphereGeo = new THREE.SphereGeometry(1, 10, 10);
    var sphereMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xff00ff,
    });
    var sphere = new THREE.Mesh(sphereGeo, sphereMat);
    camera.position.z = sphere.position.z + 2;
    sphere.add(camera);
    scene.add(sphere);

    //Controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(
      sphere.position.x,
      sphere.position.y,
      sphere.position.z
    );

    function animate() {
      controls.update();

      var forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      var right = new THREE.Vector3().crossVectors(camera.up, forward);

      camera.lookAt(sphere.position.x, sphere.position.y, sphere.position.z);

      if (pressed['w']) sphere.position.addScaledVector(forward, 0.01);
      if (pressed['s']) sphere.position.addScaledVector(forward, -0.01);
      if (pressed['a']) sphere.position.addScaledVector(right, 0.01);
      if (pressed['d']) sphere.position.addScaledVector(right, -0.01);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  });

  return <div className="App" />;
}

export default App;
