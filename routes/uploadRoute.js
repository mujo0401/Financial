

import express from 'express';
import { parseExcelFile } from './../financial-app/src/components/utils/fileParser.js';
import multer from 'multer';

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST route for file upload
router.post('/', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded.' });
  }


  parseExcelFile(req.file.path)
  .then(result => {
      res.status(200).json(result);
  })
  .catch(error => {
      res.status(500).send(error.message);
  });
});

export default router;
