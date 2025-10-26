// Mock data for testing when real API is not working
export const mockGetAllPrograms = async () => {
  console.log('🔧 Using mock programs data');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      program: "Bachelor of Science (Engineering) in Computer Science and Engineering - BSc in CSE",
      ordering: 10
    },
    {
      id: 2,
      program: "M.Sc. in Computer Science & Engineering - MSc in CSE",
      ordering: 11
    },
    {
      id: 3,
      program: "Bachelor of Science (Engineering) in Electrical and Electronic Engineering - BSc in EEE",
      ordering: 20
    },
    {
      id: 13,
      program: "Bachelor of Architecture - B.Arch",
      ordering: 30
    },
    {
      id: 25,
      program: "Bachelor of Science (Honors) in Mathematics - B.Sc. (Honors) in Math",
      ordering: 50
    }
  ];
};

export const mockStudentLogin = async (loginData) => {
  console.log('🔧 Using mock login with data:', loginData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if using test credentials
  if (loginData.username === 'minhaj' && loginData.password === '12345') {
    const mockResponse = {
      token: 'mock_jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      user: {
        id: 1,
        name: 'Minhaj Ahmed',
        username: 'minhaj'
      }
    };
    console.log('✅ Mock login successful:', mockResponse);
    return mockResponse;
  } else {
    const error = new Error('Invalid credentials - Use username: minhaj, password: 12345');
    console.log('❌ Mock login failed:', error.message);
    throw error;
  }
};

export const mockGetAuthenticatedUser = async (token) => {
  console.log('🔧 Using mock user data with token:', token);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockUserData = {
    id: 1,
    student_id: '202100001',
    name: 'Minhaj Ahmed',
    email: 'minhaj@student.puc.ac.bd',
    phone: '+8801XXXXXXXXX',
    program_name: 'Bachelor of Science (Engineering) in Computer Science and Engineering - BSc in CSE',
    program: 'BSc in CSE',
    session: '2020-2021',
    roll_no: '202100001',
    semester: '8th',
    address: 'Chittagong, Bangladesh',
    blood_group: 'A+',
    date_of_birth: '2000-01-15'
  };
  
  console.log('✅ Mock user data loaded:', mockUserData);
  return mockUserData;
};