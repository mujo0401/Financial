

import express from 'express';
import { getMonthlySpending, getAnnualSpending, getBudgetComparison } from '../controllers/dashboardController.js';

const router = express.Router();

// Route to get dashboard data
router.get('/dashboard', async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);

    const reports = {
      monthlySpending: await getMonthlySpending(startOfMonth, endOfMonth),
      annualSpending: await getAnnualSpending(startOfYear, endOfYear),
      budgetComparison: await getBudgetComparison()
    };

    res.json(reports);
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
});

export default router;
