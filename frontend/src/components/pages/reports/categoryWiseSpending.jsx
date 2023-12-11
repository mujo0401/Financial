import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Tooltip, Legend, ArcElement);

const CategoryWiseSpending = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No category data available or data is loading.</div>;
  }

  const labels = data.map(item => item.name || 'Unknown');
  const amounts = data.map(item => item.amount || 0);

  const chartData = {
    labels,
          datasets: [
            {
              label: 'Spending',
              data: amounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(231, 233, 237, 0.2)',
                'rgba(255, 218, 193, 0.2)',
                'rgba(255, 226, 229, 0.2)',
                'rgba(197, 202, 233, 0.2)',
                'rgba(163, 230, 255, 0.2)',
                'rgba(160, 216, 239, 0.2)',
                'rgba(178, 255, 219, 0.2)',
                'rgba(255, 177, 193, 0.2)',
                'rgba(255, 223, 186, 0.2)',
                'rgba(255, 255, 194, 0.2)',
                'rgba(218, 232, 252, 0.2)',
                'rgba(255, 188, 217, 0.2)',
                'rgba(255, 247, 205, 0.2)',
                'rgba(217, 255, 220, 0.2)',
                'rgba(255, 210, 210, 0.2)',
                'rgba(210, 255, 233, 0.2)',
                'rgba(210, 233, 255, 0.2)',
                'rgba(233, 210, 255, 0.2)',
                'rgba(255, 233, 210, 0.2)',
                'rgba(210, 255, 210, 0.2)',
                'rgba(255, 210, 255, 0.2)',
                'rgba(210, 210, 255, 0.2)',
                'rgba(255, 255, 210, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207, 1)',
                'rgba(231,233,237, 1)',
                'rgba(255, 218, 193, 1)',
                'rgba(255, 226, 229, 1)',
                'rgba(197, 202, 233, 1)',
                'rgba(163, 230, 255, 1)',
                'rgba(160, 216, 239, 1)',
                'rgba(178, 255, 219, 1)',
                'rgba(255, 177, 193, 1)',
                'rgba(255, 223, 186, 1)',
                'rgba(255, 255, 194, 1)',
                'rgba(218, 232, 252, 1)',
                'rgba(255, 188, 217, 1)',
                'rgba(255, 247, 205, 1)',
                'rgba(217, 255, 220, 1)',
                'rgba(255, 210, 210, 1)',
                'rgba(210, 255, 233, 1)',
                'rgba(210, 233, 255, 1)',
                'rgba(233, 210, 255, 1)',
                'rgba(255, 233, 210, 1)',
                'rgba(210, 255, 210, 1)',
                'rgba(255, 210, 255, 1)',
                'rgba(210, 210, 255, 1)',
                'rgba(255, 255, 210, 1)'
              ],
              borderWidth: 1
            }
          ]
        };

  return (
    <div>
    <h2>Category Wise Spending</h2>
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} />
    </div>
  </div>
  );
};

export default CategoryWiseSpending;