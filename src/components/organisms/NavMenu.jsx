import Text from "../atoms/Text";
import { Button } from "../atoms/Button";

const NavBar = () => {
    return (
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
    );
};