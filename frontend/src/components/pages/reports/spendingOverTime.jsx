import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const getMonthName = (monthNumber) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[monthNumber - 1];
}

const SpendingOverTime = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available or data is loading.</div>;
  }

  const labels = data.map(item => `${getMonthName(item._id)}`)
  const expense = data.map(item => item.totalAmount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Spending Over Time',
        data: expense,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Spending Over Time</h2>
      <div style={{ width: '400px', height: '400px' }}>
      <Line 
     key={`spending-over-time-${new Date().getTime()}`} 
  data={chartData} 
  options={options} 
/>
</div>
    </div>
  );
};

export default SpendingOverTime;
