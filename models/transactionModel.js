// In transactionModel.js

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  // ... any other fields you need ...
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
