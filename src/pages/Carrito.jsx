import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../styles/pages/Home.css';
import '../styles/molecules/CartItem.css';
import Wrapper from '../components/templates/Wrapper';
import { useCarrito } from './CarritoContext';
import SidebarCarrito from '../components/organisms/SidebarCarrito';
import MainCarrito from '../components/organisms/MainCarrito';

function Carrito() {
  const { productosEnCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

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
    </Wrapper>
  );
}

export default Carrito;
