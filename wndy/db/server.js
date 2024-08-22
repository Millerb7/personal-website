require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./websocket/websocket');

// Import API routes
const postsRoutes = require('./api/posts');
const categoriesRoutes = require('./api/categories');

const app = express();
const port = process.env.PORT || 8000; // Use the port from .env, fallback to 8000

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api', postsRoutes);
app.use('/api', categoriesRoutes);

// Start the Express server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Setup WebSocket
setupWebSocket(server);
