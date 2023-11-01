import React from 'react';

const RecentTransactions = ({ transactions }) => {
  return (
    <div>
      <h3>Recent Transactions</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.category} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;