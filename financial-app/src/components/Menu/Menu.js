import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function CardMenu() {
  return (
    <CardContainer>
      <Card to="/FileUpload">Procces File(s)</Card>
      <Card to="/Dashboard">Dashboard</Card>
    </CardContainer>
  );
}

export default CardMenu;
