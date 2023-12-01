import axios from 'axios';

const transactionEntryService = {
  addTransaction: async (transactionData) => {
    try {
     const response = axios.post(`${process.env.REACT_APP_API_URL}/transactions`, transactionData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Cache-Control': 'no-cache'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding transactions:', error);
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

export default transactionEntryService;
