import React, { useState, useEffect } from 'react';
//import SpendingOverTime from 'components/pages/reports/spendingOverTime';
import CategoryWiseSpending from 'components/pages/reports/categoryWiseSpending';
//import MonthlyIncomeVsExpense from 'components/pages/reports/monthlyIncomeVsExpense';
import { Label, Input, Button } from 'components/assets/localAssets/localStyle';

const REPORTING = [
  {
    "_id": "623c4d9e4a8e96e8b1234567",
    "descriptionId": "507f1f77bcf86cd799439011",
    "categoryId": "507f1f77bcf86cd799439012",
    "amount": 150,
    "date": "2023-01-10T00:00:00.000Z"
  },
  {
    "_id": "623c4d9e4a8e96e8b1234568",
    "descriptionId": "507f1f77bcf86cd799439013",
    "categoryId": "507f1f77bcf86cd799439014",
    "amount": 200,
    "date": "2023-02-15T00:00:00.000Z"
  },
  {
    "_id": "623c4d9e4a8e96e8b1234569",
    "descriptionId": "507f1f77bcf86cd799439015",
    "categoryId": "507f1f77bcf86cd799439016",
    "amount": 300,
    "date": "2023-03-20T00:00:00.000Z"
  },
  {
    "_id": "623c4d9e4a8e96e8b1234570",
    "descriptionId": "507f1f77bcf86cd799439017",
    "categoryId": "507f1f77bcf86cd799439018",
    "amount": 450,
    "date": "2023-04-25T00:00:00.000Z"
  },
  {
    "_id": "623c4d9e4a8e96e8b1234571",
    "descriptionId": "507f1f77bcf86cd799439019",
    "categoryId": "507f1f77bcf86cd799439020",
    "amount": 120,
    "date": "2023-05-30T00:00:00.000Z"
  }
];

const DashboardForm = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [spendingData, setSpendingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [useMockData, setUseMockData] = useState(false); // Flag to toggle mock data

  const handleDateRangeChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    // Trigger data reload
    setLoading(true);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    // Trigger data reload
    setLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (useMockData) {
        setSpendingData(REPORTING);
        setCategoryData(REPORTING); 
        setIncomeExpenseData(REPORTING);
        setLoading(false);
      } else {
        try {
          // Fetch real data from your API and set the respective state variables
          console.log('Fetching real data...');
          // Example: setSpendingData(await fetchSpendingData(...));
          // ... fetch and set data for other components ...
        } catch (error) {
          console.error('Error fetching data:', error);
    
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [useMockData, startDate, endDate, year]);
 
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {/* Checkbox to toggle between mock and real data */}
        <Label htmlFor="use-mock-data">Use Mock Data:</Label>
        <Input
          type="checkbox"
          id="use-mock-data"
          checked={useMockData}
          onChange={() => setUseMockData(!useMockData)}
        />
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
     
        </>
      )}
    </div>
  );
}

export default DashboardForm;
