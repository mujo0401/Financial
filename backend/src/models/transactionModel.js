import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  descriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Description', required: true, index: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
