import Text from "../atoms/Text";
import { Button } from "../atoms/Button";

const NavBar = () => {
    return (
        <nav>
          <ul className="menu">
            <li>
              <Button id="todos" className="boton-menu boton-categoria active">
                <i className="bi bi-hand-index-thumb-fill"></i> Todo los productos
              </Button>
            </li>
            <li>
              <Button id="hardware" className="boton-menu boton-categoria">
                <i className="bi bi-hand-index-thumb"></i> Hardware
              </Button>
            </li>
            <li>
              <Button id="software" className="boton-menu boton-categoria">
                <i className="bi bi-hand-index-thumb"></i> Software
              </Button>
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