// components/FileTable.js
import React from 'react';

const FileTable = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Timestamp</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td>{file.name}</td>
            <td>{file.timestamp}</td>
            <td><a href={file.url} target="_blank" rel="noopener noreferrer">View</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;