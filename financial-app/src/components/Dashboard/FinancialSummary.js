import React from 'react';

const FinancialSummary = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalIncome, totalExpenses } = data;
  const netSavings = totalIncome - totalExpenses;

  return (
    <div>
      <h3>Financial Summary</h3>
      <div>
        <strong>Total Income:</strong> ${totalIncome.toLocaleString()}
      </div>
      <div>
        <strong>Total Expenses:</strong> ${totalExpenses.toLocaleString()}
      </div>
      <div>
        <strong>Net Savings:</strong> ${netSavings.toLocaleString()}
      </div>
    </div>
  );
};

export default FinancialSummary;
