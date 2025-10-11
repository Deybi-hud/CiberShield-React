import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";


function Carrito() {

    function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {


        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled"); 

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        });

        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }

        actualizarBotonesEliminar();
        actualizarTotal();
    }

    cargarProductosCarrito();

    function actualizarBotonesEliminar() {
        const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const idBoton = e.currentTarget.id;
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

        if (index !== -1) {
            productosEnCarrito.splice(index, 1);
            cargarProductosCarrito();
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
    }

    function actualizarTotal() {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        total.innerText = `$${totalCalculado}`;
    }

    botonComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito() {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
    }

    
    return(
        <div class="wrapper">
            <aside>
                <header>
                    <h1 class="logo">CiberShield</h1>
                </header>
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
    )
}

export default Carrito;