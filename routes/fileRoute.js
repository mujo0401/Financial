import express from 'express';
import { deleteFile, getAllFiles, uploadFile }  from '.././controllers/fileController.js';

const router = express.Router();

// Route to get all files
router.get('/', getAllFiles);

// Route to upload a file
router.post('/upload', uploadFile);

// Route to delete a file
router.delete('/:fileId', deleteFile);

export default router;