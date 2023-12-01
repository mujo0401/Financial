import axios from 'axios';

//const DESC_URL = 'http://localhost:3000/api/descriptions'; 

const descriptionService = {
    getDescriptions: async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/descriptions`);
        return response.data;
      } catch (error) {
        console.error('Error fetching descriptions:', error);
        if (error.response) {
          console.error('Error Data:', error.response.data);
          console.error('Error Status:', error.response.status);
          console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error Request:', error.request);
        } else {
          console.error('Error Message:', error.message);
        }
  
        return [];
      }
    }
  };
  
  export default descriptionService;
  