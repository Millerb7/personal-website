import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import DrawingBar from '../Tools/DrawingBar'; // Import your DrawingBar
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
  zIndex: 11, // Ensure it's above the canvas but not covering the canvas
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

  useEffect(() => {
    const socketInstance = io('http://localhost:8000'); // Fallback for testing
    setSocket(socketInstance);

    console.log('Attempting to connect to WebSocket server...');

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for 'init' event and update the canvas with the current whiteboard state
    socketInstance.on('init', (strokes) => {
      console.log('Received init event with strokes:', strokes);
      setGlobalStack(strokes);
      redrawCanvas(strokes); // Redraw the canvas with the received strokes
    });

    // Listen for new strokes from other users
    socketInstance.on('stroke', (stroke) => {
      console.log('Received stroke from server:', stroke);
      setGlobalStack((prevStack) => {
        const updatedStack = [...prevStack, stroke];
        redrawCanvas(updatedStack); // Redraw the entire canvas with all strokes
        return updatedStack;
      });
    });

    // Listen for undo events from other users
    socketInstance.on('undo', () => {
      console.log('Undo received from server');
      handleUndo();
    });

    // Error handling for WebSocket connection
    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socketInstance.disconnect();
      console.log('Disconnected from WebSocket server');
    };
  }, [context]); // Ensure that socket events are tied to context updates

  // Set up the canvas when the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  // Update the context whenever brush size, tool, or color changes
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

  // Start drawing on the canvas
  const startDrawing = ({ nativeEvent }) => {
    if (selectedTool === 'pointer' || !context) return; // Ensure context is available
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

  // Continue drawing as the mouse moves
  const draw = ({ nativeEvent }) => {
    if (!isDrawing || selectedTool === 'pointer' || !context) return; // Ensure context is available
    const { offsetX, offsetY } = nativeEvent;

    const currentStroke = localStack[localStack.length - 1];
    currentStroke.points.push({ x: offsetX, y: offsetY });

    // Draw only the current segment
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  // Stop drawing when the mouse is released
  const stopDrawing = () => {
    if (!isDrawing || !context) return;

    setIsDrawing(false);
    context.closePath(); // Finish the current stroke

    const currentStroke = localStack[localStack.length - 1];
    if (socket && selectedTool !== 'eraser') {
      socket.emit('stroke', currentStroke); // Send stroke to other clients
    }

    // Redraw the entire canvas with updated globalStack
    redrawCanvas(globalStack); // Ensure all strokes are redrawn
  };

  // Undo the last stroke
  const undoLastStrokeHandler = () => {
    if (localStack.length > 0 && context) {
      const lastStroke = localStack.pop();
      setGlobalStack(globalStack.filter((stroke) => stroke !== lastStroke));
      redrawCanvas(globalStack);

      if (socket) {
        socket.emit('undo'); // Notify other clients to undo the last stroke
      }
    }
  };

  // Handle undoing strokes from other clients
  const handleUndo = () => {
    setGlobalStack((prevStack) => {
      const updatedStack = prevStack.slice(0, -1);
      redrawCanvas(updatedStack); // Redraw the canvas with updated stack
      return updatedStack;
    });
  };

  // Redraw the canvas from the list of strokes
  const redrawCanvas = (strokes) => {
    if (!context) return; // Ensure context is available before drawing
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas before redraw

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

  // Update the cursor for brush tool
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

  // Update the cursor for the eraser tool
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
    <div>
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
      <BottomBar>
        <DrawingBar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          color={color}
          setColor={setColor}
          undoLastStroke={undoLastStrokeHandler} // Hook undo functionality
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
