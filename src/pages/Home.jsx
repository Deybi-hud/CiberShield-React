import React from "react"; // tu css
import "bootstrap-icons/font/bootstrap-icons.min.css";

const Home = () => {
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
};

export default Home;
