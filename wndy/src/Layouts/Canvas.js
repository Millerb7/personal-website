import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const CanvasComponent = ({ selectedTool, brushSize, color }) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [localStack, setLocalStack] = useState([]); // Local stack for undo/redo
  const [globalStack, setGlobalStack] = useState([]); // Global stack for all strokes
  const [socket, setSocket] = useState(null); // WebSocket connection

  useEffect(() => {
    const socketInstance = io('http://localhost:3000'); // Replace with your WebSocket server URL
    setSocket(socketInstance);

    // Handle incoming strokes from other users
    socketInstance.on('stroke', (stroke) => {
      setGlobalStack((prevStack) => [...prevStack, stroke]);
      redrawCanvas([...globalStack, stroke]);
    });

    // Handle undo events from other users
    socketInstance.on('undo', (userId) => {
      handleUndo(userId);
    });

    return () => socketInstance.disconnect();
  }, []);

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
        canvasRef.current.style.cursor = 'default';
      } else if (selectedTool === 'eraser') {
        updateCursorForEraser();
      } else {
        updateCursor();
      }
      context.lineWidth = brushSize;
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

    const newStroke = {
      tool: selectedTool,
      color: selectedTool === 'eraser' ? '#ffffff' : color,
      brushSize,
      points: [{ x: offsetX, y: offsetY }],
    };

    setLocalStack((prevStack) => [...prevStack, newStroke]);
    setGlobalStack((prevStack) => [...prevStack, newStroke]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || selectedTool === 'pointer') return;
    const { offsetX, offsetY } = nativeEvent;

    const currentStroke = localStack[localStack.length - 1];
    currentStroke.points.push({ x: offsetX, y: offsetY });
    redrawCanvas(globalStack);

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (selectedTool === 'pointer') return;
    setIsDrawing(false);
    context.closePath();

    const currentStroke = localStack[localStack.length - 1];
    if (socket) {
      socket.emit('stroke', currentStroke); // Send stroke to other clients
    }
  };

  const undoLastStroke = () => {
    if (localStack.length > 0) {
      const lastStroke = localStack.pop();
      setGlobalStack(globalStack.filter((stroke) => stroke !== lastStroke));
      redrawCanvas(globalStack);

      if (socket) {
        socket.emit('undo'); // Notify other clients to undo the last stroke
      }
    }
  };

  const handleUndo = (userId) => {
    setGlobalStack((prevStack) => {
      const updatedStack = prevStack.filter((stroke, index) => index !== prevStack.length - 1);
      redrawCanvas(updatedStack);
      return updatedStack;
    });
  };

  const redrawCanvas = (strokes) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    strokes.forEach((stroke) => {
      context.lineWidth = stroke.brushSize;
      context.lineCap = 'round';
      context.strokeStyle = stroke.color;

      context.beginPath();
      stroke.points.forEach(({ x, y }, index) => {
        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.stroke();
      context.closePath();
    });
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

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

    const dataURL = cursorCanvas.toDataURL();
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
