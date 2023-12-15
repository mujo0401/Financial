import Transaction from '../models/transactionModel.js';
import Category from '../models/categoryModel.js';
import Description from '../models/descriptionModel.js';

const addTransaction = async (req, res) => {
  const { categoryId, descriptionId, amount, date } = req.body;

  try {
      // Check if the category exists
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
          return res.status(400).send({ error: 'Category not found' });
      }

      // Check if the description exists
      const descriptionExists = await Description.findById(descriptionId);
      if (!descriptionExists) {
          return res.status(400).send({ error: 'Description not found' });
      }

    // Create transaction
    const newTransaction = await Transaction.create({ categoryId, descriptionId, amount, date });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Transaction creation failed:', error);
    res.status(400).json({ error: error.message });
  }
};

export { addTransaction };