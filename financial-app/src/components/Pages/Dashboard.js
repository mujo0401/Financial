import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthlySpendingReport from '../Reporting/MonthlySpendingReport.js';

const mockData = [
  { _id: 'Groceries', totalAmount: 400 },
  { _id: 'Utilities', totalAmount: 300 },
  { _id: 'Entertainment', totalAmount: 150 },
  { _id: 'Transport', totalAmount: 200 },
];

const Dashboard = () => {
  const [monthlySpending, setMonthlySpending] = useState(mockData);
  //const [annualSpending, setAnnualSpending] = useState([]);
  //const [budgetComparison, setBudgetComparison] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard'); 
        setMonthlySpending(response.data.monthlySpending);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Spending Dashboard</h1>
      <MonthlySpendingReport data={monthlySpending} />
    </div>
  );
};

export default Dashboard;
