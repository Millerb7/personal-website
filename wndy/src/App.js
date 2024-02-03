import React, { useEffect } from 'react';
import './App.css';
import { Application } from '@splinetool/runtime';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://prod.spline.design/B2mpwCdj5skEftPN/scene.splinecode');    
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <div> {/* Adjust this value based on your AppBar height */}
        <canvas id="canvas3d" style={{ width: '100%', height: '90vh' }}></canvas>
      </div>
    </div>
  );
}

export default App;
