// Import Express Router and task controllers
import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete
} from '../controllers/taskController.js';

// Create a new router instance
const router = express.Router();

// Define task routes

// GET /api/tasks - Get all tasks (supports ?filter=all|active|completed)
// POST /api/tasks - Create a new task
router.route('/')
  .get(getAllTasks)
  .post(createTask);

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', toggleTaskComplete);

// GET /api/tasks/:id - Get a single task by ID
// PUT /api/tasks/:id - Update a task by ID
// DELETE /api/tasks/:id - Delete a task by ID
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;
