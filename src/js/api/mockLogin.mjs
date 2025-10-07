import {addToLocalStorage} from "../utils/localStorage.mjs";

/**
 * Mock version of loginUser for testing purposes
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<{accessToken: string, user: Object}>} Mock login data
 */
export async function mockLoginUser(email, password) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock valid credentials
  const validCredentials = {
    'test@example.com': 'password123',
    'user@test.com': 'mypassword',
    'admin@site.com': 'admin123'
  };
  
  // Check if credentials are valid
  if (validCredentials[email] && validCredentials[email] === password) {
    const mockResponse = {
      accessToken: 'mock-jwt-token-' + Date.now(),
      user: {
        name: 'Test User',
        email: email,
        id: Math.floor(Math.random() * 1000),
        avatar: {
          url: 'https://via.placeholder.com/150',
          alt: 'Test User Avatar'
        }
      }
    };
    
    // Store in localStorage just like the real function
    addToLocalStorage('accessToken',mockResponse.accessToken);
    addToLocalStorage('user',mockResponse.user);
    
    return mockResponse;
  } else {
    throw new Error('Invalid email or password');
  }
}

// Export for use in other files
window.mockLoginUser = mockLoginUser;