import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


  const getmonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const getMonthName = (monthNumber) => 
 {
    return getmonthNames[monthNumber - 1]; 
 }

const MonthlyIncomeVsExpense = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>No data available or data is loading.</div>;
  }
  const labels = data.map(item => getMonthName(item.monthNumber));
  const income = data.map(item => item.totalIncome);
  const expense = data.map(item => item.totalExpense);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expense',
        data: expense,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expense'
      }
    }
  };

  return (
    <div>
      <h2>Monthly Income vs Expense</h2>
      <div style={{ width: '400px', height: '400px' }}>
      <Bar
        key={`monthly-income-expense-${new Date().getTime()}`} 
        data={chartData}
        options={options}
      />
      </div>
    </div>
  );
}

export default MonthlyIncomeVsExpense;