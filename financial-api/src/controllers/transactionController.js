import Transaction from '../models/transactionModel.js';

async function createTransaction(data) {
  // Assuming findOrCreateCategory and findOrCreateDescription are implemented elsewhere and imported correctly.
  const category = await findOrCreateCategory(data.categoryName);  
  const description = await findOrCreateDescription(data.descriptionName, category._id);

  try {
    const transaction = new Transaction({
      categoryName: category._id, // Use the ID from the category document
      descriptionName: description._id, // Use the ID from the description document
      amount: data.amount,
      date: data.date || new Date(),
    });

    await transaction.save();
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}
export const addSingleTransaction = async (req, res) => {
  try {
    const transactionData = req.body;

    const singleTransaction = await createTransaction(transactionData);
    res.status(201).json({ message: 'Transaction added successfully', transaction: singleTransaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMultipleTransactions = async (req, res) => {
  try {
    const transactions = req.body;
    const multipleTransactions = await Promise.all(transactions.map(createTransaction));
    res.status(201).send({ message: 'Transactions uploaded successfully', transactions: multipleTransactions });
  } catch (error) {
    res.status(500).send({ message: 'Failed to upload transactions', error: error.message });
  }
};

export default [ createTransaction ]