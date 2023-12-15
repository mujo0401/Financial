// fileRoute.js
import express from 'express';
import multer from 'multer';
import { getFile, importFile, deleteFile, generateHash } from '../controllers/fileController.js';

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'imports/'); 
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); 
    }
});

const multerimport = multer({ storage: storage });

// Routes
router.post('/transactionImport', multerimport.array('files', 10), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const fileHash = generateHash(req.file.path);

        const fileData = {
            fileName: req.file.originalname,
            fileSize: req.file.size,
            mediaType: req.file.mimetype,
            encoding: req.encoding,
            path: req.file.path,
            isProcessed: false,
            importDate: Date.now(),
            fileHash: fileHash
        };

        const savedFile = await importFile(fileData);
        res.status(201).json(savedFile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/files/:hash', async (req, res) => {
    try {
        const files = await getFile(req.params.hash);
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:hash', async (req, res) => {
    try {
        const result = await deleteFile(req.params.hash);
        if (result.deletedCount === 0) {
            return res.status(404).send('No file found with the given hash.');
        }
        res.send('File deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
