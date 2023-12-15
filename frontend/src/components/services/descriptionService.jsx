import axios from 'axios';

const DESC_URL = 'http://localhost:3000/api/descriptions'; 


     const getDescriptions = async () => {
      try {
        const response = await axios.get(DESC_URL);
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
    };

     const addDescription = async (descriptionName) => {
      try {
          const response = await axios.post(DESC_URL, { name: descriptionName });
          return response.data; 
      } catch (error) {
          console.error('Error adding description:', error);
          throw error; 
      }
  };

  export default { getDescriptions, addDescription};


  