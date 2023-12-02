// transactionUpload.jsx
import React from 'react';
import TransactionUploadForm from 'components/pages/forms/transactionUploadForm'; 
import { Container } from '@mui/material';
import ErrorBoundary from 'components/errorHandling/errorBoundary';


const TransactionUpload = () => {
  return (
    <ErrorBoundary>
    <Container>
      <h1>Upload Your Files (Multiple Transaction Entries)</h1>
      <TransactionUploadForm />
    </Container>
    </ ErrorBoundary>
  );
};

export default TransactionUpload;
