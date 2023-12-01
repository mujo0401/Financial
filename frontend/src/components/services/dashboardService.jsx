import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlySpendingChart = () => {
  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    // Fetch monthly spending data from your API
    // Assume the API returns an array of objects with category and amount
    fetch('/api/monthly-spending')
      .then(response => response.json())
      .then(data => setSpendingData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Prepare data for the bar chart
  const chartData = {
    labels: spendingData.map(item => item.category),
    datasets: [{
      label: 'Monthly Spending',
      data: spendingData.map(item => item.amount),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default MonthlySpendingChart;
