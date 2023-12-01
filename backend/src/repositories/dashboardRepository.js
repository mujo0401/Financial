import Transaction from '../models/transactionModel.js';

// Spending over time
export const getSpendingOverTime = async (startDate, endDate) => {
  try {
    return await Transaction.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: { $month: "$date" }, totalAmount: { $sum: "$amount" } } },
      { $sort: { '_id': 1 } }
    ]);
  } catch (error) {
    console.error("Error in getting spending over time:", error);
    throw error;
  }
};

// Category-wise Spending
export const getCategoryWiseSpending = async (startDate, endDate) => {
  try {
    return await Transaction.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$categoryId", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } }
    ]);
  } catch (error) {
    console.error("Error in getting category-wise spending:", error);
    throw error;
  }
};

// Monthly Income vs Expense
export const getMonthlyIncomeVsExpense = async (year) => {
  try {
    return await Transaction.aggregate([
      { $match: { date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } } },
      { $group: { _id: { $month: "$date" }, totalIncome: { $sum: "$income" }, totalExpense: { $sum: "$expense" } } },
      { $sort: { '_id': 1 } }
    ]);
  } catch (error) {
    console.error("Error in getting monthly income vs expense:", error);
    throw error;
  }
};

// Add more functions as needed...

