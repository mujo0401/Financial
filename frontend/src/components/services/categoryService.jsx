import axios from 'axios';

const CAT_URL = 'http://localhost:3000/api/categories'; 

const categoryService = {
    getCategories: async () => {
      try {
        const response = await axios.get(CAT_URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
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
  
  export default categoryService;
  