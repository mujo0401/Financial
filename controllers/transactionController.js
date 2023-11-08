import Transaction from '../models/transactionModel';

exports.uploadCategorizedTransactions = async (req, res) => {
    try {
      // Assuming req.body contains the categorized transactions
      const transactions = req.body;
      // Insert the transactions into MongoDB
      await Transaction.insertMany(transactions);
  
      res.status(201).send({ message: 'Transactions uploaded successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to upload transactions', error: error.message });
    }
  };