import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005f73',
    },
    secondary: {
      main: '#0a9396',
    },
    delete: {
      main: '#9b2226',
    },
    edit: {
      main: '#ff4d4d',
    },
    process: {
      main: '#94d2bd',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2em',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
  },
});

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

export default theme 