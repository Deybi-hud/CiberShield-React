import React from "react";
import Header from "../molecules/Header";
import NavCarrito from "./NavCarrito";
import Wrapper from "../Templates/Wrapper";
import Footer from "../molecules/Footer";

const MainCarrito = () => {
    return (

        <Wrapper>
            <Header></Header>
            <NavCarrito>
                <main>
                    <Text variant = "h2" class="titulo-principal">Carrito</Text>
                    <div class="contenedor-carrito">
                        <Text variant = "p" id="carrito-vacio" class="carrito-vacio">Tu carrito está vacío. <i class="bi bi-emoji-frown"></i></Text>
                        <div id="carrito-productos" class="carrito-productos disabled">
                        </div>
                        <div id="carrito-acciones" class="carrito-acciones disabled">
                            <div class="carrito-acciones-derecha">
                                <div class="carrito-acciones-total">
                                    <Text variant="p">Total:</Text>
                                    <Text variant="p" id="total">$0</Text>
                                </div>
                                <Button id="carrito-acciones-comprar" class="carrito-acciones-comprar">Comprar ahora</Button>
                            </div>
                        </div>
                        <Text variant="p" id="carrito-comprado" class="carrito-comprado disabled">Muchas gracias por tu compra. <i class="bi bi-emoji-laughing"></i></Text>
                    </div>
                </main>
            </NavCarrito>
            <Footer>
            </Footer>
        </Wrapper>
    );
};

export default MainCarrito;