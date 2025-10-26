import React, { useState, useEffect } from 'react';
import { getAllPrograms, studentLogin, getApiMode, setApiMode } from '../services/api';
import { setToken } from '../utils/auth';

const Login = ({ onLoginSuccess }) => {
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    program_id: '',
    username: '',
    password: '',
    device: 'web'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [programsLoading, setProgramsLoading] = useState(true);
  const [apiMode, setApiModeState] = useState('real');

  useEffect(() => {
    fetchPrograms();
    // Check current API mode
    setApiModeState(getApiMode());
  }, []);

  const fetchPrograms = async () => {
    try {
      setProgramsLoading(true);
      const programsData = await getAllPrograms();
      setPrograms(programsData);
      // Update mode after fetching programs
      setApiModeState(getApiMode());
    } catch (err) {
      console.error('Programs fetch error:', err);
      setError('Failed to load programs. Using demo data instead.');
      setApiModeState('mock');
    } finally {
      setProgramsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.program_id) {
      setError('Please select a program');
      setLoading(false);
      return;
    }

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const loginData = {
        program_id: parseInt(formData.program_id),
        username: formData.username.trim(),
        password: formData.password,
        device: 'web'
      };

      console.log('🔄 Attempting login in mode:', apiMode);
      console.log('📦 Login data:', loginData);

      const response = await studentLogin(loginData);
      
      // Update mode after login attempt
      setApiModeState(getApiMode());
      
      if (response && response.token) {
        console.log('✅ Login successful, token received');
        setToken(response.token);
        onLoginSuccess();
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setApiModeState(getApiMode());
      
      if (apiMode === 'mock') {
        setError(err.message || 'Demo login failed. Use username: minhaj, password: 12345');
      } else {
        setError('Real API failed. Switched to demo mode. Use test credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const testWithCredentials = () => {
    setFormData({
      program_id: '1',
      username: 'minhaj',
      password: '12345',
      device: 'web'
    });
  };

  const switchToRealMode = async () => {
    setApiMode('real');
    setApiModeState('real');
    setError('Real API mode activated. Trying to connect...');
    setProgramsLoading(true);
    await fetchPrograms();
  };

  const switchToMockMode = () => {
    setApiMode('mock');
    setApiModeState('mock');
    setError('Demo mode activated. Use test credentials: minhaj / 12345');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">PU</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Premier University account
          </p>
          
          {/* Mode Indicator */}
          <div className="mt-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              apiMode === 'real' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                apiMode === 'real' ? 'bg-blue-500' : 'bg-green-500'
              }`}></span>
              {apiMode === 'real' ? 'Real API Mode' : 'Demo Mode'}
            </div>
          </div>

          {/* Mode Switch Buttons */}
          <div className="mt-3 flex justify-center space-x-2">
            <button
              onClick={switchToRealMode}
              disabled={apiMode === 'real'}
              className={`px-3 py-1 text-xs rounded transition ${
                apiMode === 'real' 
                  ? 'bg-blue-600 text-white cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Real API
            </button>
            <button
              onClick={switchToMockMode}
              disabled={apiMode === 'mock'}
              className={`px-3 py-1 text-xs rounded transition ${
                apiMode === 'mock' 
                  ? 'bg-green-600 text-white cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Demo Mode
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
          {/* Program Selection */}
          <div>
            <label htmlFor="program_id" className="block text-sm font-medium text-gray-700 mb-2">
              Select Program *
            </label>
            <select
              id="program_id"
              name="program_id"
              value={formData.program_id}
              onChange={handleInputChange}
              required
              disabled={programsLoading}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-black"
            >
              <option value="" className="text-gray-500">Choose your program...</option>
              {programs.map(program => (
                <option key={program.id} value={program.id} className="text-black">
                  {program.program}
                </option>
              ))}
            </select>
            {programsLoading && (
              <p className="text-sm text-gray-500 mt-1">Loading programs...</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter your username"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-black"
            />
          </div>

          {/* Auto-fill Test Credentials Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={testWithCredentials}
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Auto-fill Test Credentials
            </button>
          </div>

          {/* Test Credentials Hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Test Credentials:</strong><br />
              Username: <code className="bg-blue-100 px-1 rounded">minhaj</code><br />
              Password: <code className="bg-blue-100 px-1 rounded">12345</code><br />
              Program: <code className="bg-blue-100 px-1 rounded">BSc in CSE (ID: 1)</code>
            </p>
            {apiMode === 'mock' && (
              <p className="text-sm text-green-700 mt-2">
                ✅ <strong>Demo Mode Active:</strong> These credentials will work
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-medium">{error}</p>
              <p className="text-xs text-red-600 mt-1">
                Current mode: <span className={apiMode === 'real' ? 'text-blue-600' : 'text-green-600'}>
                  {apiMode === 'real' ? 'REAL API' : 'DEMO'}
                </span>
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || programsLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {apiMode === 'real' ? 'Connecting...' : 'Demo Signing in...'}
              </div>
            ) : (
              apiMode === 'real' ? 'Sign in to your account' : 'Try Demo Login'
            )}
          </button>
        </form>

        {/* Debug Info */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>🔍 Current mode: <strong>{apiMode === 'real' ? 'REAL API' : 'DEMO'}</strong></p>
          <p>📝 In demo mode, use: <strong>minhaj</strong> / <strong>12345</strong></p>
          <p>🔄 Real API credentials may not work - use demo mode for testing</p>
        </div>
      </div>
    </div>
  );
};

export default Login;