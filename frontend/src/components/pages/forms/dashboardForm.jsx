import React, { useState, useEffect } from 'react';
import CategoryWiseSpending from 'components/pages/reports/categoryWiseSpending';
import MonthlyIncomeVsExpense from 'components/pages/reports/monthlyIncomeVsExpense';
import { Label, Input, Button } from 'components/assets/localStyle';
import categoryService from 'components/services/categoryService';
import * as dashboardService from 'components/services/dashboardService';


const DashboardForm = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);

  const handleDateRangeChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setLoading(true);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    setLoading(true);
  };

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const categoriesData = await categoryService.getCategories();
      setCategoryData(categoriesData);
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
          <Button onClick={() => handleDateRangeChange(startDate, endDate)}>Update Range</Button>
        </div>

        {/* Year Input */}
        <div>
          <Label htmlFor="year">Year:</Label>
          <Input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <Button onClick={() => handleYearChange(year)}>Update Year</Button>
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
