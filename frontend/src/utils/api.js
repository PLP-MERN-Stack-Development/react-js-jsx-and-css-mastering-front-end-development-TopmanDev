// API utility for making HTTP requests to the backend
import axios from 'axios';

// Base URL for API requests - uses proxy in development
const API_BASE_URL = '/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API endpoints
export const taskAPI = {
  // Get all tasks with optional filter (all, active, completed)
  getAllTasks: (filter = 'all') => {
    return api.get(`/tasks?filter=${filter}`);
  },

  // Get a single task by ID
  getTaskById: (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Create a new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update an existing task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Delete a task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },

  // Toggle task completion status
  toggleTaskComplete: (id) => {
    return api.patch(`/tasks/${id}/toggle`);
  },
};

export default api;
