import axios from 'axios';

const IMPORT_URL = 'http://localhost:3000/api/import';

const FileHandling = {
  uploadFiles: async function(files) {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post(IMPORT_URL, formData, {
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

  getFileHash: async function(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
};

export default FileHandling;
