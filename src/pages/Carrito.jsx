import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../styles/pages/Home.css';
import '../styles/molecules/CartItem.css';
import Wrapper from '../components/templates/Wrapper';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';

function Carrito({ productosEnCarrito, eliminarDelCarrito, vaciarCarrito }) {
  const calcularTotal = () => {
    return productosEnCarrito.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
  };

  const total = calcularTotal();
  const carritoVacio = productosEnCarrito.length === 0;

  const handleVaciar = () => {
    vaciarCarrito();
  };

  const handleComprar = () => {
    if (productosEnCarrito.length > 0) {
      vaciarCarrito();
    }
  };

  return (
    <Wrapper>
      <aside>
        <Header />
        <nav>
          <ul className="menu">
            <li>
              <Link to="/" className="boton-menu boton-volver">
                <i className="bi bi-arrow-return-left"></i>
                {' '}
                Seguir comprando
              </Link>
            </li>
            <li>
              <Link to="/carrito" className="boton-menu boton-carrito active">
                <i className="bi bi-cart-fill"></i>
                {' '}
                Carrito
              </Link>
            </li>
          </ul>
        </nav>
        <Footer />
      </aside>

      <main>
        <Text as="h2" className="titulo-principal">
          Carrito
        </Text>
        
        <div className="contenedor-carrito">
          {carritoVacio && (
            <Text as="p" className="carrito-vacio">
              Tu carrito está vacío.
              {' '}
              <i className="bi bi-emoji-frown"></i>
            </Text>
          )}

          {!carritoVacio && (
            <>
              <div className="carrito-productos">
                {productosEnCarrito.map((producto) => (
                  <CartItem
                    key={producto.id}
                    producto={producto}
                    onEliminar={eliminarDelCarrito}
                  />
                ))}
              </div>

              <div className="carrito-acciones">
                <Button
                  className="carrito-acciones-vaciar"
                  onClick={handleVaciar}
                >
                  Vaciar Carrito
                </Button>
                <div className="carrito-acciones-derecha">
                  <div className="carrito-acciones-total">
                    <Text as="p">
                      Total:
                    </Text>
                    <Text as="p">
                      ${total.toLocaleString()}
                    </Text>
                  </div>
                  <Button
                    className="carrito-acciones-comprar"
                    onClick={handleComprar}
                  >
                    Comprar ahora
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </Wrapper>
  );
}

export default Carrito;