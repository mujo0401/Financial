import React from 'react';

import { PageContainer, WelcomeText, DescriptionText, ActionButton } from '../styles/GlobalTheme';



const HomePage = () => {
  return (
    <PageContainer>
      <WelcomeText>Meet Carl the Finance AI!</WelcomeText>
      <DescriptionText>
        It is pretty bad at Finance so have some foresight before you follow its advice
      </DescriptionText>
      <ActionButton to="/signup">Get Started</ActionButton>
    </PageContainer>
  );
};

export default HomePage;