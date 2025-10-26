import React, { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '../services/api';
import { getToken, removeToken } from '../utils/auth';

const Dashboard = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getToken();
      if (!token) {
        onLogout();
        return;
      }

      const userInfo = await getAuthenticatedUser(token);
      setUserData(userInfo);
    } catch (err) {
      setError(err.message || 'Failed to load user data. Please try logging in again.');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profile</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleLogout}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600 mt-2">Here's your academic profile information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {userData?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{userData?.name || 'Student'}</h2>
                <p className="text-blue-100">{userData?.program_name || userData?.program || 'Program not specified'}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Personal Information</h4>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Full Name</span>
                  <span className="text-gray-900 font-semibold">{userData?.name || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Student ID</span>
                  <span className="text-gray-900 font-semibold">{userData?.student_id || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-gray-900 font-semibold">{userData?.email || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <span className="text-gray-900 font-semibold">{userData?.phone || 'N/A'}</span>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700 border-b pb-2">Academic Information</h4>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Program</span>
                  <span className="text-gray-900 font-semibold text-right">
                    {userData?.program_name || userData?.program || 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Session</span>
                  <span className="text-gray-900 font-semibold">{userData?.session || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Roll No</span>
                  <span className="text-gray-900 font-semibold">{userData?.roll_no || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Semester</span>
                  <span className="text-gray-900 font-semibold">{userData?.semester || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;