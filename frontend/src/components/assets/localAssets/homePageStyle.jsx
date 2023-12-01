import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'components/assets/globalAssets/globalStyle';


export const HomePageContainer = styled.div`
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