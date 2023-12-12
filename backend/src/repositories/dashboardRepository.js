import Transaction from '../models/transactionModel.js';
import Category from '../models/categoryModel.js'

// Spending over time
export const getSpendingOverTime = async (startDate, endDate) => {
  try {
    return await Transaction.aggregate([
      {
        $lookup: {
          from: Category.collection.name,
          localField: 'categoryId', 
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      { $match: { 
          date: { $gte: new Date(startDate), $lte: new Date(endDate) },
          'category.name': 'Expense' 
      }},
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

  if (!(startDate instanceof Date) && !(endDate instanceof Date)) {
    throw new Error('Invalid date parameters');
  }

  const categorySpending = await Transaction.aggregate([
    { $match: { date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$categoryId", totalAmount: { $sum: "$amount" } } },
    { $lookup: {
        from: "categories", 
        localField: "_id", 
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
export const getMonthlyIncomeVsExpense = async (startDate, endDate) => {
  try {
    // Check if startDate and endDate are valid Date objects
    if (!(startDate instanceof Date) && !(endDate instanceof Date)) {
      throw new Error('Invalid date parameters');
    }

    const monthlyExpense = await Transaction.aggregate([
      { 
        $match: { date: { $gte: startDate, $lte: endDate } } },
      { 
        $lookup: {
          from: Category.collection.name,
          localField: 'categoryId', 
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      { 
        $group: { 
          _id: { $month: "$date" }, 
          totalIncome: { 
            $sum: {
              $cond: [{ $eq: ["$category.name", "Income"] }, "$amount", 0]
            } 
          },
          totalExpense: { 
            $sum: {
              $cond: [{ $ne: ["$category.name", "Income"] }, "$amount", 0]
            } 
          } 
        } 
      },
      { $sort: { '_id': 1 } }
    ]);

    return monthlyExpense;
  } catch (error) {
    console.error("Error in getting monthly income vs expense:", error);
    throw error;
  }
};

