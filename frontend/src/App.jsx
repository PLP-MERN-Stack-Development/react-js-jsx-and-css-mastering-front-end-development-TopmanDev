// Import React Router for navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import context providers
import { ThemeProvider } from './context/ThemeContext';

// Import components and pages
import Layout from './components/Layout';
import TaskManager from './pages/TaskManager';
import APIExplorer from './pages/APIExplorer';

// Main App component
function App() {
  return (
    // Wrap app with ThemeProvider for dark/light mode functionality
    <ThemeProvider>
      {/* Set up React Router for navigation */}
      <Router>
        {/* Layout component wraps all pages with Navbar and Footer */}
        <Layout>
          {/* Define routes for different pages */}
          <Routes>
            {/* Home page - Task Manager */}
            <Route path="/" element={<TaskManager />} />

            {/* API Explorer page */}
            <Route path="/api-data" element={<APIExplorer />} />

            {/* 404 Not Found page - redirects to home */}
            <Route path="*" element={<TaskManager />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
