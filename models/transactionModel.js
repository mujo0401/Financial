import mongoose, { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    description: { 
        type: Schema.Types.ObjectId, 
        ref: 'Description' 
    },
    amount: Number,
    date: { 
        type: Date, 
        default: Date.now 
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction ;