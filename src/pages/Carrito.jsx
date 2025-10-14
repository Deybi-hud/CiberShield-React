import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../styles/pages/Home.css';
import '../styles/molecules/CartItem.css';
import Wrapper from '../components/templates/Wrapper';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';
>>>>>>> parent of bdbbfcb (Update)
import { useCarrito } from './CarritoContext';
import SidebarCarrito from '../components/organisms/SidebarCarrito';
import MainCarrito from '../components/organisms/MainCarrito';

function Carrito() {
  const { productosEnCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
=======
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';
>>>>>>> parent of ab8ba6c (UPDATE SEMI FINAL AHORA SI QUE SI FIX)

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
     <SidebarCarrito/>
     <MainCarrito/>
    </Wrapper>
  );
}

export default Carrito;