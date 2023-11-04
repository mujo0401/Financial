import express from 'express';
import { uploadCategorizedTransactions } from '../controllers/transactionsController.js'; 

const router = express.Router();

router.post('/upload-categorized-transactions', uploadCategorizedTransactions);

export default router;
