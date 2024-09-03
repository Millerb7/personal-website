import React from 'react';
import CanvasComponent from '../Layouts/Canvas'; 
import { useOutletContext } from 'react-router-dom';

export const Home = () => {
  // Retrieve the context from Outlet
  const {
    selectedTool,
    setSelectedTool,
    brushSize,
    setBrushSize,
    color,
    setColor,
  } = useOutletContext();

  console.log({ selectedTool, setSelectedTool, brushSize, setBrushSize, color, setColor });

  return (
    <div>
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
