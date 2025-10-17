import React from 'react';
import Text from '../atoms/Text';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const Header = () => {
  return (
    <header>
      <Text as="h1" className="logo">CiberShield</Text>
    </header>
  );
};

export default Header;
