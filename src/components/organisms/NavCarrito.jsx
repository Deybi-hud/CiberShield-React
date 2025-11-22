import React from "react";
import Link from "../atoms/Link";
import "../../styles/organisms/Nav.css";
import List from "../atoms/List";
import ListItem from '../atoms/ListItem'
const NavCarrito = () => {
    return (
        <nav>
            <List as="ul" className="menu">
                <ListItem>
                    <Link to="/" className="boton-menu boton-volver"> <i className="bi bi-arrow-return-left"></i>{' '}Seguir comprando</Link>
                </ListItem>
                <ListItem>
                    <Link to="/carrito" className="boton-menu boton-carrito active"><i className="bi bi-cart-fill"></i>{' '}Carrito</Link>
                </ListItem>
            </List>
        </nav>
    )
};

export default NavCarrito;