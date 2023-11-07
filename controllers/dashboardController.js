import Transaction from '../models/transactionModel.js'; // Replace with the path to your transaction model

// Function to get monthly spending report
export async function getMonthlySpending(startOfMonth, endOfMonth) {
    return Transaction.aggregate([
      { $match: { date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } }
    ]);
}

// Function to get annual spending report
export async function getAnnualSpending(startOfYear, endOfYear) {
    return Transaction.aggregate([
      { $match: { date: { $gte: startOfYear, $lte: endOfYear } } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } }
    ]);
}

// Function to compare actual spending against the budget
export async function getBudgetComparison(budget, startOfMonth, endOfMonth) {
    const spending = await Transaction.aggregate([
      { $match: { date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]);

    return spending.map(categorySpending => ({
      category: categorySpending._id,
      spent: categorySpending.totalAmount,
      budget: budget[categorySpending._id] || 0,
      overBudget: (budget[categorySpending._id] || 0) - categorySpending.totalAmount
    }));
}

export default {
  getMonthlySpending,
  getAnnualSpending,
  getBudgetComparison
};
