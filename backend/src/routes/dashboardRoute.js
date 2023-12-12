import express from 'express';
import { handleCategoryWiseSpendingRequest, handleMonthlyIncomeVsExpense, handleSpendingOverTime} from '../controllers/dashboardController.js';

const router = express.Router();

// Route for getting spending over time
router.get('/spending-over-time', handleSpendingOverTime);

// Route for getting category-wise spending
router.get('/category-wise-spending', handleCategoryWiseSpendingRequest);

// Route for getting monthly income vs expense
router.get('/monthly-income-expense', handleMonthlyIncomeVsExpense);

// Add more routes as needed...

export default router;