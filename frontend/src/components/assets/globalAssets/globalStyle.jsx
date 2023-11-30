import { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#005f73', 
  secondary: '#0a9396',
  background: '#f0f4f8', 
  text: '#333f48', 
  border: '#cad2c5', 
};

export const typography = {
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

export const buttons = {
  borderRadius: '2px',
  padding: '8px 16px',

};

export const inputs = {
  borderRadius: '2px',
  padding: '8px 12px',
  border: `1px solid ${colors.border}`,

};

export const theme = {
  colors, 
  typography, 
  buttons, 
  inputs, 
};


export const buttonStyle = {
  padding: '10px 20px',
  margin: '5px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

export const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ff4d4d', // Red color for delete button
  color: 'white',
};

export const processButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#005f73', // Green color for process button
  color: 'white',
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

