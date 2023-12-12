import axios from 'axios';

const API_URL = 'http://localhost:3000/api/files'; 

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}


// Function to hash files
async function hashFile(file) {
    let buffer;
    if (file.arrayBuffer) {
        buffer = await file.arrayBuffer();
    } else {
        buffer = await readFileAsArrayBuffer(file);
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Function to import transaction files
const importTransactionFiles = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('transactionFiles', file);
    });

    try {
        const response = await axios.post(`${API_URL}/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading transaction files:', error);
        throw error;
    }
};

export { importTransactionFiles, hashFile };
