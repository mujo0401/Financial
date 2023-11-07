import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import mongoose from 'mongoose';
import { FileModel } from '../models/fileModel.js';
import express from 'express';

const app = express();

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
      FileModel.insertMany(fileData)
      .then(() => res.status(201).json({ message: 'Files uploaded and metadata saved.' }))
      .catch(error => res.status(500).json({ error: error.message }));
    });
  };


  
  export const deleteFile = (req, res) => {
    const file_id = req.params.fileId;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads',
    });
    
    bucket.delete(mongoose.Types.ObjectId(file_id), (err) => {
      if (err) {
        return res.status(404).json({ error: 'File not found' });
      }
      res.status(200).json({ message: 'File deleted successfully' });
    });
  };