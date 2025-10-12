import React from "react";

const NavCarrito = () => {

    return(
        <nav>
            <ul>
                <li>
                    <a class="boton-menu boton-volver" href="../index.html">
                        <i class="bi bi-arrow-return-left"></i> Seguir comprando
                    </a>
                </li>
                <li>
                    <a class="boton-menu boton-carrito active" href="/html/carrito.html">
                        <i class="bi bi-cart-fill"></i> Carrito
                    </a>
                </li>
            </ul>
        </nav>
    );

};

export default NavCarrito;