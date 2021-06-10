// Packages
import React from 'react';
// styles
import './Header.css';


const Header = () => {
  return(
    <header>
      <img
        src={`${process.env.PUBLIC_URL}/assets/branding/story-app-banner-v1.png`}
        alt='story teller'
      />
    </header>
  );
}

export default Header;