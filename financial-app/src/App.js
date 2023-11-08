//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GlobalBanner from './components/GlobalBanner.js';
import Home from './components/Menu/Home.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import ErrorBoundary from './components/Dashboard/ErrorBoundary.js'; 
//import Login from './components/Auth/Login';
//import SignUp from './components/Auth/SignUp';
import UploadPage from './components/UploadPage.js';
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
              <UploadPage />
            </ErrorBoundary>
          } />
          <Route path="/Dashboard" element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;