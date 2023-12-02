import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Tooltip, Legend, ArcElement);

const CategoryWiseSpending = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No category data available or data is loading.</div>;
  }

        // Assuming data is an array of objects with keys '_id' and 'totalAmount'
        const labels = data.map(item => item.categoryName || 'Unknown');
        const amounts = data.map(item => item.amount || 0);

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Category Wise Spending',
              data: amounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                // ... other colors as needed
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                // ... other colors as needed
              ],
              borderWidth: 1
            }
          ]
        };

  return (
    <div>
      <h2>Category Wise Spending</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryWiseSpending;
