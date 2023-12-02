// healthCheck.js
import axios from 'axios';

const checkBackendHealth = async () => {
  try {
    const response = await axios.get('${http://localhost:3000/api/health');
    if (response.status === 200) {
      console.log('Backend is up and running!');
    }
  } catch (error) {
    console.error('Cannot reach the backend:', error.message);
  }
};

export default checkBackendHealth;
