require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./websocket');

// Import API routes
const postsRoutes = require('./api/posts');
const categoriesRoutes = require('./api/categories');
const whiteboardRoutes = require('./api/whiteboard'); // Import whiteboard API

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/posts', postsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/whiteboard', whiteboardRoutes); // Add whiteboard routes

// Start the Express server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Setup WebSocket server
setupWebSocket(server);
