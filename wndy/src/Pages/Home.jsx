import { createContext, useEffect, useState } from "react";
import { Application } from '@splinetool/runtime';

export const Home = () => {

    useEffect(() => {
          const canvas = document.getElementById('canvas3d');
          const app = new Application(canvas);
          app.load('https://prod.spline.design/B2mpwCdj5skEftPN/scene.splinecode');    
    
      }, []);
    return (
        <canvas
        id="canvas3d"
        style={{ width: "100%", height: "90vh" }}
      ></canvas>
    );
}