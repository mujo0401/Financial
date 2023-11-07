import axios from 'axios';

const FinancialService = {
  getFinancialSummary: async function() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/financial-summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response ? error.response.data.message : 'Failed to fetch financial summary' };
    }
  },

  getRecentTransactions: async function() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/recent-transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response ? error.response.data.message : 'Failed to fetch recent transactions' };
    }
  },

uploadCategorizedTransactions: async function(categorizedData) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload-categorized-transactions`, categorizedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response ? error.response.data.message : 'Failed to upload categorized transactions' };
  }
},

  getFinancialGoals: async function() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/financial-goals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response ? error.response.data.message : 'Failed to fetch financial goals' };
    }
  },

  // Add other financial related methods as needed
};

export default FinancialService;