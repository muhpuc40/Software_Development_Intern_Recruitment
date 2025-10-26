const API_BASE_URL = 'http://puc.ac.bd:8016/api';

// Import mock functions
import { 
  mockGetAllPrograms, 
  mockStudentLogin, 
  mockGetAuthenticatedUser 
} from './mockApi';

let useMockData = false;

// Get All Programs
export const getAllPrograms = async () => {
  // If we're already using mock data, or if real API fails, use mock
  if (useMockData) {
    return await mockGetAllPrograms();
  }

  try {
    console.log('📡 Fetching programs from real API...');
    
    const response = await fetch(`${API_BASE_URL}/Basic/get_all_programs`);
    
    console.log('📊 Programs API Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('📦 Programs API Response:', result);
    
    if (result.messageCode === 1200) {
      console.log('✅ Real API: Programs loaded successfully');
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch programs');
    }
  } catch (error) {
    console.error('❌ Real API failed, switching to mock data:', error);
    useMockData = true;
    return await mockGetAllPrograms();
  }
};

export const studentLogin = async (loginData) => {
  // If we're already using mock data, use mock
  if (useMockData) return await mockStudentLogin(loginData);

  try {
    // Convert to API expected format
    const payload = {
      program_id: String(loginData.program_id), // must be string
      login: loginData.username || loginData.login, // backend expects "login"
      password: loginData.password,
      device: "web", // required
    };

    console.log('🚀 Sending login request to real API...', payload);

    const response = await fetch(`${API_BASE_URL}/Auth/student_login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let result;

    try { result = JSON.parse(text); }
    catch { 
      console.error('❌ Invalid JSON response, switching to mock');
      useMockData = true;
      return await mockStudentLogin(loginData);
    }

    if (!response.ok || result.messageCode !== 1200) {
      console.warn('❌ Login failed, switching to mock', result);
      useMockData = true;
      return await mockStudentLogin(loginData);
    }

    console.log('✅ Login success', result.data);
    return result.data;

  } catch (error) {
    console.error('❌ Real API login failed, switching to mock', error);
    useMockData = true;
    return await mockStudentLogin(loginData);
  }
};


// Get Authenticated User Info
export const getAuthenticatedUser = async (token) => {
  // Check if it's a mock token
  if (token.includes('mock_jwt_token') || useMockData) {
    return await mockGetAuthenticatedUser(token);
  }

  try {
    console.log('🔐 Fetching user info from real API...');
    
    const response = await fetch(`${API_BASE_URL}/Auth/get_auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 User info response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('📦 User info response:', result);

    if (result.messageCode === 1200) {
      console.log('✅ Real API: User info loaded successfully');
      return result.data;
    } else {
      throw new Error(result.message || 'Failed to fetch user data');
    }
  } catch (error) {
    console.error('❌ Real API failed, switching to mock data:', error);
    useMockData = true;
    return await mockGetAuthenticatedUser(token);
  }
};

// Export function to check current mode
export const getApiMode = () => {
  return useMockData ? 'mock' : 'real';
};

// Export function to manually set mode
export const setApiMode = (mode) => {
  useMockData = mode === 'mock';
};