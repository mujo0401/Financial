import React, { useState } from 'react';
import FileDrop from 'components/utils/dragndropUtil';
import FileHandling from 'components/services/transactionUploadService';
import moment from 'moment';
import { Style } from 'components/assets/localAssets/localStyle';
import { deleteButtonStyle, processButtonStyle } from 'components/assets/globalAssets/globalStyle';
import { Button } from '@mui/material';

const TransactionUploadForm = () => {
  const [files, setFiles] = useState([]); // Tracks file info
  const [actualFiles, setActualFiles] = useState([]); // Tracks actual file objects
  const [duplicateFiles, setDuplicateFiles] = useState([]); // Tracks duplicate files
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleFilesAdded = async (newFiles, newActualFiles, duplicates) => {
    setFiles(currFiles => [...currFiles, ...newFiles]);
    setActualFiles(currActualFiles => [...currActualFiles, ...newActualFiles]);
    setDuplicateFiles(duplicates);
  };

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

  const deleteFile = async (fileHash) => {
    // Filter out the file from the 'files' state
    setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
  
    // Use a temporary array to store the new set of actual files
    const updatedActualFiles = [];
    for (const file of actualFiles) {
      const hash = await FileHandling.getFileHash(file);
      if (hash !== fileHash) {
        updatedActualFiles.push(file);
      }
    }
  
    setActualFiles(updatedActualFiles);
  };

  const dynamicStyles = Style();

  return (
    <div>
      <FileDrop onFilesAdded={handleFilesAdded} />

      {uploadMessage && <p>{uploadMessage}</p>}
      {uploadError && <p>{uploadError}</p>}

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
          <thead style={Style.thead}>
            <tr>
              <th style={Style.th}>File Name</th>
              <th style={Style.th}>Timestamp</th>
              <th style={Style.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
    {files.map((file, index) => (
      <tr key={index} style={Style.tr}>
        <td style={Style.td}>{file.name}</td>
        <td style={Style.td}>{moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td style={Style.td}>
          <Button style={deleteButtonStyle} onClick={() => deleteFile(file.hash)}>
              Delete
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      )}
      <Button 
  style={processButtonStyle} 
  onClick={processAndVisualizeFiles}
  disabled={actualFiles.length === 0} // Disable the button if there are no files
>
  Process File(s)
</Button>
    </div>
  );
};

export default TransactionUploadForm;
