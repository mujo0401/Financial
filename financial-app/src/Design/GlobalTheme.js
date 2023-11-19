import { styled, createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  primary: '#005f73', // Green
  secondary: '#0a9396', // Amber
  background: '#f0f4f8', // Light Grey
  text: '#333f48', // Almost Black
  border: '#cad2c5', // Light Grey Border
};

const typography = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  h1: {
    fontSize: '2em',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
};

const buttons = {
  borderRadius: '2px',
  padding: '8px 16px',
};

const inputs = {
  borderRadius: '2px',
  padding: '8px 12px',
  border: `1px solid ${colors.border}`,
};

export const theme = {
  colors: {
    primary: '#005f73',
    success: '#539987',
    error: '#ae2012',
    warning: '#ee9b00',
    delete: '#9b2226',
    process: '#94d2bd',
    colors,
    typography,
    buttons,
    inputs,
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .delete-button {
    background-color: ${theme.colors.delete};
    color: white;
  }

  .edit-button {
    background-color: ${theme.colors.edit};
    color: white;
  }


  .process-button {
    background-color: ${theme.colors.process};
    color: white;
  }
`;

export const DeleteButton = styled.button`
  background-color: ${props => props.theme.colors.delete};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.deleteHover};
  }
`;

export const EditButton = styled.button`
  background-color: ${props => props.theme.colors.edit};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.editHover};
  }
`;

export const ProcessButton = styled.button`
  background-color: ${props => props.theme.colors.process};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.processHover};
  }
`;

export const PageContainer = styled.div`
background: url(${colors.background}) no-repeat center center fixed;
background-size: cover;
`;

export const WelcomeText = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;

`;

export const DescriptionText = styled.p`
  max-width: 600px;
  text-align: center;
  font-size: 1.2em;
  line-height: 1.5;
  color: #666;
`;

export const ActionButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: #A3E4D7;
  color: white;
  font-size: 1em;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #45a049;
  }
`;

// Styled Button
export const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }
`;

// Styled Input
export const Input = styled.input`
  display: block;    
  padding: 10px;
  border: 2px solid ${theme.colors.secondary};
  border-radius: 4px;
  margin: 10px 0 10px 10px; 
  width: 30%;         
  box-sizing: border-box; 

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;
