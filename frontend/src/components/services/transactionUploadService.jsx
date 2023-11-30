import axios from 'axios';

const FILE_URL = 'http://localhost:3000/api/upload';

const FileHandling = {
  uploadFiles: async function(files) {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post(`${FILE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.response ? error.response.data.message : 'Failed to upload files'
      };
    }
  },

  getFileHash: async function(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
};

export default FileHandling;
