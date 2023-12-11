import * as dashboardRepository from '../repositories/dashboardRepository.js';

// Controller function for getting spending over time
export const getSpendingOverTime = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const data = await dashboardRepository.getSpendingOverTime(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    console.error("Error in getSpendingOverTime:", error);
    res.status(500).send("Error fetching spending over time data");
  }
};

// Controller function for getting category-wise spending
export const handleCategoryWiseSpendingRequest = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse dates and pass them to the repository function
    const data = await dashboardRepository.getCategoryWiseSpending(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    // Handle errors, including invalid date errors
    if (error.message === 'Invalid date parameters') {
      return res.status(400).send(error.message);
    }
    next(error);
  }
};

// Controller function for monthly income vs expense
export const getMonthlyIncomeVsExpense = async (req, res) => {
  const { year } = req.query;

  try {
    const data = await dashboardRepository.getMonthlyIncomeVsExpense(year);
    res.json(data);
  } catch (error) {
    console.error("Error in getMonthlyIncomeVsExpense:", error);
    res.status(500).send("Error fetching monthly income vs expense data");
  }
};

