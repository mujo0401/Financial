import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import FileTable from './FileTable'; // Assuming this component exists

const FileDrop = () => {
  const [files, setFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);

  const isDuplicate = useCallback((newFile) => {
    return files.some(file => file.name === newFile.name);
  }, [files]);

  const onDrop = (acceptedFiles) => {
    const newFiles = [];
    const duplicates = [];

    acceptedFiles.forEach((file) => {
      if (!isDuplicate(file)) {
        newFiles.push({
          name: file.name,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          url: URL.createObjectURL(file)
        });
      } else {
        duplicates.push(file.name);
      }
    });

    if (newFiles.length > 0) {
      setFiles(currFiles => [...currFiles, ...newFiles]);
    }
    if (duplicates.length > 0) {
      setDuplicateFiles(duplicates);
      // Here you can notify the user that duplicate files were not added
    }
  };

  const processAndVisualizeFiles = async () => {
    try {
      // Create a FormData object to hold the files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
  
      // Send the files to the server
      const response = await axios.post('/api/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle the response, update the state to include the processed data
      console.log('Processed Data:', response.data);
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
      'image/*': []
    }
  });

  const getStyle = () => ({
    border: '2px dashed #007bff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  });

  return (
    <div>
      <div {...getRootProps()} style={getStyle()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some PDF or Excel files here, or click to select files</p>
      </div>
      {duplicateFiles.length > 0 && (
        <div>
          <p>The following files were not added because they are duplicates:</p>
          <ul>
            {duplicateFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
      {files.length > 0 && <FileTable files={files} />}
      <>
      <FileTable files={files} />
          <button onClick={processAndVisualizeFiles}>Process and Visualize</button>
      </>
      
    </div>
  );
};



export default FileDrop;
