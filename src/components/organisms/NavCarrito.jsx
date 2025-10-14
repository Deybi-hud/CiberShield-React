import React from "react";
import Link from "../atoms/Link";

const NavCarrito = () => {
    return (
        <nav>
            <ul className="menu">
                <li>
                    <Link to="/" className="boton-menu boton-volver"> <i className="bi bi-arrow-return-left"></i>{' '}Seguir comprando</Link>
                </li>
                <li>
                    <Link to="/carrito" className="boton-menu boton-carrito active"><i className="bi bi-cart-fill"></i>{' '}Carrito</Link>
                </li>
            </ul>
        </nav>
    )
};

export default NavCarrito;