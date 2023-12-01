import React from 'react';

//import { HomePageContainer } from 'components/assets/localAssets/homePageStyle';
import { Button, TextField, Container } from '@mui/material';



const HomePage = () => {
  return (
    <Container>
      <TextField>Meet Carl the Finance AI!</TextField>
      <TextField>
        It is pretty bad at Finance so have some foresight before you follow its advice </TextField>
      <Button to="/signup">Get Started</Button>
    </Container>
  );
};

export default HomePage;