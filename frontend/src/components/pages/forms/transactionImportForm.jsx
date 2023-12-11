import React, { useState } from 'react';
import FileDrop from 'components/utils/dragndropUtil';
import { importTransactionFiles, hashFile } from 'components/services/transactionImportService';
import { Style, StyledTh, StyledTd, StyledTr, StyledTable } from 'components/assets/localStyle';
import { deleteButtonStyle, processButtonStyle } from 'components/assets/globalStyle';
import { Button } from '@mui/material';
import AddDescriptionForm from 'components/pages/forms/addDescriptionForm'; 
import descriptionService from 'components/services/descriptionService';

const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [actualFiles, setActualFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [unrecognizedDescriptions, setUnrecognizedDescriptions] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileHashes, setFileHashes] = useState(new Set());
  const [uploadError, setUploadError] = useState('');



  const processFiles = async () => {
    if (actualFiles.length === 0) {
      setUploadError('No files to process. Please upload some files first.');
      setUploadMessage('');
      return;
    }

    try {
      const response = await importTransactionFiles(actualFiles);
      if (response.unrecognizedDescriptions && response.unrecognizedDescriptions.length > 0) {
        setUnrecognizedDescriptions(response.unrecognizedDescriptions);
        // Trigger modal or another UI element to handle these descriptions
      } else {
        setUploadMessage('Files processed successfully.');
      }
    } catch (error) {
      setUploadError('Error processing files: ' + error.message);
    }
  };

  const handleFilesAdded = async (newFiles) => {
    let newHashes = new Set(fileHashes);
    let newDuplicates = [];
    let updatedFiles = [...files]; // Create a copy of the current files
    let updatedActualFiles = []; // Local variable to accumulate new actual files
  
    for (const file of newFiles) {
      const fileHash = await hashFile(file); // hashFile function to generate a unique hash for each file
      if (newHashes.has(fileHash)) {
        newDuplicates.push(file.name);
      } else {
        newHashes.add(fileHash);
        updatedFiles.push({
          name: file.name,
          timestamp: file.lastModified,
          hash: fileHash,
        });
        updatedActualFiles.push(file);
      }
    }
  
    // Update the state once after the loop
    setFiles(updatedFiles);
    setActualFiles(currentActualFiles => [...currentActualFiles, ...updatedActualFiles]);
    setDuplicateFiles(newDuplicates);
    setFileHashes(newHashes);
  };
  
  const deleteFile = (fileHash) => {
    setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
    setActualFiles(currentActualFiles => currentActualFiles.filter(file => hashFile(file) !== fileHash));
  };

  const handleAddDescriptions = async (description) => {
    try {
      // Assuming each description is a simple string. Adjust as necessary.
      for (const desc of description) {
        await descriptionService.addDescription(desc);
      }
      setUnrecognizedDescriptions([]); // Clear the list of unrecognized descriptions
      setUploadMessage('New descriptions added successfully.');
    } catch (error) {
      console.error('Error adding descriptions:', error);
      setUploadError(`Error adding new descriptions: ${error.message}`);
    }
  };

  return (
    <div>
      <FileDrop onFilesAdded={handleFilesAdded} />
  
      {uploadMessage && <p style={{ color: 'green' }}>{uploadMessage}</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

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

      {unrecognizedDescriptions.length > 0 && (
        <AddDescriptionForm 
          descriptions={unrecognizedDescriptions} 
          onSave={handleAddDescriptions} 
        />
      )}
    </div>
  );
};


export default TransactionImportForm;