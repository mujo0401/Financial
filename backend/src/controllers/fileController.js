import crypto from 'crypto';
import File from '../models/fileModel.js';

// Function to generate a hash for a file
const generateHash = (fileContent) => {
    return crypto.createHash('sha256').update(fileContent).digest('hex');
};

// Function to get files based on a hash
const getFile = async (hash) => {
    try {
        return await File.find({ fileHash: hash });
    } catch (error) {
        throw new Error('Error fetching files: ' + error.message);
    }
};

// Function to import a file
const importFile = async (fileData) => {
    try {
        const fileHash = generateHash(fileData.content);
        fileData.fileHash = fileHash;

        const file = new File(fileData);
        await file.save();
        return file;
    } catch (error) {
        throw new Error('Error importing file: ' + error.message);
    }
};

// Function to delete a file based on a hash
const deleteFile = async (hash) => {
    try {
        const result = await File.deleteOne({ fileHash: hash });
        return result;
    } catch (error) {
        throw new Error('Error deleting file: ' + error.message);
    }
};

export { generateHash, getFile, importFile, deleteFile };