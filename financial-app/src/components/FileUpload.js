// FileUpload.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = async () => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    onFileUpload(jsonData);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} data-testid="file-upload-input" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
