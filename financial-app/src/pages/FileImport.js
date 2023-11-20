// UploadPage.js
import React from 'react';
import { FileDrop } from '../services/fileService.js';
import { PageContainer } from '../styles/GlobalTheme.js';

const FileImport = () => {
  return (
    <PageContainer>
      <h1>Upload Your Files</h1>
      <FileDrop />
    </PageContainer>
  );
};

export default FileImport;
