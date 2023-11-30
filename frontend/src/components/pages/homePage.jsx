import React from 'react';

import { HomePageContainer, WelcomeText, DescriptionText, ActionButton } from 'components/assets/localAssets/homePageStyle';




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