import Transaction from '../models/transactionModel.js';

export const create = async ({ categoryId, descriptionId, amount, date }) => {
  try {
    const newTransaction = new Transaction({ categoryId, descriptionId, amount, date });
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);

      throw error;
    }
  };






