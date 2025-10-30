// Import Task model
import Task from '../models/Task.js';

// Get all tasks with optional filtering
export const getAllTasks = async (req, res) => {
  try {
    // Extract filter parameter from query string
    const { filter } = req.query;
    let query = {};

    // Apply filter based on completion status
    if (filter === 'active') {
      query.completed = false;
    } else if (filter === 'completed') {
      query.completed = true;
    }
    // If filter is 'all' or undefined, return all tasks

    // Fetch tasks from database, sorted by creation date (newest first)
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    // Create new task with data from request body
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  try {
    // Find task and update with new data
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators on update
      }
    );

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

// Toggle task completion status
export const toggleTaskComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Toggle the completed status
    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task status updated',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling task status',
      error: error.message
    });
  }
};
