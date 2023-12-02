import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './globalStyle'; // Importing the global theme
import GlobalBanner from './globalBanner'; // Importing the GlobalBanner component
import Dashboard from './dashboard';
import TransactionUpload from './transactionUpload';
import TransactionEntry from './transactionEntry';
import './mainPage.css'; // Assuming the CSS file is named mainPage.css

const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalBanner />
      <div className="main-page">
        <section id="dashboard">
          <Dashboard />
        </section>
        <section id="transaction-upload">
          <TransactionUpload />
        </section>
        <section id="transaction-entry">
          <TransactionEntry />
        </section>
      </div>
    </ThemeProvider>
  );
};

export default MainPage;
