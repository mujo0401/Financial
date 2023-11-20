import express from 'express';
import { addMultipleTransactions, addSingleTransaction } from '../controllers/transactionController.js'; 

const router = express.Router();

//Handles single transactions
router.post('/', addSingleTransaction);

//Handles multiple transactions
router.post('/', addMultipleTransactions);


export default router;
