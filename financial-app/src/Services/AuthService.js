/*import axios from 'axios';

const AuthService = {
  authenticateUser: async function(username, password) {
    try {
      const response = await axios.get(`${process.env.Users_API}/login`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return { data: response.data, error: null };
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

export default AuthService;*/
