import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito'; 
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setProductosEnCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      return existente
        ? prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setProductosEnCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setProductosEnCarrito([]);
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              productosEnCarrito={productosEnCarrito}
              agregarAlCarrito={agregarAlCarrito}
            />
          } 
        />
        <Route 
          path="/carrito" 
          element={
            <Carrito 
              productosEnCarrito={productosEnCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;