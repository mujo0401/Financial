import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/transactions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle the response...
      console.log(response.data);
    } catch (error) {
      // Handle the error...
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUploadComponent;
