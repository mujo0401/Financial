import Transaction from '../models/transactionModel.js';
import Category from '../models/categoryModel.js';
import Description from '../models/descriptionModel.js';

export const addTransaction = async (req, res) => {
  try {
    const { categoryId, descriptionId, amount, date } = req.body;

    // Validate categoryId
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }

    // Validate descriptionId
    const descriptionExists = await Description.findById(descriptionId);
    if (!descriptionExists) {
      return res.status(400).json({ error: 'Invalid descriptionId' });
    }

    // Create transaction
    const newTransaction = await Transaction.create({ categoryId, descriptionId, amount, date });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Transaction creation failed:', error);
    res.status(400).json({ error: error.message });
  }
};
