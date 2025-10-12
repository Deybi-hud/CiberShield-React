import React from "react";

const MainCarrito = () => {
    return (
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
    );
};

export default MainCarrito;