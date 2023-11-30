import { styled } from 'styled-components';
import { theme } from 'components/assets/globalAssets/globalStyle'

// Styled Button
export const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: ${theme.buttons.borderRadius};
  cursor: pointer;
  font-size: ${theme.typography.fontSize};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }
`;

// Styled Table
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
`;

// Styled Table Header (th)
export const StyledTh = styled.th`
  padding: 10px 15px;
  border: 1px solid #ddd;
  background-color: ${theme.colors.secondary};
  color: white;
  text-align: left;
`;

// Styled Table Row (tr)
export const StyledTr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f8f8f8;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

// Styled Table Data Cell (td)
export const StyledTd = styled.td`
  padding: 10px 15px;
  border: 1px solid #ddd;
`;

// Styled Input
export const Input = styled.input`
  display: block;    
  padding: 10px;
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.inputs.borderRadius};
  margin: 10px 0 10px 10px; 
  width: 30%;         
  box-sizing: border-box; 

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

export const Label = styled.label`
  display: block;        
  margin-bottom: 8px;     
  color: #333;            
  font-size: 16px;       
  font-weight: bold;      
  line-height: 1.5;       
  text-transform: uppercase; 

  &:focus-within {
    color: #1B39E3; 
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

export const Select = styled.select`
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

