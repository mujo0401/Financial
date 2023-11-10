import { styled, createGlobalStyle } from 'styled-components';

const colors = {
  primary: '#005f73', // Green
  secondary: '#0a9396', // Amber
  background: '#f0f4f8', // Light Grey
  text: '#333f48', // Almost Black
  border: '#cad2c5', // Light Grey Border
  // Add any other colors you need
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
  // Define styles for other headings and text as needed
};

const buttons = {
  borderRadius: '2px',
  padding: '8px 16px',
  // Add other button styles as needed
};

const inputs = {
  borderRadius: '2px',
  padding: '8px 12px',
  border: `1px solid ${colors.border}`,
  // Add other input styles as needed
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
  // ... other theme properties
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    // ... other global styles
  }

  // Define button styles here
  .delete-button {
    background-color: ${theme.colors.delete};
    color: white;
    // ... other styles for delete button
  }

  .process-button {
    background-color: ${theme.colors.process};
    color: white;
    // ... other styles for process button
  }

  // ... other global styles
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

// Styled button for the Process and Visualize action
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