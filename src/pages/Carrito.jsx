import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../styles/molecules/CartItem.css';
import Wrapper from "../components/templates/Wrapper";
import { useCarrito } from '../context/CarritoContext';
import SidebarCarrito from '../components/organisms/SidebarCarrito';
import MainCarrito from '../components/organisms/MainCarrito';

function Carrito() {
  const { productosEnCarrito, eliminarDelCarrito, vaciarCarrito, comprarCarrito, compraRealizada } = useCarrito();

  const productosSeguros = Array.isArray(productosEnCarrito) ? productosEnCarrito : [];

  const calcularTotal = () => {
    return productosSeguros.reduce(
      (acc, prod) => {
        const precio = prod?.precio || 0;
        const cantidad = prod?.cantidad || 0;
        return acc + (typeof precio === 'number' ? precio * cantidad : 0);
      },
      0
    );
  };

  const total = calcularTotal();
  const carritoVacio = productosSeguros.length === 0;

  const handleVaciar = () => {
    vaciarCarrito();
  };

  const handleComprar = () => {
    comprarCarrito();

  };

  return (
    <Wrapper>
      <SidebarCarrito />
      <MainCarrito
        carritoVacio={carritoVacio}
        carritoComprar={compraRealizada}
        productosEnCarrito={productosSeguros}
        eliminarDelCarrito={eliminarDelCarrito}
        handleComprar={handleComprar}
        handleVaciar={handleVaciar}
        total={total}
      />
    </Wrapper>
  );
}

export default Carrito;
