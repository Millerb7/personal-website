import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import HomeDrawingBar from "../Tools/Bars/HomeBar";


const CanvasComponent = ({
  selectedTool,
  setSelectedTool,
  brushSize,
  setBrushSize,
  color,
  setColor,
}) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [localStack, setLocalStack] = useState([]); // Local stack for undo/redo
  const [globalStack, setGlobalStack] = useState([]); // Global stack for all strokes
  const [socket, setSocket] = useState(null); // WebSocket connection

  useEffect(() => {
    const socketInstance = io(
      process.env.REACT_APP_SOCKET_SERVER
    );
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("init", (strokes) => {
      setGlobalStack(strokes);
      redrawCanvas(strokes); // Redraw the canvas with the received strokes
    });

    socketInstance.on("stroke", (stroke) => {
      setGlobalStack((prevStack) => {
        const updatedStack = [...prevStack, stroke];
        redrawCanvas(updatedStack); // Redraw the entire canvas with all strokes
        return updatedStack;
      });
    });

    socketInstance.on("undo", () => {
      handleUndo();
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [context]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  useEffect(() => {
    if (context) {
      if (selectedTool === "pointer") {
        canvasRef.current.style.cursor = "default"; // Use default cursor for pointer
      } else if (selectedTool === "eraser") {
        updateCursorForEraser(); // Custom eraser cursor
      } else {
        updateCursor(); // Custom brush cursor
      }
      context.lineWidth = brushSize; // Set the line width based on brushSize
      context.lineCap = "round";
      context.strokeStyle = selectedTool === "eraser" ? "#ffffff" : color;

      // Add transparency for the pen tool
      context.globalAlpha = selectedTool === "pen" ? 0.5 : 1.0; // Example: 50% transparency for the pen tool
    }
  }, [context, selectedTool, brushSize, color]);

  const startDrawing = ({ nativeEvent }) => {
    if (selectedTool === "pointer" || !context) return; // Ensure context is available
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    const newStroke = {
      tool: selectedTool,
      color: selectedTool === "eraser" ? "#ffffff" : color,
      brushSize,
      points: [{ x: offsetX, y: offsetY }],
    };

    setLocalStack((prevStack) => [...prevStack, newStroke]);
    setGlobalStack((prevStack) => [...prevStack, newStroke]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || selectedTool === "pointer" || !context) return; // Ensure context is available
    const { offsetX, offsetY } = nativeEvent;

    const currentStroke = localStack[localStack.length - 1];
    currentStroke.points.push({ x: offsetX, y: offsetY });

    if (selectedTool === "eraser") {
      // Use clearRect for the eraser
      context.clearRect(
        offsetX - brushSize / 2,
        offsetY - brushSize / 2,
        brushSize,
        brushSize
      );
    } else {
      // Draw only the current segment for other tools
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !context) return;

    setIsDrawing(false);
    context.closePath(); // Finish the current stroke

    const currentStroke = localStack[localStack.length - 1];
    if (socket && selectedTool !== "eraser") {
      socket.emit("stroke", currentStroke); // Send stroke to other clients
    }

    // Redraw the entire canvas with updated globalStack
    redrawCanvas(globalStack); // Ensure all strokes are redrawn
  };

  const undoLastStrokeHandler = () => {
    if (localStack.length > 0 && context) {
      const lastStroke = localStack.pop();
      setGlobalStack(globalStack.filter((stroke) => stroke !== lastStroke));
      redrawCanvas(globalStack);

      if (socket) {
        socket.emit("undo"); // Notify other clients to undo the last stroke
      }
    }
  };

  const handleUndo = () => {
    setGlobalStack((prevStack) => {
      const updatedStack = prevStack.slice(0, -1);
      redrawCanvas(updatedStack); // Redraw the canvas with updated stack
      return updatedStack;
    });
  };

  const redrawCanvas = (strokes) => {
    if (!context) return; // Ensure context is available before drawing
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas before redraw

    strokes.forEach((stroke) => {
      context.lineWidth = stroke.brushSize;
      context.lineCap = "round";
      context.strokeStyle = stroke.color;
      context.globalAlpha = stroke.tool === "pen" ? 0.5 : 1.0; // Apply transparency to pen strokes

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
    const cursorCanvas = document.createElement("canvas");
    const ctx = cursorCanvas.getContext("2d");
    const size = brushSize * 2;

    cursorCanvas.width = size;
    cursorCanvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    const dataURL = cursorCanvas.toDataURL();
    canvasRef.current.style.cursor = `url(${dataURL}) ${brushSize / 2} ${
      brushSize / 2
    }, auto`;
  };

  const updateCursorForEraser = () => {
    const cursorCanvas = document.createElement("canvas");
    const ctx = cursorCanvas.getContext("2d");
    const size = brushSize * 2;

    cursorCanvas.width = size;
    cursorCanvas.height = size;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();

    const dataURL = cursorCanvas.toDataURL();
    canvasRef.current.style.cursor = `url(${dataURL}) ${size / 2} ${
      size / 2
    }, auto`;
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
        style={{ position: "absolute", top: 0, left: 0 }}
      />

      <HomeDrawingBar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        color={color}
        setColor={setColor}
      />
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
