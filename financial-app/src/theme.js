const colors = {
    primary: '#4CAF50', // Green
    secondary: '#FFC107', // Amber
    background: '#F5F5F5', // Light Grey
    text: '#212121', // Almost Black
    border: '#e0e0e0', // Light Grey Border
    // Add any other colors you need
  };

  const typography = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    h1: {
      fontSize: '2em',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
    // Define styles for other headings and text as needed
  };
  
  const buttons = {
    borderRadius: '4px',
    padding: '10px 20px',
    // Add other button styles as needed
  };
  
  const inputs = {
    borderRadius: '4px',
    padding: '10px',
    border: `1px solid ${colors.border}`,
    // Add other input styles as needed
  };
  
  const theme = {
    colors,
    typography,
    buttons,
    inputs,
    // Add other style categories as needed
  };