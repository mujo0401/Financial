import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GlobalBanner from './components/GlobalBanner';
import Home from './components/Menu/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
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
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;