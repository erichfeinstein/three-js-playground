import React, { useEffect, useState } from 'react';
import './App.css';

//Three Components
import { FlyingShapes } from './FlyingShapes';
import { Ocean } from './Ocean';

function App() {
  const [animation, setAnimation] = useState(0);
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
    let camera, renderer;
    if (animation === 1) {
      const res = Ocean();
      camera = res.camera;
      renderer = res.renderer;
    }
    if (animation === 2) {
      const res = FlyingShapes();
      camera = res.camera;
      renderer = res.renderer;
    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, [animation]);
  return (
    <div className="App">
      <button
        onClick={() => {
          setAnimation(1);
        }}
      >
        Ocean
      </button>
      <button
        onClick={() => {
          setAnimation(2);
        }}
      >
        Flying Shapes
      </button>
    </div>
  );
}

export default App;
