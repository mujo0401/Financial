import { styled, createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    text: '#212529',
    background: '#fff',
  },
  fonts: {
    base: "'Open Sans', sans-serif",
    headings: "'Roboto', sans-serif",
  },
  fontSizes: {
    small: '0.8em',
    medium: '1em',
    large: '1.2em',
    xlarge: '1.4em',
  },
  spacing: {
    xsmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    xxlarge: '3rem',
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  // Add more theme styles as needed
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


