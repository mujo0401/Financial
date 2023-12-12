import React, { useState } from 'react';
import FileDrop from 'components/utils/dragndropUtil';
import FileHandling from 'components/services/fileService';
import { Style, StyledTh, StyledTd, StyledTr, StyledTable } from 'components/assets/localStyle';
import { deleteButtonStyle, processButtonStyle } from 'components/assets/globalStyle';
import { Button } from '@mui/material';


const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [actualFiles, setActualFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [importMessage, setImportMessage] = useState('');
  const [importError, setImportError] = useState('');

  const handleFilesAdded = async (newFiles, newActualFiles, duplicates) => {
    setFiles(currFiles => [...currFiles, ...newFiles]);
    setActualFiles(currActualFiles => [...currActualFiles, ...newActualFiles]);
    setDuplicateFiles(duplicates);
  };

  const processFiles = async () => {
    if (actualFiles.length === 0) {
      setImportError('No files to process. Please upload some files first.');
      return;
    }

    setImportError('');
    setImportMessage('Processing files...');
    
    try {
      for (const file of actualFiles) {
        const response = await FileHandling.importFile(file);
        setImportMessage(`File uploaded successfully: ${response.message}`);
        // Additional logic to handle the response and process the file
      }
    } catch (error) {
      setImportError(`Error uploading file: ${error.message}`);
      setImportMessage('');
    }
  }
  const deleteFile = async (fileHash) => {
    // Assuming you have a method in FileHandling to delete files by hash
    try {
      await FileHandling.deleteFileByHash(fileHash);
      setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
      setActualFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
      setImportMessage('File deleted successfully.');
    } catch (error) {
      setImportError(`Error deleting file: ${error.message}`);
    }
  };
  

  return (
    <div>
      <FileDrop onFilesAdded={handleFilesAdded} />
  
      {importMessage && <p style={{ color: 'green' }}>{importMessage}</p>}
      {importError && <p style={{ color: 'red' }}>{importError}</p>}

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
        <div className="imported-files">
          <StyledTable style={Style.table}>
            <thead style={Style.thead}>
              <StyledTr>
                <StyledTh style={Style.th}>File Name</StyledTh>
                <StyledTh style={Style.th}>Timestamp</StyledTh>
                <StyledTh style={Style.th}>Delete</StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <StyledTr key={index} style={Style.tr}>
                  <StyledTd style={Style.StyledTd}>{file.name}</StyledTd>
                  <StyledTd style={Style.StyledTd}>{file.timestamp}</StyledTd>
                  <StyledTd style={Style.StyledTd}>
                    <Button style={deleteButtonStyle} onClick={() => deleteFile(file.hash)}>
                      Delete
                    </Button>
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      )}
       <Button 
        style={processButtonStyle} 
        onClick={processFiles}
        disabled={actualFiles.length === 0}
      >
        Process File(s)
      </Button>
    </div>
  );
};

export default TransactionImportForm;