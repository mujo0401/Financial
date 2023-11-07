import { styled, createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#007bff',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    delete: '#ff4d4d',
    process: '#4CAF50',
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