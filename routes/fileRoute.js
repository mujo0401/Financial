//routes/FileRoute.js
import express from 'express';
const router = express.Router();
import { uploadFile, deleteFile } from '.././controllers/fileController.js';

router.post('/upload', (req, res, next) => {
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  next(); 
}, uploadFile);


router.delete('/delete/:fileId', deleteFile);

export default router;