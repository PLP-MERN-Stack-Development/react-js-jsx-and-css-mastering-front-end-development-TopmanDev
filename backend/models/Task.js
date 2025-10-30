// Import mongoose for MongoDB schema definition
import mongoose from 'mongoose';

// Define the Task schema with validation rules
const taskSchema = new mongoose.Schema(
  {
    // Task title - required field
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    // Task description - optional field
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    // Completion status - defaults to false (not completed)
    completed: {
      type: Boolean,
      default: false
    },
    // Priority level - low, medium, or high
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    // Due date for the task - optional
    dueDate: {
      type: Date
    }
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
  }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;
