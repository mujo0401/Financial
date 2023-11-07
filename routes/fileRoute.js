//routes/FileRoute.js
import express from 'express';
const router = express.Router();
import { uploadFile, deleteFile } from '.././controllers/fileController.js';
import { fileURLToPath } from 'url';


router.post('/upload', (req, res, next) => {
  console.log('Upload route hit');
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  next(); // proceed to the next middleware (e.g., uploadFile)
}, uploadFile);


router.delete('/delete/:fileId', deleteFile);

export default router;