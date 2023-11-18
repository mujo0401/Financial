
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GlobalBanner from './Design/GlobalBanner.js';
import Home from './components/Pages/Home.js';
import Dashboard from './components/Pages/Dashboard.js';
import ErrorBoundary from './components/utils/ErrorBoundary.js'; 
import FileImport from './components/Pages/FileImport.js';
import TransactionEntry from './components/Pages/TransactionEntry.js';
import CategoryMaintenance from './components/Pages/CategoryMaintenance.js';
import DescriptionMaintenance from './components/Pages/DescriptionMaintenance.js';
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