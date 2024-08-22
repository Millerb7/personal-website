const { Server } = require('socket.io');

let globalStrokes = [];

const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send all current strokes to the new user
    socket.emit('init', globalStrokes);

    // Listen for new strokes from clients
    socket.on('stroke', (stroke) => {
      globalStrokes.push(stroke); // Add the stroke to the global strokes
      io.emit('stroke', stroke); // Broadcast the stroke to all clients
    });

    // Handle undo events
    socket.on('undo', () => {
      globalStrokes.pop(); // Remove the last stroke
      io.emit('undo'); // Notify all clients to undo the last stroke
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = setupWebSocket;
