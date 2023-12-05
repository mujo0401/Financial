import { styled } from '@mui/material/styles';


export const StyledTable = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
}));


export const StyledTh = styled('th')(({ theme }) => ({
  padding: '10px 15px',
  border: '1px solid #ddd',
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  textAlign: 'left',
}));

export const StyledTr = styled('tr')(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f8f8f8',
  },
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const StyledTd = styled('td')({
  padding: '10px 15px',
  border: '1px solid #ddd',
});

export const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: theme.shape.borderRadius, 
  cursor: 'pointer',
  fontSize: theme.typography.fontSize,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, 
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const Input = styled('input')(({ theme }) => ({
  display: 'block',
  padding: '10px',
  border: `1px solid ${theme.palette.primary.main}`, 
  borderRadius: theme.shape.borderRadius,
  margin: '10px 0 10px 10px',
  width: '30%', 
  boxSizing: 'border-box', 
  '&:focus': {
    borderColor: theme.palette.primary.main, 
    outline: 'none',
  },
}));

export const DropzoneStyles = styled('div')(({ theme }) => ({
  baseStyle: {
    borderWidth: '5px',
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border .24s ease-in-out, background-color .24s ease-in-out'
  },
  activeStyle: {
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.light 
  }
}));

export const Label = styled('label')(({ theme }) => ({
  display: 'block',
  marginBottom: '8px',
  color: '#333',
  fontSize: '16px', 
  fontWeight: 'bold',
  lineHeight: 1.5,
  textTransform: 'uppercase',

  '&:focus-within': {
    color: '#1B39E3', 
  },
}));

export const DeleteButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.delete.main,
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: theme.shape.borderRadius, 
  cursor: 'pointer',
  fontSize: theme.typography.fontSize,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.delete.main, 
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const EditButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.edit.main,
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: theme.shape.borderRadius, 
  cursor: 'pointer',
  fontSize: theme.typography.fontSize,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.edit.main, 
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const ProcessButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.process.main,
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: theme.shape.borderRadius, 
  cursor: 'pointer',
  fontSize: theme.typography.fontSize,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.process.main, 
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const StyledSelect = styled('select')(({ theme }) => ({
  display: 'block',
  padding: '10px',
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: '4px',
  margin: '10px 0 10px 10px',
  width: '30%',
  boxSizing: 'border-box',

  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none',
  },
}));

export const Style = () => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
  },
  thead: {
    backgroundColor: '#333',
    color: '#fff',
  },
  th: {
    padding: '10px 15px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px 15px',
    border: '1px solid #ddd',
  },
  tr: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f8f8f8',
    },
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
});




