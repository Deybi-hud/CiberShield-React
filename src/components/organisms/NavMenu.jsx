 
import React from 'react';
import { Link } from 'react-router-dom';
import List from "../atoms/List";
import ListItem from '../atoms/ListItem';
import Button from "../atoms/Button";
import { useAuth } from '../../context/AuthContext';

const NavMenu = ({ categoriaActiva, filtrarPorCategoria, productosEnCarrito }) => {
  const { usuario, logout, isAuthenticated } = useAuth();

  const totalCarrito = productosEnCarrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);

  return (
    <nav>
      <List as="ul" className="menu">
        <ListItem>
          {isAuthenticated() ? (
            <Link to="/perfil" className="boton-menu boton-iniciar-sesion">
              <i className="bi bi-person-circle"></i> Perfil
            </Link>
          ) : (
            <Link to="/login" className="boton-menu boton-iniciar-sesion">
              <i className="bi bi-person-circle"></i> Iniciar sesión
            </Link>
          )}
        </ListItem>

        <ListItem>
          <Button
            className={`boton-menu boton-categoria ${categoriaActiva === "todos" ? "active" : ""}`}
            onClick={() => filtrarPorCategoria("todos")}
          >
            Todos los productos
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className={`boton-menu boton-categoria ${categoriaActiva === "hardware" ? "active" : ""}`}
            onClick={() => filtrarPorCategoria("hardware")}
          >
            Hardware
          </Button>
        </ListItem>

        <ListItem>
          <Button
            className={`boton-menu boton-categoria ${categoriaActiva === "software" ? "active" : ""}`}
            onClick={() => filtrarPorCategoria("software")}
          >
            Software
          </Button>
        </ListItem>

        <ListItem>
          <Link to="/carrito" className="boton-menu boton-carrito">
            <i className="bi bi-cart-fill"></i> Carrito
            {totalCarrito > 0 && <span className="numerito">{totalCarrito}</span>}
          </Link>
        </ListItem>

        {isAuthenticated() && (
          <ListItem>
            <Button onClick={logout} className="boton-menu" style={{ color: '#dc3545' }}>
              Cerrar sesión
            </Button>
          </ListItem>
        )}
      </List>
    </nav>
  );
};

export default NavMenu;