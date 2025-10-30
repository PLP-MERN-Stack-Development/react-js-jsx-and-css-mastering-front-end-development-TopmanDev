# Task Management System

A modern, full-stack task management application built with React, Express, and MongoDB.

## Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (All, Active, Completed)
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Due Dates**: Add due dates to tasks
- **Dark Mode**: Toggle between light and dark themes
- **API Explorer**: Browse data from JSONPlaceholder API with search and pagination
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Beautiful transitions and animations throughout

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Project Structure

```
project/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── TaskManager.jsx
│   │   │   └── APIExplorer.jsx
│   │   ├── context/         # React Context providers
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useLocalStorage.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx          # Main App component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   └── index.html
├── backend/                  # Express backend
│   ├── models/              # MongoDB models
│   │   └── Task.js
│   ├── routes/              # API routes
│   │   └── taskRoutes.js
│   ├── controllers/         # Route controllers
│   │   └── taskController.js
│   ├── server.js            # Server entry point
│   └── .env                 # Environment variables
└── package.json
```

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) installed
2. **MongoDB** installed and running locally on port 27017

### Installing MongoDB

#### On macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### On Ubuntu/Debian:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### On Windows:
Download and install from: https://www.mongodb.com/try/download/community

## Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Run Frontend and Backend Together
```bash
npm run dev:all
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

## Using the Application

### Task Management
1. Navigate to the home page
2. Fill in the task form (title, description, priority, due date)
3. Click "Add Task" to create a new task
4. Use the filter buttons to view All, Active, or Completed tasks
5. Click the checkmark icon to mark tasks as complete/incomplete
6. Click the edit icon to modify task details
7. Click the trash icon to delete tasks

### API Explorer
1. Navigate to "API Explorer" in the navigation menu
2. Browse posts from the JSONPlaceholder API
3. Use the search bar to filter posts by title or content
4. Use pagination buttons to navigate through pages

### Theme Toggle
- Click the sun/moon icon in the navbar to switch between light and dark modes
- Your preference is saved in localStorage

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (supports ?filter=all|active|completed)
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status

### Request Body Example (Create/Update Task)
```json
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

## Environment Variables

Backend configuration (backend/.env):
```
MONGODB_URI=mongodb://localhost:27017/taskmanagement
PORT=5000
```

## Database

The application uses MongoDB with the following schema:

### Task Model
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Troubleshooting

### MongoDB Connection Error
If you see "MongoDB connection error":
1. Make sure MongoDB is installed and running
2. Check if MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongodb` (Linux)
3. Verify the connection string in backend/.env

### Backend Server Not Starting
1. Make sure port 5000 is not in use
2. Check that all dependencies are installed: `npm install`
3. Verify the .env file exists in the backend directory

### Frontend Not Loading Data
1. Make sure the backend server is running on port 5000
2. Check the browser console for errors
3. Verify the API proxy is configured in vite.config.ts

## Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server with nodemon
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## License

This project is open source and available for educational purposes.
