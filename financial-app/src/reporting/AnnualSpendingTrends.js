import React from 'react';

const AnnualSpendingTrends = ({ data }) => {
  return (
    <div>
      <h3>Annual Spending Trends</h3>
      {/* Assuming data is an array of objects with month, category, and totalAmount */}
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ _id, totalAmount }) => (
            <tr key={_id.month + _id.category}>
              <td>{_id.month}</td>
              <td>{_id.category}</td>
              <td>${totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnualSpendingTrends;
