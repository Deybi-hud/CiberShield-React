import Text from "../atoms/Text";
import { Button } from "../atoms/Button";
import React from "react";


const Header = () => {
    return (
        <aside>
            <header>
            <Text variant="h1" className="logo">CiberShield</Text>
            <li>
                <Text className="boton-menu" href="/login">
                <Button className="boton-iniciar-sesion boton-menu">
                    <i className="bi bi-hand-index-thumb-fill"></i> Iniciar sesión
                </Button>
                </Text>
            </li>
            </header>
        </aside>
    );  
};

export default Header;