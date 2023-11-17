import express from 'express';
import { addTransaction } from '../controllers/transactionEntryController.js';

const router = express.Router();

router.post('/', addTransaction);

export default router;
