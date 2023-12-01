// transactionUpload.jsx
import React from 'react';
import TransactionUploadForm from 'components/pages/forms/transactionUploadForm'; 
import { Container } from '@mui/material';

const TransactionUpload = () => {
  return (
    <Container>
      <h1>Upload Your Files</h1>
      <TransactionUploadForm />
    </Container>
  );
};

export default TransactionUpload;
