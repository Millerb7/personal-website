const { Server } = require('socket.io');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

let globalStrokes = [];

// Helper function to log data
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(path.join(__dirname, 'socket.log'), logMessage);
};

// Function to save whiteboard data by making an API call
const saveWhiteboardData = (strokes) => {
  writeLog('Attempting to save whiteboard data');

  axios.post('http://localhost:8000/whiteboard/save', { strokes }) // Fixed the endpoint
    .then(() => {
      writeLog('Whiteboard data saved successfully');
    })
    .catch((error) => {
      writeLog(`Error saving whiteboard data: ${error.response ? error.response.data : error.message}`);
    });
};

const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust the origin if needed for security
      methods: ["GET", "POST"]
    }
  });

  writeLog('WebSocket server started');

  io.on('connection', (socket) => {
    writeLog('A user connected');

    // Emit the current state of the whiteboard to the new client
    socket.emit('init', globalStrokes);
    writeLog(`Sent current strokes to user: ${JSON.stringify(globalStrokes)}`);

    // Listen for new strokes from clients
    socket.on('stroke', (stroke) => {
      writeLog(`Received stroke: ${JSON.stringify(stroke)}`);
      globalStrokes.push(stroke); // Add the stroke to the global strokes
      io.emit('stroke', stroke); // Broadcast the stroke to all clients
      writeLog(`Broadcast stroke: ${JSON.stringify(stroke)}`);

      // Save whiteboard data after each stroke
      saveWhiteboardData(globalStrokes);
    });

    // Handle undo events
    socket.on('undo', () => {
      if (globalStrokes.length > 0) {
        const lastStroke = globalStrokes.pop(); // Remove the last stroke
        io.emit('undo'); // Notify all clients to undo the last stroke
        writeLog(`Undo last stroke: ${JSON.stringify(lastStroke)}`);

        // Save the updated whiteboard data
        saveWhiteboardData(globalStrokes);
      } else {
        writeLog('Undo attempted, but no strokes to undo');
      }
    });

    socket.on('disconnect', () => {
      writeLog('A user disconnected');
    });
  });
};

module.exports = setupWebSocket;
