import express from 'express';
import { getFile, deleteFile, uploadFile }  from './Controllers/fileController.js';

const router = express.Router();

// Route to get all files
router.get('/', getFile);

// Route to delete a file
router.delete('/:fileId', deleteFile);

// Route to upload a file
router.post('/upload', uploadFile);

export default router;