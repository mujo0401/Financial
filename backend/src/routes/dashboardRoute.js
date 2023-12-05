import express from 'express';
import { getCategoryWiseSpending, getMonthlyIncomeVsExpense, getSpendingOverTime} from '../controllers/dashboardController.js';

const router = express.Router();

// Route for getting spending over time
router.get('/spending-over-time', getSpendingOverTime);

// Route for getting category-wise spending
router.get('/category-wise-spending', getCategoryWiseSpending);

// Route for getting monthly income vs expense
router.get('/monthly-income-expense', getMonthlyIncomeVsExpense);

// Add more routes as needed...

export default router;