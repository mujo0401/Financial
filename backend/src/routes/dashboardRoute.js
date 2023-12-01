import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

// Route for getting spending over time
router.get('/spending-over-time', dashboardController.getSpendingOverTime);

// Route for getting category-wise spending
router.get('/category-wise-spending', dashboardController.getCategoryWiseSpending);

// Route for getting monthly income vs expense
router.get('/monthly-income-expense', dashboardController.getMonthlyIncomeVsExpense);

// Add more routes as needed...

export default router;