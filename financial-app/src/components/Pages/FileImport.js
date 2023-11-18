// UploadPage.js
import React from 'react';
import FileDrop from '../utils/FileDrop.js';
import { PageContainer } from '../../Design/GlobalTheme.js';

const FileImport = () => {
  return (
    <PageContainer>
      <h1>Upload Your Files</h1>
      <FileDrop />
    </PageContainer>
  );
};

export default FileImport;
