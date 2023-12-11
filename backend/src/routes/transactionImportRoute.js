import express from 'express';
import multer from 'multer';
import { importFiles, getFiles, deleteFiles } from '../controllers/fileController.js';
import { importData } from '../controllers/importController.js';
import fs from 'fs';

const router = express.Router();

// Configure Multer to store files in a temporary directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'import/'); // Specify the folder to store temp files
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()); // Generate a unique filename
    }
});

const multerimport = multer({ storage: storage });

router.post('/import', multerimport.array('files', 10), async (req, res, next) => {
    console.log('transactionImportroute hit');

    // Process each file
    for (const file of req.files) {
        // Check if the file is a transaction file based on its name
        if (file.originalname.startsWith('transactions') && file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Process transaction data from file
            await importData(req, res, next);
        } else {
            // Process metadata about file
            await importFiles(req, res, next);
        }

        // Delete the temp file
        fs.unlink(file.path, err => {
            if (err) console.error('Error deleting temp file:', err);
        });
    }
});

router.get('/files', getFiles);
router.delete('/delete/:id', deleteFiles);

export default router;