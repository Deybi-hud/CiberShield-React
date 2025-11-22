import React from "react";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
import "../../styles/organisms/Nav.css";
import List from "../atoms/List";
import ListItem from '../atoms/ListItem'
const NavMenu = ({ categoriaActiva, filtrarPorCategoria, productosEnCarrito }) => {
  const totalCarrito = productosEnCarrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );

  return (
    <nav>
      <List as="ul" className="menu">
        <ListItem>
          <Link to="/login" className="boton-menu boton-iniciar-sesion"><i className="bi bi-person-circle"></i> Iniciar sesión{" "}</Link>
        </ListItem>

        <ListItem>
          <Button id="todos" className={`boton-menu boton-categoria ${categoriaActiva === "todos" ? "active" : ""}`} onClick={() => filtrarPorCategoria("todos")}><i className="bi bi-hand-index-thumb-fill"></i> Todos los productos</Button>
        </ListItem>

        <ListItem>
          <Button id="hardware" className={`boton-menu boton-categoria ${categoriaActiva === "hardware" ? "active" : ""}`} onClick={() => filtrarPorCategoria("hardware")}><i className="bi bi-hand-index-thumb"></i> Hardware</Button>
        </ListItem>

        <ListItem>
          <Button id="software" className={`boton-menu boton-categoria ${categoriaActiva === "software" ? "active" : ""}`} onClick={() => filtrarPorCategoria("software")}><i className="bi bi-hand-index-thumb"></i> Software</Button>
        </ListItem>

        <ListItem>
          <Link to="/carrito" className="boton-menu boton-carrito"><i className="bi bi-cart-fill"></i> Carrito{" "}<span className="numerito">{totalCarrito}</span> </Link>
        </ListItem>
      </List>
    </nav>
  );
};

export default NavMenu;
