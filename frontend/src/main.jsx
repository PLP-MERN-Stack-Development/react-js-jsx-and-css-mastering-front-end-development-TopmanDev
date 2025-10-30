// Import React dependencies
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import main App component and global styles
import App from './App.jsx';
import './index.css';

// Render the React app to the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
