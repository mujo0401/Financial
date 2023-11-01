import axios from 'axios';

const AuthService = {
  authenticateUser: async function(username, password) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
      const token = response.data.token;
      // Store the token in localStorage or cookies as per your preference
      localStorage.setItem('token', token);
      return { token, error: null };
    } catch (error) {
      return { token: null, error: error.response ? error.response.data.message : 'Login failed' };
    }
  },

  isAuthenticated: function() {
    // Implement logic to check if the user is authenticated
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Add other authentication related methods as needed
};

export default AuthService;
