import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalBanner from './styles/GlobalBanner.js';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import ErrorBoundary from './utils/ErrorBoundary.js'; // Assuming ErrorBoundary is within your frontend utils
import FileImport from './pages/FileImport.js';
import TransactionEntry from './pages/TransactionEntry.js';
import CategoryMaintenance from './pages/CategoryMaintenance.js';
import DescriptionMaintenance from './pages/DescriptionMaintenance.js';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#89CFF0',
    secondary: '#A3E4D7',
    accent: '#FFD700',
    text: '#333',
    background: '#f9f9f9',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalBanner />   
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          } />
          <Route path="/FileUpload" element={
            <ErrorBoundary>
              <FileImport />
            </ErrorBoundary>
          } />
          <Route path="/Dashboard" element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          } />
              <Route path="/TransactionEntry" element={
            <ErrorBoundary>
              <TransactionEntry />
            </ErrorBoundary>
          } />
              <Route path="/CategoryMaintenance" element={
            <ErrorBoundary>
              <CategoryMaintenance />
            </ErrorBoundary>
          } />
               <Route path="/DescriptionMaintenance" element={
            <ErrorBoundary>
              <DescriptionMaintenance />
            </ErrorBoundary>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;