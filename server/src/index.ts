import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/db';
import routes from './routes';
import { setupSocket } from './sockets';


const PORT = process.env.PORT || 5000;

// Initialize the Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Set up routes
app.use('/', routes);

// Create the HTTP server
const server = http.createServer(app);

// Set up Socket.IO with the server
setupSocket(server);

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
