import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #FFEBCD, #F5DEB3);
  font-family: 'Arial', sans-serif;
`;

const WelcomeText = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;

`;

const DescriptionText = styled.p`
  max-width: 600px;
  text-align: center;
  font-size: 1.2em;
  line-height: 1.5;
  color: #666;
`;

const ActionButton = styled(Link)`
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

const HomePage = () => {
  return (
    <HomePageContainer>
      <WelcomeText>Meet Carl the Finance AI!</WelcomeText>
      <DescriptionText>
        It is pretty bad at Finance so have some foresight before you follow its advice
      </DescriptionText>
      <ActionButton to="/signup">Get Started</ActionButton>
    </HomePageContainer>
  );
};

export default HomePage;
