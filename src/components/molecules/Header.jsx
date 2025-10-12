import React from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const Header = () => {
  return (
    <header>
      <Text as="h1" className="logo">CiberShield</Text>
      <li>
        <Text variant="a" className="boton-menu" href="./pages/Login.jsx">
          <Button className="boton-iniciar-sesion boton-menu">
            <i className="bi bi-hand-index-thumb-fill"></i> Iniciar sesión
          </Button>
        </Text>
      </li>
    </header>
  );
};

export default Header;
