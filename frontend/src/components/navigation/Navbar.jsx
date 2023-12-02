// In Navbar.js

import { Button } from 'components/assets/localAssets/localStyle';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <Button onClick={() => scrollToSection('dashboard-section')}>Dashboard</Button>
      <Button onClick={() => scrollToSection('transaction-entry-section')}>Transaction Entry</Button>
      <Button onClick={() => scrollToSection('transaction-upload-section')}>Transaction Upload</Button>
    </nav>
  );
};

export default Navbar;