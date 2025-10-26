import React from 'react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PU</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Premier University</h1>
              <p className="text-sm text-gray-600">Student Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 text-sm">
                  Welcome, Student
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-gray-600 text-sm">
                Please login to continue
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;