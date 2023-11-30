import mongoose, { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
  descriptionId: { type: Schema.Types.ObjectId,  required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true },
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;