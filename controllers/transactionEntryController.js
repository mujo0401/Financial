import Transaction from '../models/transactionModel.js';
import { assignCategory } from './../financial-app/src/components/utils/fileParser.js'; // Adjust path as needed

export const addTransaction = async (req, res) => {
    try {
        const { date, description, amount } = req.body;
        const category = assignCategory(description);
        const newTransaction = new Transaction({ date, description, amount, category });
        
        await newTransaction.save();
        res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};