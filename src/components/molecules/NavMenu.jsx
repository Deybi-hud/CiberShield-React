import React from 'react';
import Button from '../atoms/Button';
const NavMenu = () => {
  return (
    <nav>
      <ul className="menu">
        <li>
          <Button id="todos" className="boton-menu boton-categoria active">
            <i className="bi bi-hand-index-thumb-fill"></i> Todos los productos
          </Button>
        </li>
        <li>
          <Button id="hardware" className="boton-menu boton-categoria">
            <i className="bi bi-hand-index-thumb"></i> Hardware
          </Button>
        </li>
        <li>
          <Button id="software" className="boton-menu boton-categoria">
            <i className="bi bi-hand-index-thumb"></i> Software
          </Button>
        </li>
        <li>
          <a className="boton-menu boton-carrito" href="./pages/Carrito.jsx">
            <Button className="boton-menu boton-carrito">
              <i className="bi bi-cart-fill"></i> Carrito
              <span id="numerito" className="numerito">0</span>
            </Button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
