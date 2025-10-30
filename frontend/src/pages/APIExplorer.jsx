// Import dependencies
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const APIExplorer = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Number of posts to display per page

  // Fetch posts from JSONPlaceholder API on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    filterPosts();
  }, [searchTerm, posts]);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (err) {
      setError('Failed to fetch data from API');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search term
  const filterPosts = () => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      setCurrentPage(1); // Reset to first page when clearing search
      return;
    }

    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          API Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse data from JSONPlaceholder API with search and pagination
        </p>
      </div>

      {/* Search bar */}
      <Card>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search posts by title or content..."
            className="w-full pl-10 pr-24 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Clear
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
          </p>
        )}
      </Card>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin h-12 w-12 text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <Card>
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
            <Button onClick={fetchPosts} variant="primary" className="mt-4">
              Retry
            </Button>
          </div>
        </Card>
      )}

      {/* Posts grid */}
      {!loading && !error && (
        <>
          {currentPosts.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts found matching your search.
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <Card
                  key={post.id}
                  hover
                  className="h-full flex flex-col animate-fadeIn"
                >
                  <div className="flex-1">
                    {/* Post ID badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        Post #{post.id}
                      </span>
                    </div>

                    {/* Post title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Post body */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-4">
                      {post.body}
                    </p>
                  </div>

                  {/* User ID */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      User ID: {post.userId}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              {/* Page info */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts
              </p>

              {/* Pagination buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="secondary"
                  size="sm"
                  icon={ChevronLeft}
                >
                  Previous
                </Button>

                {/* Page numbers */}
                <div className="hidden sm:flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Mobile page indicator */}
                <div className="sm:hidden">
                  <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="secondary"
                  size="sm"
                  icon={ChevronRight}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default APIExplorer;
