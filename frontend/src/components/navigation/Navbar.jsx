// In Navbar.js

import { Button } from 'components/assets/localStyle';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <Button onClick={() => scrollToSection('dashboard-section')}>Dashboard</Button>
      <Button onClick={() => scrollToSection('transaction-entry-section')}>Transaction Entry</Button>
      <Button onClick={() => scrollToSection('transaction-import-section')}>Transaction Import</Button>
    </nav>
  );
};

export default Navbar;