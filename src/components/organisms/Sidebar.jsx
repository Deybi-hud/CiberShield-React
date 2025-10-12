import React from 'react';
import Header from './Header';
import NavMenu from '../molecules/NavMenu';
import Footer from './Footer';

const Sidebar = () => {
  return (
    <aside>
      <Header />
      <NavMenu />
      <Footer />
    </aside>
  );
};

export default Sidebar;
