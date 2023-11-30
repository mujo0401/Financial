// transactionUpload.jsx
import React from 'react';
import TransactionUploadForm from 'components/pages/forms/transactionUploadForm'; 
import { TransactionUploadPageContainer } from 'components/assets/localAssets/transactionUploadStyle';

const TransactionUpload = () => {
  return (
    <TransactionUploadPageContainer>
      <h1>Upload Your Files</h1>
      <TransactionUploadForm />
    </TransactionUploadPageContainer>
  );
};

export default TransactionUpload;
