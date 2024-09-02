import React, { useState } from 'react';
import CanvasComponent from '../Layouts/Canvas'; // Assuming the Canvas is in Layouts folder

export const Home = () => {
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState('#000000');

  return (
    <div style={{ backgroundImage: `url('/images/brown-paper.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <CanvasComponent
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        color={color}
        setColor={setColor}
      />
    </div>
  );
};