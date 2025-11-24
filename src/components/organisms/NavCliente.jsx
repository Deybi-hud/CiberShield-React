import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "../atoms/Link";
import List from "../atoms/List";
import ListItem from "../atoms/ListItem";
import "../../styles/organisms/Nav.css";

const NavCliente = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav>
            <List as="ul" className="menu">
                <ListItem>
                    <Link
                        to="/cliente/perfil"
                        className={`boton-menu ${isActive('/cliente/perfil')}`}
                    >
                        <i className="bi bi-person-circle"></i> Mi Perfil
                    </Link>
                </ListItem>

                <ListItem>
                    <Link
                        to="/cliente/pedidos"
                        className={`boton-menu ${isActive('/cliente/pedidos')}`}
                    >
                        <i className="bi bi-bag-fill"></i> Mis Pedidos
                    </Link>
                </ListItem>

                <ListItem>
                    <Link to="/" className="boton-menu boton-volver">
                        <i className="bi bi-shop"></i> Ir a la Tienda
                    </Link>
                </ListItem>
            </List>
        </nav>
    );
};

export default NavCliente;