import React from 'react';
import Header from '../molecules/Header';
import NavMenu from './NavMenu';
import Footer from '../molecules/Footer';

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
