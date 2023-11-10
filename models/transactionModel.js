import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
