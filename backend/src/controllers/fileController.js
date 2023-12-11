import fs from 'fs';
import crypto from 'crypto';
import File from '../models/fileModel.js';

const generateHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

export const importFiles = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        for (const file of req.files) {
            const hash = await generateHash(file.path);
            const duplicate = await File.findOne({ hash });

            if (duplicate) {
                fs.unlinkSync(file.path); // Remove the file if it's a duplicate
                continue; // Skip further processing for this file
            }

            const fileData = {
                originalName: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                size: file.size,
                hash
            };

            const newFile = new File(fileData);
            await newFile.save();
        }

        res.status(201).send({ message: 'Files uploaded and processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

export const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteFiles = async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) {
          return res.status(404).send('File not found.');
      }

      // Delete file from the file system
      await fs.unlink(file.path);

      // Remove file metadata from database
      await file.remove();

      res.send({ message: 'File deleted successfully.' });
  } catch (error) {
      res.status(500).send(error.message);
  }
};