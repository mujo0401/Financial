import React, { useState, useEffect } from 'react';
import CategoryWiseSpending from 'components/pages/reports/categoryWiseSpending';
import MonthlyIncomeVsExpense from 'components/pages/reports/monthlyIncomeVsExpense';
import { Label, Input } from 'components/assets/localStyle';
import * as dashboardService from 'components/services/dashboardService';

const DashboardForm = () => {

  const mockCategoryData = [
    { name: "Groceries", amount: 500 },
    { name: "Utilities", amount: 300 },
    { name: "Entertainment", amount: 200 },
  ];

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [year] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching category-wise spending data
        const categorySpendingData = await dashboardService.fetchCategoryWiseSpending(startDate, endDate);
        setCategoryData(categorySpendingData);

        // Fetching monthly income vs expense data
        const incomeExpenseData = await dashboardService.fetchMonthlyIncomeVsExpense(year);
        setIncomeExpenseData(incomeExpenseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [startDate, endDate, year]);

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
        <>
            <CategoryWiseSpending data={categoryData} />
          <MonthlyIncomeVsExpense data={incomeExpenseData} />

        </>
      )}
    </div>
  );
}

export default DashboardForm;