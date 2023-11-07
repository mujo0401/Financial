import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthlySpendingReport from './MonthlySpendingReport';
//import AnnualSpendingTrends from './AnnualSpendingTrends';
import BudgetComparisonReport from './BudgetComparisonReport';

const Dashboard = () => {
  const [monthlySpending, setMonthlySpending] = useState([]);
  //const [annualSpending, setAnnualSpending] = useState([]);
  const [budgetComparison, setBudgetComparison] = useState([]);
  
  
  // Define the budget state here
  const [budget, /*setBudget*/] = useState({
    // Replace these with actual category and budget values
    "Groceries": 500,
    "Utilities": 150,
    // Add other categories and their budget limits
  });

  // Placeholder function to use setBudget
  /*const updateBudget = async (newBudgetValues) => {

    setBudget(newBudgetValues);
  };*/


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard'); 
        setMonthlySpending(response.data.monthlySpending);
        //setAnnualSpending(response.data.annualSpending);
        setBudgetComparison(response.data.budgetComparison);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <MonthlySpendingReport data={monthlySpending} />

      <BudgetComparisonReport data={budgetComparison} budget={budget} />
    </div>
  );
};

export default Dashboard;
