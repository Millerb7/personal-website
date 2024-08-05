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
      context.lineWidth = selectedTool === 'eraser' ? 10 : brushSize;
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
