import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileHandling from 'components/services/transactionUploadService'; 
import moment from 'moment';

const FileDrop = ({ onFilesAdded }) => {
  const [fileHashes, setFileHashes] = useState(new Set());

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = [];
    const duplicates = [];
    const newActualFiles = [];

    for (const file of acceptedFiles) {
      const fileHash = await FileHandling.getFileHash(file);
      if (!fileHashes.has(fileHash)) {
        setFileHashes(prevHashes => new Set([...prevHashes, fileHash]));
        const fileInfo = {
          name: file.name,
          timestamp: moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss'),
          hash: fileHash,
        };
        newActualFiles.push(file);
        newFiles.push(fileInfo);
      } else {
        duplicates.push(file.name);
      }
    }

    // Pass the new and duplicate files back to the parent component
    onFilesAdded(newFiles, newActualFiles, duplicates);
  }, [fileHashes]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>

    </div>
  );
};

export default FileDrop;
