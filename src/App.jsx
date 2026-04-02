import React, { useState, useEffect } from 'react';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import SignUp from './components/SignUp';
import SignIn from './components/LogIn';

function App() {
  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState(null); // 'signin', 'signup', or null

  // --- YouTube Logic State ---
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('ReactJS tutorial');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  // --- API Logic ---
  const fetchVideos = async (query, pageToken = '') => {
    setLoading(true);
    try {
      const response = await youtube.get('/search', {
        params: {
          q: query,
          pageToken: pageToken
        }
      });
      setVideos(response.data.items);
      setNextPageToken(response.data.nextPageToken || null);
      setPrevPageToken(response.data.prevPageToken || null);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos for everyone on load
  useEffect(() => {
    fetchVideos(searchTerm);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchVideos(term);
  };

  const handlePageChange = (direction) => {
    const token = direction === 'next' ? nextPageToken : prevPageToken;
    if (token) {
      fetchVideos(searchTerm, token);
      window.scrollTo(0, 0);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm py-4 sticky top-0 z-40 flex justify-between items-center px-6 md:px-10">
          <h1 className="text-2xl font-bold text-red-600">MyTube Search</h1>

          <div className="flex items-center gap-4">
            {currentUser ? (
                <>
                  <span className="font-medium text-gray-700 hidden sm:inline">Welcome, {currentUser.username}</span>
                  <button
                      onClick={() => setCurrentUser(null)}
                      className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-full hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
            ) : (
                <>
                  <button
                      onClick={() => setAuthView('signin')}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Sign In
                  </button>
                  <button
                      onClick={() => setAuthView('signup')}
                      className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    Sign Up
                  </button>
                </>
            )}
          </div>
        </nav>

        {/* Auth Modal Overlay (Only shows when a button is clicked) */}
        {authView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
                <button
                    onClick={() => setAuthView(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
                {authView === 'signup' && <SignUp onSuccess={() => setAuthView('signin')} />}
                {authView === 'signin' && (
                    <SignIn onLoginSuccess={(user) => {
                      setCurrentUser(user);
                      setAuthView(null); // Close modal on success
                    }} />
                )}
                <div className="mt-4 text-center">
                  <button
                      className="text-sm text-blue-500 underline"
                      onClick={() => setAuthView(authView === 'signin' ? 'signup' : 'signin')}
                  >
                    {authView === 'signin' ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Main Content (Accessible to everyone) */}
        <div className={authView ? "blur-sm pointer-events-none" : ""}>
          <SearchBar onSearch={handleSearch} />

          {loading ? (
              <div className="flex justify-center my-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
          ) : (
              <VideoList
                  videos={videos}
                  onVideoSelect={(video) => setSelectedVideo(video)}
                  onPageChange={handlePageChange}
                  hasNextPage={!!nextPageToken}
                  hasPrevPage={!!prevPageToken}
              />
          )}
        </div>

        <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
        />
      </div>
  );
}

export default App;