import axios from 'axios';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import { DeleteButton, ProcessButton } from '../theme/GlobalTheme';

// Styled components
const FileDropContainer = styled.div`
  border: 2px dashed #cccccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const FileTableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #dddddd;
    padding: 8px;7
    text-align: left;
  }
`;

const FileDrop = () => {
  const [files, setFiles] = useState([]);
  const [fileHashes, setFileHashes] = useState(new Set());
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [actualFiles, setActualFiles] = useState([]);  

  const getFileHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = [];
    const duplicates = [];
    const newActualFiles = []; // Temporary array to hold new files
  
    for (const file of acceptedFiles) {
      const fileHash = await getFileHash(file);
      if (!fileHashes.has(fileHash)) {
        setFileHashes(prevHashes => new Set([...prevHashes, fileHash]));
        newActualFiles.push(file); // Add to temporary array
        newFiles.push({
          name: file.name,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
          hash: fileHash,
        });
      } else {
        duplicates.push(file.name);
      }
    }
  
    if (newFiles.length > 0) {
      setFiles(currFiles => [...currFiles, ...newFiles]);
      setActualFiles(currFiles => [...currFiles, ...newActualFiles]); // Update the actualFiles state
    }
    if (duplicates.length > 0) {
      setDuplicateFiles(duplicates);
    }
  
  }, [fileHashes]); 
  const processAndVisualizeFiles = async () => {
    try {
      // Create a FormData object to hold the files
      const formData = new FormData();
      actualFiles.forEach((file, index) => {
        formData.append(`files`, file); // Use the same field name for all files
      });
  
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data);
        setUploadMessage('Files uploaded successfully!');
        setUploadError('');  // Clear any previous errors
      } catch (error) {
        setUploadError('Failed to upload files.');
      setUploadMessage('');  // Clear any previous success message
      // Handle the error
        console.error(error.response ? error.response.data : error.message);
      }
    } catch (error) {
      setUploadError('Failed to upload files.');
      setUploadMessage('');  // Clear any previous success message
      // Handle the error
      console.error(error);
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf, .xls, .xlsx'
  });

  const deleteFile = (fileHash) => {
    // Remove the file from the files state based on its hash
    setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
    // Remove the file from the actualFiles state based on its hash
    setActualFiles(currentFiles => currentFiles.filter(async file => {
      const hash = await getFileHash(file); // Assuming getFileHash is a synchronous function
      return hash !== fileHash;
    }));
    // Also, remove the hash from the set of file hashes
    setFileHashes(currentHashes => {
      const newHashes = new Set([...currentHashes]);
      newHashes.delete(fileHash);
      return newHashes;
    });
  };

  return (
    <div>
      {uploadMessage && <div className="success-message">{uploadMessage}</div>}
      {uploadError && <div className="error-message">{uploadError}</div>}
  
      <FileDropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some PDF or Excel files here, or click to select files</p>
      </FileDropContainer>
  
      {duplicateFiles.length > 0 && (
        <div className="duplicate-files">
          <p>The following files were not added because they are duplicates:</p>
          <ul>
            {duplicateFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
  
      <FileTableContainer>
        {files.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.hash}>
                  <td>{file.name}</td>
                  <td>{file.timestamp}</td>
                  <td>
                    <DeleteButton onClick={() => deleteFile(file.hash)}>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </FileTableContainer>
  
      <ProcessButton onClick={processAndVisualizeFiles}>
        Process and Visualize
      </ProcessButton>
    </div>
  );
};

export default FileDrop;

