import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Application } from '@splinetool/runtime';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/B2mpwCdj5skEftPN/scene.splinecode');
    
  }, []);

  return (
    <div className="App">
        {/* Add the canvas element where the Spline object will be rendered */}
        <canvas id="canvas3d" style={{ width: '10%', height: '10%' }}></canvas>
    </div>
  );
}

export default App;

