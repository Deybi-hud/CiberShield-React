import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";
import Wrapper from "../components/Templates/Wrapper";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/molecules/Header";
import NavCarrito from "../components/molecules/NavCarrito";


function Carrito() {


    return(
        <Wrapper class="wrapper">
            <Sidebar>
                <Header>
                </Header>
                <NavCarrito>
                </NavCarrito>
                <Footer>
                </Footer>
            </Sidebar>
            
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

        </Wrapper>
    )
}

export default Carrito;