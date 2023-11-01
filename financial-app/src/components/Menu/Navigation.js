import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
const Navigation = () => {
  const location = useLocation();

  return (
    <NavBar>
      {location.pathname !== '/' && <HomeButton to="/">Home</HomeButton>}
    </NavBar>
  );
};

export default Navigation;
