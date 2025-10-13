import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";

function Carrito() {

    return(
    <body>
        <div class="wrapper">
            <aside>
                <header>
                    <h1 class="logo">CiberShield</h1>
                </header>
                <nav>
                    <ul>
                        <li>
                            <a class="boton-menu boton-volver" href="./pages/Home.jsx">
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
                <footer>
                    <p>© 2025 CiberShield</p>
                </footer>
            </aside>
            
            <main>
                <h2 class="titulo-principal">Carrito</h2>
                <div class="contenedor-carrito">
                    <p id="carrito-vacio" class="carrito-vacio">Tu carrito está vacío. <i class="bi bi-emoji-frown"></i></p>
                    <div id="carrito-productos" class="carrito-productos disabled">
                    </div>
                    <div id="carrito-acciones" class="carrito-acciones disabled">
                        <div class="carrito-acciones-derecha">
                            <div class="carrito-acciones-total">
                                <p>Total:</p>
                                <p id="total">$0</p>
                            </div>
                            <button id="carrito-acciones-comprar" class="carrito-acciones-comprar">Comprar ahora</button>
                        </div>
                    </div>
                    <p id="carrito-comprado" class="carrito-comprado disabled">Muchas gracias por tu compra. <i class="bi bi-emoji-laughing"></i></p>
                </div>
            </main>

        </div>
    </body>
    )
}

export default Carrito;
