import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme  from 'components/assets/globalAssets/globalStyle';

const BannerContainer = styled.div`


  position: relative; // This will make the banner stretch across the top
  width: 100%; // Stretch across the width
  height: 200px; // Adjust this value according to your needs
  background-color: #005f73;
  text-align: center;
  padding: 0;
  font-size: 20px;
  overflow: hidden; // This will ensure that the image doesn't overflow the container
`;

const BannerImage = styled.img`
  width: 100%; // Stretch the image across the width of the container
  height: auto; // Maintain the aspect ratio of the image
  display: block; // Remove any extra space below the image
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%; // adjust as needed
  left: 50%; // adjust as needed
  transform: translate(-50%, -50%); // adjust to center or place as needed
`;

const GlobalBanner = () => {
  return (
    <BannerContainer>
      <ThemeProvider theme={theme}>
      <BannerImage src={process.env.PUBLIC_URL + '/site_banner_image.jpg'} />
      <ButtonWrapper>
      </ButtonWrapper>
      </ThemeProvider>
    </BannerContainer>
  );
};

export default GlobalBanner;
