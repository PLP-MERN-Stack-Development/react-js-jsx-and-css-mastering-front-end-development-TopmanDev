// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import taskRoutes from './routes/taskRoutes.js';

// Explicitly load the backend/.env file
dotenv.config({ path: path.resolve('./backend/.env') });

// Destructure environment variables
const { MONGODB_URI, PORT } = process.env;

// Check required env variables
if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not defined in backend/.env');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
});
