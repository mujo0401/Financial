import { styled } from 'styled-components';
import { colors } from 'components/assets/globalAssets/globalStyle'

export const TransactionUploadPageContainer = styled.div`
  background: url(${colors.background}) no-repeat center center fixed;
  background-size: cover;
`;

export const dropzoneStyles = {
    baseStyle: {
      borderWidth: '5px',
      borderStyle: 'dashed',
      borderColor: '#eeeeee',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color .24s ease-in-out, background-color .24s ease-in-out' 
    },
    activeStyle: {
      borderColor: '#2196f3',
      backgroundColor: '#e3f2fd' 
    }
};
