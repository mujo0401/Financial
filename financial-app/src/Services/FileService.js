//Service/FioleService.js
import axios from 'axios';

const FileHandling = {
  uploadFile: async function(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response ? error.response.data.message : 'Failed to upload file'
      };
    }
  },

  // You can add more file related services here
};

export default FileHandling;
