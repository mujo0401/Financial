import { getCategoryWiseSpending, getSpendingOverTime, getMonthlyIncomeVsExpense } from '../repositories/dashboardRepository.js';

// Controller function for getting spending over time
export const handleSpendingOverTime = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Ensure that startDate and endDate are properly converted to Date objects
    const data = await getSpendingOverTime(new Date(startDate), new Date(endDate));
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
    const data = await getCategoryWiseSpending(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    if (error.message === 'Invalid date parameters') {
      return res.status(400).send(error.message);
    }
    next(error);
  }
};

// Controller function for monthly income vs expense
export const handleMonthlyIncomeVsExpense = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await getMonthlyIncomeVsExpense(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    if (error.message === 'Invalid date parameters') {
      return res.status(400).send(error.message);
    }
    next(error);
  }
};