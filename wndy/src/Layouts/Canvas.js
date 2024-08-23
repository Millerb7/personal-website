import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import DrawingBar from '../Tools/DrawingApp';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// BottomBar styled component
const BottomBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(145deg, #e1e1e1, #f0f0f0)',
  borderTop: `1px solid #bfbfbf`,
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  zIndex: 11, // Make sure the toolbar is above the canvas
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, #fff, #ccc, #fff)',
    borderRadius: '2px',
  },
}));

const CanvasComponent = ({ selectedTool, setSelectedTool, brushSize, setBrushSize, color, setColor }) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [localStack, setLocalStack] = useState([]); // Local stack for undo/redo
  const [globalStack, setGlobalStack] = useState([]); // Global stack for all strokes
  const [socket, setSocket] = useState(null); // WebSocket connection
  const [undoLastStroke, setUndoLastStroke] = useState(() => () => {}); // Undo function

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_SOCKET_SERVER); // Use environment variable for WebSocket URL
    setSocket(socketInstance);

    socketInstance.emit('init');

    // Handle incoming strokes from other users
    socketInstance.on('stroke', (stroke) => {
      setGlobalStack((prevStack) => [...prevStack, stroke]);
      redrawCanvas([...globalStack, stroke]);
    });

    // Handle undo events from other users
    socketInstance.on('undo', () => {
      handleUndo();
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
        canvasRef.current.style.cursor = 'default'; // Use default cursor for pointer
      } else if (selectedTool === 'eraser') {
        updateCursorForEraser(); // Custom eraser cursor
      } else {
        updateCursor(); // Custom brush cursor
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

    // Draw only the current segment
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    context.closePath(); // Finish the current stroke

    const currentStroke = localStack[localStack.length - 1];
    if (socket) {
      console.log('sent stroke');
      socket.emit('stroke', currentStroke); // Send stroke to other clients
    }

    // Redraw the entire canvas with updated globalStack
    redrawCanvas(globalStack);
  };

  const undoLastStrokeHandler = () => {
    if (localStack.length > 0) {
      const lastStroke = localStack.pop();
      setGlobalStack(globalStack.filter((stroke) => stroke !== lastStroke));
      redrawCanvas(globalStack);
      console.log('undo');
      
      if (socket) {
        socket.emit('undo'); // Notify other clients to undo the last stroke
      }
    }
  };

  const handleUndo = () => {
    setGlobalStack((prevStack) => {
      const updatedStack = prevStack.slice(0, -1);
      redrawCanvas(updatedStack);
      return updatedStack;
    });
  };

  const redrawCanvas = (strokes) => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Redraw all strokes
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
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={window.innerWidth}
        height={window.innerHeight - 80} // Adjust height to account for the BottomBar
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* Include the DrawingBar in the BottomBar */}
      <BottomBar>
        <DrawingBar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          color={color}
          setColor={setColor}
          undoLastStroke={undoLastStrokeHandler} // Pass the undo function
        />
      </BottomBar>
    </div>
  );
};

CanvasComponent.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setSelectedTool: PropTypes.func.isRequired,
  brushSize: PropTypes.number.isRequired,
  setBrushSize: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default CanvasComponent;
