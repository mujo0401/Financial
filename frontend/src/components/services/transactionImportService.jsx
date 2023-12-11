import axios from 'axios';

const API_URL = 'http://localhost:3000/api/files'; // Replace with your server's URL

// Function to hash files
async function hashFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target.result;
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            resolve(hashHex);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        if (file instanceof Blob) { // Ensure file is a Blob or File
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error("The provided value is not a Blob or File."));
        }
    });
}

// Function to upload transaction files
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
