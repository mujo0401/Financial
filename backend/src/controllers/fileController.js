import multer from 'multer';
import pkg from 'multer-gridfs-storage';
const GridFsStorage = pkg.GridFsStorage;
import crypto from 'crypto';
import path from 'path';
import mongoose from 'mongoose';
import { File } from '../models/fileModel.js';

// Set up GridFS storage
const storage = new GridFsStorage({
  db: mongoose.connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

export const getFile = async (req, res, next) => {
  try {
      const files = await FileModel.find();
      res.json(files);
  } catch (error) {
      next(error);
  }
};

export const deleteFile = (req, res) => {
  const file_id = req.params.fileId;

  if (!mongoose.Types.ObjectId.isValid(file_id)) {
    return res.status(400).json({ error: 'Invalid file ID' });
  }

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
  
  bucket.delete(mongoose.Types.ObjectId(file_id), (err) => {
    if (err) {
      // Log the error for debugging purposes
      console.error(err);
      return res.status(404).json({ error: 'File not found or could not be deleted' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
};


const upload = multer({ storage: storage });

export const uploadFile = (req, res) => {
    upload.array('files')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Assume that files have been uploaded and file information is in req.files
      const fileData = req.files.map(f => ({
        filename: f.filename,
        contentType: f.contentType,
        size: f.size,
        // Add any other relevant metadata you want to store
      }));
      File.insertMany(fileData)
      .then(() => res.status(201).json({ message: 'Files uploaded and metadata saved.' }))
      .catch(error => res.status(500).json({ error: error.message }));
    });
  };