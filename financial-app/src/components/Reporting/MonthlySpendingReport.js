import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MonthlySpendingReport = ({ data }) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalAmount" fill="#8884d8" />
    </BarChart>
  );
};

export default MonthlySpendingReport;
