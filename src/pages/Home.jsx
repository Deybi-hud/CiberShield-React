import React from "react"; 
import "../styles/pages/Home.css";

function Home() {

  return (
    <div className="wrapper">
      <aside>
        <header>
          <h1 className="logo">CiberShield</h1>
          <li>
            <a className="boton-menu" href="/login">
              <button className="boton-iniciar-sesion boton-menu">
                <i className="bi bi-hand-index-thumb-fill"></i> Iniciar sesión
              </button>
            </a>
          </li>
        </header>

        <nav>
          <ul className="menu">
            <li>
              <button id="todos" className="boton-menu boton-categoria active">
                <i className="bi bi-hand-index-thumb-fill"></i> Todo los productos
              </button>
            </li>
            <li>
              <button id="hardware" className="boton-menu boton-categoria">
                <i className="bi bi-hand-index-thumb"></i> Hardware
              </button>
            </li>
            <li>
              <button id="software" className="boton-menu boton-categoria">
                <i className="bi bi-hand-index-thumb"></i> Software
              </button>
            </li>
            <li>
              <a className="boton-menu boton-carrito" href="/carrito">
                <button className="boton-menu boton-carrito">
                  <i className="bi bi-cart-fill"></i> Carrito{" "}
                  <span id="numerito" className="numerito">
                    0
                  </span>
                </button>
              </a>
            </li>
          </ul>
        </nav>

        <footer>
          <p>© 2025 CiberShield</p>
          <p>CiberShield@gmail.com</p>
        </footer>
      </aside>

      <main>
        <h2 className="titulo-principal" id="titulo-principal">
          Todo los productos
        </h2>
        <div id="contenedor-productos" className="contenedor-productos">
          {/* Aquí se renderizan dinámicamente los productos */}
        </div>
      </main>
    </div>
  );
  fetch('./assets/js/productos.json')
    .then(response => response.json())
    .then(data => {
        productosArray = data;
        cargarProductos(productosArray);

        const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
        if (productosEnCarritoLS) {
            productosEnCarrito = productosEnCarritoLS;
            actualizarNumerito();
        } else {
            productosEnCarrito = [];
        }
    });

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);
    
    const itemEnCarrito = productosEnCarrito.find(item => item.id === idBoton);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesCategoria.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const categoriaSeleccionada = e.currentTarget.id;

        if (categoriaSeleccionada !== "todos") {
            const productosFiltrados = productosArray.filter(p => p.categoria.id === categoriaSeleccionada);
            cargarProductos(productosFiltrados);
        } else {
            cargarProductos(productosArray);
        }
    });
});


};

export default Home;
