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
  // Make sure startDate and endDate are valid Date objects
  if (!(startDate instanceof Date) && !(endDate instanceof Date)) {
    throw new Error('Invalid date parameters');
  }

  const categorySpending = await Transaction.aggregate([
    { $match: { date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$categoryId", totalAmount: { $sum: "$amount" } } },
    { $lookup: {
        from: "categories", // Replace with your category collection name
        localField: "_id", // This should match the grouped field
        foreignField: "_id",
        as: "categoryDetails"
    }},
    { $unwind: "$categoryDetails" },
    { $project: {
        _id: 0,
        name: "$categoryDetails.name",
        amount: "$totalAmount"
    }}
  ]);

  return categorySpending;
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

