import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styled components from Navigation.js
const NavBar = styled.div`
  padding: 10px;
  background-color: ${props => props.theme.colors.primary};
`;

const HomeButton = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid white;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

const Menu = () => {
  const location = useLocation();

  return (
    <NavBar>
      {location.pathname !== '/' && <HomeButton to="/">Home</HomeButton>}
      {location.pathname !== '/upload' && <HomeButton to="/upload">File Processing</HomeButton>}
      {location.pathname !== '/dashboard' && <HomeButton to="/dashboard">Dashboard</HomeButton>}
    </NavBar>
  );
};

// Styled components from Menu.js (excluding those that are identical to Navigation.js)
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled(Link)`
width: 130px;
padding: 15px;
text-align: center;
background-color: ${props => props.theme.colors.secondary};
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
border-radius: 10px;
cursor: pointer;
text-decoration: none;
color: ${props => props.theme.colors.text};

&:hover {
  background-color: ${props => props.theme.colors.accent};
}
`;

function Cards() {
  return (
    <CardContainer>
      <Card to="/FileUpload">Upload File</Card>
      <Card to="/Dashboard">Dashboard</Card>
    </CardContainer>
  );
}

export { Menu, Cards };