// Import components
import Navbar from './Navbar';
import Footer from './Footer';

// Layout component that wraps all pages with Navbar and Footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation bar at the top */}
      <Navbar />

      {/* Main content area - grows to fill available space */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
