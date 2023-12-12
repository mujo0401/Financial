import express from 'express';
import multer from 'multer';
import { importFiles, getFiles, deleteFiles } from '../controllers/fileController.js';
import { importData } from '../controllers/importController.js';
import fs from 'fs';

const router = express.Router();

// Configure Multer to store files in a temporary directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'fileStore/'); // Specify the folder to store temp files
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()); // Generate a unique filename
    }
});

const multerimport = multer({ storage: storage });

router.post('/import', multerimport.array('files', 10), async (req, res, next) => {
    console.log('transactionImport route hit');

    try {
        const results = []; // Store results or errors for each file

        for (const file of req.files) {
            try {
                if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    await importData(req, res, next, file); // Process transaction data
                    results.push({ file: file.originalname, status: 'Processed' });
                } else {
                    await importFiles(file); // Process file
                    results.push({ file: file.originalname, status: 'Processed' });
                }
            } catch (error) {
                console.error('Error processing file:', file.originalname, error);
                results.push({ file: file.originalname, status: 'Error', error: error.message });
            }

            // Delete the temp file
           /*fs.unlink(file.path, err => {
                if (err) console.error('Error deleting temp file:', err);
            });*/
        }

        res.status(201).json({ message: 'Files processing completed', results });
    } catch (error) {
        console.error('Overall processing error:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/files', getFiles);
router.delete('/delete/:id', deleteFiles);

export default router;