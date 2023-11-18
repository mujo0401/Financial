import express from 'express';
import { getMonthlySpending } from '../controllers/dashboardController.js';

const router = express.Router();

// Existing route for monthly spending
router.get('/', async (req, res, next) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    try {
      const monthlySpendingData = await getMonthlySpending(startOfMonth, endOfMonth);
      res.json({ monthlySpending: monthlySpendingData });
    } catch (error) {
      res.status(500).send('Server Error');
    }
});

// New route for the MonthlySpendingReport
router.get('/monthly-spending-report', getMonthlySpending);

export default router;
