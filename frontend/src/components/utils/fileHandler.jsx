import { useState } from 'react';
import { getFileByHash, deleteFileByHash } from 'components/services/transactionImportService';

const FileHandler = () => {
    const [hash, setHash] = useState(null);

    const fetchHash = async (fileId) => {
        try {
            const retrievedHash = await getFileByHash(fileId);
            setHash(retrievedHash);
        } catch (error) {
            console.error('Failed to fetch file hash:', error);
        }
    };

    const deleteFile = async () => {
        if (hash) {
            try {
                await deleteFileByHash(hash);
                setHash(null); 
            } catch (error) {
                console.error('Failed to delete file:', error);
            }
        }
    };

    return { fetchHash, deleteFile };
};

export default FileHandler;