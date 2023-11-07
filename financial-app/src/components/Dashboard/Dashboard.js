import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthlySpendingReport from './MonthlySpendingReport';
//import AnnualSpendingTrends from './AnnualSpendingTrends';
//import BudgetComparisonReport from './BudgetComparisonReport';

const Dashboard = () => {
  const [monthlySpending, setMonthlySpending] = useState([]);
  //const [annualSpending, setAnnualSpending] = useState([]);
  //const [budgetComparison, setBudgetComparison] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  
  
  // Define the budget state here
  /*const [budget, setBudge] = useState({

    "Groceries": 500,
    "Utilities": 150,
 
  });*/

  // Placeholder function to use setBudget
 /* const updateBudget = async (newBudgetValues) => {

    setBudget(newBudgetValues);
  };*/

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('/api/dashboard');
        setMonthlySpending(response.data.monthlySpending);
        // ... (other data setting)
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Loading && LoadingSpinner</div>; // You could replace this with a spinner or similar
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <MonthlySpendingReport data={monthlySpending} />

    </div>
  );
};

export default Dashboard;
