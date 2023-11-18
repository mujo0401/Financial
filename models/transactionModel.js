import mongoose, { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // Correct reference to Schema
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction ;
