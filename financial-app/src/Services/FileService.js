import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import { DeleteButton, ProcessButton } from '../styles/GlobalTheme'; // Adjust the import path as necessary

const FileHandling = {
  uploadFiles: async function(files) {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

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
        error: error.response ? error.response.data.message : 'Failed to upload files'
      };
    }
  },

  getFileHash: async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Additional file handling methods can be added here
};

export const FileDrop = () => {
  const [files, setFiles] = useState([]);
  const [fileHashes, setFileHashes] = useState(new Set());
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [actualFiles, setActualFiles] = useState([]);

  const dropzoneStyles = {
    baseStyle: {
      borderWidth: '5px',
      borderStyle: 'dashed',
      borderColor: '#eeeeee',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color .24s ease-in-out, background-color .24s ease-in-out'
    },
    activeStyle: {
      borderColor: '#2196f3',
      backgroundColor: '#e3f2fd'
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4d',
    color: 'white',
  };

  const processButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#005f73',
    color: 'white',
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = [];
    const duplicates = [];
    const newActualFiles = [];

    for (const file of acceptedFiles) {
      const fileHash = await FileHandling.getFileHash(file);
      if (!fileHashes.has(fileHash)) {
        setFileHashes(prevHashes => new Set([...prevHashes, fileHash]));
        newActualFiles.push(file);
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
      setActualFiles(currFiles => [...currFiles, ...newActualFiles]);
    }
    if (duplicates.length > 0) {
      setDuplicateFiles(duplicates);
    }

  }, [fileHashes]);

  const processAndVisualizeFiles = async () => {
    if (actualFiles.length === 0) {
      setUploadError('No files to process. Please upload some files first.');
      setUploadMessage('');
      return;
    }

    const { data, error } = await FileHandling.uploadFiles(actualFiles);
    if (data) {
      setUploadMessage('Files uploaded successfully!');
      setUploadError('');
    } else {
      setUploadError(error || 'Failed to upload files.');
      setUploadMessage('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
      'image/*': []
    }
  });

  const styles = () => ({
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    },
    thead: {
      backgroundColor: '#333',
      color: '#fff',
    },
    th: {
      padding: '10px 15px',
      border: '1px solid #ddd',
    },
    td: {
      padding: '10px 15px',
      border: '1px solid #ddd',
    },
    tr: {
      '&:nth-of-type(even)': {
        backgroundColor: '#f8f8f8',
      },
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
    },
  });

  const dynamicStyles = styles();

  const deleteFile = async (fileHash) => {
    setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
    const updatedActualFiles = [];
    for (const file of actualFiles) {
      const hash = await FileHandling.getFileHash(file);
      if (hash !== fileHash) {
        updatedActualFiles.push(file);
      }
    }
    setActualFiles(updatedActualFiles);
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

      <div
        {...getRootProps()}
        style={
          isDragActive ? {
            ...dropzoneStyles.baseStyle,
            borderColor: dropzoneStyles.activeStyle.borderColor,
            backgroundColor: dropzoneStyles.activeStyle.backgroundColor
          } : {
            ...dropzoneStyles.baseStyle
          }
        }
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some PDF or Excel files here, or click to select files</p>
      </div>

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

      {files.length > 0 && (
        <div className="uploaded-files">
          <h3>Files to be:</h3>
          <table style={dynamicStyles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>File Name</th>
                <th style={styles.th}>Timestamp</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{file.name}</td>
                  <td style={styles.td}>{moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td style={styles.td}>
                    <DeleteButton style={deleteButtonStyle} onClick={() => deleteFile(file.hash)}>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ProcessButton 
        style={processButtonStyle} 
        onClick={processAndVisualizeFiles}
        disabled={actualFiles.length === 0} // Disable the button if there are no files
      >
        Process and Visualize
      </ProcessButton>
    </div>
  );
};

export default FileHandling;
