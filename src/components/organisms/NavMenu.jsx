import React from "react";
import Button from "../atoms/Button";
import Link from "../atoms/Link";

const NavMenu = ({ categoriaActiva, filtrarPorCategoria, productosEnCarrito }) => {
  const totalCarrito = productosEnCarrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );

  return (
    <nav>
      <ul className="menu">
       <li>
          <Link to="/login" className="boton-menu boton-iniciar-sesion"><i className="bi bi-person-circle"></i> Iniciar sesión{" "}</Link>
        </li>
        <li>
          <Button id="todos" className={`boton-menu boton-categoria ${categoriaActiva === "todos" ? "active" : ""}`}onClick={() => filtrarPorCategoria("todos")}><i className="bi bi-hand-index-thumb-fill"></i> Todos los productos</Button>
        </li>

        <li>
          <Button id="hardware" className={`boton-menu boton-categoria ${categoriaActiva === "hardware" ? "active" : ""}`} onClick={() => filtrarPorCategoria("hardware")}><i className="bi bi-hand-index-thumb"></i> Hardware</Button>
        </li>

        <li>
          <Button id="software" className={`boton-menu boton-categoria ${categoriaActiva === "software" ? "active" : ""}`} onClick={() => filtrarPorCategoria("software")}><i className="bi bi-hand-index-thumb"></i> Software</Button>
        </li>

        <li>
          <Link to="/carrito" className="boton-menu boton-carrito"><i className="bi bi-cart-fill"></i> Carrito{" "}<span className="numerito">{totalCarrito}</span> </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
