import React, { useEffect } from 'react';
import './App.css';
import backgroundImage from 'components/assets/images/background.png'; // Adjust the path as necessary
import Navbar from 'components/navigation/Navbar';
import checkBackendHealth from 'components/services/healthCheckService';
import TransactionEntry from 'components/pages/transactionEntry';
import ErrorBoundary from 'components/errorHandling/errorBoundary';
import TransactionImport from 'components/pages/transactionImport';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'components/assets/globalStyle'; 
import Dashboard from 'components/pages/dashboard'

const App = () => {
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  return (
    <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={appStyle}>
        <Navbar />
        <div className="body-content">
          <div id="dashboard-section">
            <Dashboard />
          </div>
          <div id="transaction-entry-section">
            <TransactionEntry />
          </div>
          <div id="transaction-import-section">
            <TransactionImport />
          </div>
        </div>
      </div>
    </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
