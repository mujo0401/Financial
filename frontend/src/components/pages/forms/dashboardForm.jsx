import React, { useState, useEffect } from 'react';
import CategoryWiseSpending from 'components/pages/reports/categoryWiseSpending';
import MonthlyIncomeVsExpense from 'components/pages/reports/monthlyIncomeVsExpense';
import SpendingOverTime from 'components/pages/reports/spendingOverTime';
import { Label, Input } from 'components/assets/localStyle';
import {fetchCategoryWiseSpending, fetchMonthlyIncomeVsExpense, fetchSpendingOverTime} from 'components/services/dashboardService';

const DashboardForm = () => {

  const mockCategoryData = [
    { name: "Groceries", amount: 500 },
    { name: "Income", amount: 1920 },
  ];

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching category-wise spending data
        const categorySpendingData = await fetchCategoryWiseSpending(startDate, endDate);
        setCategoryData(categorySpendingData);

        // Fetching monthly income vs expense data
        const incomeExpenseData = await fetchMonthlyIncomeVsExpense(startDate, endDate);
        setIncomeExpenseData(incomeExpenseData);
  
        // Fetching spending over time data
        const spendingData = await fetchSpendingOverTime(startDate, endDate);
        setSpendingData(spendingData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
  
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {/* Date Range Inputs */}
        <div>
          <Label htmlFor="start-date">Start Date:</Label>
          <Input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Label htmlFor="end-date">End Date:</Label>
          <Input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

      </div>

      {loading ? (
        <div>Loading reports...</div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CategoryWiseSpending data={categoryData} />
              <MonthlyIncomeVsExpense data={incomeExpenseData} />
              <SpendingOverTime data={spendingData} />

          </div>
        )}
      </div>
  );
}

export default DashboardForm;