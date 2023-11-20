import React from 'react';

const BudgetComparisonReport = ({ data, budget }) => {
  return (
    <div>
      <h3>Budget Comparison</h3>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            {item._id}: ${item.totalAmount} - Budget: ${budget[item._id] || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetComparisonReport;


