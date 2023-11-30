// Navbar.js
import React from 'react';
import 'navbar.css'; 

const Navbar = () => {

  return (
    <nav className="menu">
      <ul className="menu-list">
        <li><a href="/">Home</a></li>
              <li><a href="/TransactionEntry">Transaction Entry</a></li>
              <li><a href="/TransactionUpload">Upload Bank Statement(s)</a></li>
            </ul>
    </nav>
  );
};

export default Navbar;


