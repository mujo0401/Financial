import express from 'express';
import { addTransaction } from '../Controllers/transactionEntryController.js';

const router = express.Router();

router.post('/', addTransaction);

export default router;
