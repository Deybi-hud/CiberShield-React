import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../styles/molecules/CartItem.css';
import Wrapper from "../components/Templates/Wrapper";
import { useCarrito } from '../context/CarritoContext';
import SidebarCarrito from '../components/organisms/SidebarCarrito';
import MainCarrito from '../components/organisms/MainCarrito';

function Carrito() {
  const { productosEnCarrito, eliminarDelCarrito, vaciarCarrito, comprarCarrito,compraRealizada } = useCarrito();

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
     comprarCarrito();
     
  };

  return (
    <Wrapper>
     <SidebarCarrito/>
     <MainCarrito
      carritoVacio={carritoVacio}
      carritoComprar={compraRealizada}
      productosEnCarrito={productosEnCarrito}
      eliminarDelCarrito={eliminarDelCarrito}
      handleComprar={handleComprar}
      handleVaciar={handleVaciar}
      total={total}
     />
    </Wrapper>
  );
}

export default Carrito;
