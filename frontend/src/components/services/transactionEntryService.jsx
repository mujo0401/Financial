import axios from 'axios';

const TRANSACTION_URL = 'http://localhost:3000/api/transactions'; 

const transactionEntryService = {
  addTransaction: async (transactionData) => {
    try {
     const response = axios.post(TRANSACTION_URL, transactionData, {
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
