import React, { useEffect, useState } from 'react';
import StyledForm from '../StyledForm';  
import styled from 'styled-components';
import FinancialService from '../../Services/FinancialService';
import ExpenseDistributionChart from './ExpenseDistributionChart';
import FinancialSummary from './FinancialSummary';
import FinancialInsights from './FinancialInsights';
import RecentTransactions from './RecentTransactions';


const DashboardContainer = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9; 
`;

const Title = styled.h1`
  font-size: 2em;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;


const Dashboard = () => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await FinancialService.getFinancialSummary();
        const transactions = await FinancialService.getRecentTransactions();
        //const goals = await FinancialService.getFinancialGoals();

        setFinancialData({ summary, transactions });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch financial data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
  if (error) return <DashboardContainer>Error: {error}</DashboardContainer>;

  const expenseData = financialData.summary.expenses;

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <FinancialSummary data={financialData.summary} />
      <FinancialInsights data={financialData.summary} />
      <RecentTransactions data={financialData.transactions} />
      <ExpenseDistributionChart data={expenseData} />
      <StyledForm />
  
    </DashboardContainer>
  );
};

export default Dashboard;