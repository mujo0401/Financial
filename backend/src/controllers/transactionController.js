import { create }   from '../repositories/transactionRepository.js';

 export const addTransaction = async (req, res) => {
  try {
    const { categoryId, descriptionId, amount, date } = req.body;

    // You might want to validate the input here or in middleware before reaching this point
    const newTransaction = await create({ categoryId, descriptionId, amount, date });

    res.status(201).json(newTransaction);
  } catch (error) {
    // Log the error for internal purposes
    console.error('Transaction creation failed:', error);
    res.status(400).json({ error: error.message });
  }
};
  

