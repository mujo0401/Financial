import axios from 'axios';

const FILE_URL = 'http://localhost:3000/api/files'; 

const getFileByHash = async (fileId) => {
    try {
        const response = await axios.get(`${FILE_URL}/${fileId}`);
        return response.data.hash;
    } catch (error) {
        console.error('Error retrieving file hash:', error);
        throw error;
    }
};

const importFiles = async (files) => {
    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = await axios.post(`${FILE_URL}/transactionImport`, formData);
        return response.data;
    } catch (error) {
        console.error('Error importing files:', error);
        if (error.response) {
            console.log('Server response:', error.response.data);
        }
        throw error;
    }
};

const deleteFileByHash = async (hash) => {
    try {
        await axios.delete(`${FILE_URL}/delete/${hash}`);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

const generateSHA256Hash = async (file) => {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
};

export { readFileAsArrayBuffer, generateSHA256Hash, deleteFileByHash, getFileByHash, importFiles };
