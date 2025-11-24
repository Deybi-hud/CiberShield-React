// src/pages/Carrito.jsx
import React from 'react';
import Wrapper from "../components/templates/Wrapper";
import SidebarCarrito from '../components/organisms/SidebarCarrito';
import MainCarrito from '../components/organisms/MainCarrito';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Carrito() {
  const { productosEnCarrito, eliminarDelCarrito, vaciarCarrito, comprarCarrito, compraRealizada } = useCarrito();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const total = productosEnCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  const carritoVacio = productosEnCarrito.length === 0;

  const handleComprar = () => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para comprar');
      navigate('/login');
      return;
    }
    comprarCarrito();
  };

  return (
    <Wrapper>
      <SidebarCarrito />
      <MainCarrito
        carritoVacio={carritoVacio}
        carritoComprar={compraRealizada}
        productosEnCarrito={productosEnCarrito}
        eliminarDelCarrito={eliminarDelCarrito}
        handleComprar={handleComprar}
        handleVaciar={vaciarCarrito}
        total={total}
      />
    </Wrapper>
  );
}

export default Carrito;