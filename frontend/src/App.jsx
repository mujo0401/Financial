import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from 'components/navigation/Navbar';
import GlobalBanner from 'components/assets/globalAssets/globalBanner';
import checkBackendHealth from 'components/services/healthCheckService';
import HomePage from 'components/pages/homePage';
import TransactionEntry from 'components/pages/transactionEntry';
//import ErrorBoundary from 'components/errorHandling/errorBoundary';
import TransactionUpload from 'components/pages/transactionUpload';

const App = () => {
  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <Router>
      <GlobalBanner />   
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path="/TransactionEntry" element={<TransactionEntry />} />
        <Route path="/TransactionUpload" element={<TransactionUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
