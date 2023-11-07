//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Menu/Home';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/Dashboard/ErrorBoundary'; 
//import Login from './components/Auth/Login';
//import SignUp from './components/Auth/SignUp';
import UploadPage from './components/UploadPage';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme/GlobalTheme';
import GlobalBanner from './theme/GlobalBanner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>  
        <GlobalBanner /> 
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          } />
          <Route path="/upload" element={
            <ErrorBoundary>
              <UploadPage />
            </ErrorBoundary>
          } />
          <Route path="/dashboard" element={
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