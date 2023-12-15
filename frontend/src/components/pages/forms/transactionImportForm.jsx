import React, { useState } from 'react';
import FileDrop from 'components/utils/dragndropUtil';
import FileHandler from 'components/utils/fileHandler';
import DescriptionService from 'components/services/descriptionService';
import AddDescriptionForm from 'components/pages/forms/addDescriptionForm'; 
import { importFiles } from 'components/services/transactionImportService';
import { Style, StyledTh, StyledTd, StyledTr, StyledTable } from 'components/assets/localStyle';
import { deleteButtonStyle, processButtonStyle } from 'components/assets/globalStyle';
import { Button } from '@mui/material';

const { addDescription } = DescriptionService;

const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [actualFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [unrecognizedDescriptions, setUnrecognizedDescriptions] = useState([]);
  const [importMessage, setImportMessage] = useState('');
  const [importError, setImportError] = useState('');

  const handleFilesAdded = async (newFiles) => {
    try {
        // Call importFiles with the array of new files
        const response = await importFiles(newFiles);

        // Process response for each file
        response.forEach(fileResponse => {
            if (fileResponse.duplicate) {
                setDuplicateFiles(currDuplicates => [...currDuplicates, fileResponse.name]);
            } else {
                setFiles(currFiles => [...currFiles, fileResponse]);
            }
        });
    } catch (error) {
        console.error('Error handling file:', error);
        setImportError('Error uploading file: ' + error.message);
    }
};

  const handleProcessFiles = async () => {
    try {
      const response = await importFiles(actualFiles);
      if (response.unrecognizedDescriptions && response.unrecognizedDescriptions.length > 0) {
        setUnrecognizedDescriptions(response.unrecognizedDescriptions);
      } else {
        setImportMessage('Files processed successfully.');
      }
    } catch (error) {
      setImportError('Error processing files: ' + error.message);
    }
  };

  const handleDeleteFile = async (fileHash) => {
    try {
      const response = await FileHandler.deleteFile(fileHash);
      setFiles(currentFiles => currentFiles.filter(file => file.hash !== fileHash));
      setImportMessage(response);
    } catch (error) {
      setImportError(`Error deleting file: ${error.message}`);
    }
  };


  const handleAddDescription = async (newDescription) => {
    try {
      await addDescription(newDescription);
      console.log('New Description Added:', newDescription);
      setImportMessage('New description added successfully.');
    } catch (error) {
      console.error('Error adding new description:', error);
      setImportError('Failed to add new description');
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
                    <Button style={deleteButtonStyle} onClick={() => handleDeleteFile(file.hash)}>
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
      onClick={handleProcessFiles}
      disabled={files.length === 0}
    >
      Process File(s)
    </Button>

    {unrecognizedDescriptions.length > 0 && (
        <AddDescriptionForm 
          onDescriptionAdded={handleAddDescription}
          descriptions={unrecognizedDescriptions}
      />
    )}
  </div>
  );
};

export default TransactionImportForm;