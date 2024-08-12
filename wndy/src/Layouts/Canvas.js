import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CanvasComponent = ({ selectedTool, brushSize, color }) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  useEffect(() => {
    if (context) {
      if (selectedTool === 'pointer') {
        canvasRef.current.style.cursor = 'default'; // Use default cursor for pointer
      } else if (selectedTool === 'eraser') {
          updateCursorForEraser(); // Use custom eraser cursor
      } else {
          updateCursor(); // Use the brush cursor
      }
      context.lineWidth = brushSize; // Set the line width based on brushSize
      context.lineCap = 'round';
      context.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : color;
    }
  }, [context, selectedTool, brushSize, color]);

  const startDrawing = ({ nativeEvent }) => {
    if (selectedTool === 'pointer') return;
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || selectedTool === 'pointer') return;
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (selectedTool === 'pointer') return;
    context.closePath();
    setIsDrawing(false);
  };

  const updateCursor = () => {
    const cursorCanvas = document.createElement('canvas');
    const ctx = cursorCanvas.getContext('2d');
    const size = brushSize * 2;

    cursorCanvas.width = size;
    cursorCanvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    const dataURL = cursorCanvas.toDataURL();
    canvasRef.current.style.cursor = `url(${dataURL}) ${brushSize / 2} ${brushSize / 2}, auto`;
};

const updateCursorForEraser = () => {
  const cursorCanvas = document.createElement('canvas');
  const ctx = cursorCanvas.getContext('2d');
  const size = brushSize * 2;

  cursorCanvas.width = size;
  cursorCanvas.height = size;

  // Draw a white circle in the middle of the canvas
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Draw a black outline around the circle
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2; // Set the outline thickness
  ctx.stroke();

  const dataURL = cursorCanvas.toDataURL();

  // Apply the custom cursor with proper offsets for the eraser tool
  canvasRef.current.style.cursor = `url(${dataURL}) ${size / 2} ${size / 2}, auto`;
};



  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
};

CanvasComponent.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  brushSize: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default CanvasComponent;
